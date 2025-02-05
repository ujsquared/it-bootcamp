export default function VHSLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="vhs-loading">
        {"LOADING...".split('').map((char, i) => (
          <span key={i} className="char" style={{ '--char-index': i } as any}>
            {char}
          </span>
        ))}
      </div>
      <div className="tracking-dots mt-4">
        {"....".split('').map((dot, i) => (
          <span key={i} className="dot" style={{ '--dot-index': i } as any}>
            {dot}
          </span>
        ))}
      </div>
    </div>
  );
} 