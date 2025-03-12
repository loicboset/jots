import { createClient } from '@/lib/supabase/server';

import { GET, PUT } from '../../../app/api/categories/route';

jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}));

describe('API Handlers', () => {
  let supabaseMock;

  beforeEach(() => {
    supabaseMock = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: [{ id: 1, name: 'Test Category' }] }),
      upsert: jest.fn().mockReturnThis(),
    };
    createClient.mockResolvedValue(supabaseMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET should return categories for a given user', async () => {
    const request = new Request('https://example.com/api?user_id=123');
    const response = await GET(request);

    expect(supabaseMock.from).toHaveBeenCalledWith('categories');
    expect(supabaseMock.select).toHaveBeenCalledWith('*');
    expect(supabaseMock.eq).toHaveBeenCalledWith('user_id', '123');
    expect(supabaseMock.order).toHaveBeenCalledWith('name', { ascending: true });

    const responseData = await response.json();
    expect(response.status).toBe(200);
    expect(responseData).toEqual([{ id: 1, name: 'Test Category' }]);
  });

  test('PUT should upsert category and return data', async () => {
    supabaseMock.select.mockResolvedValue({ data: [{ id: 1, user_id: '123', name: 'New Category', color: 'red' }] });

    const request = new Request('https://example.com/api', {
      method: 'PUT',
      body: JSON.stringify({ user_id: '123', name: 'New Category', color: 'red' }),
    });

    const response = await PUT(request);

    expect(supabaseMock.from).toHaveBeenCalledWith('categories');
    expect(supabaseMock.upsert).toHaveBeenCalledWith({ user_id: '123', name: 'New Category', color: 'red' });
    expect(supabaseMock.select).toHaveBeenCalled();

    const responseData = await response.json();
    expect(response.status).toBe(200);
    expect(responseData).toEqual([{ id: 1, user_id: '123', name: 'New Category', color: 'red' }]);
  });
});
