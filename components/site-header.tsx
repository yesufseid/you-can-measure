import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Recycle } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <Recycle className="h-6 w-6 text-green-600" />
          <span className="font-bold text-xl">You-can Measure</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Link href="/measure">
            <Button variant="ghost">Measure</Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost">About</Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost">Contact</Button>
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
