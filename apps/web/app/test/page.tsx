interface TestPageProps {}

import { LoaderBars, LoaderCircles } from "@repo/ui/components/loader";

const TestPage: React.FC<TestPageProps> = ({}) => {
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-10">
            <div>
                <LoaderBars />
            </div>

            <div>
                <LoaderCircles />
            </div>
        </div>
    );
};
export default TestPage;
