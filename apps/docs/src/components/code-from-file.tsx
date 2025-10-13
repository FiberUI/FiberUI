import fs from "fs";
import path from "path";

interface CodeFromFileProps {
    cnt: number; // Example Number
    name: string; // name of component
}

import * as Base from "fumadocs-ui/components/codeblock";
import { highlight } from "fumadocs-core/highlight";

export const CodeFromFile = async ({ cnt, name }: CodeFromFileProps) => {
    const fnName = "example-" + cnt + ".tsx";
    const pathToFile =
        "src/components/examples/" + name + "-examples" + "/" + fnName;
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
            className="border-none bg-transparent shadow-none"
            data-line-numbers
        >
            {rendered}
        </Base.CodeBlock>
    );
};
