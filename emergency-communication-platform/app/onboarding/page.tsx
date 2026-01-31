"use client";

import React from "react"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Radio,
  Wifi,
  Shield,
  Users,
  MapPin,
  Bell,
  ArrowRight,
  ArrowLeft,
  Check,
  Smartphone,
} from "lucide-react";

interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  image?: string;
}

const steps: OnboardingStep[] = [
  {
    title: "Welcome to SaskConnect",
    description:
      "A peer-to-peer emergency communication platform connecting Saskatchewan residents with Crown corporations during network disruptions.",
    icon: Radio,
    features: [
      "Stay connected during emergencies",
      "Direct access to SaskTel, SaskPower, SaskEnergy, and SGI",
      "Works even when traditional networks fail",
    ],
  },
  {
    title: "How P2P Works",
    description:
      "When traditional networks are down, your device connects directly with other nearby devices to form a mesh network, allowing messages to hop between peers until they reach their destination.",
    icon: Wifi,
    features: [
      "Messages hop between nearby devices",
      "No central server required",
      "Automatically finds the best route",
      "Works offline with other nearby users",
    ],
  },
  {
    title: "Your Privacy Matters",
    description:
      "All communications are end-to-end encrypted. Your messages can only be read by you and the intended recipient, even when relayed through other devices.",
    icon: Shield,
    features: [
      "End-to-end encryption on all messages",
      "Relay nodes cannot read your content",
      "You control your data",
      "Verified Crown corporation agents",
    ],
  },
  {
    title: "Join the Network",
    description:
      "By using SaskConnect, you help strengthen the emergency network for everyone. Your device can relay messages for others during emergencies, building a stronger community.",
    icon: Users,
    features: [
      "Help your neighbors stay connected",
      "Contribute to emergency resilience",
      "Track your network contribution",
      "Earn contributor status",
    ],
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [permissionsGranted, setPermissionsGranted] = useState({
    location: false,
    notifications: false,
  });

  const step = steps[currentStep];
  const StepIcon = step.icon;
  const progress = ((currentStep + 1) / (steps.length + 1)) * 100;
  const isLastStep = currentStep === steps.length - 1;
  const isPermissionsStep = currentStep === steps.length;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: "geolocation" });
      if (result.state === "granted" || result.state === "prompt") {
        navigator.geolocation.getCurrentPosition(
          () => setPermissionsGranted((prev) => ({ ...prev, location: true })),
          () => setPermissionsGranted((prev) => ({ ...prev, location: false }))
        );
      }
    } catch {
      // Permission API not supported, try directly
      navigator.geolocation.getCurrentPosition(
        () => setPermissionsGranted((prev) => ({ ...prev, location: true })),
        () => setPermissionsGranted((prev) => ({ ...prev, location: false }))
      );
    }
  };

  const requestNotificationPermission = async () => {
    try {
      const result = await Notification.requestPermission();
      setPermissionsGranted((prev) => ({
        ...prev,
        notifications: result === "granted",
      }));
    } catch {
      console.log("Notifications not supported");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Radio className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">SaskConnect</span>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm">
              Skip
            </Button>
          </Link>
        </div>
      </header>

      {/* Progress */}
      <div className="px-4 pt-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <Progress value={progress} className="h-1" />
          <p className="mt-2 text-xs text-muted-foreground text-center">
            Step {Math.min(currentStep + 1, steps.length + 1)} of {steps.length + 1}
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-2xl">
          {!isPermissionsStep ? (
            <div className="text-center">
              {/* Icon */}
              <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10">
                <StepIcon className="h-12 w-12 text-primary" />
              </div>

              {/* Title & Description */}
              <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl text-balance">
                {step.title}
              </h1>
              <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground leading-relaxed text-pretty">
                {step.description}
              </p>

              {/* Features */}
              <div className="mx-auto max-w-md space-y-3 text-left">
                {step.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm text-card-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Permissions Step */
            <div className="text-center">
              <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10">
                <Smartphone className="h-12 w-12 text-primary" />
              </div>

              <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl text-balance">
                Enable Permissions
              </h1>
              <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground text-pretty">
                To provide the best emergency communication experience, we need
                a few permissions.
              </p>

              <div className="mx-auto max-w-md space-y-4">
                {/* Location Permission */}
                <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-card-foreground">
                        Location Access
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Share location during emergencies
                      </p>
                    </div>
                  </div>
                  {permissionsGranted.location ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={requestLocationPermission}
                    >
                      Allow
                    </Button>
                  )}
                </div>

                {/* Notification Permission */}
                <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-card-foreground">
                        Notifications
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Receive emergency alerts
                      </p>
                    </div>
                  </div>
                  {permissionsGranted.notifications ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={requestNotificationPermission}
                    >
                      Allow
                    </Button>
                  )}
                </div>

                <p className="text-xs text-muted-foreground pt-2">
                  You can change these permissions anytime in Settings
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="border-t border-border px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {/* Step Indicators */}
          <div className="flex gap-2">
            {[...Array(steps.length + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentStep
                    ? "bg-primary"
                    : index < currentStep
                      ? "bg-primary/50"
                      : "bg-muted"
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          {isPermissionsStep ? (
            <Link href="/dashboard">
              <Button>
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button onClick={handleNext}>
              {isLastStep ? "Continue" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}
