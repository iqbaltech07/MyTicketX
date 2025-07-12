import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import LoginForm from '~/components/forms/LoginForm'
import PageContainer from '~/components/layouts/PageContainer'

export const metadata: Metadata = {
  title: "MyTicketX - Login",
  description: "Login to your MyTicketX account to buy and sell event tickets easily.",
}

const Login = () => {
  return (
    <PageContainer className="flex h-dvh items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Log In ke MyTicket<span className='text-[#5AE3A8] text-[40px] italic'>X</span>

          </h1>
          <p className="mt-2 text-base text-zinc-400">
            Selamat datang kembali! Silakan login ke akun Anda.
          </p>
        </div>

        <div className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800">
          <LoginForm />
        </div>

        <p className="mt-8 text-center text-sm text-zinc-400">
          Belum punya akun?{' '}
          <Link href="/register" className="font-semibold leading-6 text-[#5AE3A8] hover:text-[#5AE3A8]/70 transition">
            Daftar sekarang
          </Link>
        </p>

      </div>
    </PageContainer>
  )
}

export default Login