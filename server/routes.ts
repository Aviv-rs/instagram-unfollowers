import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // You can add more routes here if needed for the Instagram unfollower tracker
  // However, all processing is done client-side to ensure user data privacy

  const httpServer = createServer(app);
  return httpServer;
}
