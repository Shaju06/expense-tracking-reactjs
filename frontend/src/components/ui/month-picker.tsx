import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface MonthPickerProps {
  value: string; // format: YYYY-MM
  onChange: (v: string) => void;
}

export default function MonthPicker({
  value,
  onChange,
}: MonthPickerProps) {
  const [open, setOpen] = useState(false);

  const current = new Date(value + '-01');
  const selectedYear = current.getFullYear();
  const selectedMonth = current.getMonth();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const years = Array.from(
    { length: 6 },
    (_, i) => new Date().getFullYear() - i,
  );

  const handleSelect = (
    year: number,
    monthIndex: number,
  ) => {
    const newValue = `${year}-${String(
      monthIndex + 1,
    ).padStart(2, '0')}`;
    onChange(newValue);
    setOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center justify-between px-3 py-2 rounded-md 
        bg-surface-dark border border-border-dark cursor-pointer 
        hover:border-brand-dark transition"
        onClick={() => setOpen(!open)}
      >
        <span>
          {months[selectedMonth]} {selectedYear}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>

      {open && (
        <div
          className="absolute mt-2 w-full bg-card-dark border border-border-dark 
        rounded-xl shadow-lg z-20 animate-fadeIn p-3"
        >
          <div className="mb-3">
            <label className="text-xs text-gray-400">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) =>
                handleSelect(
                  Number(e.target.value),
                  selectedMonth,
                )
              }
              className="w-full bg-surface-dark border border-border-dark 
              rounded-md px-2 py-1 mt-1"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {months.map((m, idx) => (
              <button
                key={m}
                className={`
                  px-2 py-1 rounded-md text-sm
                  ${
                    idx === selectedMonth
                      ? 'bg-brand-dark text-white'
                      : 'hover:bg-gray-800 text-gray-300'
                  }
                `}
                onClick={() =>
                  handleSelect(selectedYear, idx)
                }
              >
                {m.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
