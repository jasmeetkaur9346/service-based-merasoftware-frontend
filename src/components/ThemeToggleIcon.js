import React, { useEffect, useRef, useState } from 'react';
import { Sun, Moon, Monitor, SunMoon, Check } from 'lucide-react';

const STORAGE_KEY = 'theme'; // 'system' | 'light' | 'dark'

const applyTheme = (mode) => {
  try {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const isDark = mode === 'dark' || (mode === 'system' && media.matches);
    document.documentElement.classList.toggle('dark', isDark);
  } catch {}
};

const ThemeToggleIcon = () => {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'system';
    } catch {
      return 'system';
    }
  });
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    applyTheme(theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {}

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => theme === 'system' && applyTheme('system');
    media.addEventListener?.('change', onChange);
    media.addListener?.(onChange); // Safari legacy
    return () => {
      media.removeEventListener?.('change', onChange);
      media.removeListener?.(onChange);
    };
  }, [theme]);

  useEffect(() => {
    const onClick = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const Option = ({ mode, label, Icon }) => (
    <button
      onClick={() => { setTheme(mode); setOpen(false); }}
      className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${theme===mode ? 'bg-indigo-50 text-indigo-700 dark:bg-slate-700/60 dark:text-white' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'}`}
      role="menuitemradio"
      aria-checked={theme===mode}
    >
      <Icon className="w-4 h-4" />
      <span className="flex-1 text-left">{label}</span>
      {theme===mode && <Check className="w-4 h-4 opacity-70" />}
    </button>
  );

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Theme settings"
        title="Theme settings"
        className="p-2 rounded-full text-gray-500 hover:text-indigo-600 transition-colors dark:text-slate-300 dark:hover:text-cyan-400"
      >
        <SunMoon className="w-5 h-5" />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-40 rounded-lg border border-slate-200 bg-white shadow-lg p-1 z-50 dark:bg-slate-900 dark:border-slate-700"
        >
          <Option mode="system" label="System" Icon={Monitor} />
          <Option mode="light" label="Light" Icon={Sun} />
          <Option mode="dark" label="Dark" Icon={Moon} />
        </div>
      )}
    </div>
  );
};

export default ThemeToggleIcon;
