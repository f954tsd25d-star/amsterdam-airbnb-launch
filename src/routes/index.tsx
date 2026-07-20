import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, MapPin, FileCheck2, Receipt, Camera, Building2, Coffee, Heart } from "lucide-react";
import livingRoom from "@/assets/living-room.jpg.asset.json";
import bedroom from "@/assets/bedroom.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "Thinking of hosting on Airbnb in Amsterdam? Book a friendly 1-hour call with Alessia and walk away knowing exactly how to get your permit, register, file taxes, and build a listing guests love.",
      },
    ],
  }),
});

const benefits = [
  {
    icon: FileCheck2,
    title: "Getting your permit",
    description:
      "Amsterdam has a permit system, a 30-night cap, and neighborhood rules. I'll help you figure out exactly which permit you need and how to apply — no legal jargon.",
  },
  {
    icon: Building2,
    title: "Registering as a business",
    description:
      "Do you need to register with the KvK? Should you host as a private person or set up a company? We'll go through your situation and pick the simplest path.",
  },
  {
    icon: Receipt,
    title: "Taxes, made human",
    description:
      "Tourist tax, VAT, income tax — I'll explain what applies to you, when to file, and what to keep track of. You'll leave with a simple system, not a headache.",
  },
  {
    icon: Camera,
    title: "A listing guests love",
    description:
      "Photos, title, description, pricing, house rules — the small choices that decide whether guests book you or scroll past. I'll walk you through it, step by step.",
  },
];

const steps = [
  {
    step: "01",
    title: "Book a time that suits you",
    description: "Pick a 1-hour slot — evenings and weekends work too.",
  },
  {
    step: "02",
    title: "Tell me a bit about you",
    description: "Your home, your goals, and the things you're stuck on. No question is too basic.",
  },
  {
    step: "03",
    title: "Leave with a clear plan",
    description: "A step-by-step checklist you can actually follow, plus a week of email follow-up.",
  },
];

const faqs = [
  {
    question: "Do I really need a permit to host on Airbnb in Amsterdam?",
    answer:
      "In most cases, yes. Amsterdam requires a short-stay permit or a B&B permit depending on how you host, plus a 30-night per year cap for regular short-stay. During the call we'll figure out which category you fall into and how to apply.",
  },
  {
    question: "Do I need to register a business with the KvK?",
    answer:
      "Sometimes yes, sometimes no — it depends on how often you host, whether you offer extra services, and your setup. We'll go through your case and land on the simplest option that keeps you compliant.",
  },
  {
    question: "What taxes will I actually pay?",
    answer:
      "You'll likely deal with tourist tax (collected from guests), income tax on your earnings, and possibly VAT depending on your setup. I'll explain each one in plain language and show you a simple way to track it.",
  },
  {
    question: "I've never done anything like this — is that okay?",
    answer:
      "Absolutely. Most of the people I talk to are first-time hosts. The call is judgment-free and every question is welcome — that's kind of the whole point.",
  },
  {
    question: "What if I already have a listing?",
    answer:
      "Great — we can review it together and focus on what would move the needle: pricing, photos, description, or fixing any compliance gaps.",
  },
  {
    question: "Can I cancel or reschedule?",
    answer:
      "Of course. You can reschedule or cancel up to 24 hours before the call for a full refund.",
  },
];

function Index() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" className="font-heading text-xl font-bold text-foreground">
            Hosting in Amsterdam
          </a>
          <Button asChild>
            <a href="#book">Book a call</a>
          </Button>
        </div>
      </header>

      <main>
        {/* Hero — split screen */}
        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary/50 px-3 py-1 text-xs font-semibold text-secondary-foreground">
              <Coffee className="h-3.5 w-3.5" />
              A friendly 1-hour call
            </span>
            <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Thinking of hosting your home on Airbnb?
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Amsterdam has a lot of rules, and Google doesn't always help. Hop on a
              relaxed 1-hour call with me and we'll figure out your permit, taxes,
              and listing together — no jargon, no pressure.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild className="text-base">
                <a href="#book">Book a call — €149</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base">
                <a href="#about">Meet Alessia</a>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-sage" />
                First-time hosts welcome
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-sage" />
                Step-by-step checklist
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-sage" />
                A week of email follow-up
              </li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted lg:aspect-auto lg:h-[600px]">
              <img
                src={livingRoom.url}
                alt="Sunlit Amsterdam living room with plants, wooden furniture, and a cozy sofa"
                className="h-full w-full object-cover"
                width={1920}
                height={1440}
              />
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-t border-border/50 bg-muted/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                The four things every new host worries about
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We'll cover exactly these in our call — tailored to your home and your situation.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="border-border/60 bg-card">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60">
                      <benefit.icon className="h-5 w-5 text-forest" />
                    </div>
                    <CardTitle className="mt-4 font-heading text-xl">{benefit.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {benefit.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Alessia */}
        <section id="about" className="py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
            <div className="order-2 lg:order-1">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted lg:aspect-auto lg:h-[560px]">
                <img
                  src={bedroom.url}
                  alt="Cozy Amsterdam bedroom with green bedding, artwork, and warm afternoon light"
                  className="h-full w-full object-cover"
                  width={1920}
                  height={1440}
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary/50 px-3 py-1 text-xs font-semibold text-secondary-foreground">
                <Heart className="h-3.5 w-3.5" />
                Hi, I'm Alessia
              </span>
              <h2 className="mt-6 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                A friendly guide who's been through it
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  I'm Italian and I've been lucky enough to live in a lot of places. I studied
                  design in New York, built a publishing house in the US, and ran a startup
                  incubator in Nigeria — bootstrapping most of the way.
                </p>
                <p>
                  I love to create — through work, food, color, dance, or music. I love
                  learning, meeting new people, and exploring new places. And I equally love
                  a cozy evening at home.
                </p>
                <p>
                  These days I work a chill job that gives me space to play around and build
                  the next thing. Helping first-time hosts in Amsterdam get set up — without
                  the overwhelm — is one of the things I genuinely enjoy.
                </p>
              </div>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <a href="#book">Book a call with me</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-t border-border/50 bg-muted/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                How it works
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Three simple steps — no forms to fill out before we even talk.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {steps.map((item) => (
                <div key={item.step} className="relative text-center">
                  <span className="font-heading text-6xl font-extrabold text-terracotta/20">
                    {item.step}
                  </span>
                  <h3 className="mt-2 font-heading text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing + Booking */}
        <section id="book" className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              {/* Pricing card */}
              <Card className="border-border/60 bg-card">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">1-hour consultation</CardTitle>
                  <CardDescription className="text-base">
                    A relaxed video call where we go through your home, your questions, and
                    exactly what to do next.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-5xl font-bold text-foreground">€149</span>
                    <span className="text-muted-foreground">one-time</span>
                  </div>
                  <ul className="space-y-3 text-foreground">
                    {[
                      "60-minute private video call",
                      "Permit and registration walkthrough",
                      "Plain-language tax overview",
                      "Listing feedback and pricing tips",
                      "Step-by-step action checklist",
                      "7 days of email follow-up",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-sage" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Booking form */}
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8">
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Say hi and book a time
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Drop me a quick note and I'll reply within 24 hours with some available
                  times. No payment yet — we'll sort that once we've picked a slot.
                </p>
                {submitted ? (
                  <div className="mt-8 rounded-xl bg-secondary/40 p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage/20">
                      <Check className="h-6 w-6 text-forest" />
                    </div>
                    <h4 className="mt-4 font-heading text-lg font-semibold text-foreground">
                      Got it — thank you!
                    </h4>
                    <p className="mt-2 text-muted-foreground">
                      Thanks, {formData.name || "there"}. I'll be in touch within 24 hours with
                      some times that could work.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your name</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        placeholder="Alex"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">What's on your mind?</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        placeholder="A sentence or two about your home and what you're hoping to figure out."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full text-base">
                      Send my message
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      Prefer email? Write me at{" "}
                      <a href="mailto:hello@example.com" className="underline">
                        hello@example.com
                      </a>
                      .
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border/50 bg-muted/30 py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Questions people usually ask
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                And if yours isn't here — just ask on the form above.
              </p>
            </div>
            <Accordion type="single" collapsible className="mt-12">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="font-heading text-left text-base font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-terracotta py-16 text-primary-foreground lg:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Let's make hosting feel simple
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              One hour, one clear plan, and someone in your corner. Book a call and we'll take
              it from there.
            </p>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="mt-8 border-cream bg-transparent text-cream hover:bg-cream/10 hover:text-cream"
            >
              <a href="#book">Book your €149 call</a>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Hosting in Amsterdam — made with{" "}
              <MapPin className="inline h-3.5 w-3.5" /> by Alessia.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="mailto:hello@example.com" className="hover:text-foreground">
                hello@example.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
