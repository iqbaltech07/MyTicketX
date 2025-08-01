"use client";

import React from 'react'
import Sidebar from '~/components/common/Sidebar'
import { usePathname } from 'next/navigation'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isLoginPage = pathname.includes('/admin/login')

    return (
        <div className={`${!isLoginPage && "flex flex-1 gap-2 h-auto"}`}>
            {!isLoginPage && <Sidebar />}
            <main className={`${!isLoginPage && "flex-1 px-5 pt-12"}`}>{children}</main>
        </div>
    )
}

export default AdminLayout