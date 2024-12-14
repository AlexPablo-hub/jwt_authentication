'use server'

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const key = new TextEncoder().encode(process.env.SECRET)

// Configuração do cookie de sessão
const cookieConfig = {
    name: 'session',
    options : { httpOnly: true, secure: true, sameSite: 'lax', path: '/' },
    duration: 24 * 60 * 60 * 1000,
}

// Função assíncrona para criptografar o payload em um token JWT
export async function encrypt(payload: Record<string, unknown>) {
    return new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(key)
}

// Função assíncrona para descriptografar um token JWT
export async function decrypt(sessionToken?: string) {
    if (!sessionToken) return null
    try {
        const { payload } = await jwtVerify(sessionToken, key, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.error(error)
        return null
    }
}

// Função assíncrona para criar uma sessão
export async function createSession(userID: number, role: string){
    const expires = new Date(Date.now() + cookieConfig.duration)
    const session = await encrypt({ userID, role, exp: Math.floor(expires.getTime()/1000) });

    const cookieStore = await cookies();
    cookieStore.set(cookieConfig.name, session, { ...cookieConfig.options, sameSite: 'lax', expires });
    redirect('/dashboard');
}

// Função assíncrona para verificar a sessão do usuário
export async function verifySession(redirectToLogin = true) {
    const cookieStore = await cookies();
    const cookieValue = cookieStore.get(cookieConfig.name)?.value;
    const session = await decrypt(cookieValue);
    if (!session?.userID) {
        if (redirectToLogin) {
            redirect('/login');
        }
        return null;
    }
    return { userID: session.userID as number, role: session.role as string };
}

// Função assíncrona para deletar a sessão
export async function deleteSession(){
    const cookieStore = await cookies();
    cookieStore.delete(cookieConfig.name);
    redirect('/login');
}