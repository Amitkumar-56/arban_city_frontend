export default function PartnerLogo({ className = '' }) {
  return (
    <svg
      viewBox="0 0 160 44"
      fill="none"
      className={`partner-logo ${className}`}
      role="img"
      aria-label="DigiPace logo"
    >
      <text className="partner-logo-digi" x="2" y="31" fontSize="28" fontWeight="700" fill="#1C1848" letterSpacing="-0.5">
        digi
      </text>
      <rect x="52" y="14" width="4.5" height="4.5" fill="#BF8738" rx="0.5" />
      <rect x="56.5" y="9.5" width="4.5" height="4.5" fill="#D49B44" rx="0.5" />
      <rect x="61" y="5" width="4.5" height="4.5" fill="#E8B058" rx="0.5" />
      <text className="partner-logo-pace" x="68" y="31" fontFamily="Georgia, 'Times New Roman', serif" fontSize="29" fontWeight="500" fill="#1C1848" letterSpacing="0.5">
        PACE
      </text>
    </svg>
  );
}
