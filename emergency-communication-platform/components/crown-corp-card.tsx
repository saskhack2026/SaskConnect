"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Zap,
  Flame,
  Shield,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react";

export interface CrownCorp {
  id: string;
  name: string;
  shortName: string;
  description: string;
  status: "operational" | "disrupted" | "limited";
  responseTime: string;
  activeAgents: number;
  color: string;
  icon: "phone" | "zap" | "flame" | "shield";
}

const icons = {
  phone: Phone,
  zap: Zap,
  flame: Flame,
  shield: Shield,
};

const statusConfig = {
  operational: {
    label: "Operational",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  disrupted: {
    label: "Disrupted",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  limited: {
    label: "Limited",
    className: "bg-secondary text-secondary-foreground border-secondary",
  },
};

interface CrownCorpCardProps {
  corp: CrownCorp;
}

export function CrownCorpCard({ corp }: CrownCorpCardProps) {
  const Icon = icons[corp.icon];
  const status = statusConfig[corp.status];

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
      <div
        className="absolute left-0 top-0 h-1 w-full"
        style={{ backgroundColor: corp.color }}
      />
      <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${corp.color}15` }}
          >
            <Icon className="h-6 w-6" style={{ color: corp.color }} />
          </div>
          <Badge variant="outline" className={status.className}>
            {status.label}
          </Badge>
        </div>

        <h3 className="mb-1 text-lg font-semibold text-card-foreground">
          {corp.name}
        </h3>
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {corp.description}
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{corp.responseTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{corp.activeAgents} agents</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-border bg-muted/30 p-4">
        <Link href={`/communicate?corp=${corp.id}`} className="w-full">
          <Button className="w-full group-hover:bg-primary/90" style={{ backgroundColor: corp.color }}>
            Connect Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
