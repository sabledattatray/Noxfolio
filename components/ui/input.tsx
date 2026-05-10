import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground flex h-12 w-full min-w-0 rounded-2xl border-2 border-[var(--border-color)] bg-[var(--bg-color)] px-4 py-2 text-base transition-all duration-300 outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus:border-primary focus:ring-primary/10 focus:ring-4',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
