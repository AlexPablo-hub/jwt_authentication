'use server'

import { verifySession } from "@/app/_lib/session"

// Função assíncrona que realiza uma ação específica
export async function myAction() {
    const session = await verifySession()
    const role = session?.role

    // Verifica se o papel do usuário não é 'admin'
    if (role !== 'admin'){
        console.log('Unauthorized access attempt');
        return { error: 'Unauthorized' }
    }
}
