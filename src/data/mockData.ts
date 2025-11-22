import { Poll, Member, ForumThread } from '../types';

export const mockPolls: Poll[] = [
  {
    id: '1',
    title: 'Infrastructure Development Priority',
    description: 'What should be our top infrastructure priority for the district?',
    options: [
      { id: '1', text: 'Road Construction', votes: 245 },
      { id: '2', text: 'Water Supply', votes: 189 },
      { id: '3', text: 'Electricity Grid', votes: 156 },
    ],
    endDate: new Date('2025-02-15'),
    createdBy: 'District Leader',
    status: 'active',
  },
  {
    id: '2',
    title: 'Next Campaign Strategy',
    description: 'Vote for the most effective campaign approach',
    options: [
      { id: '1', text: 'Door-to-door canvassing', votes: 312 },
      { id: '2', text: 'Social media campaign', votes: 298 },
      { id: '3', text: 'Town hall meetings', votes: 203 },
    ],
    endDate: new Date('2025-02-10'),
    createdBy: 'State Leader',
    status: 'active',
  },
  {
    id: '3',
    title: 'Booth Meeting Schedule',
    description: 'Preferred day for weekly booth meetings',
    options: [
      { id: '1', text: 'Saturday Evening', votes: 178 },
      { id: '2', text: 'Sunday Morning', votes: 234 },
      { id: '3', text: 'Wednesday Evening', votes: 98 },
    ],
    endDate: new Date('2025-02-05'),
    createdBy: 'Booth President',
    status: 'active',
  },
];

export const mockMembers: Member[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'State Leader',
    contact: '+91 98765 43210',
    location: 'State Headquarters',
    joinedDate: new Date('2020-01-15'),
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'District Leader',
    contact: '+91 98765 43211',
    location: 'District Office',
    joinedDate: new Date('2020-03-20'),
  },
  {
    id: '3',
    name: 'Amit Patel',
    role: 'Mandal Leader',
    contact: '+91 98765 43212',
    location: 'Mandal Center',
    joinedDate: new Date('2021-06-10'),
  },
  {
    id: '4',
    name: 'Sunita Reddy',
    role: 'Booth President',
    contact: '+91 98765 43213',
    location: 'Booth #42',
    joinedDate: new Date('2022-01-05'),
  },
  {
    id: '5',
    name: 'Vikram Singh',
    role: 'Member',
    contact: '+91 98765 43214',
    location: 'Booth #42',
    joinedDate: new Date('2023-04-12'),
  },
  {
    id: '6',
    name: 'Anjali Gupta',
    role: 'Member',
    contact: '+91 98765 43215',
    location: 'Booth #43',
    joinedDate: new Date('2023-07-22'),
  },
];

export const mockForumThreads: ForumThread[] = [
  {
    id: '1',
    title: 'New School Building Project - Discussion',
    author: 'Rajesh Kumar',
    content: 'We need to discuss the proposed new school building in Ward 5. Budget allocation and timeline need to be finalized.',
    category: 'Development',
    createdAt: new Date('2025-01-20'),
    replies: 23,
  },
  {
    id: '2',
    title: 'Healthcare Initiative for Rural Areas',
    author: 'Priya Sharma',
    content: 'Proposing a mobile healthcare unit to serve remote villages. Looking for volunteers and feedback on implementation.',
    category: 'Social Cause',
    createdAt: new Date('2025-01-18'),
    replies: 15,
  },
  {
    id: '3',
    title: 'Upcoming State Convention - Preparations',
    author: 'Amit Patel',
    content: 'The state convention is scheduled for March 15th. We need to coordinate venue, logistics, and delegate registration.',
    category: 'General',
    createdAt: new Date('2025-01-15'),
    replies: 34,
  },
  {
    id: '4',
    title: 'Important: Updated Guidelines for Booth Activities',
    author: 'District Office',
    content: 'Please review the updated guidelines for booth-level activities. All booth presidents must acknowledge receipt.',
    category: 'Announcement',
    createdAt: new Date('2025-01-22'),
    replies: 8,
  },
];
