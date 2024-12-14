'use server'

import { db } from '@/app/_lib/db'
import { users } from '@/app/_lib/schema'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import { createSession } from '@/app/_lib/session'

// Função assíncrona para realizar o login de um usuário
export async function login(formData: FormData) {
    const email = formData.get('email')?.toString() || ''
    const password = formData.get('password')?.toString() || ''
    const errors: Record<string, string> = {}

    if(!email) errors.email = 'Email is required'
    if(!password) errors.password = 'Password is required'

    if (Object.keys(errors).length > 0) {
        return { errors }
    }

    const [user] = await db.select().from(users).where(eq(users.email, email))
    if (!user) {
        return { errors: { email: 'Invalid email or password' }}
    }

    const isValid = await bcrypt.compare(password, user.passwordHash)
    if (!isValid) {
        return { errors: { email: 'Invalid email or password' }}
    }

    await createSession(user.id, user.role)
}