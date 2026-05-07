import { useT, useLang } from '../i18n/index.js';

export default function Header() {
  const t = useT();
  const lang = useLang();

  return (
    <nav className="border-b border-white/5 bg-[#111]/95 backdrop-blur sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/favicon.svg" alt="BitMatrix" className="w-8 h-8" />
          <div>
            <h1 className="text-base font-semibold tracking-tight text-white">{t('header.title')}</h1>
            <p className="text-[11px] text-[#a3a3a3] -mt-0.5">{t('header.subtitle')}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 border border-white/5 rounded-lg p-0.5">
          <a
            href="/es"
            className={`text-xs font-medium uppercase tracking-wider rounded-md px-2.5 py-1 transition-colors ${
              lang === 'es'
                ? 'bg-white text-black'
                : 'text-[#a3a3a3] hover:text-white'
            }`}
          >
            ES
          </a>
          <a
            href="/en"
            className={`text-xs font-medium uppercase tracking-wider rounded-md px-2.5 py-1 transition-colors ${
              lang === 'en'
                ? 'bg-white text-black'
                : 'text-[#a3a3a3] hover:text-white'
            }`}
          >
            EN
          </a>
        </div>
      </div>
    </nav>
  );
}
