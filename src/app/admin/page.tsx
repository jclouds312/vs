import { Header } from '@/components/header';
import { AdminView } from '@/components/admin-view';

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <AdminView />
      </main>
      <footer className="py-4 text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} SmartCompare. Panel de Administración.
      </footer>
    </div>
  );
}
