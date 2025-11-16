import { CalendarDays } from 'lucide-react';
import { useState } from 'react';

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
}

export default function DatePicker({
  value,
  onChange,
  name,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (date: Date) => {
    const formatted = date.toISOString().split('T')[0];
    onChange?.(formatted);
    setOpen(false);
  };

  const generateCalendar = () => {
    const today = value ? new Date(value) : new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();

    const calendar = [];

    for (let i = 0; i < firstDay; i++) calendar.push(null);

    for (let d = 1; d <= days; d++) {
      calendar.push(new Date(year, month, d));
    }

    return calendar;
  };

  return (
    <div className="relative w-full">
      <div
        className="flex items-center justify-between px-3 py-2 mt-1 rounded-md cursor-pointer
          bg-surface-dark border border-border-dark 
          text-text-dark hover:border-brand-dark transition"
        onClick={() => setOpen(!open)}
      >
        <span>{value || 'Select date'}</span>
        <CalendarDays className="w-5 h-5 text-gray-400" />
      </div>

      {open && (
        <div
          className="absolute z-20 mt-2 w-64 bg-card-dark border border-border-dark 
          rounded-xl p-4 shadow-lg animate-fadeIn"
        >
          <div className="text-center font-semibold text-gray-200 mb-3">
            {value
              ? new Date(value).toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })
              : new Date().toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}
          </div>

          <div className="grid grid-cols-7 text-center text-gray-400 text-xs mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(
              (d) => (
                <div key={d}>{d}</div>
              ),
            )}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {generateCalendar().map((d, i) =>
              d === null ? (
                <div key={i} />
              ) : (
                <button
                  key={i}
                  className={`px-2 py-1 rounded-md text-sm ${
                    value === d.toISOString().split('T')[0]
                      ? 'bg-brand-dark text-white'
                      : 'text-gray-200 hover:bg-gray-700'
                  }`}
                  onClick={() => handleSelect(d)}
                >
                  {d.getDate()}
                </button>
              ),
            )}
          </div>
        </div>
      )}

      {name && (
        <input
          type="hidden"
          name={name}
          value={value}
          readOnly
        />
      )}
    </div>
  );
}
