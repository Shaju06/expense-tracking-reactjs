export default function Button({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`
        px-4 py-2 rounded-md font-medium
        bg-brand-light dark:bg-brand-dark
        text-white
        hover:bg-indigo-600 dark:hover:bg-indigo-500
        transition-colors
        ${className}
      `}
    >
      {children}
    </button>
  );
}
