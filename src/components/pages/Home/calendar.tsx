import React, { useState } from "react";

export default function MonthYearFilter({
  onChange,
}: {
  onChange: (date: string) => void;
}) {
  const [selectedMonth, setSelectedMonth] =
    useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setSelectedMonth(value);
    onChange(value);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between gap-4 mb-6">
      <label
        htmlFor="month"
        className="text-gray-700 font-medium"
      >
        Select Month to see expenses:
      </label>
      <input
        id="month"
        type="month"
        value={selectedMonth}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>
  );
}