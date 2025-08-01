'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTachometerAlt, FaCalendarAlt, FaTicketAlt, FaTags } from 'react-icons/fa';

const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: FaTachometerAlt },
    { name: 'Events', href: '/admin/events', icon: FaCalendarAlt },
    { name: 'Categories', href: '/admin/categories', icon: FaTags },
];

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 flex-shrink-0 bg-[#202027] p-5 flex flex-col">
            <div className="mb-10">
                <Link href="/admin/dashboard">
                     <h1 className="font-bold text-2xl text-center">
                        MyTicket<span className="text-[#5AE3A8] text-3xl italic">X</span>
                    </h1>
                    <p className='text-center text-xs text-zinc-400 mt-1'>Admin Panel</p>
                </Link>
            </div>
            
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`
                            flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors
                            ${pathname === item.href
                                ? 'bg-[#5AE3A8] text-zinc-900'
                                : 'text-zinc-300 hover:bg-zinc-700 hover:text-white'}
                        `}
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div>
                <p className='text-center text-xs text-zinc-500'>© {new Date().getFullYear()} MyTicketX</p>
            </div>
        </aside>
    );
}

export default Sidebar;