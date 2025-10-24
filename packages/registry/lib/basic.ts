interface BasicComponentType {
    name: string;
    dependencies?: string[];
    devDependencies?: string[];
    files: string[];
}

export const BASIC_COMPONENTS: Array<BasicComponentType> = [
    {
        name: "button",
        dependencies: ["@react-aria/button"],
        files: ["components/button.tsx"],
    },
    {
        name: "input",
        dependencies: ["@react-aria/textfield"],
        files: ["components/input.tsx"],
    },
];
