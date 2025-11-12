import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        ignores: [
            "node_modules/**",
            ".next/**",
            "out/**",
            "build/**",
            ".source/**",
            "next-env.d.ts",
        ],
    },
    {
        rules: {
            "@typescript-eslint/no-empty-object-type": "off",

            "no-empty-pattern": "off",
            "react/prop-types": "off",
        },
    },
];

export default eslintConfig;
