"use client";

import React from 'react';
import Sidebar from '~/components/common/Sidebar';
import { usePathname } from 'next/navigation';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isLoginPage = pathname.includes('/admin/login');

    if (isLoginPage) {
        return <main className='h-screen'>{children}</main>;
    }

    return (
        <div className="flex h-screen bg-[#1A1A1F]">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}

export default AdminLayout;