import React from "react";

// SVG Icon for the logo - a simple, abstract fiber-like shape
const FiberUIIcon = () => (
    <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-slate-800"
    >
        <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
            fill="currentColor"
            fillOpacity="0.1"
        />
        <path
            d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M18 12C18 8.69 15.31 6 12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="2 2"
        />
    </svg>
);

// Main App Component
export default function App() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-800 font-sans p-4 antialiased">
            <main className="flex flex-col items-center justify-center text-center w-full max-w-2xl mx-auto">
                {/* Logo and Header */}
                <div className="mb-8 flex flex-col items-center gap-4">
                    <FiberUIIcon />
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
                        Fiber UI
                    </h1>
                    <div className="mt-2">
                        <span className="inline-block bg-teal-100 text-teal-800 text-sm font-semibold px-3 py-1 rounded-full">
                            Coming Soon
                        </span>
                    </div>
                </div>

                {/* Goal Description */}
                <p className="mt-4 max-w-xl text-lg md:text-xl text-slate-600 leading-relaxed">
                    An open-source component library for React, designed for
                    accessibility and elegance. We&apos;re building on the
                    shoulders of giants to help you create stunning user
                    interfaces faster than ever.
                </p>

                {/* Tech Stack Mention */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#0ea5e9"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="font-semibold text-slate-700">
                            Powered by React Aria
                        </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                                stroke="#38bdf8"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6"
                                stroke="#38bdf8"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="font-semibold text-slate-700">
                            Styled with Tailwind CSS
                        </span>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="absolute bottom-0 left-0 w-full p-6 text-center">
                <p className="text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} fiberui.com
                </p>
            </footer>
        </div>
    );
}
