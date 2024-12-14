import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Função assíncrona que lida com requisições GET
export async function GET(request: Request) {
  const cookieStore = await cookies();
  
  cookieStore.delete('session');
  
  return NextResponse.redirect(new URL('/', request.url));
}