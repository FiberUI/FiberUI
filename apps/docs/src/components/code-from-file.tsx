import fs from "fs";
import path from "path";

interface CodeFromFileProps {
    cnt: number;
    name: string;
    isComponent?: boolean;
}

import * as Base from "fumadocs-ui/components/codeblock";
import { highlight } from "fumadocs-core/highlight";
import Link from "next/link";

export const CodeFromFile = async ({
    cnt,
    name,
    isComponent,
}: CodeFromFileProps) => {
    const fnName = "example-" + cnt + ".tsx";
    const pathToFile = "src/components/examples/" + name + "/" + fnName;
    const filePath = path.join(process.cwd(), pathToFile);
    const codeSnippet = fs.readFileSync(filePath, "utf8");

    const rendered = await highlight(codeSnippet, {
        lang: "tsx",

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
