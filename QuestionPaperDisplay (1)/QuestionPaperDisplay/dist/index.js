// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
import { z } from "zod";
var bfhlRequestSchema = z.object({
  data: z.array(z.string()).min(1, "Data array must contain at least one element")
});
var bfhlResponseSchema = z.object({
  is_success: z.boolean(),
  user_id: z.string(),
  email: z.string(),
  roll_number: z.string(),
  odd_numbers: z.array(z.string()),
  even_numbers: z.array(z.string()),
  alphabets: z.array(z.string()),
  special_characters: z.array(z.string()),
  sum: z.string(),
  concat_string: z.string()
});

// server/routes.ts
import { z as z2 } from "zod";
async function registerRoutes(app2) {
  app2.post("/api/bfhl", (req, res) => {
    try {
      const validatedData = bfhlRequestSchema.parse(req.body);
      const response = processArrayData(validatedData.data);
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          message: "Invalid request format",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          message: "Internal server error",
          error: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}
function processArrayData(data) {
  const oddNumbers = [];
  const evenNumbers = [];
  const alphabets = [];
  const specialCharacters = [];
  let sum = 0;
  const alphabetChars = [];
  data.forEach((item) => {
    if (/^\d+$/.test(item)) {
      const num = parseInt(item, 10);
      sum += num;
      if (num % 2 === 0) {
        evenNumbers.push(item);
      } else {
        oddNumbers.push(item);
      }
    } else if (/^[a-zA-Z]+$/.test(item)) {
      alphabets.push(item.toUpperCase());
      for (const char of item) {
        alphabetChars.push(char);
      }
    } else {
      specialCharacters.push(item);
    }
  });
  let concatString = "";
  if (alphabetChars.length > 0) {
    const reversedChars = alphabetChars.reverse();
    for (let i = 0; i < reversedChars.length; i++) {
      if (i % 2 === 0) {
        concatString += reversedChars[i].toUpperCase();
      } else {
        concatString += reversedChars[i].toLowerCase();
      }
    }
  }
  return {
    is_success: true,
    user_id: "g_chaitanya_9896",
    email: "chaitanya.22bce9896@vitapstudent.ac.in",
    roll_number: "22BCE9896",
    odd_numbers: oddNumbers,
    even_numbers: evenNumbers,
    alphabets,
    special_characters: specialCharacters,
    sum: sum.toString(),
    concat_string: concatString
  };
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
