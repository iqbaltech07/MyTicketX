'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Events', href: '/admin/events' },
    { name: 'Tickets', href: '/admin/tickets' },
];

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 flex-shrink-0 bg-zinc-800 p-4">
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
            <nav className="space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`
              block rounded-md px-3 py-2 text-sm font-medium
              ${pathname === item.href
                                ? 'bg-blue-600 text-white'
                                : 'text-zinc-300 hover:bg-zinc-700 hover:text-white'}
            `}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;