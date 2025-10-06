import { z } from "zod";

// Pose Template Schema for AI Pose Coach
export const poseTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  tags: z.array(z.string()),
  angles: z.record(z.string(), z.number()), // joint angles in degrees
  weights: z.record(z.string(), z.number()), // region weights for scoring
  sequence: z.array(z.string()).optional(), // step-by-step instructions
  cameraHint: z.object({
    framing: z.string().optional(),
    height: z.string().optional(), 
    distance: z.string().optional(),
    light: z.string().optional()
  }).optional()
});

export type PoseTemplate = z.infer<typeof poseTemplateSchema>;

// Pose Scoring Schema
export const poseScoreSchema = z.object({
  score: z.number().min(0).max(100),
  stable: z.boolean(),
  advice: z.object({
    model: z.array(z.string()),
    photographer: z.array(z.string())
  }),
  visual: z.object({
    arrows: z.array(z.array(z.union([z.string(), z.number()])))
  }).optional()
});

export type PoseScore = z.infer<typeof poseScoreSchema>;

// MediaPipe Pose Landmarks (33 points)
export const poseLandmarksSchema = z.object({
  landmarks: z.array(z.object({
    x: z.number(),
    y: z.number(),
    z: z.number().optional(),
    visibility: z.number().optional()
  })),
  timestamp: z.number()
});

export type PoseLandmarks = z.infer<typeof poseLandmarksSchema>;

// Camera Settings
export const cameraSettingsSchema = z.object({
  facingMode: z.enum(["user", "environment"]),
  autoShutter: z.boolean().default(true),
  threshold: z.number().min(70).max(95).default(80),
  stableFrames: z.number().min(5).max(20).default(10),
  language: z.enum(["zh", "en"]).default("zh"),
  coachingMode: z.enum(["simple", "detailed"]).default("simple")
});

export type CameraSettings = z.infer<typeof cameraSettingsSchema>;

// Photo Session Schema
export const photoSessionSchema = z.object({
  id: z.string(),
  timestamp: z.number(),
  poseId: z.string(),
  poseName: z.string(),
  score: z.number().min(0).max(100),
  imageData: z.string() // base64 encoded image
});

export type PhotoSession = z.infer<typeof photoSessionSchema>;

// User Schema
export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string().optional() // optional for security
});

export type User = z.infer<typeof userSchema>;
export type InsertUser = Omit<User, 'id'>;
