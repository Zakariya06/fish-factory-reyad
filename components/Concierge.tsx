"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  CalendarDays,
  Fish,
  Sparkles,
  X,
} from "lucide-react";
import { useApp } from "@/components/AppProvider";
import { dishes, formatSAR } from "@/lib/menu";
import { site } from "@/lib/site";
import { useOverlay } from "@/lib/useOverlay";

type Message = {
  id: number;
  role: "assistant" | "user";
  text: string;
  options?: string[];
};

type FlowStep = "idle" | "guests" | "day" | "time" | "done";

type Booking = {
  guests?: string;
  day?: string;
  time?: string;
};

const guestOptions = ["2 guests", "4 guests", "6 guests", "8+ guests"];
const dayOptions = ["Tonight", "Tomorrow", "Friday", "Saturday"];
const timeOptions = ["7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"];

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    text: "Welcome to Fish Factory. I'm your dining concierge — here for tables, tonight's catch, or anything in between.\n\nWhat can I arrange for you?",
    options: ["Book a table", "Tonight's catch", "Dietary needs", "Where are you?"],
  },
];

export function Concierge() {
  const {
    conciergeOpen,
    conciergeIntent,
    conciergeKey,
    closeConcierge,
    openConcierge,
    addItem,
    cart,
    subtotal,
    clearCart,
    openCart,
    cartOpen,
  } = useApp();

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState<FlowStep>("idle");
  const [booking, setBooking] = useState<Booking>({});

  const uidRef = useRef(2);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useOverlay(conciergeOpen, closeConcierge);

  const clearTimers = () => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const scheduleReply = (
    text: string,
    options?: string[],
    delay = 850,
  ) => {
    setTyping(true);
    const timer = setTimeout(() => {
      setTyping(false);
      setMessages((current) => [
        ...current,
        { id: uidRef.current++, role: "assistant", text, options },
      ]);
    }, delay);
    timersRef.current.push(timer);
  };

  const pushMessage = (message: Omit<Message, "id">) => {
    setMessages((current) => [
      ...current,
      { ...message, id: uidRef.current++ },
    ]);
  };

  useEffect(() => {
    if (!conciergeOpen) return;
    const timer = setTimeout(
      () =>
        endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }),
      180,
    );
    return () => clearTimeout(timer);
  }, [conciergeOpen, messages, typing]);

  useEffect(() => {
    if (!conciergeOpen || !conciergeIntent || conciergeKey === 0) return;

    clearTimers();
    setTyping(false);
    setInput("");

    if (conciergeIntent === "book") {
      setBooking({});
      setStep("guests");
      setMessages([
        {
          id: uidRef.current++,
          role: "assistant",
          text: "Dining at Fish Factory — excellent choice. I'll take care of everything.\n\nHow many guests will be joining?",
          options: guestOptions,
        },
      ]);
      return;
    }

    setStep("idle");
    if (cart.length === 0) {
      setMessages([
        {
          id: uidRef.current++,
          role: "assistant",
          text: "Your order is empty at the moment. Shall I recommend something from tonight's catch?",
          options: ["Tonight's catch", "Book a table"],
        },
      ]);
      return;
    }

    const summary = cart
      .map(
        (line) =>
          `• ${line.qty} × ${line.dish.name} — SAR ${formatSAR(
            line.dish.price * line.qty,
          )}`,
      )
      .join("\n");

    setMessages([
      {
        id: uidRef.current++,
        role: "assistant",
        text: `Your order looks excellent.\n\n${summary}\n\nSubtotal SAR ${formatSAR(
          subtotal,
        )} · VAT included.\n\nShall I send it to the kitchen for pickup in about 25 minutes?`,
        options: ["Confirm order", "Pickup details", "Keep browsing"],
      },
    ]);
    // The intent only resets the conversation when a new request is opened.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conciergeKey]);

  const startBooking = () => {
    setBooking({});
    setStep("guests");
    scheduleReply(
      "With pleasure. How many guests will be joining you at Fish Factory?",
      guestOptions,
    );
  };

  const respond = (text: string) => {
    const lower = text.toLowerCase();

    if (step === "guests") {
      setBooking({ ...booking, guests: text });
      setStep("day");
      scheduleReply(
        `${text} — lovely. Which evening shall I hold?`,
        dayOptions,
      );
      return;
    }

    if (step === "day") {
      setBooking({ ...booking, day: text });
      setStep("time");
      scheduleReply(
        `${text} it is. What time would you like to dine?`,
        timeOptions,
      );
      return;
    }

    if (step === "time") {
      const complete = { ...booking, time: text };
      setBooking(complete);
      setStep("done");
      scheduleReply(
        `You're confirmed.\n\n${complete.guests} · ${complete.day} · ${complete.time}\nFish Factory, Al Olaya\n\nI've requested a quiet window table and the team will send a confirmation shortly. Anything else I can arrange?`,
        ["Add oysters to my order", "Directions", "Dietary needs"],
        950,
      );
      return;
    }

    if (lower.includes("confirm order")) {
      if (cart.length === 0) {
        scheduleReply(
          "Your order is empty right now, but I'd be glad to recommend something.",
          ["Tonight's catch", "Book a table"],
        );
        return;
      }
      const total = formatSAR(subtotal);
      clearCart();
      setStep("idle");
      scheduleReply(
        `Confirmed — your order is with the kitchen.\n\nPickup at Al Olaya in about 25 minutes · SAR ${total} (VAT included).\n\nPay at the counter or ask me for a secure payment link. See you soon.`,
        ["Directions", "Book a table"],
        1000,
      );
      return;
    }

    if (lower.includes("keep browsing")) {
      closeConcierge();
      setTimeout(() => {
        document.getElementById("menu")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 320);
      return;
    }

    if (lower.includes("view order")) {
      openCart();
      return;
    }

    if (lower.includes("add lobster")) {
      const lobster = dishes.find((dish) => dish.id === "red-sea-lobster");
      if (lobster) addItem(lobster);
      scheduleReply(
        "Excellent choice. The Red Sea Lobster is in your order — charcoal-fired with saffron butter, SAR 168.\n\nWould you like the oysters alongside it?",
        ["Add oysters to my order", "View order", "Book a table"],
      );
      return;
    }

    if (lower.includes("add oysters")) {
      const oysters = dishes.find((dish) => dish.id === "fine-de-claire");
      if (oysters) addItem(oysters);
      scheduleReply(
        "Six Fine de Claire oysters added — mignonette, horseradish and lemon. A very good idea.\n\nYour order is ready to confirm whenever you are.",
        ["View order", "Book a table"],
      );
      return;
    }

    if (lower.includes("open in maps") || lower.includes("open maps")) {
      window.open(site.mapsHref, "_blank", "noopener,noreferrer");
      scheduleReply(
        "I've opened directions in a new tab. Valet parking is at the King Fahd Road entrance — mention your reservation at the podium.",
        ["Book a table"],
      );
      return;
    }

    if (lower === "call now") {
      window.location.href = site.phoneHref;
      return;
    }

    if (lower.includes("pickup details")) {
      scheduleReply(
        "Pickup is at our Al Olaya entrance on King Fahd Road. Valet can hold your car for a few minutes — ask for the Fish Factory order desk.\n\nWe'll text you the moment your order leaves the pass.",
        ["Directions", "Confirm order"],
      );
      return;
    }

    if (lower.includes("payment link")) {
      scheduleReply(
        "Our team will send a secure payment link by SMS to the number on your booking. Prefer to pay on arrival? That's no problem either.",
        ["Directions", "Book a table"],
      );
      return;
    }

    if (
      lower.includes("book") ||
      lower.includes("reserve") ||
      lower.includes("reservation")
    ) {
      startBooking();
      return;
    }

    if (lower.includes("direction") || lower.includes("where")) {
      scheduleReply(
        `We're at ${site.address}.\n\nOpen daily, 12:00 PM – 1:00 AM. Valet at the King Fahd Road entrance, ten minutes from Kingdom Centre.`,
        ["Open in Maps", "Book a table"],
      );
      return;
    }

    if (
      lower.includes("catch") ||
      lower.includes("recommend") ||
      lower.includes("signature") ||
      lower.includes("tonight") ||
      lower.includes("best") ||
      lower.includes("dish")
    ) {
      scheduleReply(
        "Tonight the kitchen is especially proud of the Red Sea Lobster with saffron butter, and the Fine de Claire oysters with mignonette.\n\nFor something lighter, the citrus salmon crudo is beautiful. Shall I add something to your order?",
        ["Add lobster to my order", "Add oysters to my order", "Book a table"],
      );
      return;
    }

    if (
      lower.includes("dietary") ||
      lower.includes("allerg") ||
      lower.includes("vegan") ||
      lower.includes("gluten") ||
      lower.includes("vegetarian") ||
      lower.includes("shellfish")
    ) {
      scheduleReply(
        "Chef Omar can adapt most of the menu — gluten-free, dairy-free and shellfish-free preparations are all possible with a little notice.\n\nTell me what to avoid and I'll note it on your booking.",
        ["Book a table", "Tonight's catch"],
      );
      return;
    }

    if (
      lower.includes("hour") ||
      lower.includes("open") ||
      lower.includes("close") ||
      lower.includes("when")
    ) {
      scheduleReply(
        "We're open daily from 12:00 PM to 1:00 AM. The kitchen closes at 12:30 AM and valet runs until 1:30 AM.\n\nShall I find you a table?",
        ["Book a table", "Directions"],
      );
      return;
    }

    if (
      lower.includes("phone") ||
      lower.includes("call") ||
      lower.includes("contact") ||
      lower.includes("whatsapp") ||
      lower.includes("number")
    ) {
      scheduleReply(
        `You can reach our reservations team any time at ${site.phone}, or on WhatsApp at the same number.\n\nI can also book you in right here.`,
        ["Call now", "Book a table"],
      );
      return;
    }

    if (
      lower.includes("price") ||
      lower.includes("cost") ||
      lower.includes("how much") ||
      lower.includes("menu")
    ) {
      scheduleReply(
        "Small plates start at SAR 74, charcoal signatures from SAR 118, and our table-size platter is SAR 420 for three to four guests. All prices include VAT.\n\nWould you like tonight's recommendations?",
        ["Tonight's catch", "Book a table"],
      );
      return;
    }

    if (lower.includes("parking") || lower.includes("valet")) {
      scheduleReply(
        "Complimentary valet is available at the King Fahd Road entrance from 12:00 PM until 1:30 AM. Just mention your reservation name.",
        ["Book a table", "Directions"],
      );
      return;
    }

    if (
      lower.includes("private") ||
      lower.includes("event") ||
      lower.includes("group") ||
      lower.includes("birthday") ||
      lower.includes("occasion")
    ) {
      scheduleReply(
        "Our private dining room seats up to 14 guests and the terrace can be reserved for larger evenings. I can hold a date while our events team prepares a menu.\n\nHow many guests are you planning for?",
        ["Book a table", "Call now"],
      );
      return;
    }

    if (lower.includes("halal")) {
      scheduleReply(
        "Fish Factory is fully halal certified. Our seafood is sourced from the Red Sea and every dish — including the saffron butter — is prepared to halal standards.",
        ["Tonight's catch", "Book a table"],
      );
      return;
    }

    if (
      lower.includes("thank") ||
      lower.includes("shukran") ||
      lower.includes("great") ||
      lower.includes("perfect")
    ) {
      scheduleReply(
        "It's a pleasure. We look forward to welcoming you to Al Olaya — anything else, just ask.",
        ["Book a table"],
      );
      return;
    }

    if (
      lower.includes("hello") ||
      lower.includes("hi") ||
      lower.includes("hey") ||
      lower.includes("salam")
    ) {
      scheduleReply(
        "Hello, and welcome to Fish Factory. How can I make your evening easier — a table, a recommendation, or both?",
        ["Book a table", "Tonight's catch", "Directions"],
      );
      return;
    }

    scheduleReply(
      `I can help with reservations, tonight's catch, dietary needs and directions. For anything more specific, our team is on ${site.phone}.\n\nWhat would you like to do?`,
      ["Book a table", "Tonight's catch", "Call now"],
    );
  };

  const handleSend = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    pushMessage({ role: "user", text });
    setInput("");
    respond(text);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSend(input);
  };

  return (
    <>
      <AnimatePresence>
        {!conciergeOpen && !cartOpen && (
          <motion.button
            key="concierge-trigger"
            type="button"
            onClick={() => openConcierge()}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 16 }}
            transition={{ type: "spring", stiffness: 360, damping: 26 }}
            whileHover={{ y: -3 }}
            aria-label="Open the Fish Factory AI concierge"
            className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-gold/25 bg-ink py-2 pl-2 pr-3 text-cream shadow-glow sm:bottom-6 sm:right-6 sm:pr-5"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 animate-pulse-ring rounded-full border border-gold/40"
            />
            <span className="relative grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-gold-light to-gold text-ink">
              <Sparkles className="h-5 w-5" strokeWidth={1.8} />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink bg-[#6FD3A6]" />
            </span>
            <span className="hidden flex-col items-start sm:flex">
              <span className="text-[11.5px] font-bold leading-none">
                AI Concierge
              </span>
              <span className="mt-1 text-[8.5px] font-medium uppercase tracking-[0.12em] text-cream/45">
                Book · order · ask
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {conciergeOpen && (
          <>
            <motion.div
              key="concierge-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeConcierge}
              className="fixed inset-0 z-[75] bg-ink/40 backdrop-blur-[3px]"
              aria-hidden="true"
            />
            <motion.div
              key="concierge-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="concierge-title"
              initial={{ opacity: 0, y: 48, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 36, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-x-0 bottom-0 z-[80] flex h-[92svh] flex-col overflow-hidden rounded-t-[1.75rem] border border-ink/10 bg-[#F8F5ED] shadow-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[min(640px,calc(100svh-3rem))] sm:w-[404px] sm:rounded-[1.75rem]"
            >
              <div className="relative overflow-hidden bg-ink px-5 pb-5 pt-5 text-cream">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                >
                  <div className="absolute -right-10 -top-16 h-44 w-44 rounded-full border border-gold/15" />
                  <div className="absolute -left-12 -bottom-20 h-40 w-40 rounded-full bg-sea-600/25 blur-2xl" />
                  <div className="absolute inset-0 texture opacity-[0.06]" />
                </div>
                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="relative grid h-11 w-11 place-items-center rounded-full border border-gold/30 bg-gradient-to-br from-gold-light to-gold text-ink shadow-[0_0_0_4px_rgba(195,164,104,0.1)]">
                      <Fish className="h-5 w-5" strokeWidth={1.7} />
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink bg-[#6FD3A6]" />
                    </span>
                    <div>
                      <h2
                        id="concierge-title"
                        className="font-display text-[1.3rem] leading-none text-cream"
                      >
                        Factory Concierge
                      </h2>
                      <p className="mt-1.5 flex items-center gap-1.5 text-[8.5px] font-semibold uppercase tracking-[0.14em] text-cream/45">
                        <span className="h-1 w-1 rounded-full bg-[#6FD3A6]" />
                        Online · replies instantly
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden rounded-full border border-gold/25 bg-gold/10 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.16em] text-gold-light sm:block">
                      AI
                    </span>
                    <button
                      type="button"
                      onClick={closeConcierge}
                      aria-label="Close the concierge"
                      className="grid h-8 w-8 place-items-center rounded-full border border-cream/15 text-cream/60 transition-colors hover:border-cream/30 hover:bg-cream/10 hover:text-cream"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="relative mt-4 flex items-center gap-4 rounded-xl border border-cream/10 bg-cream/[0.04] px-3 py-2.5">
                  <span className="flex items-center gap-1.5 text-[8.5px] font-semibold uppercase tracking-[0.1em] text-cream/50">
                    <CalendarDays className="h-3 w-3 text-gold/70" />
                    Tables tonight
                  </span>
                  <span className="h-2.5 w-px bg-cream/15" />
                  <span className="flex items-center gap-1.5 text-[8.5px] font-semibold uppercase tracking-[0.1em] text-cream/50">
                    Window seats available
                  </span>
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold" />
                </div>
              </div>

              <div
                aria-live="polite"
                className="concierge-scroll relative min-h-0 flex-1 overflow-y-auto px-4 py-5"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 texture opacity-[0.035]"
                />
                <div className="relative space-y-4">
                  <p className="text-center text-[8px] font-bold uppercase tracking-[0.22em] text-ink/25">
                    Today · Al Olaya, Riyadh
                  </p>

                  {messages.map((message) =>
                    message.role === "assistant" ? (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="flex items-start gap-2"
                      >
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-gold">
                          <Fish className="h-3 w-3" strokeWidth={1.7} />
                        </span>
                        <div className="max-w-[85%]">
                          <div className="whitespace-pre-line rounded-2xl rounded-bl-md border border-ink/[0.06] bg-white px-3.5 py-2.5 text-[12px] leading-[1.65] text-ink/75 shadow-sm">
                            {message.text}
                          </div>
                          {message.options && message.options.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {message.options.map((option) => (
                                <button
                                  key={option}
                                  type="button"
                                  disabled={typing}
                                  onClick={() => handleSend(option)}
                                  className="rounded-full border border-sea-700/15 bg-white/80 px-2.5 py-1.5 text-[9.5px] font-semibold text-sea-700 transition-all duration-200 hover:border-sea-700/40 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="flex justify-end"
                      >
                        <div className="max-w-[82%] rounded-2xl rounded-br-md bg-sea-700 px-3.5 py-2.5 text-[12px] leading-[1.65] text-cream shadow-sm">
                          {message.text}
                        </div>
                      </motion.div>
                    ),
                  )}

                  {typing && (
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-gold">
                        <Fish className="h-3 w-3" strokeWidth={1.7} />
                      </span>
                      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-ink/[0.06] bg-white px-3.5 py-3 shadow-sm">
                        {[0, 1, 2].map((index) => (
                          <span
                            key={index}
                            className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/30"
                            style={{
                              animationDelay: `${index * 120}ms`,
                              animationDuration: "900ms",
                            }}
                          />
                        ))}
                        <span className="sr-only">
                          The concierge is typing
                        </span>
                      </div>
                    </div>
                  )}

                  <div ref={endRef} />
                </div>
              </div>

              <div className="border-t border-ink/[0.07] bg-[#FCFAF4] px-3.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-2 rounded-full border border-ink/[0.1] bg-white py-1.5 pl-4 pr-1.5 shadow-sm transition-colors focus-within:border-sea-600/40"
                >
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask about the catch, or book a table…"
                    aria-label="Message the Fish Factory concierge"
                    className="min-w-0 flex-1 bg-transparent py-2 text-[11.5px] text-ink outline-none placeholder:text-ink/35"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || typing}
                    aria-label="Send message"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-cream transition-all hover:bg-sea-800 disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <ArrowUp className="h-4 w-4" strokeWidth={2.2} />
                  </button>
                </form>
                <div className="mt-2 flex items-center justify-between px-1 text-[8px] font-medium uppercase tracking-[0.08em] text-ink/30">
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-2.5 w-2.5 text-gold-dark" />
                    AI concierge · answers in seconds
                  </span>
                  <a
                    href={site.phoneHref}
                    className="transition-colors hover:text-ink/60"
                  >
                    Call {site.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
