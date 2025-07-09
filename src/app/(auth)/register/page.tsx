"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RegisterForm from '~/components/form/RegisterForm'
import PageContainer from '~/components/layouts/PageContainer'

const Register = () => {
  return (
    <PageContainer className="h-dvh bg-zinc-950 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        <div className="relative hidden h-full w-full items-center justify-center overflow-hidden bg-zinc-900 lg:flex">
          <div className="absolute -top-1/4 -left-1/4 h-1/2 w-1/2 rounded-full bg-[#5AE3A8]" />
          <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-[#5AE3A8]" />
          <div className="flex flex-col items-center text-center">
            <Image src={"/images/ticket-ilustration.svg"} alt='buy-ticket-ilustration' className='w-[60%] h-[60%]' width={500} height={500} draggable={false} loading='lazy' />
          </div>
        </div>

        {/* Kolom Kanan: Form Registrasi */}
        <div className="flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Buat <span className='text-[#5AE3A8]'>Akun</span>
              </h1>
              <p className="mt-2 text-base text-zinc-400">
                Dapatkan tiket acara favoritmu dengan mudah dan cepat.
              </p>
            </div>

            <RegisterForm />

            <p className="mt-8 text-center text-sm text-zinc-400">
              Sudah punya akun?{' '}
              <Link href="/login" className="font-semibold leading-6 text-[#5AE2A7] hover:text-[#5AE3A8]/70 transition">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default Register