"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";
import { Separator } from "@repo/ui/components/separator";
import {
    TrendingUp,
    TrendingDown,
    Users,
    DollarSign,
    ShoppingCart,
    Activity,
    MoreHorizontal,
} from "lucide-react";

const StatCard = ({
    title,
    value,
    change,
    trend,
    icon: Icon,
}: {
    title: string;
    value: string;
    change: string;
    trend: "up" | "down";
    icon: React.ElementType;
}) => (
    <Card>
        <CardContent className="p-4">
            <div className="flex items-center justify-between">
                <div className="bg-muted rounded-md p-2">
                    <Icon className="text-muted-foreground size-4" />
                </div>
                <Button variant="ghost" size="icon-sm">
                    <MoreHorizontal className="size-4" />
                </Button>
            </div>
            <div className="mt-3">
                <p className="text-muted-foreground text-sm">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
            <div className="mt-2 flex items-center gap-1">
                {trend === "up" ? (
                    <TrendingUp className="size-4 text-green-500" />
                ) : (
                    <TrendingDown className="size-4 text-red-500" />
                )}
                <span
                    className={`text-sm ${trend === "up" ? "text-green-500" : "text-red-500"}`}
                >
                    {change}
                </span>
                <span className="text-muted-foreground text-sm">
                    vs last month
                </span>
            </div>
        </CardContent>
    </Card>
);

export const DashboardStatsBlock = () => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <StatCard
                title="Total Revenue"
                value="$45,231"
                change="+20.1%"
                trend="up"
                icon={DollarSign}
            />
            <StatCard
                title="Active Users"
                value="2,350"
                change="+15.3%"
                trend="up"
                icon={Users}
            />
            <StatCard
                title="Sales"
                value="12,234"
                change="-4.5%"
                trend="down"
                icon={ShoppingCart}
            />
            <StatCard
                title="Active Now"
                value="+573"
                change="+201"
                trend="up"
                icon={Activity}
            />
        </div>
    );
};

export const DashboardActivityBlock = () => {
    const activities = [
        {
            user: "Sarah Chen",
            action: "completed task",
            target: "Design Review",
            time: "2m ago",
        },
        {
            user: "Mike Johnson",
            action: "commented on",
            target: "Q4 Report",
            time: "15m ago",
        },
        {
            user: "Emily Davis",
            action: "uploaded",
            target: "Brand Assets",
            time: "1h ago",
        },
        {
            user: "Alex Kim",
            action: "joined team",
            target: "Engineering",
            time: "3h ago",
        },
    ];

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Recent Activity</CardTitle>
                    <Button variant="ghost" size="sm">
                        View All
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {activities.map((activity, i) => (
                    <div key={i}>
                        <div className="flex items-start gap-3">
                            <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium">
                                {activity.user
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm">
                                    <span className="font-medium">
                                        {activity.user}
                                    </span>{" "}
                                    {activity.action}{" "}
                                    <span className="font-medium">
                                        {activity.target}
                                    </span>
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                        {i < activities.length - 1 && (
                            <Separator className="my-3" />
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export const DashboardProgressBlock = () => {
    const projects = [
        { name: "Website Redesign", progress: 75, status: "In Progress" },
        { name: "Mobile App", progress: 45, status: "In Progress" },
        { name: "API Integration", progress: 100, status: "Completed" },
    ];

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-base">Project Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {projects.map((project, i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                                {project.name}
                            </span>
                            <Badge
                                variant={
                                    project.status === "Completed"
                                        ? "secondary"
                                        : "outline"
                                }
                            >
                                {project.status}
                            </Badge>
                        </div>
                        <div className="bg-muted h-2 overflow-hidden rounded-full">
                            <div
                                className="bg-primary h-full rounded-full transition-all"
                                style={{ width: `${project.progress}%` }}
                            />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};
