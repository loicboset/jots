import { EmailOtpType } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

import { GET } from '../../../app/auth/confirm/route';

// Mock the createClient function and redirect function
jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('GET handler for OTP verification', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  it('should redirect to the next URL if OTP is verified successfully', async () => {
    const token_hash = 'valid_token_hash';
    const type: EmailOtpType = 'email';
    const nextUrl = '/dashboard';

    // Mock the response from Supabase
    const mockVerifyOtp = jest.fn().mockResolvedValue({ error: null }); // Mock successful verification
    (createClient as jest.Mock).mockResolvedValue({
      auth: {
        verifyOtp: mockVerifyOtp, // Mock verifyOtp method
      },
    });

    // Create a mock request with query parameters
    const request = {
      url: `https://example.com?token_hash=${token_hash}&type=${type}&next=${nextUrl}`,
    };

    await GET(request as unknown as NextRequest);

    // Assertions
    expect(createClient).toHaveBeenCalledTimes(1);
    expect(mockVerifyOtp).toHaveBeenCalledWith({
      type,
      token_hash,
    });
    expect(redirect).toHaveBeenCalledWith(nextUrl);
  });

  it('should redirect to the error page if OTP verification fails', async () => {
    const token_hash = 'invalid_token_hash';
    const type: EmailOtpType = 'email';
    const nextUrl = '/dashboard';

    // Mock the response from Supabase with an error
    const mockVerifyOtp = jest.fn().mockResolvedValue({ error: 'Invalid OTP' }); // Mock failed verification
    (createClient as jest.Mock).mockResolvedValue({
      auth: {
        verifyOtp: mockVerifyOtp, // Mock verifyOtp method
      },
    });

    // Create a mock request with query parameters
    const request = {
      url: `https://example.com?token_hash=${token_hash}&type=${type}&next=${nextUrl}`,
    };

    await GET(request as unknown as NextRequest);

    // Assertions
    expect(createClient).toHaveBeenCalledTimes(1);
    expect(mockVerifyOtp).toHaveBeenCalledWith({
      type,
      token_hash,
    });
    expect(redirect).toHaveBeenCalledWith('/error');
  });

  it('should redirect to the error page if missing parameters', async () => {
    // Create a mock request with missing parameters (no token_hash and type)
    const request = {
      url: 'https://example.com',
    };

    await GET(request as unknown as NextRequest);

    // Assertions
    expect(redirect).toHaveBeenCalledWith('/error');
  });
});
