"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
        <Link
            href="/feed"
            className={clsx(
            "px-5 py-2 rounded-lg text-sm font-medium transition",
            pathname === "/feed"
                ? "bg-primary text-white"
                : "text-text-light/80 hover:text-white"
            )}
        >
            Feed
        </Link>

        <Link
            href="/new-post"
            className={clsx(
            "px-5 py-2 rounded-lg text-sm font-medium transition",
            pathname === "/new-post"
                ? "bg-primary text-white"
                : "text-text-light/80 hover:text-white"
            )}
        >
            New Post
        </Link>
    </>
    )
}