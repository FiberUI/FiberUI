"use client";

import { FullPagination, usePagination } from "@repo/ui/components/pagination";

/* DATA TABLE EXAMPLE */
const generateData = (count: number) =>
    Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: ["Admin", "Editor", "Viewer"][i % 3],
    }));

const allData = generateData(87);

export const Example7 = () => {
    const pagination = usePagination({
        totalItems: allData.length,
        itemsPerPage: 5,
    });

    const currentData = allData.slice(
        pagination.startIndex,
        pagination.endIndex,
    );

    return (
        <div className="flex w-full flex-col gap-4">
            {/* Table Container - Responsive */}
            <div className="w-full overflow-hidden rounded-lg">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px] text-sm">
                        <thead>
                            <tr className="border-border bg-muted/50 border-b">
                                <th className="whitespace-nowrap px-4 py-3 text-left font-medium">
                                    ID
                                </th>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-medium">
                                    Name
                                </th>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-medium">
                                    Email
                                </th>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-medium">
                                    Role
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className={
                                        index < currentData.length - 1
                                            ? "border-border border-b"
                                            : ""
                                    }
                                >
                                    <td className="whitespace-nowrap px-4 py-3 tabular-nums">
                                        {row.id}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 font-medium">
                                        {row.name}
                                    </td>
                                    <td className="text-muted-foreground whitespace-nowrap px-4 py-3">
                                        {row.email}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <span
                                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                row.role === "Admin"
                                                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                    : row.role === "Editor"
                                                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                                      : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                                            }`}
                                        >
                                            {row.role}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination - Responsive */}
            <FullPagination
                pagination={pagination}
                showInfo={true}
                showItemRange={true}
                showPerPage={true}
                perPageOptions={[5, 10, 20, 50]}
                showFirstLast={false}
                className="flex-wrap justify-between gap-2"
            />
        </div>
    );
};
