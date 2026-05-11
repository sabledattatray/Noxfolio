'use client';

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What exactly is Noxfolio?',
    answer:
      'Noxfolio is an AI-powered automation and billing platform designed for high-performance SaaS. We transform how businesses operate by automating complex billing cycles, tasks, and workflows with zero friction.',
  },
  {
    question: 'How does the AI automation work?',
    answer:
      'Our engine uses advanced machine learning models to analyze your operational patterns. It can predict churn, optimize task routing, and automate repetitive tasks that usually require hours of manual work.',
  },
  {
    question: 'Can I integrate with my existing tools?',
    answer:
      'Absolutely. Noxfolio is built for developers. We offer native integrations with Stripe, Razorpay, WhatsApp, Slack, and 2,000+ other apps via our REST API and Zapier integration.',
  },
  {
    question: 'Is my financial data secure?',
    answer:
      'Security is our top priority. We are SOC2 Type II compliant and use bank-grade 256-bit encryption for all data. We never store raw credit card information; everything is vaulted securely.',
  },
  {
    question: 'Do you offer a free trial?',
    answer:
      'Yes! Every new account starts with a 3-day free trial that includes 50 free credits. You can explore all features, including AI automation, without a credit card.',
  },
  {
    question: 'How do credits work?',
    answer:
      "Noxfolio uses a transparent credit-based model. You only pay for what you use—whether it's an AI task execution, an automated workflow, or a specialized API call.",
  },
];

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="bg-background relative overflow-hidden py-20">
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-full w-full -translate-x-1/2">
        <div className="absolute top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.02)_0%,transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 space-y-3 text-center">
          <div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black tracking-widest uppercase">
            <HelpCircle className="h-3 w-3" />
            Common Questions
          </div>
          <h2 className="text-3xl font-extrabold tracking-tighter md:text-5xl">
            Everything you{' '}
            <span className="text-brand-gradient font-medium">
              need to know.
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base font-medium">
            Find answers to frequently asked questions about our AI-powered
            automation and global billing infrastructure.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-[1.5rem] border transition-all duration-500 ${activeIndex === index ? 'bg-card border-primary/30 shadow-primary/5 shadow-2xl' : 'bg-card/50 border-border hover:border-primary/20'}`}
            >
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                className="group flex w-full items-center justify-between p-5 text-left"
              >
                <span
                  className={`text-base font-bold tracking-tight transition-colors ${activeIndex === index ? 'text-primary' : 'text-foreground group-hover:text-primary/80'}`}
                >
                  {faq.question}
                </span>
                <div
                  className={`rounded-full p-1.5 transition-all duration-500 ${activeIndex === index ? 'bg-primary text-primary-foreground rotate-180' : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'}`}
                >
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>

              <div
                className={`grid transition-all duration-500 ease-in-out ${activeIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <div className="text-muted-foreground px-5 pb-5 text-sm leading-relaxed font-medium">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="bg-muted/30 border-border mt-12 rounded-[2rem] border p-6 text-center">
          <p className="text-muted-foreground mb-4 text-xs font-bold">
            Still have questions?
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button className="bg-foreground text-background rounded-full px-6 py-2 text-xs font-bold transition-all hover:opacity-90">
              Visit Help Center
            </button>
            <button className="border-border hover:bg-muted rounded-full border px-6 py-2 text-xs font-bold transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
