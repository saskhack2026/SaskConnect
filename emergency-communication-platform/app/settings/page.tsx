"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { SOSButton } from "@/components/sos-button";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Accessibility,
  Contrast,
  Globe,
  Smartphone,
  Shield,
  Trash2,
  Download,
  Info,
  ExternalLink,
  Moon,
  Sun,
} from "lucide-react";

export default function SettingsPage() {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("system");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">Settings</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="mt-2 text-muted-foreground">
            Configure app preferences and accessibility options
          </p>
        </div>

        <div className="space-y-6">
          {/* Accessibility Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Accessibility className="h-5 w-5 text-primary" />
                <CardTitle>Accessibility</CardTitle>
              </div>
              <CardDescription>
                Customize the app for your accessibility needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base flex items-center gap-2">
                    <Contrast className="h-4 w-4" />
                    High Contrast Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Increase contrast for better outdoor visibility
                  </p>
                </div>
                <Switch checked={highContrast} onCheckedChange={setHighContrast} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Large Text</Label>
                  <p className="text-sm text-muted-foreground">
                    Increase font size throughout the app
                  </p>
                </div>
                <Switch checked={largeText} onCheckedChange={setLargeText} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Reduce Motion</Label>
                  <p className="text-sm text-muted-foreground">
                    Minimize animations and transitions
                  </p>
                </div>
                <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
              </div>
            </CardContent>
          </Card>

          {/* Language & Appearance */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <CardTitle>Language & Appearance</CardTitle>
              </div>
              <CardDescription>
                Set your preferred language and visual theme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Language / Langue</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        System Default
                      </div>
                    </SelectItem>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        Dark
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* App Installation */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                <CardTitle>App Installation</CardTitle>
              </div>
              <CardDescription>
                Install SaskConnect for offline access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                    <Smartphone className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">
                      Install as App
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add SaskConnect to your home screen for quick access and
                      offline functionality. Works even without internet.
                    </p>
                    <Button className="mt-4" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Install App
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Privacy & Security</CardTitle>
              </div>
              <CardDescription>
                Manage your data and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">
                    End-to-End Encryption
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  All your messages are encrypted. Only you and the recipient
                  can read them.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Export My Data
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="flex-1 text-destructive hover:text-destructive bg-transparent">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete My Data
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete all your data?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete your account, communication
                        history, and all personal information. This action cannot
                        be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete Everything
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle>About SaskConnect</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version</span>
                  <span className="text-foreground">1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Build</span>
                  <span className="text-foreground">2026.01.31</span>
                </div>
              </div>

              <hr className="border-border" />

              <div className="flex flex-col gap-2">
                <Link
                  href="/help"
                  className="flex items-center justify-between rounded-lg p-2 hover:bg-muted"
                >
                  <span className="text-sm text-foreground">Help Center</span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link
                  href="/privacy"
                  className="flex items-center justify-between rounded-lg p-2 hover:bg-muted"
                >
                  <span className="text-sm text-foreground">Privacy Policy</span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link
                  href="/terms"
                  className="flex items-center justify-between rounded-lg p-2 hover:bg-muted"
                >
                  <span className="text-sm text-foreground">Terms of Service</span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Link>
              </div>

              <p className="text-xs text-muted-foreground text-center pt-2">
                Built for Saskatchewan residents. Made with care.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <SOSButton />
    </div>
  );
}
