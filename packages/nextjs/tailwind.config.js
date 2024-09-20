/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("daisyui"), require("tailwindcss-animate")],
  darkTheme: "dark",
  darkMode: ["selector", "[data-theme='dark']", "class"],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'primary-content': '#ffffff',
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			'secondary-content': '#ffffff',
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			'accent-content': '#ffffff',
  			neutral: '#d8f2f2',
  			'neutral-content': '#0468bf',
  			'base-100': '#ffffff',
  			'base-200': '#d8f2f2',
  			'base-300': '#30c8d9',
  			'base-content': '#0468bf',
  			info: '#0468bf',
  			success: '#34EEB6',
  			warning: '#FFCF72',
  			error: '#FF8863',
  			dark: {
  				primary: '#0468bf',
  				'primary-content': '#F9FBFF',
  				secondary: '#1b80bf',
  				'secondary-content': '#F9FBFF',
  				accent: '#30c8d9',
  				'accent-content': '#F9FBFF',
  				neutral: '#d8f2f2',
  				'neutral-content': '#0468bf',
  				'base-100': '#383522',
  				'base-200': '#2A3655',
  				'base-300': '#212638',
  				'base-content': '#F9FBFF',
  				info: '#0468bf',
  				success: '#34EEB6',
  				warning: '#FFCF72',
  				error: '#FF8863'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			center: '0 0 12px -2px rgb(0 0 0 / 0.05)'
  		},
  		animation: {
  			'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  		},
  		borderRadius: {
  			'rounded-btn': '9999rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
};
