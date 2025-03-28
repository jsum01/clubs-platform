import React, { useState } from 'react';
import styled from 'styled-components';

interface Member {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  joinDate: string;
  role: string;
  clubId: number;
  clubName: string;
}

const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const AdminTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 0.75rem;
  border-bottom: 2px solid #e2e8f0;
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
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

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
`;

const AdminActions = styled.div`
  display: flex;
  gap: 0.5rem;
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

const MemberManagement: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([
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
  ]);

  const clubs = [
    { id: 1, name: 'Photography Club' },
    { id: 2, name: 'Debate Society' },
    { id: 3, name: 'Hiking Club' },
  ];
  
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [newMember, setNewMember] = useState<Omit<Member, 'id' | 'clubName'>>({
    name: '',
    email: '',
    phoneNumber: '',
    joinDate: new Date().toISOString().slice(0, 10),
    role: 'Member',
    clubId: 0
  });

  const handleCreateMember = () => {
    const club = clubs.find(c => c.id === newMember.clubId);
    if (!club) return;
    
    const memberToAdd: Member = {
      id: members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1,
      ...newMember,
      clubName: club.name
    };
    
    setMembers([...members, memberToAdd]);
    setNewMember({
      name: '',
      email: '',
      phoneNumber: '',
      joinDate: new Date().toISOString().slice(0, 10),
      role: 'Member',
      clubId: 0
    });
    setShowForm(false);
  };

  const handleUpdateMember = () => {
    if (!editingMember) return;
    
    // Update club name if club id changed
    const updatedMember = {...editingMember};
    if (editingMember.clubId !== members.find(m => m.id === editingMember.id)?.clubId) {
      const club = clubs.find(c => c.id === editingMember.clubId);
      if (club) {
        updatedMember.clubName = club.name;
      }
    }
    
    setMembers(members.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    ));
    setEditingMember(null);
  };

  const handleDeleteMember = (id: number) => {
    setMembers(members.filter(member => member.id !== id));
  };

  return (
    <div>
      <AdminHeader>
        <h2>회원 관리</h2>
        <PrimaryButton onClick={() => setShowForm(true)}>새 회원 추가</PrimaryButton>
      </AdminHeader>

      {showForm && (
        <AdminCard>
          <CardTitle>새 회원 추가</CardTitle>
          <AdminForm>
            <FormGroup>
              <Label>이름</Label>
              <Input 
                type="text" 
                value={newMember.name}
                onChange={e => setNewMember({...newMember, name: e.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label>이메일</Label>
              <Input 
                type="email" 
                value={newMember.email}
                onChange={e => setNewMember({...newMember, email: e.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label>휴대폰 번호</Label>
              <Input 
                type="tel" 
                value={newMember.phoneNumber}
                onChange={e => setNewMember({...newMember, phoneNumber: e.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label>가입일</Label>
              <Input 
                type="date" 
                value={newMember.joinDate}
                onChange={e => setNewMember({...newMember, joinDate: e.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label>역할</Label>
              <Select 
                value={newMember.role}
                onChange={e => setNewMember({...newMember, role: e.target.value})}
              >
                <option value="Member">일반 회원</option>
                <option value="Club Leader">동아리장</option>
                <option value="Treasurer">회계</option>
                <option value="Secretary">총무</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>동아리</Label>
              <Select 
                value={newMember.clubId}
                onChange={e => setNewMember({...newMember, clubId: parseInt(e.target.value) || 0})}
              >
                <option value="0">동아리 선택</option>
                {clubs.map(club => (
                  <option key={club.id} value={club.id}>{club.name}</option>
                ))}
              </Select>
            </FormGroup>
            <AdminActions>
              <SuccessButton onClick={handleCreateMember}>저장</SuccessButton>
              <DangerButton onClick={() => setShowForm(false)}>취소</DangerButton>
            </AdminActions>
          </AdminForm>
        </AdminCard>
      )}

      {editingMember && (
        <AdminCard>
          <CardTitle>회원 정보 수정</CardTitle>
          <AdminForm>
            <FormGroup>
              <Label>이름</Label>
              <Input 
                type="text" 
                value={editingMember.name}
                onChange={e => setEditingMember({...editingMember, name: e.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label>이메일</Label>
              <Input 
                type="email" 
                value={editingMember.email}
                onChange={e => setEditingMember({...editingMember, email: e.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label>휴대폰 번호</Label>
              <Input 
                type="tel" 
                value={editingMember.phoneNumber}
                onChange={e => setEditingMember({...editingMember, phoneNumber: e.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label>가입일</Label>
              <Input 
                type="date" 
                value={editingMember.joinDate}
                onChange={e => setEditingMember({...editingMember, joinDate: e.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label>역할</Label>
              <Select 
                value={editingMember.role}
                onChange={e => setEditingMember({...editingMember, role: e.target.value})}
              >
                <option value="Member">일반 회원</option>
                <option value="Club Leader">동아리장</option>
                <option value="Treasurer">회계</option>
                <option value="Secretary">총무</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>동아리</Label>
              <Select 
                value={editingMember.clubId}
                onChange={e => setEditingMember({...editingMember, clubId: parseInt(e.target.value) || 0})}
              >
                <option value="0">동아리 선택</option>
                {clubs.map(club => (
                  <option key={club.id} value={club.id}>{club.name}</option>
                ))}
              </Select>
            </FormGroup>
            <AdminActions>
              <SuccessButton onClick={handleUpdateMember}>업데이트</SuccessButton>
              <DangerButton onClick={() => setEditingMember(null)}>취소</DangerButton>
            </AdminActions>
          </AdminForm>
        </AdminCard>
      )}

      <AdminTable>
        <thead>
          <tr>
            <TableHeader>이름</TableHeader>
            <TableHeader>이메일</TableHeader>
            <TableHeader>전화번호</TableHeader>
            <TableHeader>동아리</TableHeader>
            <TableHeader>역할</TableHeader>
            <TableHeader>가입일</TableHeader>
            <TableHeader>작업</TableHeader>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.phoneNumber}</TableCell>
              <TableCell>{member.clubName}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>{member.joinDate}</TableCell>
              <TableCell>
                <AdminActions>
                  <PrimaryButton onClick={() => setEditingMember(member)}>수정</PrimaryButton>
                  <DangerButton onClick={() => handleDeleteMember(member.id)}>삭제</DangerButton>
                </AdminActions>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </div>
  );
};

export default MemberManagement;