"use client";

import { useState } from "react";
import { AlertCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export function SOSButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSOS = async () => {
    setIsSending(true);
    // Simulate sending SOS
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSending(false);
    setSent(true);
  };

  const resetDialog = () => {
    setSent(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-destructive text-destructive-foreground shadow-lg hover:bg-destructive/90 md:h-14 md:w-auto md:rounded-full md:px-6"
          aria-label="Emergency SOS"
        >
          <AlertCircle className="h-7 w-7 md:mr-2 md:h-5 md:w-5" />
          <span className="sr-only md:not-sr-only">SOS</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Emergency SOS
          </DialogTitle>
          <DialogDescription>
            {sent
              ? "Your emergency signal has been sent to all connected peers and emergency services."
              : "This will send an emergency signal with your location to all connected peers and emergency services."}
          </DialogDescription>
        </DialogHeader>

        {!sent ? (
          <div className="space-y-4 py-4">
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <h4 className="mb-2 text-sm font-medium text-foreground">
                What happens when you press SOS:
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  Your location is shared with emergency responders
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  All nearby peers are alerted
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  Emergency services are notified
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>
                For immediate emergencies, also call{" "}
                <strong className="text-foreground">911</strong>
              </span>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <AlertCircle className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Help is on the way. Stay calm and remain in a safe location if
              possible.
            </p>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          {!sent ? (
            <>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleSOS}
                disabled={isSending}
                className="min-w-32"
              >
                {isSending ? "Sending..." : "Send SOS Signal"}
              </Button>
            </>
          ) : (
            <Button onClick={resetDialog} className="w-full">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
