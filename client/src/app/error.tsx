"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function Error({
    error,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Runtime Error caught by Error Boundary:", error);
    }, [error]);

    return (
        <Link href="/">
            <div
                className="w-screen h-screen overflow-hidden bg-black cursor-pointer"
                title="Click anywhere to return Home"
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source
                        src="/Caveman_animates_404_error_page_20260910104600.mp4"
                        type="video/mp4"
                    />
                </video>
            </div>
        </Link>
    );
}