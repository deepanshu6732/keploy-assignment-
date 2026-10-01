import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { ReactNode } from 'react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'error';
  title?: string;
  children: ReactNode;
}

const styles = {
  info: 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900',
  warning: 'bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-900',
  success: 'bg-green-50 text-green-900 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-900',
  error: 'bg-red-50 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-900',
};

const icons = {
  info: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
  success: <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />,
  error: <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />,
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  return (
    <div className={`my-6 flex gap-3 rounded-lg border p-4 ${styles[type]}`}>
      <div className="mt-1">{icons[type]}</div>
      <div className="w-full">
        {title && <h5 className="mb-1 font-semibold tracking-tight text-inherit">{title}</h5>}
        <div className="text-sm prose-p:my-1 text-inherit">{children}</div>
      </div>
    </div>
  );
}
