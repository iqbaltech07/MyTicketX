import { Button, Input } from '@heroui/react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

const LoginForm = () => {
    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange',
        reValidateMode: 'onChange'
    })
    return (
        <form className="space-y-6">
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
                        inputWrapper: ["block w-full rounded-md border-0 !bg-white/5 py-2 px-3 shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-zinc-100 focus:ring-2 focus:ring-inset focus:ring-[#5AE3A8] sm:text-sm sm:leading-6 transition !data-[hover=true]:bg-white/10"],
                        input: ["!text-white"],
                    }}
                />
            )} />

            <div>
                <div className="flex items-center justify-end">
                    <div className="text-sm">
                        <a href="#" className="font-semibold text-blue-500 hover:text-blue-400 transition">
                            Lupa password?
                        </a>
                    </div>
                </div>
                <div className='mt-2'>
                    <Controller name='password' control={form.control} render={({ field, fieldState }) => (
                        <Input
                            type="password"
                            placeholder='Password'
                            autoComplete="current-password"
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
                </div>

            </div>

            <div>
                <Button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-[#5AE3A8] px-3 py-2.5 text-sm font-semibold leading-6 text-zinc-800 shadow-sm hover:bg-[#5AE3A8]/95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition"
                >
                    Log in
                </Button>
            </div>
        </form>
    )
}

export default LoginForm