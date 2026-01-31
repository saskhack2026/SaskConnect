"use client";

import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { EmergencyAlertBanner } from "@/components/emergency-alert-banner";
import { NetworkStatus } from "@/components/network-status";
import { CrownCorpCard, type CrownCorp } from "@/components/crown-corp-card";
import { SOSButton } from "@/components/sos-button";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  Wifi,
  Users,
  Radio,
  MapPin,
  Clock,
  Smartphone,
} from "lucide-react";

const crownCorps: CrownCorp[] = [
  {
    id: "sasktel",
    name: "SaskTel",
    shortName: "SaskTel",
    description:
      "Telecommunications services including phone, internet, and TV. Report outages or connectivity issues.",
    status: "operational",
    responseTime: "~3 min",
    activeAgents: 24,
    color: "#00843D",
    icon: "phone",
  },
  {
    id: "saskpower",
    name: "SaskPower",
    shortName: "SaskPower",
    description:
      "Electrical services for the province. Report power outages, downed lines, or electrical hazards.",
    status: "limited",
    responseTime: "~5 min",
    activeAgents: 18,
    color: "#0066B3",
    icon: "zap",
  },
  {
    id: "saskenergy",
    name: "SaskEnergy",
    shortName: "SaskEnergy",
    description:
      "Natural gas delivery services. Report gas leaks, odors, or service disruptions immediately.",
    status: "operational",
    responseTime: "~2 min",
    activeAgents: 15,
    color: "#FF6B00",
    icon: "flame",
  },
  {
    id: "sgi",
    name: "SGI Canada",
    shortName: "SGI",
    description:
      "Insurance and vehicle registration services. Report accidents, claims, or licensing issues.",
    status: "operational",
    responseTime: "~4 min",
    activeAgents: 12,
    color: "#8B0000",
    icon: "shield",
  },
];

const features = [
  {
    icon: Radio,
    title: "Peer-to-Peer Connectivity",
    description:
      "Connect directly with other devices when traditional networks fail. Your messages hop between peers to reach their destination.",
  },
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description:
      "All communications are encrypted from your device to the recipient. Your data stays private, even on shared peer networks.",
  },
  {
    icon: Wifi,
    title: "Offline-First Design",
    description:
      "Queue messages when offline. They'll automatically send when connection is restored through any available network.",
  },
  {
    icon: Users,
    title: "Community Network",
    description:
      "Every connected device strengthens the network. Help relay messages for others during emergencies.",
  },
];

const stats = [
  { value: "2,450+", label: "Active Peers" },
  { value: "99.7%", label: "Message Delivery" },
  { value: "<30s", label: "Avg. Response" },
  { value: "24/7", label: "Availability" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <EmergencyAlertBanner />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-secondary/20 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="max-w-2xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                  <Radio className="h-4 w-4" />
                  Saskatchewan Emergency Network
                </div>

                <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                  Stay Connected When It{" "}
                  <span className="text-primary">Matters Most</span>
                </h1>

                <p className="mb-8 text-lg text-muted-foreground leading-relaxed text-pretty">
                  A peer-to-peer emergency communication platform connecting
                  Saskatchewan residents with Crown corporations during network
                  disruptions. When traditional networks fail, SaskConnect keeps
                  you connected.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/dashboard">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/help">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto bg-transparent"
                    >
                      Learn How It Works
                    </Button>
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>E2E Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>GPS Location Sharing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-primary" />
                    <span>PWA Enabled</span>
                  </div>
                </div>
              </div>

              {/* Network Status Card */}
              <div className="lg:pl-8">
                <NetworkStatus
                  connectionType="p2p"
                  signalStrength={78}
                  activePeers={12}
                  bandwidth={2.4}
                  latency={45}
                />

                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-border bg-card p-4 text-center"
                    >
                      <p className="text-2xl font-bold text-primary">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Crown Corporations Section */}
        <section className="border-t border-border bg-muted/30 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl text-balance">
                Connect with Saskatchewan Crown Corporations
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
                Quick access to essential services. Report issues, get support,
                and stay informed during emergencies.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {crownCorps.map((corp) => (
                <CrownCorpCard key={corp.id} corp={corp} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/dashboard">
                <Button variant="outline" size="lg">
                  View All Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl text-balance">
                How Peer-to-Peer Communication Works
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
                SaskConnect creates a resilient mesh network that keeps you
                connected even when traditional infrastructure fails.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-primary px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground sm:text-4xl text-balance">
              Ready for Any Emergency
            </h2>
            <p className="mb-8 text-lg text-primary-foreground/80 text-pretty">
              Download SaskConnect as a Progressive Web App and stay prepared.
              Works offline, syncs automatically when connected.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="font-semibold"
              >
                Install App
                <Smartphone className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/onboarding">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Clock className="mr-2 h-5 w-5" />
                  Take a Quick Tour
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-background px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <Radio className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-bold text-foreground">
                    SaskConnect
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Peer-to-peer emergency communication for Saskatchewan.
                </p>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-semibold text-foreground">
                  Services
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/dashboard" className="hover:text-foreground">
                      SaskTel
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="hover:text-foreground">
                      SaskPower
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="hover:text-foreground">
                      SaskEnergy
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="hover:text-foreground">
                      SGI Canada
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-semibold text-foreground">
                  Resources
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/help" className="hover:text-foreground">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="/network" className="hover:text-foreground">
                      Network Status
                    </Link>
                  </li>
                  <li>
                    <Link href="/onboarding" className="hover:text-foreground">
                      Getting Started
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-semibold text-foreground">
                  Languages
                </h4>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    English
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground"
                  >
                    Français
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
              <p className="text-sm text-muted-foreground">
                © 2026 SaskConnect. Built for Saskatchewan.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-foreground">
                  Terms
                </Link>
                <Link href="/accessibility" className="hover:text-foreground">
                  Accessibility
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating SOS Button */}
      <SOSButton />
    </div>
  );
}
