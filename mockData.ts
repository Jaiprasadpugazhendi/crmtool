
import { Lead, LeadStatus, Deal, DealStage, Task, TaskPriority, Activity } from './types';

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'l1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@techflow.com',
    company: 'TechFlow Inc.',
    title: 'VP of Engineering',
    status: LeadStatus.QUALIFIED,
    source: 'LinkedIn',
    aiScore: 88,
    lastActivity: '2 hours ago',
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    id: 'l2',
    name: 'Marcus Chen',
    email: 'm.chen@datapulse.io',
    company: 'DataPulse',
    title: 'Founder',
    status: LeadStatus.NEW,
    source: 'Email',
    aiScore: 45,
    lastActivity: '5 hours ago',
    avatar: 'https://picsum.photos/seed/marcus/100/100'
  },
  {
    id: 'l3',
    name: 'Elena Rodriguez',
    email: 'elena.r@cloudscale.net',
    company: 'CloudScale',
    title: 'Director of Operations',
    status: LeadStatus.CONTACTED,
    source: 'Referral',
    aiScore: 72,
    lastActivity: '1 day ago',
    avatar: 'https://picsum.photos/seed/elena/100/100'
  },
  {
    id: 'l4',
    name: 'James Wilson',
    email: 'j.wilson@innosoft.io',
    company: 'InnoSoft',
    title: 'Head of Sales',
    status: LeadStatus.QUALIFIED,
    source: 'Organic Search',
    aiScore: 91,
    lastActivity: '3 hours ago',
    avatar: 'https://picsum.photos/seed/james/100/100'
  }
];

export const INITIAL_DEALS: Deal[] = [
  {
    id: 'd1',
    title: 'Global Tech Expansion',
    value: 50000,
    stage: DealStage.PROPOSAL,
    leadId: 'l1',
    expectedClose: '2023-10-24',
    probability: 85
  },
  {
    id: 'd2',
    title: 'DataPulse Enterprise Licensing',
    value: 12500,
    stage: DealStage.QUALIFICATION,
    leadId: 'l2',
    expectedClose: '2023-11-15',
    probability: 30
  },
  {
    id: 'd3',
    title: 'Starlight Systems Cloud Migration',
    value: 22000,
    stage: DealStage.NEGOTIATION,
    leadId: 'l3',
    expectedClose: '2023-10-30',
    probability: 60
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Finalize contract terms with TechFlow',
    dealId: 'd1',
    priority: TaskPriority.HIGH,
    dueDate: 'Today',
    dueTime: '2:30 PM',
    completed: false,
    aiSuggested: true
  },
  {
    id: 't2',
    title: 'Follow up on proposal feedback from InnoSoft',
    dealId: 'd1',
    priority: TaskPriority.MEDIUM,
    dueDate: 'Today',
    dueTime: '4:00 PM',
    completed: false
  },
  {
    id: 't3',
    title: 'Send introductory deck to Marcus',
    priority: TaskPriority.LOW,
    dueDate: 'Today',
    dueTime: '5:30 PM',
    completed: false
  },
  {
    id: 't4',
    title: 'Review quarterly goals',
    priority: TaskPriority.MEDIUM,
    dueDate: 'Yesterday',
    dueTime: '9:00 AM',
    completed: true
  }
];

export const MOCK_ACTIVITIES: Record<string, Activity[]> = {
  'l1': [
    {
      id: 'a1',
      type: 'email',
      content: 'Sent proposal deck after the discovery call.',
      timestamp: '2 hours ago',
      author: 'Alex Rivera'
    },
    {
      id: 'a2',
      type: 'call',
      content: 'Discovery call completed. Customer is interested in the Enterprise plan.',
      timestamp: 'Yesterday, 10:00 AM',
      author: 'Alex Rivera'
    }
  ]
};
