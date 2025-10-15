import { createClient } from '@/lib/supabase/server';

import { updateSession } from '../../lib/supabase/middleware';
import { middleware } from '../../middleware';

// Mock the dependencies
jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}));

jest.mock('../../lib/supabase/middleware', () => ({
  updateSession: jest.fn(),
}));

// Manually mock NextRequest and NextResponse
class MockNextRequest {
  constructor(url: string) {
    this.url = url;
    this.nextUrl = { pathname: new URL(url).pathname };
  }

  // Simulating necessary properties
  nextUrl: { pathname: string };
  url: string;
}

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn((url: URL) => ({ status: 302, url })),
    json: jest.fn(() => ({ status: 200, body: {} })),
  },
}));

describe('Middleware', () => {
  let mockGetUser: jest.Mock;

  beforeEach(() => {
    mockGetUser = jest.fn();
    (createClient as jest.Mock).mockReturnValue({
      auth: {
        getUser: mockGetUser,
      },
    });
    (updateSession as jest.Mock).mockResolvedValue({ status: 200, body: {} });
  });

  it('should redirect to user dynamic homepage if user is authenticated', async () => {
    const mockUser = { id: 'user-id' };
    mockGetUser.mockResolvedValue({ data: { user: mockUser } });

    const request = new MockNextRequest('https://example.com/');
    const response = await middleware(request);

    expect(createClient).toHaveBeenCalled();
    expect(mockGetUser).toHaveBeenCalled();
    expect(response.status).toBe(302); // Expect redirect
    expect(response.url.toString()).toBe('https://example.com/user-id');
  });

  it('should call updateSession if no user is authenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });

    const request = new MockNextRequest('https://example.com/');
    const response = await middleware(request);

    expect(updateSession).toHaveBeenCalledWith(request);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });

  it('should not redirect if user is not on the root path', async () => {
    const mockUser = { id: 'user-id' };
    mockGetUser.mockResolvedValue({ data: { user: mockUser } });

    const request = new MockNextRequest('https://example.com/other-path');
    const response = await middleware(request);

    expect(createClient).toHaveBeenCalled();
    expect(mockGetUser).toHaveBeenCalled();
    expect(response.status).toBe(200); // Expect json response
    expect(response.body).toEqual({});
  });
});
