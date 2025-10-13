interface TestPageProps {}

import {
    LoaderBars,
    LoaderCircles,
    LoaderSpinner,
} from "@repo/ui/components/loader";

const TestPage: React.FC<TestPageProps> = ({}) => {
    return (
        <div className="grid h-screen grid-cols-4 place-items-center justify-center gap-10 p-10">
            <div>
                <LoaderBars />
            </div>

            <div>
                <LoaderCircles />
            </div>
            <div>
                <LoaderSpinner />
            </div>
        </div>
    );
};
export default TestPage;
