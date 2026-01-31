"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { SOSButton } from "@/components/sos-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Radio,
  Wifi,
  Signal,
  Satellite,
  MapPin,
  Users,
  Activity,
  Clock,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface RegionStatus {
  name: string;
  status: "operational" | "degraded" | "outage";
  activePeers: number;
  coverage: number;
}

const regions: RegionStatus[] = [
  { name: "Regina", status: "operational", activePeers: 847, coverage: 94 },
  { name: "Saskatoon", status: "operational", activePeers: 1203, coverage: 96 },
  { name: "Prince Albert", status: "degraded", activePeers: 234, coverage: 78 },
  { name: "Moose Jaw", status: "operational", activePeers: 156, coverage: 88 },
  { name: "Swift Current", status: "operational", activePeers: 89, coverage: 82 },
  { name: "North Battleford", status: "outage", activePeers: 12, coverage: 23 },
  { name: "Yorkton", status: "operational", activePeers: 178, coverage: 85 },
  { name: "Estevan", status: "operational", activePeers: 67, coverage: 79 },
];

const statusConfig = {
  operational: {
    label: "Operational",
    className: "bg-primary/10 text-primary",
    icon: CheckCircle,
  },
  degraded: {
    label: "Degraded",
    className: "bg-secondary text-secondary-foreground",
    icon: AlertTriangle,
  },
  outage: {
    label: "Outage",
    className: "bg-destructive/10 text-destructive",
    icon: AlertTriangle,
  },
};

export default function NetworkPage() {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const totalPeers = regions.reduce((sum, r) => sum + r.activePeers, 0);
  const avgCoverage = Math.round(
    regions.reduce((sum, r) => sum + r.coverage, 0) / regions.length
  );
  const operationalCount = regions.filter(
    (r) => r.status === "operational"
  ).length;
  const issueCount = regions.filter((r) => r.status !== "operational").length;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const filteredRegions =
    selectedRegion === "all"
      ? regions
      : regions.filter((r) => r.name === selectedRegion);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Network Status</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Network Status
            </h1>
            <p className="mt-2 text-muted-foreground">
              Real-time P2P network health across Saskatchewan
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last updated: Just now</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">
                    {totalPeers.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Active Peers</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-primary">
                <TrendingUp className="h-3 w-3" />
                <span>+12% from yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Signal className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">
                    {avgCoverage}%
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Coverage</p>
                </div>
              </div>
              <Progress value={avgCoverage} className="mt-3 h-1.5" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">
                    {operationalCount}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Regions Online
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                of {regions.length} total regions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${issueCount > 0 ? "bg-destructive/10" : "bg-primary/10"}`}
                >
                  <AlertTriangle
                    className={`h-6 w-6 ${issueCount > 0 ? "text-destructive" : "text-primary"}`}
                  />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">
                    {issueCount}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Active Issues
                  </p>
                </div>
              </div>
              {issueCount > 0 && (
                <p className="mt-3 text-xs text-destructive">
                  Requires attention
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Connection Types */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Connection Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Radio className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">P2P Mesh</p>
                  <p className="text-xs text-muted-foreground">Primary</p>
                </div>
                <Badge className="ml-auto bg-primary/10 text-primary">
                  Active
                </Badge>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Wifi className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">WiFi</p>
                  <p className="text-xs text-muted-foreground">Available</p>
                </div>
                <Badge variant="outline" className="ml-auto">
                  Standby
                </Badge>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Signal className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">Cellular</p>
                  <p className="text-xs text-muted-foreground">Available</p>
                </div>
                <Badge variant="outline" className="ml-auto">
                  Standby
                </Badge>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Satellite className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">Satellite</p>
                  <p className="text-xs text-muted-foreground">Fallback</p>
                </div>
                <Badge variant="outline" className="ml-auto">
                  Ready
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Region Filter */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Regional Status
          </h2>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48">
              <MapPin className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region.name} value={region.name}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Region Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredRegions.map((region) => {
            const status = statusConfig[region.status];
            const StatusIcon = status.icon;
            return (
              <Card key={region.name}>
                <CardContent className="p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold text-card-foreground">
                      {region.name}
                    </h3>
                    <Badge variant="outline" className={status.className}>
                      <StatusIcon className="mr-1 h-3 w-3" />
                      {status.label}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Coverage</span>
                        <span className="font-medium text-card-foreground">
                          {region.coverage}%
                        </span>
                      </div>
                      <Progress value={region.coverage} className="h-1.5" />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Active Peers</span>
                      <span className="font-medium text-card-foreground">
                        {region.activePeers.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Activity className="h-3 w-3" />
                      <span>
                        {region.status === "operational"
                          ? "All systems normal"
                          : region.status === "degraded"
                            ? "Some connectivity issues"
                            : "Major outage in progress"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Network Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Network Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  time: "2 min ago",
                  event: "New peer cluster formed in Regina downtown area",
                  type: "success",
                },
                {
                  time: "15 min ago",
                  event: "North Battleford coverage degraded due to weather",
                  type: "warning",
                },
                {
                  time: "1 hour ago",
                  event: "Prince Albert network stabilizing after brief outage",
                  type: "info",
                },
                {
                  time: "3 hours ago",
                  event: "System update deployed - improved relay efficiency",
                  type: "success",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg border border-border p-3"
                >
                  <div
                    className={`mt-0.5 h-2 w-2 rounded-full ${
                      activity.type === "success"
                        ? "bg-primary"
                        : activity.type === "warning"
                          ? "bg-secondary"
                          : "bg-muted-foreground"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.event}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <SOSButton />
    </div>
  );
}
