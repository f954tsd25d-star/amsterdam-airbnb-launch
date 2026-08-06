import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, ArrowLeft, ArrowRight, ExternalLink, Sparkles } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/idke/30min";

const BNB_MAP_URL =
  "https://kaart.amsterdam.nl/vergunningen-bed-breakfast?pk_vid=928740301dba89d71784542844c17ca6";

type Answers = {
  ownership?: "own" | "rent" | "buying" | "other";
  permission?: "yes" | "no" | "not_asked";
  mortgage?: "yes" | "no" | "na";
  hosting_type?: "room" | "whole" | "not_sure";
  bnb_checked?: "yes" | "no";
  vve_checked?: "yes" | "no" | "na";
  insurance_checked?: "yes" | "no";
};

type Choice<K extends keyof Answers> = { value: NonNullable<Answers[K]>; label: string };

type Step =
  | { id: "ownership"; question: string; help?: string; choices: Choice<"ownership">[] }
  | { id: "permission"; question: string; help?: string; choices: Choice<"permission">[] }
  | { id: "mortgage"; question: string; help?: string; choices: Choice<"mortgage">[] }
  | { id: "hosting_type"; question: string; help?: string; choices: Choice<"hosting_type">[] }
  | { id: "bnb_checked"; question: string; help?: string; choices: Choice<"bnb_checked">[]; extra?: "bnb_map" }
  | { id: "vve_checked"; question: string; help?: string; choices: Choice<"vve_checked">[] }
  | { id: "insurance_checked"; question: string; help?: string; choices: Choice<"insurance_checked">[] };

function buildSteps(answers: Answers): Step[] {
  const steps: Step[] = [
    {
      id: "ownership",
      question: "Do you own or rent the property?",
      help: "This helps us understand the basics of your situation.",
      choices: [
        { value: "own", label: "I own it" },
        { value: "rent", label: "I rent" },
        { value: "buying", label: "I'm buying" },
        { value: "other", label: "Other" },
      ],
    },
  ];

  if (answers.ownership === "rent") {
    steps.push({
      id: "permission",
      question: "Do you have written permission from your landlord?",
      help: "Most landlords need to explicitly allow short-stay hosting in writing.",
      choices: [
        { value: "yes", label: "Yes, in writing" },
        { value: "no", label: "No, not yet" },
        { value: "not_asked", label: "I haven't asked" },
      ],
    });
  }

  if (answers.ownership === "own" || answers.ownership === "buying") {
    steps.push({
      id: "mortgage",
      question: "Have you checked your mortgage provider's rules?",
      help: "Some mortgages restrict short-stay rentals — worth a quick check.",
      choices: [
        { value: "yes", label: "Yes, I've checked" },
        { value: "no", label: "Not yet" },
        { value: "na", label: "No mortgage" },
      ],
    });
  }

  steps.push(
    {
      id: "hosting_type",
      question: "How do you plan to host?",
      help: "Different setups follow different rules in Amsterdam.",
      choices: [
        { value: "room", label: "Rent a room while I'm living there" },
        { value: "whole", label: "Rent the whole home while I travel" },
        { value: "not_sure", label: "Not sure yet" },
      ],
    },
    {
      id: "bnb_checked",
      question: "Have you checked whether B&B permits are available in your neighbourhood?",
      help: "Amsterdam caps B&B permits per area. You can check the official map below.",
      choices: [
        { value: "yes", label: "Yes, I've checked" },
        { value: "no", label: "Not yet" },
      ],
      extra: "bnb_map",
    },
    {
      id: "vve_checked",
      question: "Have you checked your VvE (owners' association) rules?",
      help: "If you live in an apartment building, the VvE may have restrictions.",
      choices: [
        { value: "yes", label: "Yes, I've checked" },
        { value: "no", label: "Not yet" },
        { value: "na", label: "Not applicable" },
      ],
    },
    {
      id: "insurance_checked",
      question: "Have you checked that your insurance covers paying guests?",
      help: "Standard home insurance often doesn't cover short-stay guests.",
      choices: [
        { value: "yes", label: "Yes, I've checked" },
        { value: "no", label: "Not yet" },
      ],
    },
  );

  return steps;
}

function computeResult(answers: Answers): {
  headline: string;
  tone: "green" | "amber" | "neutral";
  summary: string;
  checklist: { done: boolean; label: string }[];
} {
  const checks: { done: boolean; label: string }[] = [];

  if (answers.ownership === "rent") {
    checks.push({
      done: answers.permission === "yes",
      label: "Get written permission from your landlord",
    });
  }
  if (answers.ownership === "own" || answers.ownership === "buying") {
    checks.push({
      done: answers.mortgage === "yes" || answers.mortgage === "na",
      label: "Confirm your mortgage allows short-stay hosting",
    });
  }
  checks.push({
    done: answers.bnb_checked === "yes",
    label: "Check B&B permit availability for your neighbourhood",
  });
  checks.push({
    done: answers.vve_checked === "yes" || answers.vve_checked === "na",
    label: "Review VvE rules (if you're in an apartment building)",
  });
  checks.push({
    done: answers.insurance_checked === "yes",
    label: "Confirm your insurance covers paying guests",
  });

  const openItems = checks.filter((c) => !c.done).length;

  if (openItems === 0) {
    return {
      headline: "You're in a great starting position",
      tone: "green",
      summary:
        "Based on your answers, the essentials are in place. Next up is choosing the right permit path and getting your listing ready — I can help you nail down the details.",
      checklist: checks,
    };
  }
  if (openItems <= 2) {
    return {
      headline: "You're most of the way there",
      tone: "amber",
      summary:
        "There are a couple of things worth double-checking before you go live. Nothing scary — we can walk through them together on a quick call.",
      checklist: checks,
    };
  }
  return {
    headline: "A few things to sort out first",
    tone: "neutral",
    summary:
      "There are some important checks to run before hosting in Amsterdam. Good news: each one is manageable, and I'll help you tackle them in the right order.",
    checklist: checks,
  };
}

type Props = { open: boolean; onOpenChange: (open: boolean) => void };

export function HostingQuiz({ open, onOpenChange }: Props) {
  const [answers, setAnswers] = useState<Answers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<"quiz" | "result">("quiz");

  const steps = useMemo(() => buildSteps(answers), [answers]);
  const currentStep = steps[stepIndex];
  const result = useMemo(() => computeResult(answers), [answers]);

  const reset = () => {
    setAnswers({});
    setStepIndex(0);
    setPhase("quiz");
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setTimeout(reset, 200);
    }
    onOpenChange(next);
  };

  const selectAnswer = <K extends keyof Answers>(id: K, value: NonNullable<Answers[K]>) => {
    const nextAnswers = { ...answers, [id]: value } as Answers;
    setAnswers(nextAnswers);
    const nextSteps = buildSteps(nextAnswers);
    if (stepIndex + 1 >= nextSteps.length) {
      setPhase("result");
    } else {
      setStepIndex(stepIndex + 1);
    }
  };

  const goBack = () => {
    if (phase === "result") {
      setPhase("quiz");
      setStepIndex(steps.length - 1);
      return;
    }
    setStepIndex(Math.max(0, stepIndex - 1));
  };

  const progress =
    phase === "quiz" ? ((stepIndex + 1) / (steps.length + 1)) * 100 : 100;

  const toneClasses =
    result.tone === "green"
      ? "bg-lime/20 text-blue"
      : result.tone === "amber"
        ? "bg-yellow/30 text-black"
        : "bg-secondary/60 text-secondary-foreground";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl gap-0 overflow-hidden p-0">
        <div className="border-b border-border/60 bg-background px-6 pb-4 pt-6 sm:px-8">
          <DialogHeader className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              Quick check · about 2 minutes
            </div>
            <DialogTitle className="font-heading text-2xl leading-tight text-foreground sm:text-3xl">
              Can you legally host guests in Amsterdam?
            </DialogTitle>
            <DialogDescription className="text-base">
              A friendly walkthrough of the main checks — no judgment, just clarity.
            </DialogDescription>
          </DialogHeader>
          <Progress value={progress} className="mt-4 h-1.5" />
        </div>

        <div className="max-h-[65vh] overflow-y-auto px-6 py-6 sm:px-8">
          {phase === "quiz" && currentStep && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Step {stepIndex + 1} of {steps.length}
              </p>
              <h3 className="mt-2 font-heading text-xl font-semibold text-foreground sm:text-2xl">
                {currentStep.question}
              </h3>
              {currentStep.help && (
                <p className="mt-2 text-sm text-muted-foreground">{currentStep.help}</p>
              )}

              {"extra" in currentStep && currentStep.extra === "bnb_map" && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="mt-4"
                >
                  <a href={BNB_MAP_URL} target="_blank" rel="noreferrer noopener">
                    Open the Amsterdam B&B map
                    <ExternalLink className="ml-1 h-3.5 w-3.5" />
                  </a>
                </Button>
              )}

              <div className="mt-6 grid gap-3">
                {currentStep.choices.map((choice) => {
                  const selected =
                    (answers as Record<string, unknown>)[currentStep.id] === choice.value;
                  return (
                    <button
                      key={choice.value}
                      type="button"
                      onClick={() =>
                        selectAnswer(
                          currentStep.id as keyof Answers,
                          choice.value as never,
                        )
                      }
                      className={`group flex min-h-14 items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-base transition ${
                        selected
                          ? "border-terracotta bg-terracotta/10 text-foreground"
                          : "border-border bg-card text-foreground hover:border-terracotta hover:bg-terracotta/5"
                      }`}
                    >
                      <span className="font-medium">{choice.label}</span>
                      <ArrowRight
                        className={`h-4 w-4 shrink-0 transition ${
                          selected ? "text-terracotta" : "text-muted-foreground group-hover:text-terracotta"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {phase === "result" && (
            <div>
              <div className={`rounded-xl px-5 py-4 ${toneClasses}`}>
                <p className="text-xs font-semibold uppercase tracking-wide">Your result</p>
                <h3 className="mt-1 font-heading text-2xl font-bold">{result.headline}</h3>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {result.summary}
              </p>

              <div className="mt-6">
                <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
                  Your checklist
                </h4>
                <ul className="mt-3 space-y-2">
                  {result.checklist.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-start gap-3 rounded-lg border border-border/60 bg-card px-4 py-3"
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          item.done ? "bg-sage/25 text-forest" : "border border-border bg-background text-muted-foreground"
                        }`}
                      >
                        {item.done ? <Check className="h-3.5 w-3.5" /> : <span className="text-xs">•</span>}
                      </span>
                      <span
                        className={`text-sm ${item.done ? "text-muted-foreground line-through" : "text-foreground"}`}
                      >
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 rounded-xl bg-secondary/40 p-5">
                <p className="font-heading text-lg font-semibold text-foreground text-center">
                  Want help with the next steps?
                </p>
                <p className="mt-1 text-sm text-muted-foreground text-center">
                  Book a friendly 1-hour call — we'll go through your checklist together.
                </p>
                <div className="mt-4 overflow-hidden rounded-xl border border-border/60 bg-background">
                  <iframe
                    src={`${CALENDLY_URL}?hide_gdpr_banner=1`}
                    title="Book a call with Alessia"
                    loading="lazy"
                    className="h-[640px] w-full"
                  />
                </div>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Trouble with the embed?{" "}
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline underline-offset-2 hover:text-foreground"
                  >
                    Open Calendly in a new tab
                    <ExternalLink className="ml-1 inline h-3 w-3" />
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border/60 bg-background px-6 py-4 sm:px-8">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={goBack}
            disabled={phase === "quiz" && stepIndex === 0}
            className="text-muted-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
          <p className="text-xs text-muted-foreground">
            {phase === "result" ? "All done ✨" : "Your answers stay private."}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
