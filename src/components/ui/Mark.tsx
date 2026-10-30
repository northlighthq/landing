export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M0 3H6V13H10V16H0Z" />
      <path d="M6 0H16V13H10V3H6Z" />
    </svg>
  );
}
