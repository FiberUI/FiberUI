import { Button } from "@repo/ui/components/button";

export const Example3 = () => {
    return (
        <div>
            <div className="flex flex-wrap items-center justify-center gap-5 md:gap-4">
                <Button> Default </Button>
                <Button variant={"gradient"}> Gradient </Button>
                <Button variant={"outline"}> Outline </Button>
                <Button variant={"secondary"}> Secondary </Button>
                <Button variant={"ghost"}> Ghost </Button>
                <Button variant={"destructive"}> Destructive </Button>
                <Button variant={"link"}> Link </Button>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-5 md:gap-4">
                <Button variant={"adobe"}> Adobe </Button>
                <Button variant={"instagram"}> Instagram </Button>
            </div>
        </div>
    );
};
