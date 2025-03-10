import { cn } from '@/lib/utils';

type CalloutProps = {
  icon?: string;
  children?: React.ReactNode;
  type?: 'default' | 'warning' | 'danger';
};

export function Callout({ children, icon, type = 'default', ...props }: Readonly<CalloutProps>) {
  return (
    <div
      className={cn('my-6 flex items-start rounded-md border border-l-4 p-4', {
        'border-red-9 bg-red-50': type === 'danger',
        'border-yellow-9 bg-yellow-50': type === 'warning'
      })}
      {...props}
    >
      {Boolean(icon) && <span className="mr-4 text-2xl">{icon}</span>}
      <div>{children}</div>
    </div>
  );
}
