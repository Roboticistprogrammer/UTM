export function DroneXLogo({ className }: { className?: string }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M12 2L4.5 10 2 8.5 12 2z" />
        <path d="M12 2l7.5 8L22 8.5 12 2z" />
        <path d="M12 22l-7.5-8L2 15.5 12 22z" />
        <path d="M12 22l7.5-8 2.5 1.5L12 22z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  }
  
  