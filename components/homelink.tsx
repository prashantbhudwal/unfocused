"use client";
import { usePathname } from "next/navigation";
import Link from "./link";

export default function HomeLink() {
  const pathname = usePathname();
  const isActive = pathname === "/";
  return (
    <Link href="/" className={""}>
      <span>unFocused</span>
    </Link>
  );
}
