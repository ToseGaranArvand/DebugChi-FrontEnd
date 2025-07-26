// import type { Config } from "tailwindcss";
// import flowbite from "flowbite-react/tailwind";
// export default {
//     darkMode: ["class"],
//     content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
// 	flowbite.content(),
//   ],
//   theme: {

//   	extend: {
//   		colors: {
//   			background: 'hsl(var(--background))',
//   			foreground: 'hsl(var(--foreground))',
//   			sidebar: {
//   				DEFAULT: 'hsl(var(--sidebar-background))',
//   				foreground: 'hsl(var(--sidebar-foreground))',
//   				primary: 'hsl(var(--sidebar-primary))',
//   				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
//   				accent: 'hsl(var(--sidebar-accent))',
//   				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
//   				border: 'hsl(var(--sidebar-border))',
//   				ring: 'hsl(var(--sidebar-ring))'
//   			},
//   			card: {
//   				DEFAULT: 'hsl(var(--card))',
//   				foreground: 'hsl(var(--card-foreground))'
//   			},
//   			popover: {
//   				DEFAULT: 'hsl(var(--popover))',
//   				foreground: 'hsl(var(--popover-foreground))'
//   			},
//   			primary: {
//   				DEFAULT: 'hsl(var(--primary))',
//   				foreground: 'hsl(var(--primary-foreground))'
//   			},
//   			secondary: {
//   				DEFAULT: 'hsl(var(--secondary))',
//   				foreground: 'hsl(var(--secondary-foreground))'
//   			},
//   			muted: {
//   				DEFAULT: 'hsl(var(--muted))',
//   				foreground: 'hsl(var(--muted-foreground))'
//   			},
//   			accent: {
//   				DEFAULT: 'hsl(var(--accent))',
//   				foreground: 'hsl(var(--accent-foreground))'
//   			},
//   			destructive: {
//   				DEFAULT: 'hsl(var(--destructive))',
//   				foreground: 'hsl(var(--destructive-foreground))'
//   			},
//   			border: 'hsl(var(--border))',
//   			input: 'hsl(var(--input))',
//   			ring: 'hsl(var(--ring))',
//   			chart: {
//   				'1': 'hsl(var(--chart-1))',
//   				'2': 'hsl(var(--chart-2))',
//   				'3': 'hsl(var(--chart-3))',
//   				'4': 'hsl(var(--chart-4))',
//   				'5': 'hsl(var(--chart-5))'
//   			}
//   		},

//   		keyframes: {
// 			fadeOut: {
// 				"0%": { opacity: "1" },
// 				"100%": { opacity: "0" },
// 			},
//   			'accordion-down': {
//   				from: {
//   					height: '0'
//   				},
//   				to: {
//   					height: 'var(--radix-accordion-content-height)'
//   				}
//   			},
//   			'accordion-up': {
//   				from: {
//   					height: 'var(--radix-accordion-content-height)'
//   				},
//   				to: {
//   					height: '0'
//   				}
//   			}
//   		},
//   		animation: {
//   			'accordion-down': 'accordion-down 0.2s ease-out',
//   			'accordion-up': 'accordion-up 0.2s ease-out',
// 			fade: "fadeOut 0.5s ease-in-out",

//   		},
//   		borderRadius: {
//   			lg: 'var(--radius)',
//   			md: 'calc(var(--radius) - 2px)',
//   			sm: 'calc(var(--radius) - 4px)'
//   		}
//   	}
//   },
//   plugins: [require("tailwindcss-animate")],
// } satisfies Config;
// tailwind.config.js
import { heroui } from "@heroui/react";
import { fontFamily } from "tailwindcss/defaultTheme";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // ...
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        c_background: "#2c2552",
        c_secondary: "#232035",
        input: "#1C1C1C",
        main_bg: "#140a31",
        community: "#1D142D",
        bg_global_blur: "#002D78",
        btn_primary: "#3344D9",
        bg_card: "#0F0F0F",
      },
      fontFamily: {
        iranSans: ["var(--font-iran-sans)", ...fontFamily.sans],
        lightSans: ["iran-sans-lt"],
        mediumSans: ["iran-sans-md"],
        blackSans: ["iran-sans-bl"],
        ultraLightSans: ["iran-sans-ul"],
        Giest: ["en-font"],
        GiestMono: ["en-font-mono"],
        iranRegular: ["iranRegular", "sans-serif"],
        iran: ["iran", "sans-serif"],
        iranBold: ["iranBold", "sans-serif"],
        iranLight: ["iranLight", "sans-serif"],
        iranMedium: ["iranMedium", "sans-serif"],
        iranUltraLight: ["iranUltraLight", "sans-serif"],
        iranNumBlack: ["iranNumBlack", "sans-serif"],
        iranNumMedium: ["iranNumMedium", "sans-serif"],
        iranNumUltraLight: ["iranNumUltraLight", "sans-serif"],
        iranNumBold: ["iranNumBold", "sans-serif"],
        iranNumRegular: ["iranNumRegular", "sans-serif"],
        yekan: ["yekan", "sans-serif"],
      },
      animation: {
        "shiny-text": "shiny-text 8s infinite",
        ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },

      keyframes: {
        "shiny-text": {
          "0%, 90%, 100%": {
            "background-position": "calc(-100% - var(--shiny-width)) 0",
          },
          "30%, 60%": {
            "background-position": "calc(100% + var(--shiny-width)) 0",
          },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        ripple: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui(), addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
