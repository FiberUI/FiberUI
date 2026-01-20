"use client";

import { useLocalStorageState } from "@repo/hooks/use-local-storage-state";

interface User {
    id: string;
    name: string;
    email: string;
}

/* WITH TYPESCRIPT GENERICS - Complex Objects */
export const Example2 = () => {
    const [user, setUser, isLoading] = useLocalStorageState<User | null>(
        "user",
        null,
    );

    if (isLoading) {
        return (
            <span className="text-muted-foreground text-sm">Loading...</span>
        );
    }

    const login = () => {
        setUser({
            id: "123",
            name: "John Doe",
            email: "john@example.com",
        });
    };

    const logout = () => setUser(null);

    return (
        <div className="flex items-center gap-4">
            {user ? (
                <>
                    <span className="text-sm">Welcome, {user.name}!</span>
                    <button
                        className="bg-destructive text-destructive-foreground rounded-md px-4 py-2 text-sm"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </>
            ) : (
                <button
                    className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm"
                    onClick={login}
                >
                    Login
                </button>
            )}
        </div>
    );
};
