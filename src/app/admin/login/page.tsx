import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import LoginForm from '~/components/ui/LoginForm'
import PageContainer from '~/components/layouts/PageContainer'

export const metadata: Metadata = {
    title: "MyTicketX - Login",
    description: "Login to your MyTicketX account to buy and sell event tickets easily.",
}

const LoginAdmin = () => {
    return (
        <div className="flex h-dvh items-center justify-center bg-[#09090b] p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Log In ke Admin

                    </h1>
                    <p className="mt-2 text-base text-zinc-400">
                        Selamat datang kembali! Silakan login ke akun Anda.
                    </p>
                </div>

                <div className="bg-[#202027] p-8 rounded-xl border border-zinc-800">
                    <LoginForm />
                </div>

            </div>
        </div>
    )
}

export default LoginAdmin