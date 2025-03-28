import React, { useState } from 'react';
import styled from 'styled-components';

interface Club {
  id: number;
  name: string;
  description: string;
  category: string;
  memberCount: number;
}

const ClubManagement: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([
    { id: 1, name: 'Photography Club', description: 'For photography enthusiasts', category: 'Arts', memberCount: 25 },
    { id: 2, name: 'Debate Society', description: 'Improve your public speaking', category: 'Academic', memberCount: 18 },
    { id: 3, name: 'Hiking Club', description: 'Weekend adventures in nature', category: 'Sports', memberCount: 32 },
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [editingClub, setEditingClub] = useState<Club | null>(null);
  const [newClub, setNewClub] = useState<Omit<Club, 'id'>>({
    name: '',
    description: '',
    category: '',
    memberCount: 0
  });

  const handleCreateClub = () => {
    const clubToAdd: Club = {
      id: clubs.length > 0 ? Math.max(...clubs.map(c => c.id)) + 1 : 1,
      ...newClub
    };
    
    setClubs([...clubs, clubToAdd]);
    setNewClub({ name: '', description: '', category: '', memberCount: 0 });
    setShowForm(false);
  };

  const handleUpdateClub = () => {
    if (!editingClub) return;
    
    setClubs(clubs.map(club => 
      club.id === editingClub.id ? editingClub : club
    ));
    setEditingClub(null);
  };

  const handleDeleteClub = (id: number) => {
    setClubs(clubs.filter(club => club.id !== id));
  };

  return (
    <div>
      <AdminHeader>
        <h2>동아리 관리</h2>
        <PrimaryButton onClick={() => setShowForm(true)}>새 동아리 생성</PrimaryButton>
      </AdminHeader>

      {showForm && (
        <AdminCard>
          <CardTitle>새 동아리 생성</CardTitle>
          <AdminForm>
            <FormGroup>
              <Label>동아리 이름</Label>
              <Input 
                type="text" 
                value={newClub.name}
                onChange={e => setNewClub({...newClub, name: e.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label>설명</Label>
              <TextArea 
                value={newClub.description}
                onChange={e => setNewClub({...newClub, description: e.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label>카테고리</Label>
              <Select 
                value={newClub.category}
                onChange={e => setNewClub({...newClub, category: e.target.value})}
              >
                <option value="">카테고리 선택</option>
                <option value="Arts">예술</option>
                <option value="Academic">학술</option>
                <option value="Sports">스포츠</option>
                <option value="Technology">기술</option>
                <option value="Social">사교</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>초기 회원 수</Label>
              <Input 
                type="number" 
                value={newClub.memberCount}
                onChange={e => setNewClub({...newClub, memberCount: parseInt(e.target.value) || 0})}
              />
            </FormGroup>
            <AdminActions>
              <SuccessButton onClick={handleCreateClub}>저장</SuccessButton>
              <DangerButton onClick={() => setShowForm(false)}>취소</DangerButton>
            </AdminActions>
          </AdminForm>
        </AdminCard>
      )}

      {editingClub && (
        <AdminCard>
          <CardTitle>동아리 수정</CardTitle>
          <AdminForm>
            <FormGroup>
              <Label>동아리 이름</Label>
              <Input 
                type="text" 
                value={editingClub.name}
                onChange={e => setEditingClub({...editingClub, name: e.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label>설명</Label>
              <TextArea 
                value={editingClub.description}
                onChange={e => setEditingClub({...editingClub, description: e.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label>카테고리</Label>
              <Select 
                value={editingClub.category}
                onChange={e => setEditingClub({...editingClub, category: e.target.value})}
              >
                <option value="">카테고리 선택</option>
                <option value="Arts">예술</option>
                <option value="Academic">학술</option>
                <option value="Sports">스포츠</option>
                <option value="Technology">기술</option>
                <option value="Social">사교</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>회원 수</Label>
              <Input 
                type="number" 
                value={editingClub.memberCount}
                onChange={e => setEditingClub({...editingClub, memberCount: parseInt(e.target.value) || 0})}
              />
            </FormGroup>
            <AdminActions>
              <SuccessButton onClick={handleUpdateClub}>업데이트</SuccessButton>
              <DangerButton onClick={() => setEditingClub(null)}>취소</DangerButton>
            </AdminActions>
          </AdminForm>
        </AdminCard>
      )}

      <AdminTable>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>이름</TableHeader>
            <TableHeader>카테고리</TableHeader>
            <TableHeader>회원 수</TableHeader>
            <TableHeader>작업</TableHeader>
          </tr>
        </thead>
        <tbody>
          {clubs.map(club => (
            <tr key={club.id}>
              <TableCell>{club.id}</TableCell>
              <TableCell>{club.name}</TableCell>
              <TableCell>{club.category}</TableCell>
              <TableCell>{club.memberCount}</TableCell>
              <TableCell>
                <AdminActions>
                  <PrimaryButton onClick={() => setEditingClub(club)}>수정</PrimaryButton>
                  <DangerButton onClick={() => handleDeleteClub(club.id)}>삭제</DangerButton>
                </AdminActions>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </div>
  );
};

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

const TextArea = styled.textarea`
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

export default ClubManagement;