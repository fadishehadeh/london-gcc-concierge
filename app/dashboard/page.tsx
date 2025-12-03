import Link from "next/link";
import { MapPin, Users, Settings, LogOut } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <nav className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex flex-shrink-0 items-center">
                                <span className="text-xl font-bold text-gray-900">London GCC Admin</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                                <LogOut className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="py-10">
                <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {/* Stats / Quick Links */}
                        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Places Card */}
                            <Link href="/places" className="overflow-hidden rounded-lg bg-white shadow transition hover:shadow-md">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <MapPin className="h-6 w-6 text-gray-400" />
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="truncate text-sm font-medium text-gray-500">Places Management</dt>
                                                <dd>
                                                    <div className="text-lg font-medium text-gray-900">Manage Listings</div>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-5 py-3">
                                    <div className="text-sm">
                                        <span className="font-medium text-cyan-700 hover:text-cyan-900">View all</span>
                                    </div>
                                </div>
                            </Link>

                            {/* Users Card */}
                            <div className="overflow-hidden rounded-lg bg-white shadow opacity-60">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <Users className="h-6 w-6 text-gray-400" />
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="truncate text-sm font-medium text-gray-500">Users</dt>
                                                <dd>
                                                    <div className="text-lg font-medium text-gray-900">Manage Users</div>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-5 py-3">
                                    <div className="text-sm">
                                        <span className="font-medium text-gray-500">Coming Soon</span>
                                    </div>
                                </div>
                            </div>

                            {/* Settings Card */}
                            <div className="overflow-hidden rounded-lg bg-white shadow opacity-60">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <Settings className="h-6 w-6 text-gray-400" />
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="truncate text-sm font-medium text-gray-500">Settings</dt>
                                                <dd>
                                                    <div className="text-lg font-medium text-gray-900">App Configuration</div>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-5 py-3">
                                    <div className="text-sm">
                                        <span className="font-medium text-gray-500">Coming Soon</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
