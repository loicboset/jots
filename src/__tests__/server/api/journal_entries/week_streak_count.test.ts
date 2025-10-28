jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}));

import { createClient } from '@/lib/supabase/server';
import { GET } from '@/app/api/journal_entries/week_streak_count/route';
import dayjs from 'dayjs';

// - [x] a user has only one journal entry in the current week -> total week streak = 1
// - [x] a user has only one reflection in the current week -> total week streak = 1
// - [x] a user has only one journal entry in the last week and none for this week -> total week streak = 1
// - [x] a user has only one reflection in the last week and none for this week -> total week streak = 1
// - [x] a user has only one journal entry 2 weeks ago and none for this week -> total week streak = 0
// - [x] a user has only one reflection 2 weeks ago and none for this week -> total week streak = 0
// - [x] a user has 1 journal entry last week and one journal entry this week -> total week streak = 2
// - [x] a user has 1 reflection last week and 1 reflection this week -> total week streak = 2
// - [] a user has 1 journal entry last week and 1 reflection this week -> total week streak = 2

describe('GET /week_streak_count', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const today = dayjs().format('YYYY-MM-DD');
  const lastWeek = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
  const twoWeeksAgo = dayjs().subtract(14, 'day').format('YYYY-MM-DD');

  it('one journal entry in the current week = 1 week streak', async () => {
    const mockedData = [{ date: today }];

    (createClient as jest.Mock).mockImplementation(async () => ({
      from: jest.fn((table) => {
        const query = {
          select: jest.fn().mockReturnThis(),
          lte: jest.fn().mockReturnThis(),
          match: jest.fn().mockResolvedValue({
            data: table === 'journal_entries' ? mockedData : [],
            error: null,
          }),
          in: jest.fn().mockReturnThis(),
        };
        return query;
      }),
    }));

    const request = new Request('https://example.com?user_id=123');
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toBe(1);
    expect(createClient).toHaveBeenCalledTimes(1);
  });

  it('one reflection in the current week = 1 week streak', async () => {
    const mockedData = [{ date: today, status: 'submitted' }];

    (createClient as jest.Mock).mockImplementation(async () => ({
      from: jest.fn((table) => {
        const query = {
          select: jest.fn().mockReturnThis(),
          lte: jest.fn().mockReturnThis(),
          match: jest.fn().mockResolvedValue({
            data: table === 'user_reflections' ? mockedData : [],
            error: null,
          }),
          in: jest.fn().mockReturnThis(),
        };
        return query;
      }),
    }));

    const request = new Request('https://example.com?user_id=123');
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toBe(1);
    expect(createClient).toHaveBeenCalledTimes(1);
  });

  it('one journal entry last week and none this week = 1 week streak', async () => {
    const mockedData = [{ date: lastWeek, status: 'submitted' }];

    (createClient as jest.Mock).mockImplementation(async () => ({
      from: jest.fn((table) => {
        const query = {
          select: jest.fn().mockReturnThis(),
          lte: jest.fn().mockReturnThis(),
          match: jest.fn().mockResolvedValue({
            data: table === 'journal_entries' ? mockedData : [],
            error: null,
          }),
          in: jest.fn().mockReturnThis(),
        };
        return query;
      }),
    }));

    const request = new Request('https://example.com?user_id=123');
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toBe(1);
    expect(createClient).toHaveBeenCalledTimes(1);
  });

  it('one reflection last week and none this week = 1 week streak', async () => {
    const mockedData = [{ date: lastWeek, status: 'submitted' }];

    (createClient as jest.Mock).mockImplementation(async () => ({
      from: jest.fn((table) => {
        const query = {
          select: jest.fn().mockReturnThis(),
          lte: jest.fn().mockReturnThis(),
          match: jest.fn().mockResolvedValue({
            data: table === 'user_reflections' ? mockedData : [],
            error: null,
          }),
          in: jest.fn().mockReturnThis(),
        };
        return query;
      }),
    }));

    const request = new Request('https://example.com?user_id=123');
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toBe(1);
    expect(createClient).toHaveBeenCalledTimes(1);
  });

  it('one journal entry 2 weeks ago and none this week = 0 week streak', async () => {
    const mockedData = [{ date: twoWeeksAgo }];

    (createClient as jest.Mock).mockImplementation(async () => ({
      from: jest.fn((table) => {
        const query = {
          select: jest.fn().mockReturnThis(),
          lte: jest.fn().mockReturnThis(),
          match: jest.fn().mockResolvedValue({
            data: table === 'journal_entries' ? mockedData : [],
            error: null,
          }),
          in: jest.fn().mockReturnThis(),
        };
        return query;
      }),
    }));

    const request = new Request('https://example.com?user_id=123');
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toBe(0);
    expect(createClient).toHaveBeenCalledTimes(1);
  });

  it('one reflection 2 weeks ago and none this week = 0 week streak', async () => {
    const mockedData = [{ date: twoWeeksAgo, status: 'submitted' }];

    (createClient as jest.Mock).mockImplementation(async () => ({
      from: jest.fn((table) => {
        const query = {
          select: jest.fn().mockReturnThis(),
          lte: jest.fn().mockReturnThis(),
          match: jest.fn().mockResolvedValue({
            data: table === 'user_reflections' ? mockedData : [],
            error: null,
          }),
          in: jest.fn().mockReturnThis(),
        };
        return query;
      }),
    }));

    const request = new Request('https://example.com?user_id=123');
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toBe(0);
    expect(createClient).toHaveBeenCalledTimes(1);
  });

  it('one journal entry last week and one journal entry this week = 2 weeks streak', async () => {
    const mockedData = [{ date: lastWeek }, { date: today }];

    (createClient as jest.Mock).mockImplementation(async () => ({
      from: jest.fn((table) => {
        const query = {
          select: jest.fn().mockReturnThis(),
          lte: jest.fn().mockReturnThis(),
          match: jest.fn().mockResolvedValue({
            data: table === 'journal_entries' ? mockedData : [],
            error: null,
          }),
          in: jest.fn().mockReturnThis(),
        };
        return query;
      }),
    }));

    const request = new Request('https://example.com?user_id=123');
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toBe(2);
    expect(createClient).toHaveBeenCalledTimes(1);
  });

  it('one reflection last week and one reflection this week = 2 weeks streak', async () => {
    const mockedData = [
      { date: lastWeek, status: 'submitted' },
      { date: today, status: 'submitted' },
    ];

    (createClient as jest.Mock).mockImplementation(async () => ({
      from: jest.fn((table) => {
        const query = {
          select: jest.fn().mockReturnThis(),
          lte: jest.fn().mockReturnThis(),
          match: jest.fn().mockResolvedValue({
            data: table === 'user_reflections' ? mockedData : [],
            error: null,
          }),
          in: jest.fn().mockReturnThis(),
        };
        return query;
      }),
    }));

    const request = new Request('https://example.com?user_id=123');
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toBe(2);
    expect(createClient).toHaveBeenCalledTimes(1);
  });

  it('one reflection last week and one journal entry this week = 2 weeks streak', async () => {
    const mockedReflections = [{ date: lastWeek, status: 'submitted' }];
    const mockedJournalEntries = [{ date: today }];

    (createClient as jest.Mock).mockImplementation(async () => ({
      from: jest.fn((table) => {
        const query = {
          select: jest.fn().mockReturnThis(),
          lte: jest.fn().mockReturnThis(),
          match: jest.fn().mockResolvedValue({
            data: table === 'user_reflections' ? mockedReflections : mockedJournalEntries,
            error: null,
          }),
          in: jest.fn().mockReturnThis(),
        };
        return query;
      }),
    }));

    const request = new Request('https://example.com?user_id=123');
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toBe(2);
    expect(createClient).toHaveBeenCalledTimes(1);
  });
});
