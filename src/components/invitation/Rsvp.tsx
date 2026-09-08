"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { invitationConfig } from "@config";
import WaxSeal from "./WaxSeal";
import GoldDivider from "./GoldDivider";
import ScriptHeading from "./ScriptHeading";
import SectionReveal from "./SectionReveal";

interface RsvpForm {
  name: string;
  attending: "yes" | "no" | "";
  guestCount: number;
}

/** (7) RSVP — wax seal trigger + modal form */
export default function Rsvp() {
  const { texts, rsvp } = invitationConfig;
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<RsvpForm>({
    name: "",
    attending: "",
    guestCount: 1,
  });

  const handleSubmit = useCallback(async () => {
    if (!form.name.trim() || !form.attending) return;
    setLoading(true);

    const payload = {
      name: form.name.trim(),
      attending: form.attending === "yes",
      guestCount: form.attending === "yes" ? form.guestCount : 0,
    };

    try {
      if (rsvp.endpoint) {
        const res = await fetch(rsvp.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("RSVP failed");
      } else {
        console.log("[RSVP]", payload);
      }
      setSubmitted(true);
      setOpen(false);
    } catch (err) {
      console.error("[RSVP error]", err);
    } finally {
      setLoading(false);
    }
  }, [form, rsvp.endpoint]);

  return (
    <section className="px-4 py-11">
      <SectionReveal className="text-center">
        <ScriptHeading>{texts.rsvpHeading}</ScriptHeading>
        <p className="mx-auto mt-4 max-w-xs font-display text-base font-normal leading-[1.6] text-ink sm:text-[1.0625rem]">
          {texts.rsvpSubtext}
        </p>
        <GoldDivider className="my-9" />

        {!submitted ? (
          <div className="flex flex-col items-center gap-2.5">
            <WaxSeal
              size="lg"
              animate={!reduced}
              emboss={texts.rsvpButton}
              label={texts.rsvpButton}
              onClick={() => setOpen(true)}
            />
            <span className="mt-1 flex flex-col items-center gap-0.5 font-display text-xs text-ink-light">
              <svg
                viewBox="0 0 24 24"
                className="h-3 w-3 text-gold"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path
                  d="M12 19 L12 5 M6 11 L12 5 L18 11"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {texts.rsvpOpenHint}
            </span>
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-xs font-script text-2xl leading-snug text-gold"
          >
            {texts.rsvpThankYou}
          </motion.p>
        )}
      </SectionReveal>

      <AnimatePresence>
        {open && !submitted && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 backdrop-blur-sm sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="w-full max-w-invite rounded-t-xl bg-ivory-light p-6 shadow-card sm:rounded-xl"
              initial={{ y: 48, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 48, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="rsvp-title"
            >
              <h3 id="rsvp-title" className="font-script text-2xl text-gold">
                {texts.rsvpHeading}
              </h3>

              <div className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="rsvp-name"
                    className="block font-display text-xs uppercase tracking-wider text-ink-light"
                  >
                    {texts.rsvpNameLabel}
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="mt-1 w-full border-b border-gold-hairline bg-transparent py-2.5 font-display text-base text-ink outline-none transition-colors focus:border-gold"
                    placeholder="Adınız Soyadınız"
                    autoComplete="name"
                  />
                </div>

                <fieldset>
                  <legend className="font-display text-xs uppercase tracking-wider text-ink-light">
                    {texts.rsvpAttendLabel}
                  </legend>
                  <div className="mt-2.5 flex flex-wrap gap-3">
                    {(["yes", "no"] as const).map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() =>
                          setForm((f) => ({ ...f, attending: val }))
                        }
                        className={`rounded-full border px-5 py-2 font-display text-sm transition-colors ${
                          form.attending === val
                            ? "border-bordo bg-bordo text-ivory-light"
                            : "border-gold-hairline text-ink-muted hover:border-gold"
                        }`}
                      >
                        {val === "yes" ? texts.rsvpYes : texts.rsvpNo}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {form.attending === "yes" && (
                  <div>
                    <label
                      htmlFor="rsvp-guests"
                      className="block font-display text-xs uppercase tracking-wider text-ink-light"
                    >
                      {texts.rsvpGuestLabel}
                    </label>
                    <input
                      id="rsvp-guests"
                      type="number"
                      min={1}
                      max={10}
                      value={form.guestCount}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          guestCount: Math.max(1, parseInt(e.target.value, 10) || 1),
                        }))
                      }
                      className="mt-1 w-20 border-b border-gold-hairline bg-transparent py-2.5 font-display text-base text-ink outline-none focus:border-gold"
                    />
                  </div>
                )}
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full border border-gold-hairline py-3 font-display text-sm text-ink-muted transition-colors hover:border-gold"
                >
                  {texts.rsvpCancel}
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!form.name.trim() || !form.attending || loading}
                  className="flex-1 rounded-full bg-bordo py-3 font-display text-sm text-ivory-light transition-opacity disabled:opacity-40"
                >
                  {loading ? texts.rsvpSubmitting : texts.rsvpSubmit}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
