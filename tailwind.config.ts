
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		screens: {
			'xs': '475px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
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
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// AI-Shiksha custom colors
				aishiksha: {
					'blue': '#4361ee',
					'purple': '#7209b7',
					'light-blue': '#4cc9f0',
					'soft-white': '#f8f9fa',
					'deep-blue': '#3a0ca3',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-gentle': {
					'0%, 100%': { 
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': { 
						opacity: '0.85',
						transform: 'scale(1.03)' 
					},
				},
				'float': {
					'0%, 100%': { 
						transform: 'translateY(0px)'
					},
					'50%': { 
						transform: 'translateY(-10px)' 
					},
				},
				'glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px rgba(67, 97, 238, 0.3), 0 0 10px rgba(67, 97, 238, 0.2)'
					},
					'50%': { 
						boxShadow: '0 0 15px rgba(67, 97, 238, 0.6), 0 0 20px rgba(67, 97, 238, 0.4)'
					},
				},
				'ripple': {
					'0%': { 
						transform: 'scale(0.95)',
						opacity: '1'
					},
					'100%': { 
						transform: 'scale(1.5)',
						opacity: '0'
					},
				},
				'wave': {
					'0%': { height: '5px' },
					'25%': { height: '15px' },
					'50%': { height: '10px' },
					'75%': { height: '20px' },
					'100%': { height: '5px' },
				},
				'page-transition-in': {
					'0%': { 
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': { 
						opacity: '1',
						transform: 'translateY(0)'
					},
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
                'sparkle': {
                    '0%': { transform: 'scale(0)', opacity: '0' },
                    '50%': { transform: 'scale(1)', opacity: '0.8' },
                    '100%': { transform: 'scale(0)', opacity: '0' }
                },
                'fade-out': {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-gentle': 'pulse-gentle 4s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 4s ease-in-out infinite',
				'ripple': 'ripple 1s ease-out',
				'wave': 'wave 1.5s ease-in-out infinite',
				'page-transition': 'page-transition-in 0.7s ease-out',
				'rotate-slow': 'rotate-slow 20s linear infinite',
                'sparkle': 'sparkle 700ms forwards',
                'fade-out': 'fade-out 700ms forwards'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				dyslexic: ['OpenDyslexic', 'sans-serif'],
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
