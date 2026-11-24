import { useState } from "react";

type PlanId = "basic" | "plus";

const PLANS: Record<
  PlanId,
  { name: string; price: number; subtotal: string; tagline: string; benefits: string[]; popular?: boolean }
> = {
  basic: {
    name: "Basic",
    price: 20,
    subtotal: "19.99",
    tagline: "Everything you need to get started.",
    benefits: ["Normal delivery", "Limited access to talk with the agent", "Standard email support", "Project progress updates"],
  },
  plus: {
    name: "Plus",
    price: 40,
    subtotal: "39.99",
    tagline: "Priority service with full agent access.",
    benefits: ["Fast delivery", "Full access to talk with the agent", "Priority support", "Daily progress updates"],
    popular: true,
  },
};

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 select-none ${className}`} aria-label="LinkedIn">
      <span className="text-[28px] font-bold leading-none tracking-tight text-[#0A66C2]">Linked</span>
      <span className="flex h-[28px] w-[28px] items-center justify-center rounded-[5px] bg-[#0A66C2] text-[22px] font-bold leading-none text-white">
        in
      </span>
    </div>
  );
}

function Check() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#0A66C2]" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.58 7.7 9.3a1 1 0 10-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Input({
  label,
  className = "",
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0A66C2] focus:ring-4 focus:ring-[#0A66C2]/15 read-only:bg-slate-50 read-only:text-slate-600"
      />
    </label>
  );
}

export default function App() {
  const [selected, setSelected] = useState<PlanId | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [view, setView] = useState<"plans" | "payment" | "done">("plans");
  const [promo, setPromo] = useState("");
  const [promoMsg, setPromoMsg] = useState("");

  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [holder, setHolder] = useState("");

  const plan = selected ? PLANS[selected] : null;

  const hire = (id: PlanId) => {
    setSelected(id);
    setPromo("");
    setPromoMsg("");
    setSummaryOpen(true);
  };

  const reset = () => {
    setView("plans");
    setSelected(null);
    setSummaryOpen(false);
    setCard("");
    setExp("");
    setCvv("");
    setHolder("");
  };

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  return (
    <div className="min-h-screen bg-[#F3F2EF] font-sans text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <button onClick={reset} aria-label="LinkedIn home">
            <Logo />
          </button>
          <span className="hidden text-sm text-slate-500 sm:block">Agent Services</span>
        </div>
      </header>

      {view === "plans" && (
        <main className="mx-auto max-w-5xl px-6 py-14">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Agent Plans</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
              Choose the plan that fits you and get a dedicated agent working on your professional growth.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {(Object.keys(PLANS) as PlanId[]).map((id) => {
              const p = PLANS[id];
              return (
                <div
                  key={id}
                  className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                    p.popular ? "border-2 border-[#0A66C2]" : "border border-slate-200"
                  }`}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-8 rounded-full bg-[#0A66C2] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                      Most popular
                    </span>
                  )}
                  <h2 className="text-2xl font-semibold">{p.name}</h2>
                  <p className="mt-1 text-slate-500">{p.tagline}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-5xl font-bold tracking-tight">${p.price}</span>
                    <span className="text-slate-500">/ plan</span>
                  </div>
                  <hr className="my-6 border-slate-200" />
                  <ul className="flex-1 space-y-3">
                    {p.benefits.map((b) => (
                      <li key={b} className="flex gap-3 text-slate-700">
                        <Check />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => hire(id)}
                    className={`mt-8 w-full rounded-full px-6 py-3 text-base font-semibold transition ${
                      p.popular
                        ? "bg-[#0A66C2] text-white hover:bg-[#004182]"
                        : "border-2 border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2]/10"
                    }`}
                  >
                    Hire
                  </button>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {view === "payment" && plan && (
        <main className="mx-auto max-w-xl px-6 py-12">
          <button
            onClick={() => {
              setView("plans");
              setSummaryOpen(true);
            }}
            className="mb-4 text-sm font-medium text-[#0A66C2] hover:underline"
          >
            ← Back to summary
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setView("done");
            }}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h1 className="text-3xl font-bold tracking-tight">Payment</h1>
            <div className="mt-4 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3.5 text-sm text-amber-900">
              <svg className="mt-0.5 h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p>
                <strong>A dual-currency card is required</strong> to complete this payment.
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 text-sm">
              <span className="text-slate-600">{plan.name} plan</span>
              <span className="font-semibold">${plan.subtotal}</span>
            </div>

            <div className="mt-6 space-y-4">
              <Input
                label="Card Number"
                required
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                value={card}
                onChange={(e) => setCard(formatCard(e.target.value))}
                minLength={19}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiration Date"
                  required
                  inputMode="numeric"
                  placeholder="MM/YY"
                  value={exp}
                  onChange={(e) => setExp(formatExp(e.target.value))}
                  minLength={5}
                />
                <Input
                  label="CVV"
                  required
                  inputMode="numeric"
                  placeholder="123"
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  minLength={3}
                />
              </div>
              <Input
                label="Cardholder Name"
                required
                placeholder="Name on card"
                value={holder}
                onChange={(e) => setHolder(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input label="State" defaultValue="Savar" />
                <Input label="Country" defaultValue="Bangladesh" />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-full bg-[#0A66C2] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#004182]"
            >
              Proceed
            </button>
          </form>
        </main>
      )}

      {view === "done" && (
        <main className="mx-auto max-w-xl px-6 py-20">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="mt-6 text-2xl font-bold">Payment received</h1>
            <p className="mt-3 text-lg text-slate-600">
              We have received your payment. An agent will contact you very soon.
            </p>
            <button
              onClick={reset}
              className="mt-8 rounded-full border-2 border-[#0A66C2] px-6 py-2.5 font-semibold text-[#0A66C2] transition hover:bg-[#0A66C2]/10"
            >
              Back to plans
            </button>
          </div>
        </main>
      )}

      {summaryOpen && plan && view === "plans" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={() => setSummaryOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-bold">Order summary</h2>
              <button
                onClick={() => setSummaryOpen(false)}
                aria-label="Close"
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
              <div>
                <p className="font-semibold">{plan.name} plan</p>
                <p className="text-sm text-slate-500">Agent service</p>
              </div>
              <p className="font-semibold">${plan.price}</p>
            </div>

            <div className="mt-5">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Promo Code</span>
              <div className="flex gap-2">
                <input
                  value={promo}
                  onChange={(e) => {
                    setPromo(e.target.value);
                    setPromoMsg("");
                  }}
                  placeholder="Enter promo code"
                  className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3.5 py-2.5 outline-none focus:border-[#0A66C2] focus:ring-4 focus:ring-[#0A66C2]/15"
                />
                <button
                  onClick={() => setPromoMsg(promo.trim() ? "Code noted — it will be verified at checkout." : "Please enter a code.")}
                  className="rounded-lg border border-slate-300 px-4 font-medium text-slate-700 hover:bg-slate-50"
                >
                  Apply
                </button>
              </div>
              {promoMsg && <p className="mt-1.5 text-sm text-slate-500">{promoMsg}</p>}
            </div>

            <div className="mt-6 flex items-end justify-between border-t border-slate-200 pt-5">
              <span className="font-medium text-slate-600">Subtotal</span>
              <div className="text-right">
                <p className="text-3xl font-bold">${plan.subtotal}</p>
                <p className="text-sm text-slate-500">(including tax)</p>
              </div>
            </div>

            <button
              onClick={() => {
                setSummaryOpen(false);
                setView("payment");
              }}
              className="mt-6 w-full rounded-full bg-[#0A66C2] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#004182]"
            >
              Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
