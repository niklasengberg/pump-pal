import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { updateSettings } from "@/lib/storage";
import { t } from "@/lib/i18n";
import type { Language } from "@/lib/types";
import { Heart, PlusCircle, Sparkles, SlidersHorizontal } from "lucide-react";

type Step = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
};

const steps: Record<Language, Step[]> = {
  sv: [
    {
      icon: Heart,
      title: "Välkommen till PodTracker",
      body: "En enkel app som hjälper dig att hålla koll på var du senast placerade din insulinpump – så att du kan rotera platserna och undvika att överanvända samma ställe.",
    },
    {
      icon: PlusCircle,
      title: "Logga varje byte",
      body: "Tryck på Logga när du byter pump. Välj zon och sida (vänster eller höger) och spara. Du kan även logga historiska byten i efterhand.",
    },
    {
      icon: Sparkles,
      title: "Få förslag på nästa plats",
      body: "På Hem visas din nuvarande placering och förslag på platser som inte använts på ett tag. Appen påminner dig också när det är dags att byta.",
    },
    {
      icon: SlidersHorizontal,
      title: "Anpassa under Inställningar",
      body: "Under Inställningar kan du välja bytesintervall (2, 3 eller 7 dagar), språk – och exkludera placeringar du inte vill använda. Avmarkerade platser föreslås aldrig.",
    },
  ],
  en: [
    {
      icon: Heart,
      title: "Welcome to PodTracker",
      body: "A simple app that helps you keep track of where you last placed your insulin pump – so you can rotate spots and avoid overusing the same area.",
    },
    {
      icon: PlusCircle,
      title: "Log every change",
      body: "Tap Log when you change your pump. Pick a zone and side (left or right) and save. You can also log past changes after the fact.",
    },
    {
      icon: Sparkles,
      title: "Get next-spot suggestions",
      body: "Home shows your current placement and suggestions for spots that haven't been used in a while. The app also reminds you when it's time to change.",
    },
    {
      icon: SlidersHorizontal,
      title: "Customize in Settings",
      body: "In Settings you can choose the change interval (2, 3 or 7 days), language – and exclude placements you don't want to use. Unchecked spots are never suggested.",
    },
  ],
};

export function OnboardingDialog({ lang }: { lang: Language }) {
  const [index, setIndex] = useState(0);
  const list = steps[lang];
  const step = list[index];
  const Icon = step.icon;
  const isLast = index === list.length - 1;

  const next = () => {
    if (isLast) updateSettings({ onboardingDone: true });
    else setIndex((i) => i + 1);
  };

  return (
    <Dialog open>
      <DialogContent className="max-w-sm" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Icon className="size-6 text-primary" />
          </div>
          <DialogTitle className="text-center">{step.title}</DialogTitle>
          <DialogDescription className="text-center">{step.body}</DialogDescription>
        </DialogHeader>

        <div className="flex justify-center gap-1.5 py-1">
          {list.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {isLast && (
          <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">
            {t(lang, "disclaimer")}
          </div>
        )}

        <div className="flex gap-2">
          {!isLast && (
            <Button
              variant="ghost"
              className="flex-1"
              onClick={() => updateSettings({ onboardingDone: true })}
            >
              {lang === "sv" ? "Hoppa över" : "Skip"}
            </Button>
          )}
          <Button className="flex-1" onClick={next}>
            {isLast
              ? t(lang, "getStarted")
              : lang === "sv"
                ? "Nästa"
                : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
