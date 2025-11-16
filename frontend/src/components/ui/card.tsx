export default function Card({
  children,
  className = '',
}: any) {
  return (
    <div
      className={`
        bg-card-light dark:bg-card-dark 
        rounded-xl shadow 
        border border-border-light dark:border-border-dark
        p-6 transition-colors
        ${className}
      `}
    >
      {children}
    </div>
  );
}
