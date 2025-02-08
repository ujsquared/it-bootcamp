import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import BatchYearButton from '@/app/components/ShiftButton';

const ValidYears = ["2022", "2023", "2024"];

export default async function ProfilePage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-12 vhs-title">
        {"SELECT YEAR".split('').map((char, i) => (
          <span key={i} className="char" style={{ '--char-index': i } as React.CSSProperties}>
            {char}
          </span>
        ))}
      </h1>
      <div className="flex flex-row gap-8">
        {ValidYears.map((year) => (
          <BatchYearButton key={year} year={year} />
        ))}
      </div>
    </div>
  );
}
