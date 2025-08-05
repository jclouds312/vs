import { Header } from '@/components/header';
import { PhoneList } from '@/components/phone-list';
import { phones } from '@/lib/phones';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
              Encuentra tu próximo Smartphone
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Compara los últimos modelos lado a lado y obtén un resumen con IA para tomar la decisión correcta.
            </p>
          </div>
          <PhoneList phones={phones} />
        </div>
      </main>
      <footer className="py-4 text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} SmartCompare. Todos los derechos reservados.
      </footer>
    </div>
  );
}
