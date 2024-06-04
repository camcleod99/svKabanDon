import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
    plugins: [
        daisyui
    ],
        theme: {
            extend: {},
        },
    content: ["./index.html",'./src/**/*.{svelte,js,ts}'],
    variants: {
        extend: {},
    }
}
