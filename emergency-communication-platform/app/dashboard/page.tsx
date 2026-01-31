"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { EmergencyAlertBanner } from "@/components/emergency-alert-banner";
import { CrownCorpCard, type CrownCorp } from "@/components/crown-corp-card";
import { SOSButton } from "@/components/sos-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  MapPin,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Radio,
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

const regions = [
  "All Regions",
  "Regina",
  "Saskatoon",
  "Prince Albert",
  "Moose Jaw",
  "Swift Current",
  "North Battleford",
  "Yorkton",
  "Estevan",
];

const urgencyLevels = [
  { value: "all", label: "All Urgency Levels" },
  { value: "emergency", label: "Emergency" },
  { value: "urgent", label: "Urgent" },
  { value: "normal", label: "Normal" },
];

const serviceTypes = [
  { value: "all", label: "All Services" },
  { value: "telecommunications", label: "Telecommunications" },
  { value: "power", label: "Power & Electrical" },
  { value: "gas", label: "Natural Gas" },
  { value: "insurance", label: "Insurance & Licensing" },
];

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedUrgency, setSelectedUrgency] = useState("all");
  const [selectedService, setSelectedService] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCorps = crownCorps.filter((corp) => {
    const matchesSearch =
      corp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      corp.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesService =
      selectedService === "all" ||
      (selectedService === "telecommunications" && corp.id === "sasktel") ||
      (selectedService === "power" && corp.id === "saskpower") ||
      (selectedService === "gas" && corp.id === "saskenergy") ||
      (selectedService === "insurance" && corp.id === "sgi");

    return matchesSearch && matchesService;
  });

  const operationalCount = crownCorps.filter(
    (c) => c.status === "operational"
  ).length;
  const limitedCount = crownCorps.filter((c) => c.status === "limited").length;
  const disruptedCount = crownCorps.filter(
    (c) => c.status === "disrupted"
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <EmergencyAlertBanner />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Services</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Crown Corporation Services
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Connect with Saskatchewan&apos;s essential service providers
          </p>
        </div>

        {/* Status Overview */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Radio className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">
                  {crownCorps.length}
                </p>
                <p className="text-sm text-muted-foreground">Total Services</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">
                  {operationalCount}
                </p>
                <p className="text-sm text-muted-foreground">Operational</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/50">
                <TrendingUp className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">
                  {limitedCount}
                </p>
                <p className="text-sm text-muted-foreground">Limited Service</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">
                  {disruptedCount}
                </p>
                <p className="text-sm text-muted-foreground">Disrupted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:w-auto"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {(selectedRegion !== "All Regions" ||
                selectedUrgency !== "all" ||
                selectedService !== "all") && (
                <Badge variant="secondary" className="ml-2">
                  Active
                </Badge>
              )}
            </Button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-card-foreground">
                    <MapPin className="mr-1 inline h-4 w-4" />
                    Region
                  </label>
                  <Select
                    value={selectedRegion}
                    onValueChange={setSelectedRegion}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-card-foreground">
                    <Clock className="mr-1 inline h-4 w-4" />
                    Urgency Level
                  </label>
                  <Select
                    value={selectedUrgency}
                    onValueChange={setSelectedUrgency}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-card-foreground">
                    <Filter className="mr-1 inline h-4 w-4" />
                    Service Type
                  </label>
                  <Select
                    value={selectedService}
                    onValueChange={setSelectedService}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedRegion("All Regions");
                    setSelectedUrgency("all");
                    setSelectedService("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Corporation Cards Grid */}
        {filteredCorps.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredCorps.map((corp) => (
              <CrownCorpCard key={corp.id} corp={corp} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold text-card-foreground">
              No services found
            </h3>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchQuery("");
                setSelectedRegion("All Regions");
                setSelectedUrgency("all");
                setSelectedService("all");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Quick Info */}
        <div className="mt-12 rounded-xl border border-border bg-muted/30 p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Need Immediate Assistance?
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </div>
              <div>
                <p className="font-medium text-foreground">Gas Emergency</p>
                <p className="text-sm text-muted-foreground">
                  If you smell gas, evacuate and call SaskEnergy immediately
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/50">
                <AlertTriangle className="h-4 w-4 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Power Outage</p>
                <p className="text-sm text-muted-foreground">
                  Report downed lines or outages to SaskPower
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Radio className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Network Issues</p>
                <p className="text-sm text-muted-foreground">
                  Contact SaskTel for connectivity problems
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SOSButton />
    </div>
  );
}
