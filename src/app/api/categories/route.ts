import { createClient } from '@/lib/supabase/server';
import { UpsertCategory } from '@/types/payload/categories';

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const userID = searchParams.get('user_id');

  const supabase = await createClient();

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', userID)
    .order('name', { ascending: true });

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return new Response(JSON.stringify(categories), { status: 200, headers });
}

export async function PUT(request: Request): Promise<Response> {
  const supabase = await createClient();

  const req = await request.json();
  const { user_id, name, color } = req as UpsertCategory;

  const { data } = await supabase.from('categories').upsert({ user_id, name, color }).select();

  return new Response(JSON.stringify(data), { status: 200 });
}
