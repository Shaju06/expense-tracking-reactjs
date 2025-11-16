import React from 'react';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className = '', ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      {...props}
      className={`
        w-full px-3 py-2 mt-1 rounded-md
        bg-surface-dark border border-border-dark
        text-text-dark
        focus:ring-2 focus:ring-brand-light outline-none
        ${className}
      `}
    />
  );
});

export default Textarea;
