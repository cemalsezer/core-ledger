import React from 'react';

const Header = () => {
    return (
        <header className="bg-white border-b border-slate-200 shadow-md">
            <div className="container mx-auto py-5 px-8 flex justify-between items-center">
                <div className="text-2xl font-black text-slate-900 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4.003a2 2 0 01-2-2V5zm15 0H4.003V15h11.995V5z" clipRule="evenodd" />
                        <path d="M10 7a1 1 0 00-1 1v3a1 1 0 102 0V8a1 1 0 00-1-1z" />
                    </svg>
                    CoreLedger Demo
                </div>
                <div className="text-sm text-slate-600 font-medium">
                    Clean Architecture & FinTech
                </div>
            </div>
        </header>
    );
};

export default Header;