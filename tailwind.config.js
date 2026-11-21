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
  			ink: { DEFAULT: '#05060d', 900: '#080a14', 800: '#0d1020', 700: '#151a33', 600: '#1e2547' },
  			brand: { DEFAULT: '#5b6cff', light: '#8b9bff', cyan: '#22d3ee', violet: '#a855f7', hot: '#ff3d7f', gold: '#f5c76b' },
  			mist: '#a3abcc',
  			accent: { DEFAULT: '#e11d2a', dark: '#b3121d', soft: '#fdecee' },
  			navy: { DEFAULT: '#1d2b6b', light: '#3346a8' },
  			coal: { DEFAULT: '#121318', 700: '#2a2d36', 600: '#4a4f5c', 400: '#80869a', 200: '#e6e7ec', 100: '#f4f5f8' }
  		},
  		fontFamily: {
  			display: ['Changa', 'Poppins', 'sans-serif'],
  			body: ['Poppins', 'Arial', 'sans-serif']
  		},
  		boxShadow: {
  			glow: '0 0 0 1px rgba(139,155,255,0.15), 0 20px 80px -20px rgba(91,108,255,0.55)',
  			card: '0 30px 80px -30px rgba(0,0,0,0.8)'
  		},
  		keyframes: {
  			eq: { '0%, 100%': { transform: 'scaleY(0.35)' }, '50%': { transform: 'scaleY(1)' } },
  			floaty: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
  			marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
  			kenburns: { from: { transform: 'scale(1.02)' }, to: { transform: 'scale(1.14)' } },
  			progress: { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
  			spinslow: { to: { transform: 'rotate(360deg)' } },
  			drift1: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '33%': { transform: 'translate(12vw,8vh) scale(1.15)' }, '66%': { transform: 'translate(-6vw,14vh) scale(0.9)' } },
  			drift2: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(-14vw,-10vh) scale(1.2)' } },
  			bubble: { '0%': { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: '0' }, '10%': { opacity: '1' }, '50%': { transform: 'translateY(-55vh) translateX(18px) rotate(8deg)' }, '90%': { opacity: '1' }, '100%': { transform: 'translateY(-115vh) translateX(-12px) rotate(-6deg)', opacity: '0' } },
  			shine: { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
  			pagein: { from: { opacity: '0', transform: 'translateX(48px)' }, to: { opacity: '1', transform: 'none' } },
  			dropdown: { from: { opacity: '0', transform: 'translateY(-10px) scaleY(.96)' }, to: { opacity: '1', transform: 'none' } },
  			drawer: { from: { transform: 'translateX(100%)' }, to: { transform: 'none' } },
  			wallup: { from: { transform: 'translateY(0)' }, to: { transform: 'translateY(-50%)' } },
  			walldown: { from: { transform: 'translateY(-50%)' }, to: { transform: 'translateY(0)' } },
  			rise: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } }
  		},
  		animation: {
  			eq: 'eq 1.2s ease-in-out infinite',
  			floaty: 'floaty 6s ease-in-out infinite',
  			marquee: 'marquee 40s linear infinite',
  			kenburns: 'kenburns 9s ease-out forwards',
  			progress: 'progress linear forwards',
  			spinslow: 'spinslow 14s linear infinite',
  			drift1: 'drift1 26s ease-in-out infinite',
  			drift2: 'drift2 32s ease-in-out infinite',
  			shine: 'shine 6s linear infinite',
  			pagein: 'pagein .7s cubic-bezier(.16,1,.3,1) both',
  			dropdown: 'dropdown .35s cubic-bezier(.16,1,.3,1) both',
  			drawer: 'drawer .45s cubic-bezier(.16,1,.3,1) both',
  			wallup: 'wallup 60s linear infinite',
  			walldown: 'walldown 70s linear infinite',
  			rise: 'rise 0.9s cubic-bezier(.2,.7,.2,1) both'
  		}
  	}
  },
  plugins: [import("tailwindcss-animate")],
}
