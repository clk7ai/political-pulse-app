export interface Poll {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  endDate: Date;
  createdBy: string;
  status: 'active' | 'closed';
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Member {
  id: string;
  name: string;
  role: 'State Leader' | 'District Leader' | 'Mandal Leader' | 'Booth President' | 'Member';
  contact: string;
  location: string;
  joinedDate: Date;
}

export interface ForumThread {
  id: string;
  title: string;
  author: string;
  content: string;
  category: 'Development' | 'Social Cause' | 'General' | 'Announcement';
  createdAt: Date;
  replies: number;
}

export interface Comment {
  id: string;
  threadId: string;
  author: string;
  content: string;
  createdAt: Date;
}
