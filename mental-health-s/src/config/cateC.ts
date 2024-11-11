// src/config/categoryConfig.ts

import anxietyImage from '@/assets/event-a/anxiety.bmp';

import depressionImage from '@/assets/event-a/depres.bmp';
import stressManagementImage from '@/assets/event-a/stres.bmp';

import indfulnessImage from '@/assets/event-a/e.bmp';
import selfCareImage from '@/assets/event-a/self.bmp';
import therapyImage from '@/assets/event-a/thera.bmp';
import copingStrategiesImage from '@/assets/event-a/co.bmp';
import otherImage from '@/assets/event-a/enta.bmp';


export const categoryLabels: Record<string, string> = {
    anxiety: "Anxiety Support",
    
    depression: "Depression Management",
    stress_management: "Stress Management",
    mindfulness: "Mindfulness Practices",
    self_care: "Self-Care Routines",
    therapy: "Therapy Sessions",
    coping_strategies: "Coping Strategies",
    other: "General Mental Health"
};

export const categoryImages: Record<string, string> = {
    anxiety: anxietyImage,
    depression: depressionImage,
    stress_management: stressManagementImage,
    mindfulness: indfulnessImage,
    self_care: selfCareImage,
    therapy: therapyImage,
    coping_strategies: copingStrategiesImage,
    other: otherImage
};

