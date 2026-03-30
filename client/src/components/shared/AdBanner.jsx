import React from 'react';

const AdBanner = ({ className = '', id = '' }) => {
    return (
        <div 
            id={id}
            className={`w-full bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 overflow-hidden relative transition-colors ${className}`}
            style={{ minHeight: '120px' }}
        >
            <div className="absolute top-2 right-3 text-[10px] uppercase tracking-widest font-bold opacity-60">
                Advertisement
            </div>
            
            <div className="flex flex-col items-center gap-1.5 px-4 text-center">
                <span className="text-sm font-medium">Ad Placeholder</span>
                <span className="text-xs opacity-70">Insert your ad network snippet here after launch.</span>
            </div>
        </div>
    );
};

export default AdBanner;
