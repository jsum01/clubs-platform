import React from 'react';
import styled from 'styled-components';

interface ClubInfoProps {
  clubId: number;
}

const ClubInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ClubDescription = styled.p`
  line-height: 1.6;
  margin: 0 0 1rem 0;
  color: #4a5568;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-weight: 500;
  color: #2d3748;
`;

const InfoValue = styled.span`
  color: #4a5568;
`;

const Link = styled.a`
  color: #4299e1;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ClubInfo: React.FC<ClubInfoProps> = ({ clubId }) => {
  // This would typically fetch club info based on the clubId
  // For now, we'll use mock data
  const clubInfo = {
    name: 'Photography Club',
    description: '사진에 관한 지식을 공유하고 사진 산책을 조직하는 사진 애호가들의 커뮤니티입니다.',
    founded: '2020-03-15',
    meetingSchedule: '매주 수요일, 오후 4-6시',
    location: 'Arts Building, Room A203',
    memberCount: 25,
    leader: 'Park Ji-woo',
    website: 'https://photography-club.example.com'
  };

  return (
    <ClubInfoContainer>
      <ClubDescription>{clubInfo.description}</ClubDescription>
      
      <InfoItem>
        <InfoLabel>설립일:</InfoLabel>
        <InfoValue>{clubInfo.founded}</InfoValue>
      </InfoItem>
      
      <InfoItem>
        <InfoLabel>동아리장:</InfoLabel>
        <InfoValue>{clubInfo.leader}</InfoValue>
      </InfoItem>
      
      <InfoItem>
        <InfoLabel>회원 수:</InfoLabel>
        <InfoValue>{clubInfo.memberCount}명</InfoValue>
      </InfoItem>
      
      <InfoItem>
        <InfoLabel>정기 모임:</InfoLabel>
        <InfoValue>{clubInfo.meetingSchedule}</InfoValue>
      </InfoItem>
      
      <InfoItem>
        <InfoLabel>장소:</InfoLabel>
        <InfoValue>{clubInfo.location}</InfoValue>
      </InfoItem>
      
      {clubInfo.website && (
        <InfoItem>
          <InfoLabel>웹사이트:</InfoLabel>
          <InfoValue>
            <Link href={clubInfo.website} target="_blank" rel="noopener noreferrer">
              동아리 웹사이트 방문하기
            </Link>
          </InfoValue>
        </InfoItem>
      )}
    </ClubInfoContainer>
  );
};

export default ClubInfo;