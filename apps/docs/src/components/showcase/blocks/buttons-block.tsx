import { Button } from "@repo/ui/components/button";
import {
    ArrowRight,
    Download,
    Mail,
    Plus,
    Trash2,
    Heart,
    Star,
} from "lucide-react";

export const ButtonsBlock = () => {
    return (
        <div className="space-y-4 rounded-xl border p-6">
            <div className="flex flex-wrap gap-2">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-wrap gap-2">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-2">
                <Button>
                    <Mail className="size-4" />
                    Email
                </Button>
                <Button variant="outline">
                    <Download className="size-4" />
                    Download
                </Button>
                <Button variant="destructive">
                    <Trash2 className="size-4" />
                    Delete
                </Button>
            </div>
            <div className="flex gap-2">
                <Button size="icon" variant="outline">
                    <Plus className="size-4" />
                </Button>
                <Button size="icon" variant="outline">
                    <Heart className="size-4" />
                </Button>
                <Button size="icon" variant="outline">
                    <Star className="size-4" />
                </Button>
            </div>
        </div>
    );
};
