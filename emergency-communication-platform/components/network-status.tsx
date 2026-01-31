"use client";

import { Wifi, Radio, Satellite, Signal } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface NetworkStatusProps {
  connectionType: "p2p" | "satellite" | "cellular" | "wifi";
  signalStrength: number; // 0-100
  activePeers: number;
  bandwidth: number; // Mbps
  latency: number; // ms
}

const connectionIcons = {
  p2p: Radio,
  satellite: Satellite,
  cellular: Signal,
  wifi: Wifi,
};

const connectionLabels = {
  p2p: "P2P Network",
  satellite: "Satellite",
  cellular: "Cellular",
  wifi: "WiFi",
};

export function NetworkStatus({
  connectionType = "p2p",
  signalStrength = 78,
  activePeers = 12,
  bandwidth = 2.4,
  latency = 45,
}: Partial<NetworkStatusProps>) {
  const ConnectionIcon = connectionIcons[connectionType];

  const getSignalColor = (strength: number) => {
    if (strength >= 70) return "bg-primary";
    if (strength >= 40) return "bg-secondary";
    return "bg-destructive";
  };

  const getSignalTextColor = (strength: number) => {
    if (strength >= 70) return "text-primary";
    if (strength >= 40) return "text-secondary-foreground";
    return "text-destructive";
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-card-foreground">
          Network Status
        </h3>
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 animate-pulse rounded-full ${getSignalColor(signalStrength)}`}
          />
          <span className={`text-xs font-medium ${getSignalTextColor(signalStrength)}`}>
            {signalStrength >= 70
              ? "Strong"
              : signalStrength >= 40
                ? "Moderate"
                : "Weak"}
          </span>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <ConnectionIcon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-card-foreground">
            {connectionLabels[connectionType]}
          </p>
          <p className="text-xs text-muted-foreground">
            {activePeers} active peers
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Signal Strength
            </span>
            <span className="text-xs font-medium text-card-foreground">
              {signalStrength}%
            </span>
          </div>
          <Progress value={signalStrength} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted/50 p-2">
            <p className="text-xs text-muted-foreground">Bandwidth</p>
            <p className="text-sm font-semibold text-card-foreground">
              {bandwidth} Mbps
            </p>
          </div>
          <div className="rounded-lg bg-muted/50 p-2">
            <p className="text-xs text-muted-foreground">Latency</p>
            <p className="text-sm font-semibold text-card-foreground">
              {latency}ms
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
