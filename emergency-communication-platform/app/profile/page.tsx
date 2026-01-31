"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { SOSButton } from "@/components/sos-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  User,
  Bell,
  Wifi,
  Shield,
  MapPin,
  Clock,
  Radio,
  MessageSquare,
  TrendingUp,
  Settings,
  Save,
  History,
  Download,
} from "lucide-react";

interface CommunicationLog {
  id: string;
  corporation: string;
  date: string;
  status: "resolved" | "pending" | "closed";
  summary: string;
}

const communicationHistory: CommunicationLog[] = [
  {
    id: "1",
    corporation: "SaskPower",
    date: "Jan 28, 2026",
    status: "resolved",
    summary: "Power outage report - Main Street area",
  },
  {
    id: "2",
    corporation: "SaskTel",
    date: "Jan 25, 2026",
    status: "resolved",
    summary: "Internet connectivity issues",
  },
  {
    id: "3",
    corporation: "SGI",
    date: "Jan 20, 2026",
    status: "closed",
    summary: "Vehicle registration inquiry",
  },
];

const statusConfig = {
  resolved: { label: "Resolved", className: "bg-primary/10 text-primary" },
  pending: { label: "Pending", className: "bg-secondary text-secondary-foreground" },
  closed: { label: "Closed", className: "bg-muted text-muted-foreground" },
};

export default function ProfilePage() {
  const [autoConnect, setAutoConnect] = useState(true);
  const [lowDataMode, setLowDataMode] = useState(false);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [serviceUpdates, setServiceUpdates] = useState(true);
  const [networkNotifications, setNetworkNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">Profile</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="connection">
              <Wifi className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Connection</span>
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Your contact details for emergency reporting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Alex" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Johnson" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="alex.johnson@email.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (306) 555-0123" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Service Address</Label>
                  <Input id="address" defaultValue="123 Prairie View Drive" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="Saskatoon" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" defaultValue="S7N 1A1" />
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full sm:w-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Account IDs */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Service Account Numbers</CardTitle>
                <CardDescription>
                  Link your accounts for faster emergency reporting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sasktel">SaskTel Account</Label>
                    <Input id="sasktel" placeholder="Account number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="saskpower">SaskPower Account</Label>
                    <Input id="saskpower" placeholder="Account number" defaultValue="****-****-7892" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="saskenergy">SaskEnergy Account</Label>
                    <Input id="saskenergy" placeholder="Account number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sgi">SGI Policy Number</Label>
                    <Input id="sgi" placeholder="Policy number" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Alert Preferences</CardTitle>
                <CardDescription>
                  Configure how you receive emergency and service notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Emergency Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive critical emergency broadcasts (recommended)
                    </p>
                  </div>
                  <Switch checked={emergencyAlerts} onCheckedChange={setEmergencyAlerts} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Service Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about service status changes
                    </p>
                  </div>
                  <Switch checked={serviceUpdates} onCheckedChange={setServiceUpdates} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Network Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Alerts when new peers connect or disconnect
                    </p>
                  </div>
                  <Switch checked={networkNotifications} onCheckedChange={setNetworkNotifications} />
                </div>

                <hr className="border-border" />

                <div className="space-y-2">
                  <Label>Alert Sound</Label>
                  <Select defaultValue="emergency">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency">Emergency Tone</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="gentle">Gentle</SelectItem>
                      <SelectItem value="none">Silent (Vibrate Only)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Connection Tab */}
          <TabsContent value="connection">
            <Card>
              <CardHeader>
                <CardTitle>Connection Settings</CardTitle>
                <CardDescription>
                  Manage your P2P network preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-Connect</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically join the P2P network on startup
                    </p>
                  </div>
                  <Switch checked={autoConnect} onCheckedChange={setAutoConnect} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Low Data Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Reduce data usage (may affect message delivery)
                    </p>
                  </div>
                  <Switch checked={lowDataMode} onCheckedChange={setLowDataMode} />
                </div>

                <hr className="border-border" />

                <div className="space-y-2">
                  <Label>Data Usage Limit</Label>
                  <Select defaultValue="unlimited">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                      <SelectItem value="100mb">100 MB/day</SelectItem>
                      <SelectItem value="50mb">50 MB/day</SelectItem>
                      <SelectItem value="25mb">25 MB/day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Network Contribution Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Network Contribution</CardTitle>
                <CardDescription>
                  Your contribution to the emergency network
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border border-border p-4 text-center">
                    <Radio className="mx-auto mb-2 h-6 w-6 text-primary" />
                    <p className="text-2xl font-bold text-foreground">1,247</p>
                    <p className="text-xs text-muted-foreground">Messages Relayed</p>
                  </div>
                  <div className="rounded-lg border border-border p-4 text-center">
                    <TrendingUp className="mx-auto mb-2 h-6 w-6 text-primary" />
                    <p className="text-2xl font-bold text-foreground">342 MB</p>
                    <p className="text-xs text-muted-foreground">Data Contributed</p>
                  </div>
                  <div className="rounded-lg border border-border p-4 text-center">
                    <Clock className="mx-auto mb-2 h-6 w-6 text-primary" />
                    <p className="text-2xl font-bold text-foreground">127 hrs</p>
                    <p className="text-xs text-muted-foreground">Network Uptime</p>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Contribution Level</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary">Silver</Badge>
                  </div>
                  <Progress value={68} className="h-2" />
                  <p className="mt-1 text-xs text-muted-foreground">
                    32% to Gold contributor status
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Communication History</CardTitle>
                <CardDescription>
                  Your past interactions with Crown corporations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communicationHistory.map((log) => {
                    const status = statusConfig[log.status];
                    return (
                      <div
                        key={log.id}
                        className="flex items-start justify-between rounded-lg border border-border p-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-foreground">
                              {log.corporation}
                            </span>
                            <Badge variant="outline" className={status.className}>
                              {status.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {log.summary}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {log.date}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex justify-center">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export History
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Data Retention Notice */}
            <Card className="mt-6 border-border bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Data Retention</p>
                    <p className="text-sm text-muted-foreground">
                      Your communication history is stored securely and retained for 90 days.
                      You can request deletion of your data at any time through Settings.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <SOSButton />
    </div>
  );
}
