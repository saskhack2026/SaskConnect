"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { SOSButton } from "@/components/sos-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Radio,
  Shield,
  Wifi,
  AlertTriangle,
  Phone,
  MessageSquare,
  MapPin,
  Battery,
  HelpCircle,
} from "lucide-react";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "What is SaskConnect?",
        a: "SaskConnect is a peer-to-peer emergency communication platform that connects Saskatchewan residents with Crown corporations (SaskTel, SaskPower, SaskEnergy, and SGI) during network disruptions. It uses mesh networking technology to maintain connectivity even when traditional networks fail.",
      },
      {
        q: "How do I start using SaskConnect?",
        a: "Simply open the app and you'll automatically connect to the P2P network. You can then select the Crown corporation you need to contact and start communicating. For the best experience, enable location and notification permissions when prompted.",
      },
      {
        q: "Do I need to create an account?",
        a: "No account is required to use SaskConnect during emergencies. However, creating a profile with your service addresses and account numbers can help expedite assistance during emergencies.",
      },
    ],
  },
  {
    category: "P2P Network",
    questions: [
      {
        q: "How does peer-to-peer communication work?",
        a: "Your device connects directly with nearby devices to form a mesh network. Messages hop between these connected devices until they reach their destination. This means you can communicate even when cell towers or internet services are down, as long as there are other SaskConnect users nearby.",
      },
      {
        q: "What happens if I'm the only user in my area?",
        a: "If there are no nearby peers, your messages will be queued and automatically sent when you connect to other users or when traditional network connectivity is restored. The app indicates queued messages clearly.",
      },
      {
        q: "Does using SaskConnect drain my battery?",
        a: "SaskConnect is optimized for low power consumption. However, during emergencies when it's actively relaying messages, battery usage may increase. We recommend keeping your device charged when possible during emergencies.",
      },
    ],
  },
  {
    category: "Security & Privacy",
    questions: [
      {
        q: "Are my messages secure?",
        a: "Yes, all messages are end-to-end encrypted. This means only you and the intended recipient can read them. Even when your messages are relayed through other devices, those devices cannot access the content.",
      },
      {
        q: "Can other users see my location?",
        a: "Your location is only shared when you explicitly choose to share it with a Crown corporation agent. Other peer devices that relay your messages cannot see your location or message content.",
      },
      {
        q: "How is my data handled?",
        a: "Your communication history is stored securely and retained for 90 days. You can export or delete your data at any time through the Profile settings. We never sell or share your personal information.",
      },
    ],
  },
  {
    category: "Emergency Situations",
    questions: [
      {
        q: "When should I use the SOS button?",
        a: "The SOS button should be used in genuine emergencies when you need immediate assistance. It sends your location to emergency responders and alerts nearby peers. For non-life-threatening issues, please use the regular communication channels.",
      },
      {
        q: "What if I smell gas?",
        a: "If you smell natural gas, immediately leave the area and go to a safe location before using SaskConnect to contact SaskEnergy. Do not use any electrical devices near the suspected leak. Also call 911 if the situation seems dangerous.",
      },
      {
        q: "How do I report a downed power line?",
        a: "Stay at least 10 meters away from any downed power line and assume it's energized. Use SaskConnect to contact SaskPower with your location. If anyone is in immediate danger, also call 911.",
      },
    ],
  },
];

const quickLinks = [
  {
    icon: Phone,
    title: "Contact Support",
    description: "Get help from our team",
    href: "/communicate",
  },
  {
    icon: AlertTriangle,
    title: "Report an Issue",
    description: "Submit a bug report",
    href: "/communicate",
  },
  {
    icon: Radio,
    title: "Network Status",
    description: "Check system health",
    href: "/network",
  },
  {
    icon: MapPin,
    title: "Service Map",
    description: "View coverage areas",
    href: "/network",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Help Center
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Find answers to common questions about SaskConnect
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-12 text-base"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.title} href={link.href}>
                <Card className="h-full transition-colors hover:border-primary/30">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">
                          {link.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Key Features */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Radio className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">
                    Mesh Networking
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Connect directly with nearby devices when networks fail
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">
                    End-to-End Encryption
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your messages are private and secure
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Wifi className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">
                    Offline-First
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Messages queue when offline, send when connected
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Battery className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">
                    Low Power Mode
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Optimized for extended battery life during emergencies
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>

          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((category) => (
              <div key={category.category}>
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  {category.category}
                </h3>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.category}-${index}`}
                      className="rounded-lg border border-border bg-card px-4"
                    >
                      <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold text-card-foreground">
                No results found
              </h3>
              <p className="mt-2 text-muted-foreground">
                Try searching with different keywords
              </p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <Card className="mt-12 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                <MessageSquare className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">
                  Still need help?
                </h3>
                <p className="text-muted-foreground">
                  Our support team is available to assist you with any questions
                  or issues.
                </p>
              </div>
              <Link href="/communicate">
                <Button>Contact Support</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      <SOSButton />
    </div>
  );
}
