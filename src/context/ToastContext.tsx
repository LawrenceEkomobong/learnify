import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'success', duration = 3500) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Toast Render Portal */}
      <div 
        id="toast-container"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((toast) => {
          const icons = {
            success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
            error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
            info: <Info className="w-5 h-5 text-indigo-500 shrink-0" />,
            warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
          };

          const borderColors = {
            success: 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/95 dark:bg-emerald-950/90 text-emerald-900 dark:text-emerald-100',
            error: 'border-rose-200 dark:border-rose-900/60 bg-rose-50/95 dark:bg-rose-950/90 text-rose-900 dark:text-rose-100',
            info: 'border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/95 dark:bg-indigo-950/90 text-indigo-900 dark:text-indigo-100',
            warning: 'border-amber-200 dark:border-amber-900/60 bg-amber-50/95 dark:bg-amber-950/90 text-amber-900 dark:text-amber-100'
          };

          return (
            <div
              key={toast.id}
              id={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300 transform translate-y-0 ${borderColors[toast.type]}`}
            >
              {icons[toast.type]}
              <div className="flex-1 text-sm font-medium leading-snug">
                {toast.message}
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="p-1 -mr-1 -mt-1 rounded-md opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
