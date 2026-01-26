import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tseslintPlugin from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import globals from "globals";

const nextRecommended = nextPlugin.configs.recommended;
const nextCoreWebVitals = nextPlugin.configs["core-web-vitals"];

export default [
	{
		ignores: ["**/node_modules/**", ".next/**", "dist/**"],
	},
	{
		name: "next/core-web-vitals",
		plugins: {
			"@next/next": nextPlugin,
		},
		rules: {
			...nextRecommended.rules,
			...nextCoreWebVitals.rules,
		},
	},
	{
		files: ["**/*.{ts,tsx,js,jsx}"],
		languageOptions: {
			parser: tseslintParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
			},
			globals: {
				...globals.browser,
				...globals.node,
				React: "readonly",
				JSX: "readonly",
			},
		},
		plugins: {
			"@typescript-eslint": tseslintPlugin,
		},
		rules: {
			...js.configs.recommended.rules,
			...tseslintPlugin.configs.recommended.rules,
		},
	},
];
