// client/src/components/WalletLookup.jsx (YENİ KOD)
import React, { useState } from 'react';

const WalletLookup = ({ onWalletSelect }) => {
    const [lookupId, setLookupId] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (lookupId) {
            onWalletSelect(lookupId);
            setLookupId(''); // Sorgulandıktan sonra temizle
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
            <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                Cüzdan ID ile Sorgula
            </h2>
            <form onSubmit={handleSearch} className="flex gap-4">
                <input
                    type="number"
                    value={lookupId}
                    onChange={(e) => setLookupId(e.target.value)}
                    className="flex-1 border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="Cüzdan ID girin (Örn: 1, 2)"
                    required
                    min="1"
                />
                <button
                    type="submit"
                    className="bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors font-semibold shadow-md hover:shadow-lg transform active:scale-95"
                >
                    Sorgula
                </button>
            </form>
        </div>
    );
};

export default WalletLookup;