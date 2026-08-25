import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, CreditCard, Truck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getRecord } from "@/data/vinilo";
import { useVinilo } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Vinilo" },
      { name: "description", content: "Complete your vinyl order securely." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { crate, toggleCrate } = useVinilo();
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<"details" | "payment" | "success">("details");

  const items = crate.map((id) => getRecord(id)).filter(Boolean);
  const subtotal = items.reduce((a, r) => a + (r?.price ?? 0), 0);
  const shipping = subtotal >= 75 ? 0 : 5;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const next = () => {
    if (step === "details") {
      if (
        !form.firstName ||
        !form.lastName ||
        !form.email ||
        !form.address ||
        !form.city ||
        !form.zip
      ) {
        toast("Please fill in all shipping fields.");
        return;
      }
      setStep("payment");
      return;
    }

    if (step === "payment") {
      if (!form.cardName || !form.cardNumber || !form.expiry || !form.cvv) {
        toast("Please fill in all payment fields.");
        return;
      }
      setSubmitted(true);
      setStep("success");
      crate.forEach((id) => toggleCrate(id));
      toast("Order placed successfully!");
    }
  };

  if (items.length === 0 && step !== "success") {
    return (
      <div className="paper-grain flex min-h-[calc(100vh-8rem)] items-center justify-center px-5">
        <div className="animate-rise text-center">
          <p className="label-mono text-primary">Nothing to checkout</p>
          <h1 className="mt-3 text-[clamp(2rem,4vw,3rem)] leading-[0.95]">Your crate is empty</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Browse records and add them to your crate before checkout.
          </p>
          <Button asChild className="label-mono mt-8 h-11 rounded-sm px-6">
            <Link to="/browse">Browse records</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="paper-grain flex min-h-[calc(100vh-8rem)] items-center justify-center px-5">
        <div className="animate-rise text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] leading-[0.95]">Order confirmed</h1>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Thanks for your purchase. We&apos;ll send a confirmation to {form.email || "your email"}{" "}
            once your order ships.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild className="label-mono h-11 rounded-sm px-6">
              <Link to="/browse">Continue browsing</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="label-mono h-11 rounded-sm border-foreground/25 bg-transparent hover:bg-foreground hover:text-background"
            >
              <Link to="/">Back home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="paper-grain">
      <section className="border-b border-border bg-background/80">
        <div className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
          <Button
            asChild
            variant="ghost"
            className="label-mono h-auto px-0 text-muted-foreground hover:text-primary"
          >
            <Link to="/crate">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to crate
            </Link>
          </Button>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              <div className="border border-border bg-card p-6 shadow-sleeve">
                <h2 className="font-display text-2xl">
                  {step === "details" ? "Shipping details" : "Payment"}
                </h2>
                <p className="label-mono mt-1 text-muted-foreground">
                  {step === "details" ? "Where should we send your records?" : "Secure payment"}
                </p>
                <div className="mt-6 space-y-5">
                  {step === "details" ? (
                    <>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First name</Label>
                          <Input
                            id="firstName"
                            required
                            className="h-11"
                            value={form.firstName}
                            onChange={update("firstName")}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last name</Label>
                          <Input
                            id="lastName"
                            required
                            className="h-11"
                            value={form.lastName}
                            onChange={update("lastName")}
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
                          onChange={update("email")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          required
                          className="min-h-[80px] resize-y"
                          value={form.address}
                          onChange={update("address")}
                        />
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            required
                            className="h-11"
                            value={form.city}
                            onChange={update("city")}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">ZIP / Postal code</Label>
                          <Input
                            id="zip"
                            required
                            className="h-11"
                            value={form.zip}
                            onChange={update("zip")}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on card</Label>
                        <Input
                          id="cardName"
                          required
                          className="h-11"
                          value={form.cardName}
                          onChange={update("cardName")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card number</Label>
                        <Input
                          id="cardNumber"
                          required
                          className="h-11"
                          value={form.cardNumber}
                          onChange={update("cardNumber")}
                        />
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            required
                            className="h-11"
                            value={form.expiry}
                            onChange={update("expiry")}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            required
                            className="h-11"
                            value={form.cvv}
                            onChange={update("cvv")}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-border bg-card p-6 shadow-sleeve">
                <h3 className="font-display text-2xl">Order summary</h3>
                <div className="mt-4 space-y-3">
                  {items.map((r) => (
                    <div key={r!.id} className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{r!.title}</p>
                        <p className="label-mono text-muted-foreground">{r!.artist}</p>
                      </div>
                      <span className="label-mono text-primary">${r!.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="mt-3 flex justify-between border-t border-border pt-3 text-lg">
                    <span className="font-medium">Total</span>
                    <span className="font-display text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="border border-border bg-card p-6 shadow-sleeve">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Shipping</p>
                    <p className="label-mono text-muted-foreground">
                      {subtotal >= 75 ? "Free shipping" : "$5.00 flat rate"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Payment</p>
                    <p className="label-mono text-muted-foreground">Secure checkout</p>
                  </div>
                </div>
              </div>

              <Button onClick={next} className="label-mono h-11 w-full rounded-sm">
                {step === "details" ? "Continue to payment" : `Pay $${total.toFixed(2)}`}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
