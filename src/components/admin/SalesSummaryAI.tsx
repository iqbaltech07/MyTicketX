"use client";

import { useEffect, useState } from "react";
import axiosInstance from "~/libs/axiosInstance";

type SalesSummaryAIProps = {
    summaryData: {
        totalSales: number;
        transactionCount: number;
        ticketsSold: number;
        topEvent: string;
        averagePerTransaction: number;
    };
    monthName: string;
    year: number;
};

const SalesSummaryAI = ({ summaryData, monthName, year }: SalesSummaryAIProps) => {
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const generateSummary = async () => {
            setLoading(true);
            try {
                const prompt = `
          Berikan ringkasan analisis penjualan untuk bulan ${monthName} ${year} berdasarkan data berikut:
          - Total Penjualan: ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(summaryData.totalSales)}
          - Jumlah Transaksi: ${summaryData.transactionCount}
          - Tiket Terjual: ${summaryData.ticketsSold}
          - Event Terlaris: "${summaryData.topEvent}"
          - Rata-rata per Transaksi: ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(summaryData.averagePerTransaction)}

          Berikan ringkasan dalam format paragraf yang mudah dibaca, informatif, dan profesional dalam bahasa Indonesia. 
          Fokus pada insight utama dari data yang ada. Jangan ulangi data mentah, tapi berikan analisisnya.

          note : 
            - Jangan ada kalimat pembuka (Tentu, berikut, dll). Langsung saja berikan ringkasan nya.
            - Jangan gunakan format tabel atau poin-poin.
            - Gunakan bahasa yang formal dan profesional.
            - Jangan gunakan emoji atau simbol yang tidak perlu.
            - Jangan gunakan kata "berdasarkan data di atas" atau "berdasarkan data berikut".
            - Jangan gunakan kata "berikut adalah" atau "berikut ini adalah".
            - Jangan gunakan kata yang terlalu teknis atau sulit dipahami.
        `;

                const response = await axiosInstance.post("/generate-summary", {
                    geminiModel: "gemini-2.5-pro",
                    content: prompt,
                });

                setSummary(response.data.body.choices[0].message.content);
            } catch (error) {
                console.error("Failed to generate AI summary:", error);
                setSummary("Gagal memuat ringkasan AI. Silakan coba lagi nanti.");
            } finally {
                setLoading(false);
            }
        };

        generateSummary();
    }, [summaryData, monthName, year]);

    return (
        <div className="mt-10 p-6 bg-[#202027] border border-zinc-800 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Ringkasan AI</h3>
            <div className="text-zinc-400 space-y-2 leading-relaxed">
                {loading ? (
                    <p>🧠 Menganalisis data dan membuat ringkasan...</p>
                ) : (
                    <p dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br />') }} />
                )}
            </div>
        </div>
    );
};

export default SalesSummaryAI;