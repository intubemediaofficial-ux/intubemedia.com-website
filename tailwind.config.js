/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			navy: { DEFAULT: '#071932', 800: '#0b2855', 700: '#123a73' },
  			brand: { DEFAULT: '#087cff', light: '#25a6ff', dark: '#0062d6', pale: '#f4f8ff', line: '#e4ebf8' },
  			muted: '#52617a'
  		},
  		fontFamily: {
  			display: ['"Plus Jakarta Sans"', 'sans-serif'],
  			body: ['"DM Sans"', 'Arial', 'sans-serif']
  		},
  		boxShadow: {
  			soft: '0 20px 70px rgba(22, 72, 142, 0.10)',
  			card: '0 10px 40px rgba(22, 72, 142, 0.08)'
  		},
  		keyframes: {
  			eq: { '0%, 100%': { transform: 'scaleY(0.35)' }, '50%': { transform: 'scaleY(1)' } },
  			floaty: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } }
  		},
  		animation: {
  			eq: 'eq 1.2s ease-in-out infinite',
  			floaty: 'floaty 6s ease-in-out infinite'
  		}
  	}
  },
  plugins: [import("tailwindcss-animate")],
}
