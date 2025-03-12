import { createClient } from '@/lib/supabase/server';
import { UpsertCategory } from '@/types/payload/categories';

import { GET, PUT } from '../../../app/api/categories/route';

// Mock the createClient function
jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}));

describe('GET and PUT handlers', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  describe('GET handler', () => {
    it('should return categories for the user', async () => {
      const mockCategories = [
        { id: 1, name: 'Category 1', user_id: '123', color: '#ff0000' },
        { id: 2, name: 'Category 2', user_id: '123', color: '#00ff00' },
      ];

      // Mock the response from Supabase
      (createClient as jest.Mock).mockResolvedValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          order: jest.fn().mockResolvedValue({ data: mockCategories }),
        }),
      });

      // Create a mock request
      const request = new Request('https://example.com?user_id=123');
      const response = await GET(request);

      // Parse the response body
      const responseBody = await response.json();

      // Assertions
      expect(response.status).toBe(200);
      expect(responseBody).toEqual(mockCategories);
      expect(createClient).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT handler', () => {
    it('should upsert a category', async () => {
      const mockUpsertResponse = [
        { id: 1, user_id: '123', name: 'New Category', color: '#0000ff' },
      ];

      // Mock the response from Supabase
      (createClient as jest.Mock).mockResolvedValue({
        from: jest.fn().mockReturnValue({
          upsert: jest.fn().mockReturnThis(),
          select: jest.fn().mockResolvedValue({ data: mockUpsertResponse }),
        }),
      });

      const mockRequestBody: UpsertCategory = {
        user_id: '123',
        name: 'New Category',
        color: '#0000ff',
      };

      // Create a mock PUT request
      const request = new Request('https://example.com', {
        method: 'PUT',
        body: JSON.stringify(mockRequestBody),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(request);
      const responseBody = await response.json();

      // Assertions
      expect(response.status).toBe(200);
      expect(responseBody).toEqual(mockUpsertResponse);
      expect(createClient).toHaveBeenCalledTimes(1);
    });
  });
});
