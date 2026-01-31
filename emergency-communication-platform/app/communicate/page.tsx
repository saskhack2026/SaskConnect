"use client";

import React from "react"

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { ChatMessage, type Message } from "@/components/chat-message";
import { ConnectionPanel } from "@/components/connection-panel";
import { SOSButton } from "@/components/sos-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Send,
  Paperclip,
  MapPin,
  AlertTriangle,
  Clock,
  ImageIcon,
  FileText,
  Mic,
  Phone,
  Zap,
  Flame,
  Shield,
  ArrowLeft,
  WifiOff,
} from "lucide-react";

const corpData = {
  sasktel: {
    name: "SaskTel",
    color: "#00843D",
    icon: Phone,
    welcomeMessage:
      "Welcome to SaskTel Support. How can we assist you today? For faster service, please describe your issue and location.",
  },
  saskpower: {
    name: "SaskPower",
    color: "#0066B3",
    icon: Zap,
    welcomeMessage:
      "Welcome to SaskPower Emergency Support. Please describe the electrical issue you're experiencing. If reporting downed power lines, please stay at least 10 meters away.",
  },
  saskenergy: {
    name: "SaskEnergy",
    color: "#FF6B00",
    icon: Flame,
    welcomeMessage:
      "Welcome to SaskEnergy Support. If you smell gas, please leave the area immediately and call from a safe location. How can we help you today?",
  },
  sgi: {
    name: "SGI Canada",
    color: "#8B0000",
    icon: Shield,
    welcomeMessage:
      "Welcome to SGI Canada Support. We're here to help with insurance claims, vehicle registration, or licensing. How can we assist you?",
  },
};

const priorityOptions = [
  { value: "normal", label: "Normal", icon: Clock },
  { value: "urgent", label: "Urgent", icon: AlertTriangle },
  { value: "emergency", label: "Emergency", icon: AlertTriangle },
];

function CommunicateContent() {
  const searchParams = useSearchParams();
  const corpId = (searchParams.get("corp") || "sasktel") as keyof typeof corpData;
  const corp = corpData[corpId] || corpData.sasktel;
  const CorpIcon = corp.icon;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: corp.welcomeMessage,
      sender: "agent",
      senderName: `${corp.name} Support`,
      timestamp: new Date(Date.now() - 60000),
      status: "read",
      isVerified: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("normal");
  const [isLocationSharing, setIsLocationSharing] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState<number>(0);
  const [isOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      senderName: "You",
      timestamp: new Date(),
      status: isOnline ? "sent" : "pending",
      attachments: isLocationSharing
        ? [{ type: "location", name: "Current Location" }]
        : undefined,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsLocationSharing(false);

    if (!isOnline) {
      setOfflineQueue((prev) => prev + 1);
    }

    // Simulate agent response
    if (isOnline) {
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === newMessage.id ? { ...m, status: "delivered" as const } : m
          )
        );
      }, 1000);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === newMessage.id ? { ...m, status: "read" as const } : m
          )
        );
      }, 2000);

      setTimeout(() => {
        const agentResponse: Message = {
          id: (Date.now() + 1).toString(),
          content:
            "Thank you for your message. I'm reviewing your request now. Can you please provide your account number or service address so I can look up your information?",
          sender: "agent",
          senderName: `${corp.name} Support`,
          timestamp: new Date(),
          status: "read",
          isVerified: true,
        };
        setMessages((prev) => [...prev, agentResponse]);
      }, 3500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <Navigation />

      <div className="flex flex-1 overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex flex-1 flex-col">
          {/* Chat Header */}
          <div
            className="border-b border-border bg-card px-4 py-3"
            style={{ borderTopColor: corp.color, borderTopWidth: "3px" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href="/dashboard">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${corp.color}15` }}
                >
                  <CorpIcon
                    className="h-5 w-5"
                    style={{ color: corp.color }}
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-card-foreground">
                    {corp.name}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Emergency Support
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  Verified
                </Badge>
              </div>
            </div>
          </div>

          {/* Offline Queue Banner */}
          {offlineQueue > 0 && (
            <div className="flex items-center justify-between bg-secondary/50 px-4 py-2">
              <div className="flex items-center gap-2 text-sm text-secondary-foreground">
                <WifiOff className="h-4 w-4" />
                <span>
                  {offlineQueue} message{offlineQueue > 1 ? "s" : ""} queued for
                  delivery
                </span>
              </div>
              <Badge variant="outline">Offline Mode</Badge>
            </div>
          )}

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-6"
            role="list"
            aria-label="Chat messages"
          >
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Composer */}
          <div className="border-t border-border bg-card p-4">
            {/* Priority & Options Row */}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="w-32 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <option.icon className="h-3 w-3" />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isLocationSharing ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setIsLocationSharing(!isLocationSharing)}
                      className="h-8"
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      Location
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share your current location</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {isLocationSharing && (
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  Location will be shared
                </Badge>
              )}
            </div>

            {/* Input Row */}
            <div className="flex items-end gap-2">
              <div className="flex gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10">
                        <Paperclip className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Attach file</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10">
                        <ImageIcon className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Attach image</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10">
                        <FileText className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Attach document</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10">
                        <Mic className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Voice input</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="relative flex-1">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="min-h-[44px] max-h-32 resize-none pr-16"
                  rows={1}
                />
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                  {inputValue.length}/500
                </div>
              </div>

              <Button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="h-[44px] min-w-[44px]"
                style={{ backgroundColor: corp.color }}
              >
                <Send className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Connection Panel - Desktop */}
        <aside className="hidden w-80 border-l border-border bg-muted/20 lg:block overflow-y-auto">
          <div className="p-4">
            <ConnectionPanel
              connectionQuality="good"
              signalStrength={72}
              hops={3}
              agentStatus="available"
              waitTime="~2 min"
            />
          </div>
        </aside>
      </div>

      <SOSButton />
    </div>
  );
}

export default function CommunicatePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <CommunicateContent />
    </Suspense>
  );
}
