// src/services/api.ts
import { Club, Member, Announcement, Event, Message, User } from '../types';

// This is a mock API service for development.
// In a real app, you would use fetch or axios to make real API calls.

// Simulate API response delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Authentication
  login: async (email: string, password: string): Promise<User> => {
    await delay(800);
    
    // Mock response
    return {
      id: 103,
      name: "Kim Min-ji",
      email: "minji@example.com",
      role: "Member",
      clubId: 1,
      clubName: "Photography Club",
      joinDate: "2023-03-15"
    };
  },
  
  // Clubs
  getClubs: async (): Promise<Club[]> => {
    await delay(800);
    return [
      { id: 1, name: 'Photography Club', description: 'For photography enthusiasts', category: 'Arts', memberCount: 25 },
      { id: 2, name: 'Debate Society', description: 'Improve your public speaking', category: 'Academic', memberCount: 18 },
      { id: 3, name: 'Hiking Club', description: 'Weekend adventures in nature', category: 'Sports', memberCount: 32 },
    ];
  },
  
  getClub: async (clubId: number): Promise<Club> => {
    await delay(500);
    return { 
      id: clubId, 
      name: 'Photography Club', 
      description: 'A community of photography enthusiasts who share knowledge and organize photo walks.', 
      category: 'Arts', 
      memberCount: 25 
    };
  },
  
  createClub: async (club: Omit<Club, 'id'>): Promise<Club> => {
    await delay(800);
    return {
      id: 4,
      ...club
    };
  },
  
  updateClub: async (club: Club): Promise<Club> => {
    await delay(500);
    return club;
  },
  
  deleteClub: async (clubId: number): Promise<boolean> => {
    await delay(500);
    return true;
  },
  
  // Members
  getMembers: async (clubId?: number): Promise<Member[]> => {
    await delay(800);
    
    const members = [
      { 
        id: 1, 
        name: 'Kim Min-ji', 
        email: 'minji@example.com', 
        phoneNumber: '010-1234-5678', 
        joinDate: '2023-03-15', 
        role: 'Member', 
        clubId: 1,
        clubName: 'Photography Club'
      },
      { 
        id: 2, 
        name: 'Park Ji-woo', 
        email: 'jiwoo@example.com', 
        phoneNumber: '010-2345-6789', 
        joinDate: '2023-04-10', 
        role: 'Club Leader', 
        clubId: 1,
        clubName: 'Photography Club'
      },
      { 
        id: 3, 
        name: 'Lee Hyun-soo', 
        email: 'hyunsoo@example.com', 
        phoneNumber: '010-3456-7890', 
        joinDate: '2023-02-22', 
        role: 'Member', 
        clubId: 2,
        clubName: 'Debate Society'
      },
    ];
    
    return clubId ? members.filter(member => member.clubId === clubId) : members;
  },
  
  // And so on for other API calls...
  
  // Announcements
  getAnnouncements: async (clubId?: number): Promise<Announcement[]> => {
    await delay(800);
    
    const announcements = [
      { 
        id: 1, 
        title: 'Photography Exhibition Next Month', 
        content: 'We will be hosting our annual photography exhibition on June 15th. All members are encouraged to submit their best work.', 
        author: 'Park Ji-woo', 
        publishDate: '2023-05-10', 
        clubId: 1,
        clubName: 'Photography Club',
        important: true
      },
      { 
        id: 2, 
        title: 'Debate Competition Registration', 
        content: 'Registration for the inter-university debate competition is now open. Please contact the club leader if you wish to participate.', 
        author: 'Choi Seo-jun', 
        publishDate: '2023-05-12', 
        clubId: 2,
        clubName: 'Debate Society',
        important: false
      },
      { 
        id: 3, 
        title: 'Weekend Hiking Trip', 
        content: 'We are organizing a hiking trip to Bukhansan this Saturday. Meet at the campus main gate at 8 AM.', 
        author: 'Kim Tae-hyun', 
        publishDate: '2023-05-15', 
        clubId: 3,
        clubName: 'Hiking Club',
        important: true
      },
    ];
    
    return clubId ? announcements.filter(announcement => announcement.clubId === clubId) : announcements;
  },
  
  // Events
  getEvents: async (clubId?: number): Promise<Event[]> => {
    await delay(800);
    
    const events = [
      { 
        id: 1, 
        title: 'Photography Workshop', 
        description: 'Learn basic composition techniques and camera settings for beginners.', 
        startDate: '2023-06-05', 
        startTime: '14:00', 
        endDate: '2023-06-05', 
        endTime: '17:00', 
        location: 'Arts Building, Room A203', 
        clubId: 1,
        clubName: 'Photography Club',
        organizer: 'Park Ji-woo',
        attendees: 12
      },
      { 
        id: 2, 
        title: 'Inter-Club Debate', 
        description: 'Debate on current social issues with other university clubs.', 
        startDate: '2023-06-12', 
        startTime: '15:00', 
        endDate: '2023-06-12', 
        endTime: '18:00', 
        location: 'Main Auditorium', 
        clubId: 2,
        clubName: 'Debate Society',
        organizer: 'Choi Seo-jun',
        attendees: 8
      },
      { 
        id: 3, 
        title: 'Weekend Hiking Trip', 
        description: 'Hiking trip to Bukhansan. Transportation will be provided.', 
        startDate: '2023-06-17', 
        startTime: '08:00', 
        endDate: '2023-06-17', 
        endTime: '18:00', 
        location: 'Meet at Campus Main Gate', 
        clubId: 3,
        clubName: 'Hiking Club',
        organizer: 'Kim Tae-hyun',
        attendees: 15
      },
    ];
    
    return clubId ? events.filter(event => event.clubId === clubId) : events;
  },
  
  // Chat messages
  getMessages: async (clubId: number): Promise<Message[]> => {
    await delay(800);
    
    return [
      {
        id: 1,
        content: "Hello everyone! Just a reminder that we have the photography workshop this weekend.",
        sender: {
          id: 101,
          name: "Park Ji-woo",
          initials: "PJ"
        },
        timestamp: "2023-05-18T09:23:12",
        isOwn: false
      },
      {
        id: 2,
        content: "Thanks for the reminder! Will we need to bring our own equipment?",
        sender: {
          id: 102,
          name: "Lee Hyun-soo",
          initials: "LH"
        },
        timestamp: "2023-05-18T09:25:45",
        isOwn: false
      },
      {
        id: 3,
        content: "Yes, please bring your cameras. We'll have some extra lenses if anyone needs to borrow.",
        sender: {
          id: 101,
          name: "Park Ji-woo",
          initials: "PJ"
        },
        timestamp: "2023-05-18T09:28:30",
        isOwn: false
      },
      {
        id: 4,
        content: "I'm excited for the workshop! I've been wanting to improve my landscape photography.",
        sender: {
          id: 103,
          name: "Kim Min-ji",
          initials: "KM"
        },
        timestamp: "2023-05-18T09:30:15",
        isOwn: true
      },
      {
        id: 5,
        content: "That's great! We'll definitely cover some landscape techniques.",
        sender: {
          id: 101,
          name: "Park Ji-woo",
          initials: "PJ"
        },
        timestamp: "2023-05-18T09:32:20",
        isOwn: false
      }
    ];
  },
  
  sendMessage: async (clubId: number, content: string): Promise<Message> => {
    await delay(300);
    
    return {
      id: 6,
      content,
      sender: {
        id: 103,
        name: "Kim Min-ji",
        initials: "KM"
      },
      timestamp: new Date().toISOString(),
      isOwn: true
    };
  }
};

export default api;