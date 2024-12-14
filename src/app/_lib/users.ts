import { db } from '@/app/_lib/db'
import { users } from '@/app/_lib/schema'
import { eq } from 'drizzle-orm'

// Importa a função verifySession para verificar a sessão do usuário
import { verifySession } from '@/app/_lib/session'

// Função assíncrona para obter o usuário logado
export async function getLoggedUser() {
    const session = await verifySession(false)
    if (!session) return null

    const [user] = await db.select().from(users).where(eq(users.id, session.userID))
    if (!user) return null

    return { ...user, role: session.role }
}