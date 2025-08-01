"use client";
import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Button,
    Avatar,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/react";
import { menuItems } from "~/constant/const";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NavigationBar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className="px-5 py-2 lg:px-20 bg-[#1A1A1F]">
            <NavbarContent>
                <NavbarBrand>
                    <h1 className="font-bold text-[23px]">
                        MyTicket<span className="text-[#5AE3A8] text-[28px] italic">X</span>
                    </h1>
                </NavbarBrand>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {menuItems.map((data, i) => (
                    <NavbarItem key={i}>
                        <Link color="foreground" href={data.href} className="text-[18px]">
                            {data.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end" className="hidden lg:flex">
                {!session?.user ? (
                    <NavbarItem className="hidden lg:flex">
                        <Button className="bg-[#5AE3A8]/90" radius="sm">
                            <Link href="/login" className="text-black text-[18px]">Login</Link>
                        </Button>
                    </NavbarItem>
                ) : (
                    <Dropdown placement="bottom-end" className="bg-black">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="success"
                                name={session?.user?.name ?? ""}
                                size="sm"
                                src={session?.user?.image ?? ""}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem
                                key="profile"
                                className="h-14 gap-2 pointer-events-none bg-transparent hover:bg-transparent cursor-default"
                            >
                                <p className="font-semibold text-xs text-gray-500">Signed in as</p>
                                <p className="font-semibold text-xs text-gray-500">{session?.user?.email}</p>
                            </DropdownItem>

                            <DropdownItem key="settings" onClick={() => router.replace("/profile")}>My Profile</DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                )}
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.name}-${index}`}>
                        <Link className="w-full" href={item.href} size="lg">
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};

export default NavigationBar;
