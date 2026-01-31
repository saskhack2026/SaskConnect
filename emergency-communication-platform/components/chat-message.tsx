"use client";

import { Check, CheckCheck, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  senderName: string;
  timestamp: Date;
  status: "pending" | "sent" | "delivered" | "read" | "failed";
  isVerified?: boolean;
  attachments?: {
    type: "image" | "document" | "location";
    name: string;
    url?: string;
  }[];
}

interface ChatMessageProps {
  message: Message;
}

const statusIcons = {
  pending: Clock,
  sent: Check,
  delivered: CheckCheck,
  read: CheckCheck,
  failed: AlertCircle,
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user";
  const StatusIcon = statusIcons[message.status];

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
      role="listitem"
    >
      <div
        className={`max-w-[85%] sm:max-w-[70%] ${isUser ? "order-2" : "order-1"}`}
      >
        {/* Sender info */}
        <div
          className={`mb-1 flex items-center gap-2 ${isUser ? "justify-end" : "justify-start"}`}
        >
          <span className="text-xs font-medium text-muted-foreground">
            {message.senderName}
          </span>
          {message.isVerified && !isUser && (
            <Badge
              variant="outline"
              className="h-4 px-1 text-[10px] bg-primary/10 text-primary border-primary/20"
            >
              Verified Agent
            </Badge>
          )}
        </div>

        {/* Message bubble */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-muted text-foreground rounded-bl-md"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>

          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.attachments.map((attachment, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 rounded-lg p-2 ${
                    isUser ? "bg-primary-foreground/10" : "bg-background"
                  }`}
                >
                  {attachment.type === "location" && (
                    <span className="text-xs">
                      Location shared: {attachment.name}
                    </span>
                  )}
                  {attachment.type === "image" && (
                    <span className="text-xs">Image: {attachment.name}</span>
                  )}
                  {attachment.type === "document" && (
                    <span className="text-xs">Document: {attachment.name}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Timestamp and status */}
        <div
          className={`mt-1 flex items-center gap-1.5 ${isUser ? "justify-end" : "justify-start"}`}
        >
          <span className="text-[10px] text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {isUser && (
            <StatusIcon
              className={`h-3 w-3 ${
                message.status === "read"
                  ? "text-primary"
                  : message.status === "failed"
                    ? "text-destructive"
                    : "text-muted-foreground"
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
