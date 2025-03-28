import React, { useState } from 'react';
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
}

const EventManagement: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
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
      organizer: 'Park Ji-woo'
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
      organizer: 'Choi Seo-jun'
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
      organizer: 'Kim Tae-hyun'
    },
  ]);

  const clubs = [
    { id: 1, name: 'Photography Club' },
    { id: 2, name: 'Debate Society' },
    { id: 3, name: 'Hiking Club' },
  ];
  
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id' | 'clubName'>>({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    clubId: 0,
    organizer: ''
  });

  const handleCreateEvent = () => {
    const club = clubs.find(c => c.id === newEvent.clubId);
    if (!club) return;
    
    const eventToAdd: Event = {
      id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
      ...newEvent,
      clubName: club.name
    };
    
    setEvents([...events, eventToAdd]);
    setNewEvent({
      title: '',
      description: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      location: '',
      clubId: 0,
      organizer: ''
    });
    setShowForm(false);
  };

  const handleUpdateEvent = () => {
    if (!editingEvent) return;
    
    // Update club name if club id changed
    const updatedEvent = {...editingEvent};
    if (editingEvent.clubId !== events.find(e => e.id === editingEvent.id)?.clubId) {
      const club = clubs.find(c => c.id === editingEvent.clubId);
      if (club) {
        updatedEvent.clubName = club.name;
      }
    }
    
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
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

  return (
    <div>
      <AdminHeader>
        <h2>일정 관리</h2>
        <PrimaryButton onClick={() => setShowForm(true)}>새 일정 등록</PrimaryButton>
      </AdminHeader>

      {showForm && (
        <AdminCard>
          <CardTitle>새 일정 등록</CardTitle>
          <AdminForm>
            <FormGroup>
              <Label>제목</Label>
              <Input 
                type="text" 
                value={newEvent.title}
                onChange={e => setNewEvent({...newEvent, title: e.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label>설명</Label>
              <TextArea 
                value={newEvent.description}
                onChange={e => setNewEvent({...newEvent, description: e.target.value})}
              />
            </FormGroup>
            <FormRow>
              <FormColumn>
                <FormGroup>
                  <Label>시작일</Label>
                  <Input 
                    type="date" 
                    value={newEvent.startDate}
                    onChange={e => setNewEvent({...newEvent, startDate: e.target.value})}
                  />
                </FormGroup>
              </FormColumn>
              <FormColumn>
                <FormGroup>
                  <Label>시작 시간</Label>
                  <Input 
                    type="time" 
                    value={newEvent.startTime}
                    onChange={e => setNewEvent({...newEvent, startTime: e.target.value})}
                  />
                </FormGroup>
              </FormColumn>
            </FormRow>
            <FormRow>
              <FormColumn>
                <FormGroup>
                  <Label>종료일</Label>
                  <Input 
                    type="date" 
                    value={newEvent.endDate}
                    onChange={e => setNewEvent({...newEvent, endDate: e.target.value})}
                  />
                </FormGroup>
              </FormColumn>
              <FormColumn>
                <FormGroup>
                  <Label>종료 시간</Label>
                  <Input 
                    type="time" 
                    value={newEvent.endTime}
                    onChange={e => setNewEvent({...newEvent, endTime: e.target.value})}
                  />
                </FormGroup>
              </FormColumn>
            </FormRow>
            <FormGroup>
              <Label>장소</Label>
              <Input 
                type="text" 
                value={newEvent.location}
                onChange={e => setNewEvent({...newEvent, location: e.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label>주최자</Label>
              <Input 
                type="text" 
                value={newEvent.organizer}
                onChange={e => setNewEvent({...newEvent, organizer: e.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label>동아리</Label>
              <Select 
                value={newEvent.clubId}
                onChange={e => setNewEvent({...newEvent, clubId: parseInt(e.target.value) || 0})}
              >
                <option value="0">동아리 선택</option>
                {clubs.map(club => (
                  <option key={club.id} value={club.id}>{club.name}</option>
                ))}
              </Select>
            </FormGroup>
            <AdminActions>
              <SuccessButton onClick={handleCreateEvent}>일정 등록</SuccessButton>
              <DangerButton onClick={() => setShowForm(false)}>취소</DangerButton>
            </AdminActions>
          </AdminForm>
        </AdminCard>
      )}

      {editingEvent && (
        <AdminCard>
          <CardTitle>일정 수정</CardTitle>
          <AdminForm>
            <FormGroup>
              <Label>제목</Label>
              <Input 
                type="text" 
                value={editingEvent.title}
                onChange={e => setEditingEvent({...editingEvent, title: e.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label>설명</Label>
              <TextArea 
                value={editingEvent.description}
                onChange={e => setEditingEvent({...editingEvent, description: e.target.value})}
              />
            </FormGroup>
            <FormRow>
              <FormColumn>
                <FormGroup>
                  <Label>시작일</Label>
                  <Input 
                    type="date" 
                    value={editingEvent.startDate}
                    onChange={e => setEditingEvent({...editingEvent, startDate: e.target.value})}
                  />
                </FormGroup>
              </FormColumn>
              <FormColumn>
                <FormGroup>
                  <Label>시작 시간</Label>
                  <Input 
                    type="time" 
                    value={editingEvent.startTime}
                    onChange={e => setEditingEvent({...editingEvent, startTime: e.target.value})}
                  />
                </FormGroup>
              </FormColumn>
            </FormRow>
            <FormRow>
              <FormColumn>
                <FormGroup>
                  <Label>종료일</Label>
                  <Input 
                    type="date" 
                    value={editingEvent.endDate}
                    onChange={e => setEditingEvent({...editingEvent, endDate: e.target.value})}
                  />
                </FormGroup>
              </FormColumn>
              <FormColumn>
                <FormGroup>
                  <Label>종료 시간</Label>
                  <Input 
                    type="time" 
                    value={editingEvent.endTime}
                    onChange={e => setEditingEvent({...editingEvent, endTime: e.target.value})}
                  />
                </FormGroup>
              </FormColumn>
            </FormRow>
            <FormGroup>
              <Label>장소</Label>
              <Input 
                type="text" 
                value={editingEvent.location}
                onChange={e => setEditingEvent({...editingEvent, location: e.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label>주최자</Label>
              <Input 
                type="text" 
                value={editingEvent.organizer}
                onChange={e => setEditingEvent({...editingEvent, organizer: e.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label>동아리</Label>
              <Select 
                value={editingEvent.clubId}
                onChange={e => setEditingEvent({...editingEvent, clubId: parseInt(e.target.value) || 0})}
              >
                <option value="0">동아리 선택</option>
                {clubs.map(club => (
                  <option key={club.id} value={club.id}>{club.name}</option>
                ))}
              </Select>
            </FormGroup>
            <AdminActions>
              <SuccessButton onClick={handleUpdateEvent}>수정 완료</SuccessButton>
              <DangerButton onClick={() => setEditingEvent(null)}>취소</DangerButton>
            </AdminActions>
          </AdminForm>
        </AdminCard>
      )}

      <EventsGrid>
        {events.map(event => (
          <AdminCard key={event.id}>
            <EventCardHeader>
              <div>
                <EventCardTitle>{event.title}</EventCardTitle>
                <EventOrganizer>주최자: {event.organizer}</EventOrganizer>
              </div>
              <AdminActions>
                <PrimaryButton onClick={() => setEditingEvent(event)}>수정</PrimaryButton>
                <DangerButton onClick={() => handleDeleteEvent(event.id)}>삭제</DangerButton>
              </AdminActions>
            </EventCardHeader>
            <EventCardBody>
              <EventInfoItem>
                <EventInfoLabel>시작:</EventInfoLabel>
                <span>{formatDateTime(event.startDate, event.startTime)}</span>
              </EventInfoItem>
              <EventInfoItem>
                <EventInfoLabel>종료:</EventInfoLabel>
                <span>{formatDateTime(event.endDate, event.endTime)}</span>
              </EventInfoItem>
              <EventInfoItem>
                <EventInfoLabel>장소:</EventInfoLabel>
                <span>{event.location}</span>
              </EventInfoItem>
              <EventInfoItem>
                <EventInfoLabel>동아리:</EventInfoLabel>
                <span>{event.clubName}</span>
              </EventInfoItem>
              <EventDescription>{event.description}</EventDescription>
            </EventCardBody>
          </AdminCard>
        ))}
      </EventsGrid>
    </div>
  );
};

const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const AdminCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
`;

const AdminForm = styled.div`
  max-width: 600px;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const FormColumn = styled.div`
  flex: 1;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  resize: vertical;
  min-height: 80px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
`;

const AdminActions = styled.div`
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

const PrimaryButton = styled(Button)`
  background-color: #4299e1;
  color: white;

  &:hover {
    background-color: #3182ce;
  }
`;

const SuccessButton = styled(Button)`
  background-color: #48bb78;
  color: white;

  &:hover {
    background-color: #38a169;
  }
`;

const DangerButton = styled(Button)`
  background-color: #f56565;
  color: white;

  &:hover {
    background-color: #e53e3e;
  }
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const EventCardHeader = styled.div`
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const EventCardTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
`;

const EventOrganizer = styled.span`
  font-size: 0.9rem;
  color: #718096;
`;

const EventCardBody = styled.div`
  margin-bottom: 1rem;
`;

const EventInfoItem = styled.p`
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;
`;

const EventInfoLabel = styled.strong`
  margin-right: 0.5rem;
`;

const EventDescription = styled.p`
  margin-top: 1rem;
  color: #4a5568;
  line-height: 1.5;
`;

export default EventManagement;