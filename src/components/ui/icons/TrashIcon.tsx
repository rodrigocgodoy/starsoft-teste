import type { SVGProps } from 'react'

export function TrashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M20 6.99h-2.79M4 6.99h9.79M9.17 4.61h5.66M18.53 9.5l-.55 8.42c-.09 1.42-.16 2.53-2.68 2.53H8.7c-2.52 0-2.59-1.11-2.68-2.53L5.47 9.5M10.33 15.5h3.33M9.5 12.5h5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
