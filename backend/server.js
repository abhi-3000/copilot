require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { PrismaClient } = require("@prisma/client");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

if (!GEMINI_API_KEY) {
  console.error("❌ CRITICAL ERROR: GEMINI_API_KEY is missing in .env file.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

app.use(helmet());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5000",
      "https://copilot-tan.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));

const generateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

function parseUserId(raw) {
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) return null;
  return id;
}

function isValidString(str, min = 1, max = 5000) {
  return (
    typeof str === "string" &&
    str.trim().length >= min &&
    str.trim().length <= max
  );
}

function cleanGeneratedCode(text) {
  if (!text) return "";
  return text
    .replace(/```[a-zA-Z]*\n?/g, "")
    .replace(/```/g, "")
    .trim();
}

app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.post("/api/seed", async (req, res, next) => {
  try {
    let user = await prisma.user.findUnique({
      where: { email: "demo@test.com" },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { username: "DemoUser", email: "demo@test.com" },
      });
      console.log("✅ Created new demo user");
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

app.post("/api/generate", generateLimiter, async (req, res, next) => {
  try {
    const { prompt, language, userId } = req.body;

    const parsedUserId = parseUserId(userId);
    if (!parsedUserId) return res.status(400).json({ error: "Invalid userId" });

    if (!isValidString(prompt, 2))
      return res.status(400).json({ error: "Prompt is too short" });
    if (!isValidString(language))
      return res.status(400).json({ error: "Language is invalid" });

    const aiPrompt = `
      You are an expert ${language} developer.
      Task: Write a ${language} script to: ${prompt}.
      Rules:
      1. Return ONLY code. No explanations.
      2. No markdown backticks.
      3. Include necessary imports.
    `;

    const result = await model.generateContent(aiPrompt);
    const response = await result.response;
    const text = response.text();

    if (!text) throw new Error("Empty response from AI");

    const cleanedCode = cleanGeneratedCode(text);

    const newGeneration = await prisma.generation.create({
      data: {
        prompt: prompt.trim(),
        language: language.trim(),
        code: cleanedCode,
        userId: parsedUserId,
      },
    });

    res.json(newGeneration);
  } catch (error) {
    next(error);
  }
});

app.get("/api/history", async (req, res, next) => {
  try {
    const { userId, page = 1 } = req.query;

    const parsedUserId = parseUserId(userId);
    if (!parsedUserId) return res.status(400).json({ error: "Invalid userId" });

    const limit = 5;
    const currentPage = Math.max(Number(page) || 1, 1);
    const offset = (currentPage - 1) * limit;

    const totalCount = await prisma.generation.count({
      where: { userId: parsedUserId },
    });

    const history = await prisma.generation.findMany({
      where: { userId: parsedUserId },
      take: limit,
      skip: offset,
      orderBy: { createdAt: "desc" },
    });

    res.json({
      history,
      totalPages: Math.ceil(totalCount / limit),
      currentPage,
      totalCount,
    });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);

  res.status(500).json({
    error: "Internal server error",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
