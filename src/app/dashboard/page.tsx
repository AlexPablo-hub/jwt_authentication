import { getLoggedUser } from '@/app/_lib/users'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
    const user = await getLoggedUser();

    if (!user) {
        redirect('/login');
    }

    const isAdmin = user.role === 'admin';

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Dashboard</h1>
                <p className="text-gray-600 text-center mb-6">Welcome, {user.name} this is your User Dashboard!</p>
                <div className="space-y-4">
                    {isAdmin ? (
                        <a
                            className="block font-bold bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition text-center"
                            href="/admin"
                        >
                            Go to Admin page
                        </a>
                    ) : (
                        <p className="text-red-500 text-sm text-center">
                            You do not have access to the Admin Dashboard.
                        </p>
                    )}
                    <a
                        className="block font-bold bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition text-center"
                        href="/logout"
                    >
                        Logout
                    </a>
                </div>
            </div>
        </div>
    );
}