"use client";

import { useIndexedDB } from "@repo/hooks/storage/use-indexed-db";

interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

/* SHOPPING CART - Persistent Cart */
export const Example2 = () => {
    const {
        data: cart,
        add,
        update,
        remove,
        clear,
        isLoading,
        isSupported,
    } = useIndexedDB<Product>({
        dbName: "shopApp",
        storeName: "cart",
        keyPath: "id",
    });

    if (!isSupported) {
        return (
            <div className="rounded-md border border-yellow-500/50 bg-yellow-500/10 p-4">
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    IndexedDB is not supported
                </p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <span className="text-muted-foreground text-sm">Loading...</span>
        );
    }

    const sampleProducts = [
        { id: "p1", name: "Laptop", price: 999, quantity: 1 },
        { id: "p2", name: "Mouse", price: 29, quantity: 1 },
        { id: "p3", name: "Keyboard", price: 79, quantity: 1 },
    ];

    const addToCart = async (product: Product) => {
        const existing = cart.find((p) => p.id === product.id);
        if (existing) {
            await update({ ...existing, quantity: existing.quantity + 1 });
        } else {
            await add(product);
        }
    };

    const updateQuantity = async (id: string, delta: number) => {
        const item = cart.find((p) => p.id === id);
        if (!item) return;
        if (item.quantity + delta <= 0) {
            await remove(id);
        } else {
            await update({ ...item, quantity: item.quantity + delta });
        }
    };

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            {/* Products */}
            <div className="flex flex-wrap gap-2">
                {sampleProducts.map((product) => (
                    <button
                        key={product.id}
                        className="hover:bg-muted rounded-md border px-3 py-1.5 text-sm"
                        onClick={() => addToCart(product)}
                    >
                        {product.name} (${product.price})
                    </button>
                ))}
            </div>

            {/* Cart */}
            <div className="rounded-md border">
                <div className="bg-muted/50 border-b px-4 py-2">
                    <span className="text-sm font-medium">
                        Cart ({cart.length} items)
                    </span>
                </div>
                {cart.length === 0 ? (
                    <p className="text-muted-foreground p-4 text-sm">
                        Cart is empty
                    </p>
                ) : (
                    <div className="divide-y">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between px-4 py-2"
                            >
                                <span className="text-sm">{item.name}</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        className="bg-muted rounded px-2 py-0.5 text-xs"
                                        onClick={() =>
                                            updateQuantity(item.id, -1)
                                        }
                                    >
                                        -
                                    </button>
                                    <span className="text-sm">
                                        {item.quantity}
                                    </span>
                                    <button
                                        className="bg-muted rounded px-2 py-0.5 text-xs"
                                        onClick={() =>
                                            updateQuantity(item.id, 1)
                                        }
                                    >
                                        +
                                    </button>
                                    <span className="ml-2 text-sm font-medium">
                                        ${item.price * item.quantity}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div className="bg-muted/50 flex items-center justify-between px-4 py-2">
                            <span className="text-sm font-medium">
                                Total: ${total}
                            </span>
                            <button
                                className="text-destructive text-xs hover:underline"
                                onClick={clear}
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
