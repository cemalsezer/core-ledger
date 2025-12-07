import React, { useState } from 'react';
import api from '../api';

const WalletViewer = ({ walletId }) => {
    const [wallet, setWallet] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchWallet = async () => {
        if (!walletId) return;
        setLoading(true);
        setError('');
        try {
            const response = await api.get(`/Wallets/${walletId}`);
            setWallet(response.data);
        } catch (err) {
            console.error(err);
            setError('Cüzdan bulunamadı.');
            setWallet(null);
        } finally {
            setLoading(false);
        }
    };

    // Trigger fetch when walletId changes or manually via a button if needed.
    // For this demo, let's provide a refresh button or fetch on mount if passed.
    React.useEffect(() => {
        if (walletId) fetchWallet();
    }, [walletId]);

    if (!walletId) return <div className="text-gray-500">Lütfen görüntülemek için bir cüzdan seçin veya oluşturun.</div>;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative mb-6">
            <button
                onClick={fetchWallet}
                className="absolute top-6 right-6 text-sm text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1 group"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Yenile
            </button>
            <h2 className="text-lg font-bold mb-4 text-slate-800">Cüzdan Detayları</h2>

            {loading && <p className="text-slate-500 text-sm">Yükleniyor...</p>}
            {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

            {wallet && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="space-y-1">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Cüzdan Sahibi</span>
                        <p className="font-medium text-slate-900 text-lg">{wallet.name}</p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">ID</span>
                        <p className="font-medium text-slate-700 font-mono">#{wallet.id}</p>
                    </div>

                    <div className="md:col-span-2 mt-2 pt-4 border-t border-slate-100">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Bakiye</span>
                        <div className="text-3xl font-bold text-slate-900 mt-1 flex items-baseline gap-1">
                            {wallet.balance.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            <span className="text-base font-normal text-slate-500">{wallet.currency}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WalletViewer;
