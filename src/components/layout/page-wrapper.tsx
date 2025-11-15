export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark transition-colors px-6 py-6">
      {children}
    </div>
  );
}
