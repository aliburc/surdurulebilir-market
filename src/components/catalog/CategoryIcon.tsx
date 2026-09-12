type IconProps = { className?: string };

function KartonKutu({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M8 16.5 24 9l16 7.5v15L24 39 8 31.5v-15Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M8 16.5 24 24m0 0 16-7.5M24 24v15" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 12.7 32 20.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}

function CamKavanoz({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="16" y="8" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M14 14h20l1.5 22.5A3 3 0 0 1 32.5 40h-17a3 3 0 0 1-3-3.5L14 14Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M13.5 23h21" stroke="currentColor" strokeWidth="1.5" opacity=".5" />
    </svg>
  );
}

function KagitPoset({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M12 17h24l-1.8 20.2A2 2 0 0 1 32.2 39H15.8a2 2 0 0 1-2-1.8L12 17Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M16 17v-3a8 8 0 0 1 16 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 23h24" stroke="currentColor" strokeWidth="1.5" opacity=".5" />
    </svg>
  );
}

function PlastikFilm({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <ellipse cx="18" cy="24" rx="9" ry="14" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="18" cy="24" rx="3.5" ry="5.5" stroke="currentColor" strokeWidth="1.5" opacity=".6" />
      <path d="M27 12c6 3 8 8 8 12s-2 9-8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".75" />
    </svg>
  );
}

function PetSise({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M20 8h8v5.5c2.4 1.6 4 4.3 4 7.5v15a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4V21c0-3.2 1.6-5.9 4-7.5V8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M18 26h12" stroke="currentColor" strokeWidth="1.5" opacity=".5" />
      <path
        d="M31 33.5a4 4 0 0 0 3-1.3M31 33.5a4 4 0 0 1 3 1.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity=".8"
      />
    </svg>
  );
}

function MantarTipa({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M19 22v11a5 5 0 0 0 10 0V22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 12h11a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 17 20.5v-7A1.5 1.5 0 0 1 18.5 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M20 15.3v3.4M24 15v4M28 15.3v3.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity=".6" />
    </svg>
  );
}

function DolguMalzemesi({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="9" y="12" width="30" height="24" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M17 20c-2 0-3 1.6-1.6 3.2 1.4 1.6 4.6 1.6 4.6 4S17.4 30.8 15.8 29"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M27 22c-2 0-3 1.6-1.6 3.2 1.4 1.6 4.6 1.6 4.6 4S25.4 32.8 23.8 31"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M35 18c-2 0-3 1.6-1.6 3.2 1.4 1.6 4.6 1.6 4.6 4s-3.6 3.6-5.2 1.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity=".8"
      />
    </svg>
  );
}

function BambuAmbalaj({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M14 20h20v13a5 5 0 0 1-5 5H19a5 5 0 0 1-5-5V20Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x="12.5" y="14" width="23" height="6.5" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M17.5 14.3v6M24 14v6.5M30.5 14.3v6" stroke="currentColor" strokeWidth="1.3" opacity=".6" />
    </svg>
  );
}

const ICONS: Record<string, (props: IconProps) => React.JSX.Element> = {
  "Karton Kutu": KartonKutu,
  "Cam Şişe / Kavanoz": CamKavanoz,
  "Kağıt Poşet": KagitPoset,
  "Biyobozunur Plastik Film": PlastikFilm,
  "Geri Dönüştürülmüş PET Şişe": PetSise,
  "Mantar Tıpa": MantarTipa,
  "Dolgu Malzemesi": DolguMalzemesi,
  "Bambu Ambalaj": BambuAmbalaj,
};

export function CategoryIcon({ category, className }: { category: string; className?: string }) {
  const Icon = ICONS[category] ?? KartonKutu;
  return <Icon className={className} />;
}
