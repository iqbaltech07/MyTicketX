import React from 'react'

const HistoryItem = ({ event, purchaseDate, totalAmount, status }: { event: any, purchaseDate: string, totalAmount: number, status: string }) => {
    const formattedDate = new Date(purchaseDate).toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric"
    });
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
                <p className={`text-sm text-right font-bold ${status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {status}
                </p>
            </div>
        </div>
    )
}

export default HistoryItem