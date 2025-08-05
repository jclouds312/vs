import { Header } from '@/components/header';
import { ComparisonView } from '@/components/comparison-view';
import { phones } from '@/lib/phones';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function ComparePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const phone1Id = searchParams?.phone1 as string;
  const phone2Id = searchParams?.phone2 as string;

  const phone1 = phones.find((p) => p.id === phone1Id);
  const phone2 = phones.find((p) => p.id === phone2Id);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="mb-6">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Phone List
            </Link>
          </Button>
        </div>

        {phone1 && phone2 ? (
          <ComparisonView phone1={phone1} phone2={phone2} />
        ) : (
          <Card className="text-center py-20 px-6 border-destructive">
            <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
            <CardHeader>
              <CardTitle className="text-2xl font-bold font-headline text-destructive">
                Comparison Error
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                We couldn't load the phones for comparison. Please go back and select two phones.
              </p>
              <Button asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Return to Selection
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
