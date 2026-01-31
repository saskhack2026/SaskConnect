"use client";

import {
  Wifi,
  Radio,
  Shield,
  Clock,
  Users,
  Signal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PeerNode {
  id: string;
  distance: string;
  signalStrength: number;
  isRelaying: boolean;
}

interface ConnectionPanelProps {
  connectionQuality: "excellent" | "good" | "fair" | "poor";
  signalStrength: number;
  hops: number;
  relayNodes: PeerNode[];
  agentStatus: "available" | "busy" | "offline";
  waitTime?: string;
}

const qualityConfig = {
  excellent: { label: "Excellent", color: "text-primary", bg: "bg-primary" },
  good: { label: "Good", color: "text-primary", bg: "bg-primary" },
  fair: {
    label: "Fair",
    color: "text-secondary-foreground",
    bg: "bg-secondary",
  },
  poor: { label: "Poor", color: "text-destructive", bg: "bg-destructive" },
};

const agentStatusConfig = {
  available: { label: "Available", className: "bg-primary/10 text-primary" },
  busy: { label: "Busy", className: "bg-secondary text-secondary-foreground" },
  offline: {
    label: "Offline",
    className: "bg-destructive/10 text-destructive",
  },
};

export function ConnectionPanel({
  connectionQuality = "good",
  signalStrength = 72,
  hops = 3,
  relayNodes = [],
  agentStatus = "available",
  waitTime = "~2 min",
}: Partial<ConnectionPanelProps>) {
  const [isExpanded, setIsExpanded] = useState(true);
  const quality = qualityConfig[connectionQuality];
  const status = agentStatusConfig[agentStatus];

  const defaultNodes: PeerNode[] =
    relayNodes.length > 0
      ? relayNodes
      : [
          { id: "peer-1", distance: "0.3 km", signalStrength: 85, isRelaying: true },
          { id: "peer-2", distance: "1.2 km", signalStrength: 68, isRelaying: true },
          { id: "peer-3", distance: "2.8 km", signalStrength: 52, isRelaying: false },
        ];

  return (
    <div className="rounded-xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${quality.bg} animate-pulse`} />
          <span className="text-sm font-semibold text-card-foreground">
            Connection Status
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-8 w-8 p-0"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Quality indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Signal className={`h-4 w-4 ${quality.color}`} />
              <span className={`text-sm font-medium ${quality.color}`}>
                {quality.label}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {signalStrength}%
            </span>
          </div>
          <Progress value={signalStrength} className="h-2" />

          {/* Connection details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-muted/50 p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Radio className="h-3 w-3" />
                <span>Network Hops</span>
              </div>
              <p className="text-lg font-semibold text-card-foreground">
                {hops}
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Users className="h-3 w-3" />
                <span>Relay Peers</span>
              </div>
              <p className="text-lg font-semibold text-card-foreground">
                {defaultNodes.filter((n) => n.isRelaying).length}
              </p>
            </div>
          </div>

          {/* Agent status */}
          <div className="rounded-lg border border-border p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-card-foreground">
                Support Agent
              </span>
              <Badge variant="outline" className={status.className}>
                {status.label}
              </Badge>
            </div>
            {agentStatus !== "offline" && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Est. wait time: {waitTime}</span>
              </div>
            )}
          </div>

          {/* Peer nodes visualization */}
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Wifi className="h-3 w-3" />
              <span>Connected Peers</span>
            </div>
            <div className="space-y-2">
              {defaultNodes.map((node) => (
                <div
                  key={node.id}
                  className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${
                        node.isRelaying ? "bg-primary" : "bg-muted-foreground"
                      }`}
                    />
                    <span className="text-xs text-card-foreground">
                      {node.id}
                    </span>
                    {node.isRelaying && (
                      <Badge
                        variant="outline"
                        className="h-4 px-1 text-[9px] bg-primary/10 text-primary border-primary/20"
                      >
                        Relaying
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{node.distance}</span>
                    <span>{node.signalStrength}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security badge */}
          <div className="flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-xs text-primary">
              End-to-end encrypted connection
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
