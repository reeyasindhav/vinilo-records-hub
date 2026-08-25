import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Vinilo" },
      {
        name: "description",
        content:
          "Get in touch with the Vinilo team for support, seller questions, or partnerships.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", form);
    setSubmitted(true);
    toast("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="paper-grain">
      <section className="border-b border-border bg-background/80">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <p className="label-mono text-primary">Reach out</p>
          <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] leading-[0.95]">
            Contact <em className="text-primary">us</em>
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Questions about buying, selling, or anything else? We usually reply within a few hours.
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    required
                    className="h-11"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    required
                    className="h-11"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  className="h-11"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  required
                  className="h-11"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  required
                  className="min-h-[160px] resize-y"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <Button type="submit" className="label-mono h-11 rounded-sm px-6">
                Send message
              </Button>
              {submitted && (
                <p className="text-sm text-muted-foreground">
                  Thanks for reaching out. We'll be in touch.
                </p>
              )}
            </form>

            <div className="space-y-6">
              <div className="border border-border bg-card p-6 shadow-sleeve">
                <p className="label-mono text-muted-foreground">Email</p>
                <p className="mt-1 text-sm">support@vinilo.market</p>
              </div>
              <div className="border border-border bg-card p-6 shadow-sleeve">
                <p className="label-mono text-muted-foreground">Phone</p>
                <p className="mt-1 text-sm">+1 (347) 555-0199</p>
              </div>
              <div className="border border-border bg-card p-6 shadow-sleeve">
                <p className="label-mono text-muted-foreground">Address</p>
                <p className="mt-1 text-sm">12 Crate Lane, Brooklyn, NY 11201</p>
              </div>
              <div className="border border-border bg-card p-6 shadow-sleeve">
                <p className="label-mono text-muted-foreground">Hours</p>
                <p className="mt-1 text-sm">Mon–Fri, 9am–6pm ET</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
