import { getLoggedUser } from "@/app/_lib/users";
import { redirect } from "next/navigation";

export default async function AdminPage() {
    const user = await getLoggedUser();

    if (!user || user.role !== "admin") {
        console.log("User not authorized, redirecting to dashboard");
        redirect("/dashboard");
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Admin Page</h1>
                <p className="text-gray-600 text-center mb-6">Hello, {user?.name} (admin)</p>
                <a
                    className="block font-bold bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition text-center"
                    href="/dashboard"
                >
                   Back to Dashboard
                </a>
            </div>
        </div>
    );
}
