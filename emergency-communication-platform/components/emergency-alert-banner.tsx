"use client";

import { useState } from "react";
import { AlertTriangle, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmergencyAlert {
  id: string;
  title: string;
  description: string;
  severity: "warning" | "emergency";
  timestamp: string;
  region: string;
}

interface EmergencyAlertBannerProps {
  alerts?: EmergencyAlert[];
}

const defaultAlerts: EmergencyAlert[] = [
  {
    id: "1",
    title: "Severe Winter Storm Warning",
    description:
      "Environment Canada has issued a severe winter storm warning for central Saskatchewan. Expected snowfall of 25-35cm with winds gusting to 70km/h. Visibility may be significantly reduced.",
    severity: "warning",
    timestamp: "2 hours ago",
    region: "Central Saskatchewan",
  },
];

export function EmergencyAlertBanner({
  alerts = defaultAlerts,
}: EmergencyAlertBannerProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  const activeAlerts = alerts.filter(
    (alert) => !dismissedAlerts.includes(alert.id)
  );

  if (activeAlerts.length === 0) return null;

  const primaryAlert = activeAlerts[0];
  const isEmergency = primaryAlert.severity === "emergency";

  return (
    <div
      className={`w-full ${isEmergency ? "bg-destructive" : "bg-secondary"}`}
      role="alert"
      aria-live="polite"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`rounded-full p-1.5 ${isEmergency ? "bg-destructive-foreground/20" : "bg-secondary-foreground/20"}`}
            >
              <AlertTriangle
                className={`h-5 w-5 ${isEmergency ? "text-destructive-foreground" : "text-secondary-foreground"}`}
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-sm font-semibold ${isEmergency ? "text-destructive-foreground" : "text-secondary-foreground"}`}
              >
                {primaryAlert.title}
              </span>
              <span
                className={`text-xs ${isEmergency ? "text-destructive-foreground/80" : "text-secondary-foreground/80"}`}
              >
                {primaryAlert.region} • {primaryAlert.timestamp}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`h-8 px-2 ${isEmergency ? "text-destructive-foreground hover:bg-destructive-foreground/10" : "text-secondary-foreground hover:bg-secondary-foreground/10"}`}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              <span className="sr-only">
                {isExpanded ? "Collapse" : "Expand"} alert
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setDismissedAlerts([...dismissedAlerts, primaryAlert.id])
              }
              className={`h-8 px-2 ${isEmergency ? "text-destructive-foreground hover:bg-destructive-foreground/10" : "text-secondary-foreground hover:bg-secondary-foreground/10"}`}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss alert</span>
            </Button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-2 pl-11">
            <p
              className={`text-sm ${isEmergency ? "text-destructive-foreground/90" : "text-secondary-foreground/90"}`}
            >
              {primaryAlert.description}
            </p>
          </div>
        )}

        {activeAlerts.length > 1 && (
          <div className="mt-2 pl-11">
            <span
              className={`text-xs font-medium ${isEmergency ? "text-destructive-foreground/70" : "text-secondary-foreground/70"}`}
            >
              +{activeAlerts.length - 1} more alert
              {activeAlerts.length > 2 ? "s" : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
