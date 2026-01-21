import fs from "fs";
import path from "path";

interface HookExampleCodeFromFileProps {
    cnt: number;
    name: string;
}

import * as Base from "fumadocs-ui/components/codeblock";
import { highlight } from "fumadocs-core/highlight";

export const HookExampleCodeFromFile = async ({
    cnt,
    name,
}: HookExampleCodeFromFileProps) => {
    const fnName = "example-" + cnt + ".tsx";
    const pathToFile = "src/hooks/examples/" + name + "/" + fnName;
    const filePath = path.join(process.cwd(), pathToFile);
    const codeSnippet = fs.readFileSync(filePath, "utf8");

    const rendered = await highlight(codeSnippet, {
        lang: "tsx",
        themes: {
            light: "one-light",
            dark: "plastic",
        },

        components: {
            pre: (props) => (
                <Base.Pre {...props} className="pt-1 text-sm leading-6" />
            ),
        },
    });

    return (
        <Base.CodeBlock
            id="test-code-block-rajat"
            className="border-none bg-transparent shadow-none"
            data-line-numbers
        >
            {rendered}
        </Base.CodeBlock>
    );
};

export const HookCodeFromFile = async ({
    name,
    folder,
}: {
    name: string;
    folder?: string;
}) => {
    const basePath = folder
        ? `../../packages/hooks/src/${folder}/${name}.ts`
        : `../../packages/hooks/src/${name}.ts`;
    const filePath = path.join(process.cwd(), basePath);
    const codeSnippet = fs.readFileSync(filePath, "utf8");

    const rendered = await highlight(codeSnippet, {
        lang: "tsx",
        themes: {
            light: "one-light",
            dark: "plastic",
        },

        components: {
            pre: (props) => (
                <Base.Pre {...props} className="pt-1 text-sm leading-6" />
            ),
        },
    });

    return (
        <Base.CodeBlock
            id="test-code-block-file-rajat"
            className="border shadow"
            data-line-numbers
        >
            {rendered}
        </Base.CodeBlock>
    );
};
