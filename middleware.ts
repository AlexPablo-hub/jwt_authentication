import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/app/_lib/session'

// Função middleware para proteger rotas específicas
export async function middleware(req: NextRequest) {
    const protectedRoutes = ['/dashboard', '/admin']
    const currentPath = req.nextUrl.pathname

    if (protectedRoutes.includes(currentPath)) {
        const sessionToken = req.cookies.get('session')?.value
        const session = await decrypt(sessionToken)

        if (!session?.userID) {
            return NextResponse.redirect(new URL('/login', req.url))
        }

        if (currentPath === '/admin' && session.role !== 'admin') {
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }
    }

    return NextResponse.next()
}

// Configuração para aplicar o middleware em todas as rotas
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
