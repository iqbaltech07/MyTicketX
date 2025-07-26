// src/app/(auth)/verify/page.tsx
// File Baru

"use client";

import { Button, Form, InputOtp } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axiosInstance from '~/libs/axiosInstance';

const VerifyPage = () => {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(';').shift();
        };

        const storedEmail = getCookie('emailForVerification');
        if (storedEmail) {
            setEmail(decodeURIComponent(storedEmail));
        }
    }, []);

    const handleSubmit = async (otpValue: string) => {
        if (otpValue.length !== 6) {
            setError("OTP harus terdiri dari 6 digit.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await axiosInstance.post('/auth/verify-otp', {
                email,
                otp: otpValue,
            });

            setSuccess('Verifikasi berhasil! Anda akan diarahkan ke halaman login.');
            setTimeout(() => router.push('/login'), 2000);
        } catch (err: any) {
            const message = err?.response?.data?.message || err.message || 'Verifikasi gagal';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-dvh items-center justify-center bg-[#1A1A1F] p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Verifikasi Akun Anda
                    </h1>
                    {email && (
                        <p className="mt-2 text-base text-zinc-400">
                            Kami telah mengirimkan kode OTP ke email <span className="font-bold text-white">{email}</span>.
                        </p>
                    )}
                </div>

                <div className="bg-[#202027] p-8 rounded-xl border border-zinc-800 ">
                    <Form
                        className="flex w-full flex-col gap-4 items-center justify-center"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(otp);
                        }}
                    >
                        <InputOtp
                            isRequired
                            aria-label="OTP input field"
                            length={6}
                            name="otp"
                            value={otp}
                            onValueChange={(val: string) => setOtp(val)}
                            className='text-black'
                            classNames={{ caret: 'bg-black' }}
                            placeholder="-"
                        />
                        <Button size="md" type="submit" variant="bordered" disabled={isLoading || otp.length < 6}>
                            {isLoading ? 'Memverifikasi...' : 'Submit'}
                        </Button>
                        {error && <div className="mt-2 text-sm text-red-400">{error}</div>}
                        {success && <div className="mt-2 text-sm text-green-400">{success}</div>}
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default VerifyPage;