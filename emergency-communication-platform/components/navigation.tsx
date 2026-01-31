"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Radio,
  Menu,
  Shield,
  Wifi,
  WifiOff,
  Settings,
  User,
} from "lucide-react";

interface NavigationProps {
  isConnected?: boolean;
}

export function Navigation({ isConnected = true }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Radio className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight text-foreground">
              SaskConnect
            </span>
            <span className="text-xs text-muted-foreground">
              Emergency P2P Network
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Services
          </Link>
          <Link
            href="/communicate"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Communicate
          </Link>
          <Link
            href="/network"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Network Status
          </Link>
          <Link
            href="/help"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Help
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Connection Status */}
          <div
            className={`hidden items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium sm:flex ${
              isConnected
                ? "bg-primary/10 text-primary"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {isConnected ? (
              <Wifi className="h-4 w-4" />
            ) : (
              <WifiOff className="h-4 w-4" />
            )}
            <span>{isConnected ? "Connected" : "Offline Mode"}</span>
          </div>

          {/* Security Badge */}
          <div className="hidden items-center gap-1.5 text-xs text-muted-foreground lg:flex">
            <Shield className="h-3.5 w-3.5" />
            <span>E2E Encrypted</span>
          </div>

          {/* Profile Button */}
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>

          {/* Settings Button */}
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="mt-8 flex flex-col gap-4">
                {/* Mobile Connection Status */}
                <div
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                    isConnected
                      ? "bg-primary/10 text-primary"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {isConnected ? (
                    <Wifi className="h-4 w-4" />
                  ) : (
                    <WifiOff className="h-4 w-4" />
                  )}
                  <span>{isConnected ? "Connected" : "Offline Mode"}</span>
                </div>

                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/communicate"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Communicate
                </Link>
                <Link
                  href="/network"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Network Status
                </Link>
                <Link
                  href="/help"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Help
                </Link>
                <hr className="my-2 border-border" />
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
