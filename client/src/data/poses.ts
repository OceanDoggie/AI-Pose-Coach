import type { PoseTemplate } from "@shared/schema";

// Built-in pose templates following the specification
export const POSE_TEMPLATES: PoseTemplate[] = [
  {
    id: "pose_sunshine_001",
    name: "阳光半身侧身笑 / Sunshine Side Portrait",
    tags: ["阳光", "海滩", "女生", "sunshine", "beach", "casual"],
    angles: {
      "L_elbow": 160,
      "R_elbow": 90,
      "HeadYaw": 10,
      "L_shoulder": 45,
      "R_shoulder": 35
    },
    weights: {
      "upper": 0.6,
      "lower": 0.4
    },
    sequence: [
      "抬右手触鬓 / Raise right hand to hair",
      "左脚前一点 / Left foot slightly forward", 
      "看镜头上沿 / Look above camera lens"
    ],
    cameraHint: {
      framing: "半身 / Half body",
      height: "肚脐位 / Belly button level",
      distance: "约1.5m / ~1.5m",
      light: "右脸受光 / Right face lighting"
    }
  },
  {
    id: "pose_casual_002", 
    name: "休闲双手叉腰 / Casual Hands on Hips",
    tags: ["休闲", "街拍", "中性", "casual", "street", "unisex"],
    angles: {
      "L_elbow": 130,
      "R_elbow": 130,
      "L_hip": 15,
      "R_hip": -15,
      "HeadYaw": 0
    },
    weights: {
      "upper": 0.7,
      "lower": 0.3
    },
    sequence: [
      "双手叉腰 / Both hands on hips",
      "挺胸收腹 / Chest out, belly in",
      "自然微笑 / Natural smile"
    ],
    cameraHint: {
      framing: "3/4身 / 3/4 body",
      height: "胸部位 / Chest level", 
      distance: "约2m / ~2m",
      light: "正面柔光 / Front soft light"
    }
  },
  {
    id: "pose_portrait_003",
    name: "经典肖像姿势 / Classic Portrait Pose", 
    tags: ["肖像", "正式", "商务", "portrait", "formal", "business"],
    angles: {
      "L_elbow": 90,
      "R_elbow": 85,
      "HeadYaw": -5,
      "HeadPitch": 2
    },
    weights: {
      "upper": 0.8,
      "lower": 0.2
    },
    sequence: [
      "左手扶右臂 / Left hand on right arm",
      "身体微侧 / Body slightly angled", 
      "眼神坚定 / Confident gaze"
    ],
    cameraHint: {
      framing: "肩部以上 / Shoulder up",
      height: "眼部水平 / Eye level",
      distance: "约1m / ~1m", 
      light: "侧光突出轮廓 / Side lighting"
    }
  },
  {
    id: "pose_dynamic_004",
    name: "动感跃起 / Dynamic Jump",
    tags: ["动感", "活力", "运动", "dynamic", "energy", "sports"],
    angles: {
      "L_knee": 45,
      "R_knee": 90, 
      "L_elbow": 45,
      "R_elbow": 135,
      "HeadPitch": -10
    },
    weights: {
      "upper": 0.5,
      "lower": 0.5
    },
    sequence: [
      "准备起跳 / Prepare to jump",
      "双臂展开 / Arms spread wide",
      "表情兴奋 / Excited expression"
    ],
    cameraHint: {
      framing: "全身 / Full body",
      height: "腰部水平 / Waist level",
      distance: "约3m / ~3m",
      light: "充足自然光 / Bright natural light"
    }
  },
  {
    id: "pose_elegant_005", 
    name: "优雅侧身 / Elegant Side Pose",
    tags: ["优雅", "女性", "礼服", "elegant", "feminine", "dress"],
    angles: {
      "L_elbow": 120,
      "R_elbow": 160,
      "L_hip": 20,
      "HeadYaw": 25,
      "spine_curve": 8
    },
    weights: {
      "upper": 0.6,
      "lower": 0.4
    },
    sequence: [
      "身体成S型曲线 / S-curve body line",
      "一手扶腰际 / One hand at waist",
      "优雅回眸 / Elegant glance back"
    ],
    cameraHint: {
      framing: "3/4身 / 3/4 body", 
      height: "胸部位 / Chest level",
      distance: "约1.8m / ~1.8m",
      light: "柔和侧逆光 / Soft rim lighting"
    }
  }
];

export const POSE_CATEGORIES = [
  { id: "all", name: "全部 / All", icon: "🎯" },
  { id: "sunshine", name: "阳光 / Sunshine", icon: "☀️" },
  { id: "casual", name: "休闲 / Casual", icon: "👕" },
  { id: "portrait", name: "肖像 / Portrait", icon: "🎭" },
  { id: "dynamic", name: "动感 / Dynamic", icon: "⚡" },
  { id: "elegant", name: "优雅 / Elegant", icon: "💃" }
];