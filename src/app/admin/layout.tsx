import React from 'react'
import Sidebar from '~/components/common/Sidebar'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-1 gap-2 h-screen">
            <Sidebar />
            <main className="flex-1 p-5 my-12">{children}</main>
        </div>
    )
}

export default AdminLayout