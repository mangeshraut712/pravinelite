import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const GEMINI_MODEL = "gemini-2.5-flash";

const messageSchema = z.object({
  sender: z.enum(["user", "bot"]),
  text: z.string().trim().min(1).max(4000),
});

const bodySchema = z.object({
  userMessage: z.string().trim().min(1).max(1000),
  history: z.array(messageSchema).max(10).default([]),
});

const systemInstruction = `You are the Virtual AI Fitness Coach for "Pravin Elite Fitness" (founded by Pravin, a premium certified personal trainer in Pune, India, with over 5 years of experience and 1500+ successful body transformations).
Keep your answers brief, engaging, encouraging, and highly professional. Limit responses to 2-3 short paragraphs at most. Avoid verbose listicle spam.
Answer questions about weight loss, muscle gain, custom Indian diets (including vegetarian, paneer/tofu protein plans, non-vegetarian chicken/egg splits, and Jain portion control/timing), PCOS/PCOD coaching, and functional training.
Reference Pravin's pricing plans:
- 45-Day Intense Shred (for fast fat loss)
- 90-Day Elite Transformation (muscle build and body recomposition)
- Monthly Premium Online/Hybrid Coaching
Encourage users to book a free 15-minute consultation via the Booking Page (/booking), contact page (/contact), or text on WhatsApp (https://wa.me/919272432562).
Pravin's location: Pune, India (in-person, at-home, and online).
Hours: Mon-Sat, 6:00 AM to 9:00 PM IST.
Output standard Markdown formatting. Do not output HTML tags. If referring to internal pages, use Markdown links (e.g., [Booking Page](/booking), [Calculator](/calculator), [Contact](/contact)).`;

function getServerGeminiApiKey() {
  return process.env.GEMINI_API_KEY;
}

function hasClientCompatibilityKey() {
  return Boolean(process.env.VITE_GEMINI_API_KEY);
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      GET: async () => {
        const serverKey = getServerGeminiApiKey();
        const transport = serverKey ? "server" : hasClientCompatibilityKey() ? "client" : "offline";

        return Response.json(
          {
            online: transport !== "offline",
            transport,
            model: transport !== "offline" ? GEMINI_MODEL : null,
          },
          {
            headers: {
              "Cache-Control": "no-store",
            },
          },
        );
      },
      POST: async ({ request }) => {
        const apiKey = getServerGeminiApiKey();
        if (!apiKey) {
          return Response.json(
            {
              error: "Gemini API key is not configured on the server.",
            },
            {
              status: 503,
              headers: {
                "Cache-Control": "no-store",
              },
            },
          );
        }

        const body = await request.json().catch(() => null);
        const parsed = bodySchema.safeParse(body);

        if (!parsed.success) {
          return Response.json(
            {
              error: "Invalid chat request.",
            },
            {
              status: 400,
              headers: {
                "Cache-Control": "no-store",
              },
            },
          );
        }

        const contents = parsed.data.history.map((message) => ({
          role: message.sender === "user" ? "user" : "model",
          parts: [{ text: message.text }],
        }));

        contents.push({
          role: "user",
          parts: [{ text: parsed.data.userMessage }],
        });

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents,
              systemInstruction: {
                parts: [{ text: systemInstruction }],
              },
            }),
          },
        );

        if (!response.ok) {
          return Response.json(
            {
              error: `Gemini upstream error: ${response.status}`,
            },
            {
              status: 502,
              headers: {
                "Cache-Control": "no-store",
              },
            },
          );
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

        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (!reply) {
          return Response.json(
            {
              error: "Gemini did not return a reply.",
            },
            {
              status: 502,
              headers: {
                "Cache-Control": "no-store",
              },
            },
          );
        }

        return Response.json(
          {
            reply,
          },
          {
            headers: {
              "Cache-Control": "no-store",
            },
          },
        );
      },
    },
  },
});
