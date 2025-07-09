import { Button, Input } from '@heroui/react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

const RegisterForm = () => {
    const form = useForm({
        defaultValues: {
            fullname: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        mode: 'onChange',
        reValidateMode: 'onChange'
    })
    return (
        <form className="space-y-5">
            <Controller name='fullname' control={form.control} render={({ field, fieldState }) => (
                <Input
                    type="text"
                    placeholder='Nama Lengkap'
                    autoComplete="nama-lengkap"
                    required
                    radius='sm'
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    classNames={{
                        inputWrapper: [
                            "block w-full rounded-md border-0 !bg-white/5 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 transition data-[hover=true]:bg-white/10"
                        ],
                        input: ["!text-white"]
                    }}
                />
            )} />

            <Controller name='email' control={form.control} render={({ field, fieldState }) => (
                <Input
                    type="email"
                    placeholder='Email'
                    autoComplete="email"
                    required
                    radius='sm'
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    classNames={{
                        inputWrapper: [
                            "block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 transition data-[hover=true]:bg-white/10"
                        ],
                        input: ["!text-white"]
                    }}
                />
            )} />

            <Controller name='password' control={form.control} render={({ field, fieldState }) => (
                <Input
                    type="password"
                    placeholder='Password'
                    required
                    radius='sm'
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    classNames={{
                        inputWrapper: [
                            "block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 transition data-[hover=true]:bg-white/10"
                        ],
                        input: ["!text-white"]
                    }}
                />
            )} />
            <Controller name='confirmPassword' control={form.control} render={({ field, fieldState }) => (
                <Input
                    type="password"
                    placeholder='Konfirmasi Password'
                    required
                    radius='sm'
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    classNames={{
                        inputWrapper: [
                            "block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 transition data-[hover=true]:bg-white/10"
                        ],
                        input: ["!text-white"]
                    }}
                />
            )} />

            {/* Tombol Submit */}
            <div className="pt-2" >
                <Button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-[#5AE3A8] px-3 py-2.5 text-sm font-semibold leading-6 text-zinc-800 shadow-sm hover:bg-[#5AE3A8]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5AE3A8] transition"
                >
                    Buat Akun
                </Button>
            </div>
        </form >
    )
}

export default RegisterForm