import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Event {
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

interface UserEventsProps {
  clubId: number;
}

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const PageTitle = styled.h2`
  margin: 0;
`;

const FilterControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.active ? '#4299e1' : 'transparent'};
  color: ${props => props.active ? 'white' : '#4a5568'};
  border: 1px solid ${props => props.active ? '#4299e1' : '#e2e8f0'};
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#3182ce' : '#f7fafc'};
  }
`;

const EventCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const EventCardHeader = styled.div`
  margin-bottom: 1rem;
`;

const EventTitle = styled.h3`
  margin: 0 0 0.5rem 0;
`;

const EventOrganizer = styled.span`
  font-size: 0.9rem;
  color: #718096;
`;

const EventInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
`;

const EventInfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const EventInfoLabel = styled.span`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const EventInfoValue = styled.span`
  color: #4a5568;
`;

const EventDescription = styled.p`
  margin: 1rem 0;
  line-height: 1.6;
  color: #4a5568;
`;

const EventActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
`;

const GoingButton = styled(Button)<{ active: boolean }>`
  background-color: ${props => props.active ? '#48bb78' : 'transparent'};
  color: ${props => props.active ? 'white' : '#48bb78'};
  border: 1px solid #48bb78;

  &:hover {
    background-color: ${props => props.active ? '#38a169' : '#f0fff4'};
  }
`;

const MaybeButton = styled(Button)<{ active: boolean }>`
  background-color: ${props => props.active ? '#4299e1' : 'transparent'};
  color: ${props => props.active ? 'white' : '#4299e1'};
  border: 1px solid #4299e1;

  &:hover {
    background-color: ${props => props.active ? '#3182ce' : '#ebf8ff'};
  }
`;

const NotGoingButton = styled(Button)<{ active: boolean }>`
  background-color: ${props => props.active ? '#f56565' : 'transparent'};
  color: ${props => props.active ? 'white' : '#f56565'};
  border: 1px solid #f56565;

  &:hover {
    background-color: ${props => props.active ? '#e53e3e' : '#fff5f5'};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 8px;
  color: #718096;
`;

const LoadingIndicator = styled.div`
  text-align: center;
  padding: 2rem;
  color: #718096;
`;

const UserEvents: React.FC<UserEventsProps> = ({ clubId }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming'); // 'upcoming', 'past', 'all'
  const [userRsvp, setUserRsvp] = useState<{[key: number]: string}>({
    1: 'going', // Example: User is going to event with id 1
    2: 'maybe'  // Example: User might go to event with id 2
  });

  // In a real app, you would fetch events from an API
  useEffect(() => {
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock data - this would come from your API
      const mockEvents = [
        { 
          id: 1, 
          title: 'Photography Workshop', 
          description: '초보자를 위한 기본 구성 기술 및 카메라 설정에 대해 배웁니다.', 
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
          title: 'Photo Exhibition Planning', 
          description: '다가오는 사진 전시회를 계획하기 위한 팀 회의입니다. 주제, 물류 및 책임을 논의할 것입니다.', 
          startDate: '2023-05-25', 
          startTime: '15:00', 
          endDate: '2023-05-25', 
          endTime: '17:00', 
          location: 'Main Campus Building, Room 302', 
          clubId: 1,
          clubName: 'Photography Club',
          organizer: 'Lee Joon-ho',
          attendees: 8
        },
        { 
          id: 3, 
          title: 'Weekend Photo Walk', 
          description: '경복궁에서의 사진 산책. 주제는 "전통 건축"입니다.', 
          startDate: '2023-05-20', 
          startTime: '10:00', 
          endDate: '2023-05-20', 
          endTime: '16:00', 
          location: '경복궁 정문', 
          clubId: 1,
          clubName: 'Photography Club',
          organizer: 'Kim Min-ji',
          attendees: 15
        },
      ];
      
      setEvents(mockEvents);
      setLoading(false);
    }, 800);
  }, [clubId]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(`${event.startDate}T${event.startTime}`);
    
    if (filter === 'all') return true;
    if (filter === 'upcoming') return eventDate >= today;
    if (filter === 'past') return eventDate < today;
    return true;
  });

  const handleRsvp = (eventId: number, status: string) => {
    setUserRsvp({
      ...userRsvp,
      [eventId]: status
    });
    
    // In a real app, you would send this to your API
    console.log(`RSVP to event ${eventId}: ${status}`);
  };

  // Helper function to format date and time
  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <LoadingIndicator>일정 로딩 중...</LoadingIndicator>;
  }

  return (
    <div>
      <PageHeader>
        <PageTitle>일정</PageTitle>
        <FilterControls>
          <FilterButton 
            active={filter === 'upcoming'}
            onClick={() => setFilter('upcoming')}
          >
            예정된 일정
          </FilterButton>
          <FilterButton 
            active={filter === 'past'}
            onClick={() => setFilter('past')}
          >
            지난 일정
          </FilterButton>
          <FilterButton 
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            전체
          </FilterButton>
        </FilterControls>
      </PageHeader>

      {filteredEvents.length === 0 ? (
        <EmptyState>
          <p>일정이 없습니다.</p>
        </EmptyState>
      ) : (
        filteredEvents.map(event => {
          const isPast = new Date(`${event.startDate}T${event.startTime}`) < today;
          return (
            <EventCard key={event.id}>
              <EventCardHeader>
                <EventTitle>{event.title}</EventTitle>
                <EventOrganizer>주최자: {event.organizer}</EventOrganizer>
              </EventCardHeader>
              
              <EventInfo>
                <EventInfoItem>
                  <EventInfoLabel>시작</EventInfoLabel>
                  <EventInfoValue>{formatDateTime(event.startDate, event.startTime)}</EventInfoValue>
                </EventInfoItem>
                
                <EventInfoItem>
                  <EventInfoLabel>종료</EventInfoLabel>
                  <EventInfoValue>{formatDateTime(event.endDate, event.endTime)}</EventInfoValue>
                </EventInfoItem>
                
                <EventInfoItem>
                  <EventInfoLabel>장소</EventInfoLabel>
                  <EventInfoValue>{event.location}</EventInfoValue>
                </EventInfoItem>
                
                <EventInfoItem>
                  <EventInfoLabel>참석자</EventInfoLabel>
                  <EventInfoValue>{event.attendees || 0}명 참석 예정</EventInfoValue>
                </EventInfoItem>
              </EventInfo>
              
              <EventDescription>{event.description}</EventDescription>
              
              {!isPast && (
                <EventActions>
                  <GoingButton 
                    active={userRsvp[event.id] === 'going'}
                    onClick={() => handleRsvp(event.id, 'going')}
                  >
                    참석
                  </GoingButton>
                  <MaybeButton 
                    active={userRsvp[event.id] === 'maybe'}
                    onClick={() => handleRsvp(event.id, 'maybe')}
                  >
                    미정
                  </MaybeButton>
                  <NotGoingButton 
                    active={userRsvp[event.id] === 'not-going'}
                    onClick={() => handleRsvp(event.id, 'not-going')}
                  >
                    불참
                  </NotGoingButton>
                </EventActions>
              )}
            </EventCard>
          );
        })
      )}
    </div>
  );
};

export default UserEvents;