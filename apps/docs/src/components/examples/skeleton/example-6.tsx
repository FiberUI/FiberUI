"use client";

import { useState, useEffect } from "react";
import { Skeleton, SkeletonAvatar } from "@repo/ui/components/skeleton";
import { SkeletonWrapper } from "./skeleton-wrapper";

interface User {
    name: string;
    email: string;
    avatar: string;
}

const mockUsers: User[] = [
    { name: "Alice Johnson", email: "alice@example.com", avatar: "AJ" },
    { name: "Bob Smith", email: "bob@example.com", avatar: "BS" },
    { name: "Carol Williams", email: "carol@example.com", avatar: "CW" },
];

export const Example6 = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setUsers(mockUsers);
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleReload = () => {
        setLoading(true);
        setUsers([]);
        setTimeout(() => {
            setUsers(mockUsers);
            setLoading(false);
        }, 2000);
    };

    return (
        <SkeletonWrapper>
            <div className="w-full space-y-4">
                <button
                    onClick={handleReload}
                    className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm"
                >
                    Reload Data
                </button>
                <div className="divide-border divide-y">
                    {loading
                        ? Array.from({ length: 3 }).map((_, i) => (
                              <div
                                  key={i}
                                  className="flex items-center gap-3 py-3"
                              >
                                  <SkeletonAvatar avatarSize="md" />
                                  <div className="flex-1 space-y-1">
                                      <Skeleton variant="text" width="30%" />
                                      <Skeleton
                                          variant="text"
                                          width="50%"
                                          size="xs"
                                      />
                                  </div>
                              </div>
                          ))
                        : users.map((user) => (
                              <div
                                  key={user.email}
                                  className="flex items-center gap-3 py-3"
                              >
                                  <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium">
                                      {user.avatar}
                                  </div>
                                  <div>
                                      <p className="font-medium">{user.name}</p>
                                      <p className="text-muted-foreground text-sm">
                                          {user.email}
                                      </p>
                                  </div>
                              </div>
                          ))}
                </div>
            </div>
        </SkeletonWrapper>
    );
};
