import { createClient } from '@/lib/supabase/server';
import { CreateJournalEntry } from '@/types/payload/journal_entries';

import { GET, PUT } from '../../../app/api/journal_entries/route';

// Mock the createClient function
jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}));

describe('GET and PUT handlers for journal entries', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  describe('GET handler', () => {
    it('should return journal entries for the user', async () => {
      const mockJournalEntries = {
        journal_entries: [
          { id: 1, user_id: '123', content: 'First Entry', date: '2025-01-01' },
          { id: 2, user_id: '123', content: 'Second Entry', date: '2025-02-01' },
        ],
      };

      // Mock the response from Supabase
      (createClient as jest.Mock).mockResolvedValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          order: jest.fn().mockResolvedValue({ data: mockJournalEntries }),
        }),
      });

      // Create a mock request
      const request = new Request('https://example.com?user_id=123');
      const response = await GET(request);

      // Parse the response body
      const responseBody = await response.json();

      // Assertions
      expect(response.status).toBe(200);
      expect(responseBody).toEqual({ journal_entries: mockJournalEntries });
      expect(createClient).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT handler', () => {
    it('should upsert a journal entry', async () => {
      const mockUpsertResponse = [
        {
          id: 1,
          user_id: '123',
          content: 'Updated Journal Entry',
          date: '2025-03-01',
        },
      ];

      // Mock the response from Supabase
      (createClient as jest.Mock).mockResolvedValue({
        from: jest.fn().mockReturnValue({
          upsert: jest.fn().mockReturnThis(),
          select: jest.fn().mockResolvedValue({ data: mockUpsertResponse }),
        }),
      });

      const mockRequestBody: CreateJournalEntry = {
        user_id: '123',
        content: 'Updated Journal Entry',
        date: '2025-03-01',
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
