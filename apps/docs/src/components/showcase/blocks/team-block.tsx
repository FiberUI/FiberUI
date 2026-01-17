import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";

export const TeamBlock = () => {
    const team = [
        {
            name: "Alex Chen",
            role: "Lead Developer",
            initials: "AC",
            color: "from-indigo-500 to-purple-500",
        },
        {
            name: "Sarah Miller",
            role: "Designer",
            initials: "SM",
            color: "from-pink-500 to-rose-500",
        },
        {
            name: "James Wilson",
            role: "Backend",
            initials: "JW",
            color: "from-amber-500 to-orange-500",
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                    Invite your team to collaborate.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {team.map((member) => (
                    <div key={member.name} className="flex items-center gap-3">
                        <div
                            className={`bg-linear-to-br flex size-9 items-center justify-center rounded-full ${member.color} text-xs font-bold text-white`}
                        >
                            {member.initials}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-muted-foreground text-xs">
                                {member.role}
                            </p>
                        </div>
                        <Button size="sm" variant="outline">
                            View
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};
