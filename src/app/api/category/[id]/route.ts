import { createClient } from '@/lib/supabase/server';

// NOTE: this is the right way to do it, but doesnt work
// open issue: https://github.com/nextauthjs/next-auth/issues/12224
// export async function DELETE(request: Request, { params }: { params: { id: number } }): Promise<Response> {

export async function DELETE(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop() as string;

  const supabase = await createClient();
  await supabase.from('categories').delete().match({ id });

  return new Response('Category deleted successfully!', { status: 200 });
}
