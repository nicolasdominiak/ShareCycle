/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: 'clamp(1rem, 5vw, 2rem)',
  		screens: {
  			'sm': '640px',
  			'md': '768px',
  			'lg': '1024px',
  			'xl': '1280px',
  			'2xl': '1400px'
  		}
  	},
  	fontFamily: {
  		sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  		noto: ['var(--font-noto)', 'Noto Sans', 'system-ui', 'sans-serif']
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))',
  				50: '#f0f9f6',
  				100: '#dcf2e8',
  				200: '#bce5d4',
  				300: '#8fd1b8',
  				400: '#5cb597',
  				500: '#3a9b7a',
  				600: '#2d7d62',
  				700: '#1d5142',
  				800: '#194238',
  				900: '#16372f'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))',
  				50: '#f8ffe6',
  				100: '#eeffcc',
  				200: '#deff9f',
  				300: '#c8f168',
  				400: '#b3e63b',
  				500: '#9bcc1f',
  				600: '#7ba014',
  				700: '#5d7815',
  				800: '#4a5f17',
  				900: '#3f5118'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))',
  				lime: '#C8F168',
  				emerald: '#1D5142',
  				dark: '#030F0C'
  			},
  			neutral: {
  				50: '#fafafa',
  				100: '#f4f4f5',
  				200: '#e4e4e7',
  				300: '#d4d4d8',
  				400: '#a1a1aa',
  				500: '#71717a',
  				600: '#52525b',
  				700: '#3f3f46',
  				800: '#27272a',
  				900: '#18181b'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			semantic: {
  				success: '#22c55e',
  				warning: '#f59e0b',
  				error: '#ef4444',
  				info: '#3b82f6'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		spacing: {
  			'xs': '0.25rem',
  			'sm': '0.5rem',
  			'md': '1rem',
  			'lg': '1.5rem',
  			'xl': '2rem',
  			'2xl': '3rem',
  			'3xl': '4rem',
  			'4xl': '6rem',
  			'5xl': '8rem'
  		},
  		boxShadow: {
  			'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  			'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  			'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  			'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} 