import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'
import transformerDirective from '@unocss/transformer-directives'
import transformerCompileClass from '@unocss/transformer-compile-class'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import presetWebFonts from '@unocss/preset-web-fonts'


export default defineConfig({
	theme: {
		fontSize: {
			'tiny': '0.73rem'
		},
		boxShadow: {
			't-sm': '0 -1px 2px 0 rgba(0, 0, 0, 0.05)',
			't-md': '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
			't-lg': '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
			't-xl': '0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
			't-2xl': '0 -25px 50px -12px rgba(0, 0, 0, 0.25)',
			't-3xl': '0 -35px 60px -15px rgba(0, 0, 0, 0.3)'
		},
		colors: {
			"primary": "#186180",
			"primaryDark": "#074454",
			"secondary": "#1CD69A",
			"secondaryDark": "#35B58CFF",
			"dark": "hsl(220, 95%, 8%)",
			"lightDark": "hsl(219,77%,15%)",
			"light": "#142E66FF",
			"prussianBlue": "#012A4A",
			"indigoDye": "#013A63",
			"proBlue": "#01497C",
			"darkBlue": "#0662A6",
			"royalBlue": "#01497C",
			"ucla": "#2A6F97",
			"cerulean": "#2C7DA0",
			"airBlue": "#468FAF",
			"superiorBlue": "#61A5C2",
			"skyBlue": "#89C2D9",
			"lightBlue": "#A9D6E5",
		}
	},
	shortcuts: [
		{
			"btn-primary": "text-sm whitespace-nowrap py-1 px-4 flex justify-center items-center bg-primary-dark hover:bg-primary focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center font-thin shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded",
			"btn-secondary": "text-sm whitespace-nowrap py-1 px-4 flex justify-center items-center bg-secondary-dark hover:bg-secondary focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center font-thin shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded",
			"btn-default": "text-sm whitespace-nowrap border py-1 px-4 flex justify-center items-center bg-gray-100 hover:bg-white text-primary-dark w-full transition ease-in duration-200 text-center font-thin rounded",
		},
		[
			'icon-btn',
			'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600',
		],
	],
	presets: [
		presetUno(),
		presetAttributify(),
		presetIcons({
			scale: 1.2,
			warn: true,
		}),
		presetWebFonts({
			provider: "google",
			fonts: {
				poppins: "Poppins:200,300,400,500,600,700,800,900",
				quicksand: "Quicksand:200,300,400,500,600,700,800,900",
			}
		})
	],
	transformers: [
		transformerDirective(),
		transformerCompileClass(),
		transformerVariantGroup(),
	],
	safelist: [
		'col-span-1',
		'flex',
		'shadow-sm',
		'rounded-md',
		'flex-shrink-0',
		'items-center',
		'justify-center',
		'w-16',
		'text-white',
		'text-sm',
		'font-medium',
		'rounded-l-md',
		'flex-1',
		'px-4',
		'py-2',
		'pr-2',
		'w-8',
		'h-8',
		'inline-flex',
		'text-gray-400',
		'rounded-full',
		'bg-transparent',
		'hover:text-gray-500',
		'focus:outline-none',
		'focus:ring-2',
		'focus:ring-offset-2',
		'focus:ring-indigo-500',
	],
	// transformers: [
	//   transformerDirectives(),
	//   transformerVariantGroup(),
	// ],
})
