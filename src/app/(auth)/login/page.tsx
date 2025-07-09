"use client"

import { Button } from '@heroui/react'
import Link from 'next/link'
import React from 'react'
import LoginForm from '~/components/form/LoginForm'
import PageContainer from '~/components/layouts/PageContainer'

const Login = () => {
  return (
    <PageContainer className="flex h-dvh items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Log In ke MyTicket<span className='text-[#5AE2A7] text-[40px] italic'>X</span>

          </h1>
          <p className="mt-2 text-base text-zinc-400">
            Selamat datang kembali! Silakan login ke akun Anda.
          </p>
        </div>

        <div className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800">

          <LoginForm />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-zinc-900 px-2 text-zinc-400">
                atau
              </span>
            </div>
          </div>

          <div>
            <Button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-md bg-white/5 px-3 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-zinc-700 hover:bg-zinc-800/50 transition"
            >
              <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>
                Log in dengan Google
              </span>
            </Button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-zinc-400">
          Belum punya akun?{' '}
          <Link href="/register" className="font-semibold leading-6 text-[#5AE2A7] hover:text-[#5AE3A8]/70 transition">
            Daftar sekarang
          </Link>
        </p>

      </div>
    </PageContainer>
  )
}

export default Login