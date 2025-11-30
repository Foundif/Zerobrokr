import { Home } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 text-2xl font-bold font-headline text-primary transition-colors hover:text-primary/80',
        className
      )}
    >
      <Home className="h-7 w-7" />
      <span>EstateOpus</span>
    </Link>
  );
}
