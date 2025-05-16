"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Recycle,Ellipsis } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export function SiteHeader() {
  const [open,setOpen]=useState(false)
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex gap-7 h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <Recycle className="h-6 w-6 text-green-600" />
          <span className="font-bold text-xl">You-can Measure</span>
        </Link>
        <nav className="ml-auto md:flex hidden items-center gap-4">
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
        <nav className="flex relative md:hidden gap-3 items-center ">
            <ModeToggle /> 
            <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="outline" size="icon">
                          <Ellipsis  className="flex items-center " /> 
                          <span className="sr-only">Toggle theme</span>
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                         <Link href="/measure">
                              <Button  onClick={()=>setOpen(false)} variant="ghost">Measure</Button>
                          </Link>
                    </DropdownMenuItem>
                      <DropdownMenuItem>
                         <Link href="/about">
                                 <Button onClick={()=>setOpen(false)} variant="ghost">About</Button>
                             </Link>
                    </DropdownMenuItem>
                       <DropdownMenuItem>
                         <Link href="/contact">
                                 <Button onClick={()=>setOpen(false)} variant="ghost">Contact</Button>
                            </Link> 
                    </DropdownMenuItem>         
                  </DropdownMenuContent>
                </DropdownMenu>
        </nav>
      </div>
    </header>
  )
}
