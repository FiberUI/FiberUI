"use client";
import { Button } from "@repo/ui/button";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
    return (
        <div className="grid h-screen place-content-center p-20">
            <Button
                onPress={() => {
                    alert("ON PRESS");
                }}
                onClick={() => {
                    alert("ON CLICK");
                }}
                className="border-2"
            >
                Hello
            </Button>
        </div>
    );
};
export default HomePage;
