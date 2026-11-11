import React, { useState, useEffect } from 'react';
import { computeKolkataStatus } from '../utils/openStatus.js';

export { computeKolkataStatus };

export default function OpenStatusChip() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setStatus(computeKolkataStatus(new Date()));
    const interval = setInterval(() => {
      setStatus(computeKolkataStatus(new Date()));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!status) {
    return (
      <div 
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800"
        aria-live="polite"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
        <span>Open Tue–Sun 9:30 AM–9 PM · Mon 4–9 PM</span>
      </div>
    );
  }

  return (
    <div 
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${
        status.isOpen 
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
          : 'bg-amber-50 border-amber-200 text-amber-800'
      }`}
      aria-live="polite"
    >
      <span className={`w-2 h-2 rounded-full shrink-0 ${
        status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
      }`}></span>
      <span>{status.text}</span>
    </div>
  );
}
