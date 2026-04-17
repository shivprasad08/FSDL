import React from 'react';

export default function StarRating({ value = 0, onChange, max = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(max)].map((_, i) => (
        <button
          key={i}
          type="button"
          className={
            'text-2xl transition-colors ' +
            (i < value ? 'text-amber' : 'text-gray-300 hover:text-amber')
          }
          onClick={() => onChange && onChange(i + 1)}
          aria-label={`Rate ${i + 1} star${i === 0 ? '' : 's'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
