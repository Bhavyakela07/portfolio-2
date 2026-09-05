export type Mode = 'fullstack' | 'aiml';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  modeFocus: Mode | 'both';
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  metrics: { label: string; value: string }[];
  demoType: 'recoverOS' | 'skillGap' | 'kavaach' | 'perspectAI' | 'virtualPhotographer';
  gradient: string;
}

export interface SkillCategory {
  title: string;
  category: 'ai' | 'frontend' | 'backend' | 'database' | 'languages' | 'tools';
  iconName: string;
  skills: { name: string; level?: string; highlight?: boolean }[];
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  period: string;
  details: string;
}

export interface ResumeData {
  name: string;
  phone: string;
  email: string;
  github: string;
  githubUrl: string;
  summaryFullStack: string;
  summaryAIML: string;
  skills: SkillCategory[];
  projects: Project[];
  education: Education[];
}
