"use client";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const InstallPWA: React.FC = () => {
  const [installed, setInstalled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

  useEffect(() => {
    const beforeInstallPromptHandler = (e: Event) => {
      // Prevents the default mini-infobar or install dialog from appearing on mobile
      e.preventDefault();
      // Save the event because you’ll need to trigger it later.
      setDeferredPrompt(e);
      // Show your customized install prompt for your PWA
    };

    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstallPromptHandler
      );
    };
  }, []);

  useEffect(() => {
    const appInstalledHandler = () => {
      //   showResult("✅ AppInstalled fired", true);
      setInstalled(true);
    };

    window.addEventListener("appinstalled", appInstalledHandler);

    return () => {
      window.removeEventListener("appinstalled", appInstalledHandler);
    };
  }, []);

  async function installApp() {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      //   showResult("🆗 Installation Dialog opened");
      // Find out whether the user confirmed the installation or not
      const { outcome } = await deferredPrompt.userChoice;
      // The deferredPrompt can only be used once.
      setDeferredPrompt(null);
      // Act on the user's choice
      if (outcome === "accepted") {
        // showResult("😀 User accepted the install prompt.", true);
      } else if (outcome === "dismissed") {
        // showResult("😟 User dismissed the install prompt");
      }
      // We hide the install button
    }
  }

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <DrawerContent>
        {installed ? (
          <div>App Installed</div>
        ) : (
          <div>
            <DrawerTitle>Install purp to your device</DrawerTitle>
            <Button
              onClick={async () => {
                await installApp();
              }}
            >
              Install
            </Button>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};
