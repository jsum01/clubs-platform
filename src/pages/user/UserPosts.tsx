import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  publishDate: string;
  clubId: number;
  clubName: string;
  important: boolean;
}

interface UserPostsProps {
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

const PostCard = styled.div<{ important: boolean }>`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-left: ${props => props.important ? '4px solid #f56565' : 'none'};
`;

const PostHeader = styled.div`
  margin-bottom: 1rem;
`;

const PostTitle = styled.h3`
  margin: 0 0 0.5rem 0;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: #718096;
  font-size: 0.9rem;
`;

const ImportantBadge = styled.span`
  background-color: #f56565;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

const PostBody = styled.div`
  line-height: 1.6;
`;

const PostText = styled.p`
  margin: 0;
  white-space: pre-line;
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

const UserPosts: React.FC<UserPostsProps> = ({ clubId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'important', 'regular'

  // In a real app, you would fetch posts from an API
  useEffect(() => {
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock data - this would come from your API
      const mockPosts = [
        { 
          id: 1, 
          title: 'Photography Exhibition Next Month', 
          content: '우리는 다음 달 6월 15일에 연례 사진 전시회를 개최할 예정입니다. 모든 회원은 자신의 최고 작품을 제출하는 것이 좋습니다. 제출 마감일은 6월 1일입니다.\n\n올해 가장 좋은 작품 3-5개를 준비해 주세요. 사진은 고해상도여야 하며 인쇄 준비가 되어 있어야 합니다. 제출 요건에 대한 자세한 내용은 Park Ji-woo에게 문의하세요.', 
          author: 'Park Ji-woo', 
          publishDate: '2023-05-10', 
          clubId: 1,
          clubName: 'Photography Club',
          important: true
        },
        { 
          id: 2, 
          title: 'New Equipment Available', 
          content: '우리는 클럽 재고에 새로운 장비를 추가했습니다. 회원들은 이제 다음 항목을 빌릴 수 있습니다:\n\n- Sony Alpha a7 III 카메라\n- Canon EF 24-70mm f/2.8L II USM 렌즈\n- Manfrotto 삼각대 (3개 가능)\n\n이러한 물품을 촬영에 예약하려면 장비 관리자에게 문의하세요.', 
          author: 'Lee Joon-ho', 
          publishDate: '2023-05-12', 
          clubId: 1,
          clubName: 'Photography Club',
          important: false
        },
        { 
          id: 3, 
          title: 'Weekend Photo Walk', 
          content: '이번 토요일 경복궁에서 사진 산책을 조직하고 있습니다. 오전 10시에 정문에서 만날 예정입니다. 주제는 "전통 건축"입니다.\n\n카메라를 가져오고 하루 종일 사진 촬영할 준비를 해주세요. 우리는 근처 레스토랑에서 함께 점심 식사를 할 것입니다. 비가 올 경우, 다음 토요일로 연기됩니다.', 
          author: 'Kim Min-ji', 
          publishDate: '2023-05-15', 
          clubId: 1,
          clubName: 'Photography Club',
          important: true
        },
      ];
      
      setPosts(mockPosts);
      setLoading(false);
    }, 800);
  }, [clubId]);

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    if (filter === 'important') return post.important;
    if (filter === 'regular') return !post.important;
    return true;
  });

  if (loading) {
    return <LoadingIndicator>공지사항 로딩 중...</LoadingIndicator>;
  }

  return (
    <div>
      <PageHeader>
        <PageTitle>공지사항</PageTitle>
        <FilterControls>
          <FilterButton 
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            전체
          </FilterButton>
          <FilterButton 
            active={filter === 'important'}
            onClick={() => setFilter('important')}
          >
            중요
          </FilterButton>
          <FilterButton 
            active={filter === 'regular'}
            onClick={() => setFilter('regular')}
          >
            일반
          </FilterButton>
        </FilterControls>
      </PageHeader>

      {filteredPosts.length === 0 ? (
        <EmptyState>
          <p>공지사항이 없습니다.</p>
        </EmptyState>
      ) : (
        filteredPosts.map(post => (
          <PostCard 
            key={post.id} 
            important={post.important}
          >
            <PostHeader>
              <PostTitle>{post.title}</PostTitle>
              <PostMeta>
                <span>
                  {post.publishDate}에 {post.author}이(가) 게시함
                  {post.important && <ImportantBadge>중요</ImportantBadge>}
                </span>
              </PostMeta>
            </PostHeader>
            <PostBody>
              <PostText>{post.content}</PostText>
            </PostBody>
          </PostCard>
        ))
      )}
    </div>
  );
};

export default UserPosts;