'use client';
import Link from 'next/link';

interface BatchYearButtonProps {
  year: string;
}

type CSSPropertiesWithVars = React.CSSProperties & {
  '--char-index': number;
};

export default function BatchYearButton({ year }: BatchYearButtonProps) {
  return (
    <Link href={`/profile/${year}`}>
      <div className="vhs-button">
        {year.split('').map((char, i) => (
          <span key={i} className="char" style={{ '--char-index': i } as CSSPropertiesWithVars}>
            {char}
          </span>
        ))}
      </div>
    </Link>
  );
}