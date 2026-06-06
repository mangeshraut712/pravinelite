import React, { useEffect, useRef, useState } from "react";
import { MessageSquareText, Send, X, Dumbbell, Sparkles, Loader2, Compass } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";

// Types for chat messages
interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  isFallback?: boolean;
}

type AssistantMode = "checking" | "online" | "offline";
type ChatTransport = "checking" | "server" | "client" | "offline";

// Predefined local NLP response structure
interface LocalResponse {
  keywords: string[];
  response: string;
}

// Highly tailored fitness & gym local responses
const LOCAL_RESPONSES: LocalResponse[] = [
  {
    keywords: ["pcos", "pcod", "hormon", "irregular", "cyst", "period"],
    response:
      "🌸 **PCOS/PCOD Transformation Program**\n\nTrainer Pravin specializes in managing PCOS through tailored resistance training, stress reduction, and insulin-sensitivity diet splits (carb-cycling, fiber-rich Indian recipes).\n\nWe don't do crash diets! Our program focuses on sustainable lifestyle changes that restore hormonal balance.\n\n👉 [Book a Free Consultation](/booking) to discuss a custom PCOS program!",
  },
  {
    keywords: [
      "diet",
      "nutrition",
      "recipe",
      "veg",
      "non-veg",
      "jain",
      "protein",
      "meal",
      "eat",
      "food",
      "calorie",
      "macro",
    ],
    response:
      "🥗 **Custom Indian Diet Plans**\n\nWe provide detailed macro-calculated nutrition plans using everyday Indian foods (no fancy, expensive ingredients needed):\n• **Vegetarian:** Paneer, lentils, tofu, and curd protein plans\n• **Non-vegetarian:** Chicken, egg, and fish protein splits\n• **Jain Coaching:** Customized portion controls and timing protocols\n\nCheck out your personal macro breakdown using our free [BMI & Macro Calculator](/calculator) or get a custom plan from Pravin!",
  },
  {
    keywords: [
      "price",
      "pricing",
      "cost",
      "package",
      "fee",
      "charge",
      "subscription",
      "pay",
      "money",
      "rupee",
      "inr",
    ],
    response:
      "💰 **Coaching Programs & Packages**\n\nWe offer premium result-oriented coaching programs:\n1. **45-Day Intense Shred:** Accelerated fat-loss coaching (daily check-ins).\n2. **90-Day Elite Transformation:** Muscle building, body recomposition, and diet habits.\n3. **Online Premium Coaching:** Custom diets, custom workout splits, and weekly progress calls.\n\nFor exact quotes and slot openings, please message Pravin on [WhatsApp Support](https://wa.me/919272432562) or [Schedule a Free Call](/booking).",
  },
  {
    keywords: ["address", "location", "where", "gym", "center", "pune", "place", "studio"],
    response:
      "📍 **Training Locations & Formats**\n\nPravin conducts training across three formats:\n1. **In-Gym Personal Training:** Select premium gyms in Pune, India.\n2. **At-Home Coaching:** Personal training at your apartment gym in Pune.\n3. **Online Global Coaching:** Personalized training & diets managed via custom tracker (available worldwide).\n\n[Contact Us](/contact) to find out if you are within our home training service radius in Pune!",
  },
  {
    keywords: ["timing", "hour", "time", "open", "schedule", "day", "sunday", "saturday"],
    response:
      "⏰ **Operating & Coaching Hours**\n\nWe schedule training sessions during the following hours:\n• **Monday to Saturday:** 6:00 AM – 9:00 PM IST\n• **Sunday:** Closed (Rest & Recovery for both trainer & clients)\n\nSessions are conducted in hourly blocks. You can view available diagnostic slots on our [Booking Calendar](/booking).",
  },
  {
    keywords: [
      "book",
      "booking",
      "consult",
      "appointment",
      "contact",
      "phone",
      "call",
      "free",
      "trial",
    ],
    response:
      "📅 **Book your Free Diagnostic Call**\n\nReady to transform? You can easily:\n1. Schedule a free 15-minute diagnostic call online: [Go to Booking](/booking)\n2. Send a WhatsApp message directly: [WhatsApp Chat](https://wa.me/919272432562)\n3. Submit our [Contact Form](/contact) and we'll call you back!",
  },
  {
    keywords: ["hi", "hello", "hey", "start", "welcome", "about", "who"],
    response:
      "👋 **Welcome to Pravin Elite Fitness Assistant!**\n\nI am your virtual AI coach. You can ask me anything about:\n• PCOS/PCOD custom workouts\n• Indian diet templates (Veg/Non-veg/Jain)\n• Coaching programs, locations, and pricing\n• Gym operating hours\n\nFeel free to type your question below or click one of the quick replies!",
  },
];

// Fallback message when keyword matching finds nothing
const DEFAULT_FALLBACK =
  "🤖 **Pravin Elite Virtual Assistant**\n\nI couldn't quite find a direct match for that. No worries! Here is what you can do:\n• Check out our coaching programs: [Services & Programs](/services)\n• Calculate your daily calorie macros: [BMI & Macro Calculator](/calculator)\n• Book a free diagnostic call: [Booking Page](/booking)\n• Speak to Pravin directly: [WhatsApp Chat](https://wa.me/919272432562)";

const quickReplies = [
  { label: "🌸 PCOS Program", query: "tell me about your PCOS program" },
  { label: "🥗 Indian Diet Plan", query: "do you make customized Indian diets?" },
  { label: "💰 Coaching Pricing", query: "what are your coaching package prices?" },
  { label: "📅 Book Consultation", query: "how do I book a free consultation?" },
];

// Local parser engine
const parseLocalReply = (query: string): string => {
  const cleanQuery = query.toLowerCase().trim();
  for (const item of LOCAL_RESPONSES) {
    if (item.keywords.some((kw) => cleanQuery.includes(kw))) {
      return item.response;
    }
  }
  return DEFAULT_FALLBACK;
};

const buildRecentHistory = (history: Message[]) =>
  history
    .filter((message) => message.id !== "welcome")
    .slice(-10)
    .map(({ sender, text }) => ({
      sender,
      text,
    }));

const fetchGeminiDirect = async (userMsg: string, history: Message[]): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini browser key is not configured.");
  }

  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
  const contents = buildRecentHistory(history).map((message) => ({
    role: message.sender === "user" ? "user" : "model",
    parts: [{ text: message.text }],
  }));

  contents.push({
    role: "user",
    parts: [{ text: userMsg }],
  });

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents,
      systemInstruction: {
        parts: [
          {
            text: `You are the Virtual AI Fitness Coach for "Pravin Elite Fitness" (founded by Pravin, a premium certified personal trainer in Pune, India, with over 5 years of experience and 1500+ successful body transformations).
Keep your answers brief, engaging, encouraging, and highly professional. Limit responses to 2-3 short paragraphs at most. Avoid verbose listicle spam.
Answer questions about weight loss, muscle gain, custom Indian diets (including vegetarian, paneer/tofu protein plans, non-vegetarian chicken/egg splits, and Jain portion control/timing), PCOS/PCOD coaching, and functional training.
Reference Pravin's pricing plans:
- 45-Day Intense Shred (for fast fat loss)
- 90-Day Elite Transformation (muscle build and body recomposition)
- Monthly Premium Online/Hybrid Coaching
Encourage users to book a free 15-minute consultation via the Booking Page (/booking), contact page (/contact), or text on WhatsApp (https://wa.me/919272432562).
Pravin's location: Pune, India (in-person, at-home, and online).
Hours: Mon-Sat, 6:00 AM to 9:00 PM IST.
Output standard Markdown formatting. Do not output HTML tags. If referring to internal pages, use Markdown links (e.g., [Booking Page](/booking), [Calculator](/calculator), [Contact](/contact)).`,
          },
        ],
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini browser transport error: ${response.status}`);
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: {
        parts?: Array<{
          text?: string;
        }>;
      };
    }>;
  };

  const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!replyText) {
    throw new Error("No response text found in Gemini output.");
  }

  return replyText;
};

const fetchServerReply = async (userMsg: string, history: Message[]): Promise<string> => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userMessage: userMsg,
      history: buildRecentHistory(history),
    }),
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(errorBody?.error || `Chat API error: ${response.status}`);
  }

  const data = (await response.json()) as { reply?: string };
  if (!data.reply) {
    throw new Error("No response text found in chat API output.");
  }

  return data.reply;
};

// Help format bold segments
const parseBoldText = (textSegment: string): React.ReactNode[] => {
  const boldRegex = /\*\*([^*]+)\*\*/g;
  const parts: React.ReactNode[] = [];
  let lastIdx = 0;
  let match;

  while ((match = boldRegex.exec(textSegment)) !== null) {
    if (match.index > lastIdx) {
      parts.push(textSegment.substring(lastIdx, match.index));
    }
    parts.push(
      <strong key={`bold-${match.index}`} className="font-bold text-foreground">
        {match[1]}
      </strong>,
    );
    lastIdx = boldRegex.lastIndex;
  }

  if (lastIdx < textSegment.length) {
    parts.push(textSegment.substring(lastIdx));
  }

  return parts;
};

interface MessageTextProps {
  text: string;
  onLinkClick: () => void;
}

const MessageText = ({ text, onLinkClick }: MessageTextProps) => {
  // Basic Markdown parser for links: [text](href)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  // We will parse formatting sequentially
  // Since this is client-side, we do a basic regex loop to extract links and text
  const matches: { index: number; length: number; element: React.ReactNode }[] = [];

  // Reset regex indexes
  linkRegex.lastIndex = 0;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(text)) !== null) {
    const [fullMatch, linkText, href] = linkMatch;
    const matchIndex = linkMatch.index;

    const isExternal = href.startsWith("http");
    const element = isExternal ? (
      <a
        key={`link-${matchIndex}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gold font-medium hover:underline inline-flex items-center gap-0.5"
      >
        {linkText}
      </a>
    ) : (
      <Link
        key={`link-${matchIndex}`}
        to={href}
        className="text-gold font-semibold hover:underline inline-flex items-center gap-0.5"
        onClick={onLinkClick} // Close chatbot window when routing internally
      >
        {linkText}
      </Link>
    );

    matches.push({ index: matchIndex, length: fullMatch.length, element });
  }

  // Sort matches by index
  matches.sort((a, b) => a.index - b.index);

  // Build elements array
  matches.forEach((match) => {
    if (match.index > lastIndex) {
      const textSegment = text.substring(lastIndex, match.index);
      elements.push(...parseBoldText(textSegment));
    }
    elements.push(match.element);
    lastIndex = match.index + match.length;
  });

  if (lastIndex < text.length) {
    elements.push(...parseBoldText(text.substring(lastIndex)));
  }

  return (
    <div className="space-y-1.5 whitespace-pre-wrap">{elements.length > 0 ? elements : text}</div>
  );
};

interface FitnessChatbotProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FitnessChatbot({ isOpen, onOpenChange }: FitnessChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "👋 Hi! I'm your Pravin Elite AI Coach. Ready to transform your body? Let me know what you're looking for! Ask me about PCOS programs, Indian diets, pricing, or booking details.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewBadge, setHasNewBadge] = useState(false);
  const [assistantModeOverride, setAssistantModeOverride] = useState<AssistantMode | null>(null);
  const [showLauncher, setShowLauncher] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const chatHealthQuery = useQuery({
    queryKey: ["chat-health"],
    queryFn: async () => {
      const response = await fetch("/api/chat", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`);
      }

      return (await response.json()) as { online?: boolean; transport?: ChatTransport };
    },
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const resolvedTransport: ChatTransport =
    chatHealthQuery.data?.transport ??
    (import.meta.env.VITE_GEMINI_API_KEY
      ? "client"
      : chatHealthQuery.isPending
        ? "checking"
        : "offline");

  const assistantMode: AssistantMode =
    assistantModeOverride ??
    (resolvedTransport === "checking"
      ? "checking"
      : resolvedTransport === "offline"
        ? "offline"
        : resolvedTransport === "client"
          ? "checking"
          : "online");

  useEffect(() => {
    // Pulse notification badge after 6 seconds if unopened
    const timer = setTimeout(() => {
      if (!isOpen) {
        setHasNewBadge(true);
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    const updateLauncher = () => {
      if (!isMobile || isOpen) {
        setShowLauncher(true);
        return;
      }
      setShowLauncher(window.scrollY > 280);
    };

    updateLauncher();
    window.addEventListener("scroll", updateLauncher, { passive: true });
    window.addEventListener("resize", updateLauncher);

    return () => {
      window.removeEventListener("scroll", updateLauncher);
      window.removeEventListener("resize", updateLauncher);
    };
  }, [isMobile, isOpen]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleOpenToggle = () => {
    onOpenChange(!isOpen);
    if (!isOpen) {
      setHasNewBadge(false);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const reply =
        resolvedTransport === "server"
          ? await fetchServerReply(textToSend, messages)
          : resolvedTransport === "client"
            ? await fetchGeminiDirect(textToSend, messages)
            : (() => {
                throw new Error("Chat API unavailable");
              })();
      setAssistantModeOverride("online");
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: reply,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.warn("Chat transport unavailable, running local NLP fallback", error);
      setAssistantModeOverride("offline");
      const localReply = parseLocalReply(textToSend);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: `⚠️ *Using local engine (connection error)*\n\n${localReply}`,
          timestamp: new Date(),
          isFallback: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div
        className={`fixed right-4 bottom-[calc(env(safe-area-inset-bottom)+4.5rem)] z-50 transition-all duration-200 sm:right-6 sm:bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] ${
          showLauncher ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <button
          onClick={handleOpenToggle}
          type="button"
          aria-label="Open Fitness Coach Chatbot"
          className="relative flex size-12 items-center justify-center rounded-full bg-gradient-gold text-background shadow-gold transition-transform active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold sm:size-14 sm:hover:scale-110"
        >
          {isOpen ? (
            <X className="size-5 stroke-[2.5px] sm:size-6" />
          ) : (
            <MessageSquareText className="size-6 stroke-[2.2px] sm:size-7" />
          )}

          {/* Pulse badge */}
          {hasNewBadge && !isOpen && (
            <span className="absolute -top-1 -right-1 flex size-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
              <span className="relative inline-flex size-4 rounded-full bg-amber-600 border-2 border-background flex items-center justify-center text-[8px] text-white font-bold">
                1
              </span>
            </span>
          )}
        </button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
            transition={
              reduceMotion ? { duration: 0.15 } : { type: "spring", damping: 25, stiffness: 350 }
            }
            className="fixed right-4 bottom-[calc(env(safe-area-inset-bottom)+8.5rem)] left-4 h-[min(520px,calc(100vh-9rem))] rounded-2xl border border-gold/20 flex flex-col overflow-hidden z-50 shadow-2xl glass sm:left-auto sm:right-6 sm:bottom-[calc(env(safe-area-inset-bottom)+9.5rem)] sm:h-[520px] sm:max-h-[calc(100vh-8rem)] sm:w-[370px] sm:max-w-[calc(100vw-3rem)]"
            role="dialog"
            aria-label="Pravin Elite Chatbot"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-black/40 px-4 py-3 border-b border-gold/10">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-full bg-gradient-gold/10 border border-gold/30">
                  <Dumbbell className="size-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-lg tracking-wide text-gradient-gold">
                    Pravin Elite Coach
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-2 w-2">
                      <span
                        className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          assistantMode === "online"
                            ? "animate-ping bg-emerald-400"
                            : assistantMode === "checking"
                              ? "animate-pulse bg-amber-400"
                              : "bg-slate-400"
                        }`}
                      ></span>
                      <span
                        className={`relative inline-flex rounded-full h-2 w-2 ${
                          assistantMode === "online"
                            ? "bg-emerald-500"
                            : assistantMode === "checking"
                              ? "bg-amber-500"
                              : "bg-slate-400"
                        }`}
                      ></span>
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                      {assistantMode === "online"
                        ? "Gemini AI Active"
                        : assistantMode === "checking"
                          ? resolvedTransport === "client"
                            ? "Browser AI Standby"
                            : "Checking AI Backend"
                          : "Local Expert Mode"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleOpenToggle}
                type="button"
                className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-white/5 cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gold/20 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm shadow-md transition-all ${
                      msg.sender === "user"
                        ? "bg-gradient-gold text-background rounded-tr-none font-medium"
                        : "bg-secondary/40 text-foreground border border-border/40 rounded-tl-none"
                    }`}
                  >
                    <MessageText text={msg.text} onLinkClick={() => onOpenChange(false)} />
                    <span
                      className={`block text-[9px] mt-1 text-right ${
                        msg.sender === "user" ? "text-background/70" : "text-muted-foreground"
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Loader indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary/40 border border-border/40 text-foreground rounded-2xl rounded-tl-none px-4 py-3 shadow-md flex items-center gap-2">
                    <Loader2 className="size-4 text-gold animate-spin" />
                    <span className="text-xs text-muted-foreground">Formulating response...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies list */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 py-2 bg-black/10 border-t border-gold/5 space-y-1.5">
                <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1 uppercase tracking-wider">
                  <Sparkles className="size-3 text-gold" /> Popular Questions
                </span>
                <div className="flex flex-wrap gap-1.5 py-1">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply.label}
                      onClick={() => handleSendMessage(reply.query)}
                      type="button"
                      className="text-xs px-2.5 py-1 rounded-full border border-gold/20 bg-gold/5 text-gold hover:bg-gold/15 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 bg-black/40 border-t border-gold/10 flex gap-2 items-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about diet, PCOS, pricing..."
                aria-label="Type your message"
                className="flex-1 bg-secondary/50 border border-border/50 rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/40"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="size-9 rounded-full bg-gradient-gold text-background shadow-gold flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-40 disabled:scale-100 disabled:shadow-none cursor-pointer transition-transform"
                aria-label="Send Message"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
