import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Pose template routes
  app.get('/api/poses', async (req, res) => {
    try {
      const poses = await storage.getPoseTemplates();
      res.json(poses);
    } catch (error) {
      console.error('Error fetching poses:', error);
      res.status(500).json({ error: 'Failed to fetch poses' });
    }
  });

  app.get('/api/poses/:id', async (req, res) => {
    try {
      const pose = await storage.getPoseTemplate(req.params.id);
      if (!pose) {
        return res.status(404).json({ error: 'Pose not found' });
      }
      res.json(pose);
    } catch (error) {
      console.error('Error fetching pose:', error);
      res.status(500).json({ error: 'Failed to fetch pose' });
    }
  });

  // Photo management routes
  const savePhotoSchema = z.object({
    timestamp: z.number(),
    poseId: z.string(),
    poseName: z.string(),
    score: z.number().min(0).max(100),
    imageData: z.string()
  });

  app.post('/api/photos', async (req, res) => {
    try {
      const photoData = savePhotoSchema.parse(req.body);
      const savedPhoto = await storage.savePhoto(photoData);
      res.json(savedPhoto);
    } catch (error) {
      console.error('Error saving photo:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid photo data', details: error.errors });
      }
      res.status(500).json({ error: 'Failed to save photo' });
    }
  });

  app.get('/api/photos', async (req, res) => {
    try {
      const photos = await storage.getPhotos();
      res.json(photos);
    } catch (error) {
      console.error('Error fetching photos:', error);
      res.status(500).json({ error: 'Failed to fetch photos' });
    }
  });

  app.delete('/api/photos/:id', async (req, res) => {
    try {
      const deleted = await storage.deletePhoto(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Photo not found' });
      }
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting photo:', error);
      res.status(500).json({ error: 'Failed to delete photo' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
