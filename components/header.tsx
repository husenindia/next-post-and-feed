import Link from "next/link";
import NavLinks from "./navlinks";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-primary-dark shadow-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="text-3xl font-bold tracking-tight text-text-light"
        >
          Your Logo
        </Link>

        <nav className="flex items-center gap-3">

          <NavLinks />
    

        </nav>
      </div>
    </header>
  );
}