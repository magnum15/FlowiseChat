// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

function rem2px(input, fontSize = 16) {
    if (input == null) {
        return input;
    }
    switch (typeof input) {
        case 'object':
            if (Array.isArray(input)) {
                return input.map((val) => rem2px(val, fontSize));
            }
            const ret = {};
            for (const key in input) {
                ret[key] = rem2px(input[key], fontSize);
            }
            return ret;
        case 'string':
            return input.replace(/(\d*\.?\d+)rem$/, (_, val) => `${parseFloat(val) * fontSize}px`);
        case 'function':
            return eval(input.toString().replace(/(\d*\.?\d+)rem/g, (_, val) => `${parseFloat(val) * fontSize}px`));
        default:
            return input;
    }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        ...rem2px(defaultTheme),
        extend: {
            keyframes: {
                'fade-in': {
                    '0%': {
                        opacity: '0',
                    },
                    '100%': {
                        opacity: '1',
                    },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.3s ease-out',
            },
            typography: {
                DEFAULT: {
                    css: {
                        // Aplicar color a los encabezados h1 a h6
                        'h1, h2, h3, h4, h5, h6': {
                            color: '#cab286',  // Cambia al color deseado
                        },
                        // Aplicar color a los números de las listas ordenadas
                        'ol > li::marker': {
                            color: '#cab286',  // Cambia al color deseado
                        },
                        // Aplicar color a los elementos <strong>
                        'strong': {
                            color: '#cab286',  // Cambia al color deseado
                        },
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
