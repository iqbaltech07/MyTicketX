"use client"

import { Button, Form } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '~/schemas/formSchemas';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Icons } from '../icons/Icons';
import InputField from '../common/InputField';

type LoginInput = z.infer<typeof LoginSchema>;

const LoginForm = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);

    const form = useForm<LoginInput>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: zodResolver(LoginSchema),
        mode: 'onChange'
    });

    const onSubmit = async (data: LoginInput) => {
        setServerError(null);

        const result = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
        });

        if (result?.error) {
            setServerError(result.error);
        } else if (result?.ok) {
            router.push("/login");
            router.refresh();
        }
    };

    const handleGoogleSignIn = () => {
        signIn('google', { callbackUrl: "/", redirect: true });
    }

    const { formState, handleSubmit } = form;

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {serverError && (
                <div className="p-3 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                    {serverError}
                </div>
            )}

            <InputField control={form.control} name='email' type='email' placeholder='Email'
                autoComplete="email"
                required
                radius='sm' />

            <div className='w-full'>
                <div className='mb-2 w-full'>
                    <InputField
                        control={form.control}
                        type={isVisible ? 'text' : 'password'}
                        name='password'
                        placeholder='Password'
                        autoComplete="current-password"
                        required
                        radius='sm'
                        endContent={
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
                        }
                    />
                </div>
                <div className="flex items-center justify-end">
                    <a href="#" className="font-semibold text-blue-500 hover:text-blue-400 transition text-sm">
                        Lupa password?
                    </a>
                </div>
            </div>

            <div className='w-full'>
                <Button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className="flex w-full justify-center rounded-md bg-[#5AE3A8] px-3 py-2.5 text-sm font-semibold leading-6 text-zinc-800 shadow-sm hover:bg-[#5AE3A8]/95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition disabled:opacity-50"
                >
                    {formState.isSubmitting ? 'Logging in...' : 'Log in'}
                </Button>
            </div>
            <div className="relative my-6 w-full">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-zinc-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-zinc-900 px-2 text-zinc-400">
                        atau
                    </span>
                </div>
            </div>

            <div className='w-full'>
                <Button
                    type="button"
                    onClick={handleGoogleSignIn}
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
        </Form>
    );
};

export default LoginForm;