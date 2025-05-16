import Link from "next/link"

export default function Footer() {
  return (
     <footer className="w-full py-6 md:py-12 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">© 2025 You-can Measure. Created by Seid Yesuf.</p>
              <p className="text-xs text-muted-foreground">Contact: seidyesuf750@gmail.com | Phone: 0960417946</p>
            </div>
            <div className="flex gap-4">
              <Link href="/about" className="text-sm text-muted-foreground hover:underline">
                About
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
                Contact
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
  )
}
