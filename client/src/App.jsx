// client/src/App.jsx
import React, { useState } from 'react';
import WalletCreator from './components/WalletCreator';
import WalletLookup from './components/WalletLookup';
import WalletViewer from './components/WalletViewer';
import TransferForm from './components/TransferForm';
import Header from './components/Header'; // Header bileşenini birazdan oluşturacağız

function App() {
  // Tüm uygulama state'ini yönetecek merkezi ID
  const [selectedWalletId, setSelectedWalletId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Bakiye güncellemek için

  // Cüzdan oluşturulunca veya sorgulanınca ID'yi günceller
  const handleWalletSelect = (id) => {
    // ID'nin integer olduğundan emin ol
    setSelectedWalletId(parseInt(id));
    setRefreshTrigger(prev => prev + 1); // Görünümü tetikle
  };

  // Transfer başarılı olunca Viewer bileşenini otomatik günceller
  const handleTransferSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto p-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* SOL SÜTUN - Cüzdan Yönetimi */}
          <div className="lg:col-span-1 space-y-8">
            <WalletCreator
              onWalletCreated={(wallet) => handleWalletSelect(wallet.id)}
            />
            <WalletLookup
              onWalletSelect={handleWalletSelect}
            />
          </div>

          {/* SAĞ SÜTUN - Bakiye Görüntüleme ve Transfer Formu */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bakiye Görüntüleyici Kartı */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-500/20">
              <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
                Finansal Hesap Özeti
              </h2>
              <WalletViewer
                walletId={selectedWalletId}
                refreshTrigger={refreshTrigger}
              />
            </div>

            {/* Transfer Formu Kartı - Cüzdan seçildiyse göster */}
            {selectedWalletId && (
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-500/20">
                <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path d="M8 4a1 1 0 00-1 1v3H4a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V5a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  Para Transferi ({selectedWalletId})
                </h2>
                <TransferForm
                  senderId={selectedWalletId}
                  onTransferSuccess={handleTransferSuccess}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;