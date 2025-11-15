export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <input
      {...props}
      className={`
        w-full px-3 py-2 mt-1 rounded-md
        bg-surface-light dark:bg-surface-dark
        border border-border-light dark:border-border-dark
        text-text-light dark:text-text-dark
        focus:ring-2 focus:ring-brand-light dark:focus:ring-brand-dark
        outline-none transition-colors
      `}
    />
  );
}
