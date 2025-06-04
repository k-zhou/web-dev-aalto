import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import  tailwindcss  from "@tailwindcss/vite";
import * as fs from 'npm:graceful-fs';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit()
	],
	// server: {
	//         https: {
	//             key: fs.readFileSync(`${__dirname}/cert/key.pem`),
	//             cert: fs.readFileSync(`${__dirname}/cert/cert.pem`)
	//         },
	// proxy: {}
    // }
});
