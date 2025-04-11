import React, { useState } from 'react';
import styled from 'styled-components';
import ClubInfo from './ClubInfo';
import UserAnnouncements from './UserPosts';
import UserEvents from './UserEvents';
import UserChat from './UserChat';

interface HomeTabProps {
  userClub: {
    id: number;
    name: string;
    memberCount: number;
    joinDate: string;
    role: string;
  };
  setActiveTab: (tab: string) => void;
}

const HomeTab: React.FC<HomeTabProps> = ({ userClub, setActiveTab }) => {
  // Mock data for the home tab
  const recentAnnouncements = [
    { 
      id: 1, 
      title: 'Photography Exhibition Next Month', 
      publishDate: '2023-05-10',
      important: true 
    },
  ];
  
  const upcomingEvents = [
    { 
      id: 1, 
      title: 'Photography Workshop', 
      startDate: '2023-06-05', 
      startTime: '14:00',
      location: 'Arts Building, Room A203'
    },
  ];

  return (
    <HomeContainer>
      <WelcomeTitle>반갑습니다, Kim Min-ji님!</WelcomeTitle>
      
      <WidgetsGrid>
        <Widget>
          <WidgetHeader>
            <WidgetTitle>동아리 정보</WidgetTitle>
            <LinkButton onClick={() => {}}>회원 보기</LinkButton>
          </WidgetHeader>
          <WidgetBody>
            <ClubInfo clubId={userClub.id} />
          </WidgetBody>
        </Widget>
        
        <Widget>
          <WidgetHeader>
            <WidgetTitle>최근 공지사항</WidgetTitle>
            <LinkButton onClick={() => setActiveTab('announcements')}>모두 보기</LinkButton>
          </WidgetHeader>
          <WidgetBody>
            {recentAnnouncements.length > 0 ? (
              <QuickList>
                {recentAnnouncements.map(announcement => (
                  <QuickListItem key={announcement.id} important={announcement.important}>
                    <ItemTitle>{announcement.title}</ItemTitle>
                    <ItemMeta>{announcement.publishDate}</ItemMeta>
                  </QuickListItem>
                ))}
              </QuickList>
            ) : (
              <EmptyMessage>최근 공지사항이 없습니다</EmptyMessage>
            )}
          </WidgetBody>
        </Widget>
        
        <Widget>
          <WidgetHeader>
            <WidgetTitle>예정된 일정</WidgetTitle>
            <LinkButton onClick={() => setActiveTab('events')}>모두 보기</LinkButton>
          </WidgetHeader>
          <WidgetBody>
            {upcomingEvents.length > 0 ? (
              <QuickList>
                {upcomingEvents.map(event => (
                  <QuickListItem key={event.id}>
                    <ItemTitle>{event.title}</ItemTitle>
                    <EventDetails>
                      <ItemMeta>{event.startDate} {event.startTime}</ItemMeta>
                      <ItemMeta>{event.location}</ItemMeta>
                    </EventDetails>
                  </QuickListItem>
                ))}
              </QuickList>
            ) : (
              <EmptyMessage>예정된 일정이 없습니다</EmptyMessage>
            )}
          </WidgetBody>
        </Widget>
        
        <Widget>
          <WidgetHeader>
            <WidgetTitle>최근 활동</WidgetTitle>
          </WidgetHeader>
          <WidgetBody>
            <ActivityList>
              <ActivityItem>
                <ActivityIcon>💬</ActivityIcon>
                <ActivityContent>
                  <ActivityText>동아리 채팅에 새 메시지</ActivityText>
                  <ActivityTime>10분 전</ActivityTime>
                </ActivityContent>
              </ActivityItem>
              <ActivityItem>
                <ActivityIcon>📅</ActivityIcon>
                <ActivityContent>
                  <ActivityText>사진 워크샵 일정이 등록되었습니다</ActivityText>
                  <ActivityTime>2시간 전</ActivityTime>
                </ActivityContent>
              </ActivityItem>
              <ActivityItem>
                <ActivityIcon>👤</ActivityIcon>
                <ActivityContent>
                  <ActivityText>2명의 신규 회원이 가입했습니다</ActivityText>
                  <ActivityTime>어제</ActivityTime>
                </ActivityContent>
              </ActivityItem>
            </ActivityList>
          </WidgetBody>
        </Widget>
      </WidgetsGrid>
    </HomeContainer>
  );
};

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userClub, setUserClub] = useState({
    id: 1,
    name: 'Photography Club',
    memberCount: 25,
    joinDate: '2023-03-15',
    role: 'Member'
  });

  return (
    <DashboardContainer>
      <Sidebar>
        <UserProfile>
          <Avatar>
            <AvatarPlaceholder>KM</AvatarPlaceholder>
          </Avatar>
          <UserName>Kim Min-ji</UserName>
          <UserClub>{userClub.name}</UserClub>
          <UserRole>{userClub.role}</UserRole>
        </UserProfile>
        <UserMenu>
          <MenuItem 
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')}
          >
            홈
          </MenuItem>
          <MenuItem 
            active={activeTab === 'announcements'} 
            onClick={() => setActiveTab('announcements')}
          >
            공지사항
          </MenuItem>
          <MenuItem 
            active={activeTab === 'events'} 
            onClick={() => setActiveTab('events')}
          >
            일정
          </MenuItem>
          <MenuItem 
            active={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')}
          >
            동아리 채팅
          </MenuItem>
        </UserMenu>
      </Sidebar>
      <Content>
        {activeTab === 'home' && <HomeTab userClub={userClub} setActiveTab={setActiveTab} />}
        {activeTab === 'announcements' && <UserAnnouncements clubId={userClub.id} />}
        {activeTab === 'events' && <UserEvents clubId={userClub.id} />}
        {activeTab === 'chat' && <UserChat clubId={userClub.id} clubName={userClub.name} />}
      </Content>
    </DashboardContainer>
  );
};

export default UserDashboard;


const DashboardContainer = styled.div`
  display: flex;
  height: calc(100vh - 120px);
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #2d3748;
  color: white;
  padding: 1.5rem;
`;

const UserProfile = styled.div`
  text-align: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #4a5568;
  margin-bottom: 1.5rem;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 1rem;
  overflow: hidden;
  background-color: #4299e1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarPlaceholder = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`;

const UserName = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
`;

const UserClub = styled.p`
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const UserRole = styled.p`
  display: inline-block;
  background-color: #4299e1;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const UserMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li<{ active: boolean }>`
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: ${props => props.active ? '#4299e1' : 'transparent'};

  &:hover {
    background-color: ${props => props.active ? '#4299e1' : '#4a5568'};
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
`;

// Home Dashboard Components
const HomeContainer = styled.div`
  padding: 1rem;
`;

const WelcomeTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1.5rem;
`;

const WidgetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const Widget = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const WidgetHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WidgetTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: #4299e1;
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const WidgetBody = styled.div`
  padding: 1rem;
`;

const QuickList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const QuickListItem = styled.li<{ important?: boolean }>`
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;
  border-left: ${props => props.important ? '3px solid #f56565' : 'none'};
  padding-left: ${props => props.important ? '0.5rem' : '0'};

  &:last-child {
    border-bottom: none;
  }
`;

const ItemTitle = styled.span`
  display: block;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const ItemMeta = styled.span`
  font-size: 0.85rem;
  color: #718096;
`;

const EventDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActivityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ActivityItem = styled.li`
  display: flex;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  margin-right: 0.75rem;
  font-size: 1.25rem;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.span`
  display: block;
  margin-bottom: 0.25rem;
`;

const ActivityTime = styled.span`
  font-size: 0.85rem;
  color: #718096;
`;

const EmptyMessage = styled.p`
  color: #718096;
  font-style: italic;
  text-align: center;
`;