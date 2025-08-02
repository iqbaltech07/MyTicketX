"use client"

import { Button, Form } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterSchema } from '~/schemas/formSchemas';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Icons } from '../icons/Icons';
import InputField from '../common/InputField';
import axiosInstance from '~/libs/axiosInstance';

type RegisterInput = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);

    const form = useForm<RegisterInput>({
        defaultValues: {
            fullname: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        resolver: zodResolver(RegisterSchema),
        mode: 'onChange'
    });

    const onSubmit = async (data: RegisterInput) => {
        setServerError(null);
        try {
            await axiosInstance.post('/register', {
                fullname: data.fullname,
                email: data.email,
                password: data.password,
            });

            localStorage.setItem('emailForVerification', data.email);
            router.push('/verify');

        } catch (error: any) {
            setServerError(error.response?.data?.message || 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
        }
    };

    const { formState, handleSubmit } = form;

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {serverError && (
                <div className="p-3 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                    {serverError}
                </div>
            )}

            <InputField control={form.control} type='text' name='fullname' placeholder='Nama Lengkap'
                autoComplete="name"
                radius='sm' required />

            <InputField control={form.control} type='email' name='email' placeholder='Email'
                autoComplete="email"
                radius='sm' required />

            <InputField control={form.control} type={isVisible ? 'text' : 'password'} name='password' placeholder='Password' required
                radius='sm' endContent={
                    <button
                        aria-label="toggle password visibility"
                        className="focus:outline-none cursor-pointer"
                        type="button"
                        onClick={toggleVisibility}
                    >
                        {isVisible ? (
                            <Icons.EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <Icons.EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                } />

            <InputField control={form.control} type='password' name='confirmPassword' required placeholder='Konfirmasi Password' radius='sm' />

            <div className="pt-2 w-full" >
                <Button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className="flex w-full justify-center rounded-md bg-[#5AE3A8] px-3 py-2.5 text-sm font-semibold leading-6 text-zinc-800 shadow-sm hover:bg-[#5AE3A8]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5AE3A8] transition disabled:opacity-50"
                >
                    {formState.isSubmitting ? 'Mendaftarkan...' : 'Buat Akun'}
                </Button>
            </div>
        </Form >
    );
};

export default RegisterForm;