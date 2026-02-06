
export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  UNQUALIFIED = 'UNQUALIFIED'
}

export enum DealStage {
  QUALIFICATION = 'Qualification',
  DISCOVERY = 'Discovery',
  PROPOSAL = 'Proposal',
  NEGOTIATION = 'Negotiation',
  WON = 'Won',
  LOST = 'Lost'
}

export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  title: string;
  status: LeadStatus;
  source: string;
  aiScore: number;
  lastActivity: string;
  avatar: string;
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: DealStage;
  leadId: string;
  expectedClose: string;
  probability: number;
}

export interface Task {
  id: string;
  title: string;
  dealId?: string;
  priority: TaskPriority;
  dueDate: string;
  dueTime: string;
  completed: boolean;
  aiSuggested?: boolean;
}

export interface Activity {
  id: string;
  type: 'email' | 'call' | 'note' | 'meeting';
  content: string;
  timestamp: string;
  author: string;
  metadata?: any;
}
