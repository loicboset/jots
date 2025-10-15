import { createClient } from '@/lib/supabase/server';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await params;
  const supabase = await createClient();

  const { error } = await supabase.from('digests').update({ is_read: true }).eq('id', Number(id));

  if (error) {
    return new Response('Error marking digest as read', { status: 500 });
  }

  return new Response('Success');
}
