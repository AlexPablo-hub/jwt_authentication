'use server'

import { db } from '@/app/_lib/db'
import { users } from '@/app/_lib/schema'
import bcrypt from 'bcrypt'

export async function signup(formData: FormData) {
    const name = formData.get('name')?.toString() || ''
    const email = formData.get('email')?.toString() || ''
    const password = formData.get('password')?.toString() || ''

    const errors: Record<string, string> = {}

    if (!name) {
        errors.name = 'Name is required'
    } else if (/\d/.test(name)) {
        errors.name = 'Name cannot contain numbers'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
        errors.email = 'Email is required'
    } else if (!emailRegex.test(email)) {
        errors.email = 'Invalid email format'
    }

    if (!password || password.length < 4) {
        errors.password = 'Password is required, and must be more than 4 characters'
    } 

    if (Object.keys(errors).length > 0) {
        return { errors }
    }

    const hashed = await bcrypt.hash(password, 10)

    try {
        await db.insert(users).values({ name, email, passwordHash: hashed }).returning()
    } catch (error: any) {
        if (error.message.includes('duplicate key')) {
            return { errors: { email: 'Email already in use' }}
        }
        // Trata outros erros gerais
        return { errors: { general: 'Something went wrong' }}
    }
}