/** @type {import('tailwindcss').Config} */
export default {
    plugins: [
      require('daisyui')
    ],
        theme: {
            extend: {},
        },
    content: ["./index.html",'./src/**/*.{svelte,js,ts}'],
    variants: {
        extend: {},
    }
}
