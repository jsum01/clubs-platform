import React, { useState } from 'react';
import styled from 'styled-components';
import ClubManagement from './ClubManagement';
import MemberManagement from './MemberManagement';
import EventManagement from './EventManagement';
import UserAnnouncements from '../user/UserAnnouncements';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('clubs');

  return (
    <AdminPanelContainer>
      <AdminSidebar>
        <AdminTitle>관리자 패널</AdminTitle>
        <AdminMenu>
          <MenuItem 
            active={activeTab === 'clubs'} 
            onClick={() => setActiveTab('clubs')}
          >
            동아리 관리
          </MenuItem>
          <MenuItem 
            active={activeTab === 'members'} 
            onClick={() => setActiveTab('members')}
          >
            회원 관리
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
            일정 관리
          </MenuItem>
        </AdminMenu>
      </AdminSidebar>
      <AdminContent>
        {activeTab === 'clubs' && <ClubManagement />}
        {activeTab === 'members' && <MemberManagement />}
        {activeTab === 'announcements' && <UserAnnouncements clubId={0} />}
        {activeTab === 'events' && <EventManagement />}
      </AdminContent>
    </AdminPanelContainer>
  );
};


const AdminPanelContainer = styled.div`
  display: flex;
  height: calc(100vh - 120px);
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const AdminSidebar = styled.div`
  width: 250px;
  background-color: #2d3748;
  color: white;
  padding: 1.5rem;
`;

const AdminTitle = styled.h2`
  margin-top: 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid #4a5568;
`;

const AdminMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0 0;
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

const AdminContent = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
`;

export default AdminPanel;

