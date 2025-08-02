import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { FaArrowLeft } from 'react-icons/fa';
import PageContainer from '~/components/layouts/PageContainer';

const NotFoundPage = () => {
    return (
        <PageContainer className="flex h-screen items-center justify-center text-center bg-[#1A1AF]">
            <div>
                <h1 className="text-6xl font-bold text-[#5AE3A8]">404</h1>
                <p className="mt-4 text-2xl font-semibold text-white">
                    Halaman Tidak Ditemukan
                </p>
                <p className="mt-2 text-zinc-400">
                    Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
                </p>
                <Button
                    as={Link}
                    href="/"
                    className="mt-8 bg-[#5AE3A8] text-zinc-900 font-bold"
                >
                    <FaArrowLeft className="mr-2" />
                    Kembali ke Home
                </Button>
            </div>
        </PageContainer>
    );
};

export default NotFoundPage;