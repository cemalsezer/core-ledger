import React, { useState } from 'react';
import api from '../api';

const TransferForm = ({ senderId, onTransferSuccess }) => {
    const [localSenderId, setLocalSenderId] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Sync local state when prop changes (e.g. wrapper component updates it)
    React.useEffect(() => {
        if (senderId) {
            setLocalSenderId(senderId);
        }
    }, [senderId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        if (!localSenderId) {
            setErrorMessage('Gönderen cüzdan seçili değil.');
            setLoading(false);
            return;
        }

        const payload = {
            senderWalletId: parseInt(localSenderId),
            receiverWalletId: parseInt(receiverId),
            amount: parseFloat(amount),
            description: description
        };

        try {
            await api.post('/Wallets/transfer', payload);
            alert('Transfer başarılı!');
            setAmount('');
            setDescription('');
            if (onTransferSuccess) onTransferSuccess();
        } catch (error) {
            console.error(error);
            if (error.response && (error.response.status === 400 || error.response.status === 404)) {
                setErrorMessage(error.response.data); // "Cüzdan ID: X için bakiye yetersizdir." veya "Bulunamadı"
            } else {
                setErrorMessage('Transfer sırasında bir hata oluştu.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 ring-1 ring-slate-100">
            <h2 className="text-lg font-bold mb-4 text-slate-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v3.25a1 1 0 11-2 0V13.003a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Para Transferi
            </h2>
            {errorMessage && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-slate-600 text-sm font-medium mb-1">Gönderen Cüzdan ID</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={localSenderId}
                            onChange={(e) => setLocalSenderId(e.target.value)}
                            className="w-full border border-slate-300 p-2.5 pl-10 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-mono"
                            placeholder="Otomatik veya manuel girin"
                            required
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            #
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-slate-600 text-sm font-medium mb-1">Alıcı Cüzdan ID</label>
                        <div className="relative">
                            <input
                                type="number"
                                className="w-full border border-slate-300 p-2.5 pl-10 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-mono"
                                value={receiverId}
                                onChange={(e) => setReceiverId(e.target.value)}
                                required
                                placeholder="ID girin"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                #
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-slate-600 text-sm font-medium mb-1">Miktar</label>
                        <input
                            type="number"
                            className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-bold text-slate-800"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            min="0.01"
                            step="0.01"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-slate-600 text-sm font-medium mb-1">Açıklama</label>
                    <input
                        type="text"
                        className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Örn: Kira ödemesi"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all font-semibold shadow-md hover:shadow-lg transform active:scale-95 flex justify-center items-center gap-2"
                    disabled={loading || !localSenderId}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            İşleniyor...
                        </span>
                    ) : (
                        <>
                            Transfer Yap
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default TransferForm;
