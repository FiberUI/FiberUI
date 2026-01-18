"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Separator } from "@repo/ui/components/separator";
import { Lock, Mail, Eye, EyeOff, User, Github } from "lucide-react";
import { useState } from "react";

export const AuthLoginBlock = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-xl">Welcome back</CardTitle>
                <p className="text-muted-foreground text-sm">
                    Sign in to your account
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                        <Mail className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className="pl-9"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Lock className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-9 pr-9"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            {showPassword ? (
                                <EyeOff className="size-4" />
                            ) : (
                                <Eye className="size-4" />
                            )}
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember" className="text-sm">
                            Remember me
                        </Label>
                    </div>
                    <Button variant="link" className="h-auto p-0 text-sm">
                        Forgot password?
                    </Button>
                </div>
                <Button className="w-full">Sign In</Button>
                <div className="relative">
                    <Separator />
                    <span className="bg-card text-muted-foreground absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-xs">
                        or continue with
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline">
                        <Github className="mr-2 size-4" />
                        GitHub
                    </Button>
                    <Button variant="outline">
                        <Mail className="mr-2 size-4" />
                        Google
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export const AuthSignupBlock = () => {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-xl">Create an account</CardTitle>
                <p className="text-muted-foreground text-sm">
                    Enter your details to get started
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input id="lastName" placeholder="Doe" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="signupEmail">Email</Label>
                    <Input
                        id="signupEmail"
                        type="email"
                        placeholder="name@example.com"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="signupPassword">Password</Label>
                    <Input
                        id="signupPassword"
                        type="password"
                        placeholder="Create a strong password"
                    />
                </div>
                <div className="flex items-start gap-2">
                    <Checkbox id="terms" className="mt-0.5" />
                    <Label htmlFor="terms" className="text-sm leading-snug">
                        I agree to the{" "}
                        <Button variant="link" className="h-auto p-0">
                            Terms
                        </Button>{" "}
                        and{" "}
                        <Button variant="link" className="h-auto p-0">
                            Privacy Policy
                        </Button>
                    </Label>
                </div>
                <Button className="w-full">Create Account</Button>
            </CardContent>
        </Card>
    );
};
