import Link from 'next/link';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import { verifyTransactionStatus } from '~/actions/transaction.actions';
import PageContainer from '~/components/layouts/PageContainer';

export const dynamic = 'force-dynamic';

const StatusIcon = ({ status }: { status: string }) => {
    if (status === 'success') {
        return <FaCheckCircle className="w-16 h-16 text-green-400" />;
    }
    if (status === 'pending') {
        return <FaClock className="w-16 h-16 text-yellow-400" />;
    }
    return <FaTimesCircle className="w-16 h-16 text-red-400" />;
};

const StatusMessage = ({ status, message }: { status: string, message: string }) => {
    const titleClasses = {
        success: 'text-green-400',
        pending: 'text-yellow-400',
        failed: 'text-red-400',
        error: 'text-red-400',
    };

    return (
        <>
            <h1 className={`text-3xl font-bold ${titleClasses[status as keyof typeof titleClasses]}`}>
                {status === 'success' && 'Pembayaran Berhasil'}
                {status === 'pending' && 'Pembayaran Tertunda'}
                {(status === 'failed' || status === 'error') && 'Pembayaran Gagal'}
            </h1>
            <p className="mt-2 text-zinc-400">{message}</p>
        </>
    );
};


const PaymentFinishPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ order_id?: string }>;
}) => {
    const { order_id: orderId } = await searchParams;

    if (!orderId) {
        return (
            <PageContainer className='h-screen'>
                <div className="flex flex-col items-center justify-center text-center h-[60vh]">
                    <StatusIcon status="failed" />
                    <StatusMessage status="failed" message="ID Pesanan tidak valid atau tidak ditemukan." />
                    <Link href="/" className="mt-6 bg-[#5AE3A8] text-zinc-900 font-bold py-2 px-4 rounded">
                        Kembali ke Home
                    </Link>
                </div>
            </PageContainer>
        );
    }

    const { status, message } = await verifyTransactionStatus(orderId);

    return (
        <PageContainer>
            <div className="flex flex-col items-center justify-center text-center h-[60vh]">
                <StatusIcon status={status} />
                <div className="mt-4">
                    <StatusMessage status={status} message={message} />
                </div>

                <div className="mt-8 flex gap-4">
                    <Link href="/" className="bg-zinc-700 text-white font-bold py-2 px-4 rounded">
                        Kembali ke Home
                    </Link>
                    {status === 'success' && (
                        <Link href="/profile" className="bg-[#5AE3A8] text-zinc-900 font-bold py-2 px-4 rounded">
                            Lihat Tiket Saya
                        </Link>
                    )}
                </div>
            </div>
        </PageContainer>
    );
};

export default PaymentFinishPage;