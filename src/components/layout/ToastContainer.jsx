import React from 'react';
import { useToast } from '../../context/ToastContext.jsx';
import { Check, Info, AlertCircle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        let icon = <Check className="w-4 h-4 text-[#191919]" />;
        let borderColor = 'border-[#191919]';

        if (toast.type === 'error') {
          icon = <AlertCircle className="w-4 h-4 text-[#991B1B]" />;
          borderColor = 'border-[#991B1B]';
        } else if (toast.type === 'info') {
          icon = <Info className="w-4 h-4 text-[#504D47]" />;
          borderColor = 'border-[#8C857B]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto bg-[#FAF9F5] text-[#191919] border-l-3 ${borderColor} shadow-xl p-3.5 flex items-center justify-between gap-3 text-xs tracking-wide transition-all duration-300 animate-slide-up border border-[#E8E4DC]`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="shrink-0">{icon}</span>
              <span className="truncate font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-[#8C857B] hover:text-[#191919] shrink-0"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
