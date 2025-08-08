import { Smartphone } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-center h-10">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold font-headline text-primary">
            <Smartphone className="w-6 h-6" />
            <span>SmartCompare</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
