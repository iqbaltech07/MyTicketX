import React from 'react'

type HistoryItemProps = {
    event: { name: string };
    purchaseDate: string;
    totalAmount: number;
    status: string; 
}

const HistoryItem = ({ event, purchaseDate, totalAmount, status }: HistoryItemProps) => {
    const formattedDate = new Date(purchaseDate).toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric"
    });

    const getStatusStyle = () => {
        switch (status.toLowerCase()) {
            case 'completed': return 'text-green-400';
            case 'pending': return 'text-yellow-400';
            case 'failed': return 'text-red-400';
            case 'cancelled': return 'text-zinc-500';
            default: return 'text-zinc-400';
        }
    };

    return (
        <div className="bg-[#202027] border border-zinc-800 rounded-lg p-4 flex justify-between items-center">
            <div>
                <p className="font-bold text-white">{event.name}</p>
                <p className="text-sm text-zinc-400">Dibeli pada {formattedDate}</p>
            </div>
            <div>
                <p className="text-lg font-semibold text-white">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalAmount)}
                </p>
                <p className={`text-sm text-right font-bold ${getStatusStyle()}`}>
                    {status}
                </p>
            </div>
        </div>
    )
}

export default HistoryItem;