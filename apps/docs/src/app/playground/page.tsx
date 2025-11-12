import { Playground } from "@/components/playground";

export default function HomePage() {
    return (
        <main className="p-10">
            <h1 className="mb-4 text-center text-5xl font-bold">Playground</h1>

            <div className="rounded-md border p-10">
                <Playground />
            </div>
        </main>
    );
}
