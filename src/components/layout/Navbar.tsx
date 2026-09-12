"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/pazar-yeri", label: "Pazar Yeri" },
  { href: "/cozumler", label: "Çözümler" },
  { href: "/surdurulebilirlik", label: "Sürdürülebilirlik" },
  { href: "/bilgi-merkezi", label: "Bilgi Merkezi" },
  { href: "/hakkimizda", label: "Hakkımızda" },
];

type NavbarProps = {
  isLoggedIn: boolean;
  panelHref: string;
};

export function Navbar({ isLoggedIn, panelHref }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 shadow-[0_1px_0_0_rgba(0,0,0,0.02)] backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary text-primary-foreground shadow-sm">
            <Leaf className="h-4.5 w-4.5" />
          </span>
          <span className="font-semibold">
            Sürdürülebilir<span className="text-primary"> Market</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-md px-3.5 py-2 text-sm transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {isLoggedIn ? (
            <Button nativeButton={false} render={<Link href={panelHref} />}>
              Panele Git
            </Button>
          ) : (
            <>
              <Button variant="ghost" nativeButton={false} render={<Link href="/giris" />}>
                Giriş Yap
              </Button>
              <Button nativeButton={false} render={<Link href="/iletisim" />}>
                Demo Talep Et
              </Button>
            </>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menüyü aç" />
            }
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>Menü</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm text-foreground hover:bg-muted"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                {isLoggedIn ? (
                  <Button
                    nativeButton={false}
                    onClick={() => setOpen(false)}
                    render={<Link href={panelHref} />}
                  >
                    Panele Git
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      nativeButton={false}
                      onClick={() => setOpen(false)}
                      render={<Link href="/giris" />}
                    >
                      Giriş Yap
                    </Button>
                    <Button
                      nativeButton={false}
                      onClick={() => setOpen(false)}
                      render={<Link href="/iletisim" />}
                    >
                      Demo Talep Et
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
