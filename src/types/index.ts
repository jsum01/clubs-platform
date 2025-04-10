export interface Club {
    id: number;
    name: string;
    description: string;
    category: string;
    memberCount: number;
  }
  
  export interface Member {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    joinDate: string;
    role: string;
    clubId: number;
    clubName: string;
  }
  
  export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    publishDate: string;
    clubId: number;
    clubName: string;
    important: boolean;
  }
  
  export interface Event {
    id: number;
    title: string;
    description: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    location: string;
    clubId: number;
    clubName: string;
    organizer: string;
    attendees?: number;
  }
  
  export interface Message {
    id: number;
    content: string;
    sender: {
      id: number;
      name: string;
      initials: string;
    };
    timestamp: string;
    isOwn: boolean;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    clubId: number;
    clubName: string;
    joinDate: string;
  }