// tailwind.config.js
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
    extend: {
        colors: {
            primary: 'var(--color-primary)',
            accent: 'var(--color-accent)',
            bg: 'var(--color-bg)',
        },
        fontFamily: {
            display: ['Poppins', 'sans-serif'],
        },
    },
};
export const plugins = [];
