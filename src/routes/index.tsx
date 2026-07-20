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
import { Check, MapPin, ShieldCheck, TrendingUp, Calendar, MessageSquare, FileText } from "lucide-react";
import heroImage from "@/assets/hero-amsterdam.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "Book a private 1-hour consultation to start your Airbnb in Amsterdam. Get clarity on regulations, permits, pricing, and listing strategy from a local expert.",
      },
    ],
  }),
});

const benefits = [
  {
    icon: ShieldCheck,
    title: "Regulations decoded",
    description:
      "Understand Amsterdam's 30-day rule, permits, zoning restrictions, and tax obligations so you stay compliant from day one.",
  },
  {
    icon: TrendingUp,
    title: "Revenue forecast",
    description:
      "Get a realistic pricing strategy and occupancy estimate based on your neighborhood, property type, and seasonality.",
  },
  {
    icon: MapPin,
    title: "Setup roadmap",
    description:
      "Receive a clear action plan for listing optimization, photography, guest communication, and day-to-day operations.",
  },
];

const steps = [
  {
    step: "01",
    title: "Book your time",
    description: "Pick a 1-hour slot that works for your schedule.",
  },
  {
    step: "02",
    title: "Share your goal",
    description: "Tell me about your property, budget, or the listing you want to improve.",
  },
  {
    step: "03",
    title: "Get your plan",
    description: "Leave the call with a personalized checklist and next steps.",
  },
];

const faqs = [
  {
    question: "Do I need a permit to rent out my Amsterdam home on Airbnb?",
    answer:
      "In most cases, yes. Amsterdam has strict short-stay regulations, including a 30-day rental cap and a permit requirement for many properties. During the call, I'll review your specific situation and point you to the right permits.",
  },
  {
    question: "Is this consultation for new hosts only?",
    answer:
      "Not at all. New hosts use it to avoid costly mistakes, and existing hosts use it to optimize pricing, occupancy, and guest experience.",
  },
  {
    question: "What happens after I book?",
    answer:
      "You'll receive a confirmation email with a calendar invite and a short questionnaire. We'll use the questionnaire to make the hour as focused and useful as possible.",
  },
  {
    question: "Can I get a refund if I need to cancel?",
    answer:
      "Yes. You can reschedule or cancel up to 24 hours before the call for a full refund. Cancellations within 24 hours are non-refundable.",
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
            Amsterdam Airbnb Guide
          </a>
          <Button asChild>
            <a href="#book">Book consultation</a>
          </Button>
        </div>
      </header>

      <main>
        {/* Hero — split screen */}
        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary/50 px-3 py-1 text-xs font-semibold text-secondary-foreground">
              <MapPin className="h-3.5 w-3.5" />
              Amsterdam short-stay expertise
            </span>
            <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Start your Amsterdam Airbnb with confidence
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              A private 1-hour consultation with a local short-stay expert. Get clear on
              regulations, pricing, and positioning — before you invest.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild className="text-base">
                <a href="#book">Book your €149 consultation</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base">
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-sage" />
                100+ Amsterdam listings advised
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-sage" />
                Personalized action plan
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-sage" />
                7-day email follow-up
              </li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted lg:aspect-auto lg:h-[600px]">
              <img
                src={heroImage}
                alt="Bright living room in a classic Amsterdam canal house overlooking a quiet canal"
                className="h-full w-full object-cover"
                width={1024}
                height={1280}
              />
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-t border-border/50 bg-muted/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                What you'll get in one hour
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                No generic advice. Every recommendation is tailored to your property, your goals, and
                Amsterdam's fast-changing short-stay rules.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* How it works */}
        <section id="how-it-works" className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                How it works
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Three simple steps from booking to your personalized plan.
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
        <section id="book" className="border-t border-border/50 bg-muted/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              {/* Pricing card */}
              <Card className="border-border/60 bg-card">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">1-hour consultation</CardTitle>
                  <CardDescription className="text-base">
                    A focused video call to answer your biggest questions and map out your next
                    steps.
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
                      "Pre-call property questionnaire",
                      "Personalized action plan PDF",
                      "7-day email follow-up",
                      "Regulation and permit guidance",
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
                  Book your consultation
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Fill in your details and I'll be in touch within 24 hours to confirm a time.
                </p>
                {submitted ? (
                  <div className="mt-8 rounded-xl bg-secondary/40 p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage/20">
                      <Check className="h-6 w-6 text-forest" />
                    </div>
                    <h4 className="mt-4 font-heading text-lg font-semibold text-foreground">
                      Message received
                    </h4>
                    <p className="mt-2 text-muted-foreground">
                      Thanks, {formData.name || "there"}. I'll reply within 24 hours with available
                      times.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        placeholder="Your name"
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
                      <Label htmlFor="message">Tell me about your plans</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        placeholder="Do you already own a property? Are you renting? What's your biggest question?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full text-base">
                      Request booking
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      No payment taken yet. I'll confirm availability before you pay.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Quick answers to the most common questions.
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
              Ready to turn your Amsterdam property into income?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              Book a 1-hour consultation and get the clarity you need to move forward.
            </p>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="mt-8 border-cream bg-transparent text-cream hover:bg-cream/10 hover:text-cream"
            >
              <a href="#book">Book your €149 consultation</a>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Amsterdam Airbnb Guide. All rights reserved.
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
