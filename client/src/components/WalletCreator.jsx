import React, { useState } from 'react';
import api from '../api';

const WalletCreator = ({ onWalletCreated }) => {
    const [userId, setUserId] = useState('');
    const [initialBalance, setInitialBalance] = useState('1000');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (userId === '') {
            setError('Kullanıcı ID boş olamaz.');
            setLoading(false);
            return;
        }

        try {
            const response = await api.post(`/Wallets/initialize?userId=${userId}&initialBalance=${initialBalance}`);
            if (onWalletCreated) {
                onWalletCreated(response.data);
            }
            setUserId('');
            setInitialBalance('1000');
            alert(`Cüzdan başarıyla oluşturuldu! ID: ${response.data.id}`);
        } catch (error) {
            console.error('Error creating wallet:', error);
            setError('Cüzdan oluşturulurken bir hata oluştu. (CORS veya Backend kontrol edilmeli.)');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
            <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                Yeni Cüzdan Oluştur
            </h2>

            {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-slate-600 text-sm font-medium mb-1">Kullanıcı ID (Benzersiz)</label>
                    <input
                        type="text"
                        className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Örn: cemal.user"
                        required
                    />
                </div>
                <div>
                    <label className="block text-slate-600 text-sm font-medium mb-1">Başlangıç Bakiyesi</label>
                    <input
                        type="number"
                        className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={initialBalance}
                        onChange={(e) => setInitialBalance(e.target.value)}
                        required
                        min="0"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors font-semibold shadow-md hover:shadow-lg transform active:scale-95 flex justify-center items-center gap-2"
                    disabled={loading}
                >
                    {loading ? 'Oluşturuluyor...' : 'Cüzdanı Başlat'}
                </button>
            </form>
        </div>
    );
};

export default WalletCreator;