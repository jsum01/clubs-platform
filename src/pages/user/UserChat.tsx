import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Message {
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

interface UserChatProps {
  clubId: number;
  clubName: string;
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ChatHeader = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1rem;
`;

const ChatTitle = styled.h2`
  margin: 0;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageContainer = styled.div<{ isOwn: boolean }>`
  display: flex;
  flex-direction: ${props => props.isOwn ? 'row-reverse' : 'row'};
  align-items: flex-start;
  gap: 0.5rem;
`;

const MessageAvatar = styled.div<{ isOwn: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.isOwn ? '#48bb78' : '#4299e1'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const MessageContent = styled.div`
  max-width: 70%;
  display: flex;
  flex-direction: column;
`;

const MessageBubble = styled.div<{ isOwn: boolean }>`
  background-color: ${props => props.isOwn ? '#4299e1' : '#edf2f7'};
  color: ${props => props.isOwn ? 'white' : 'inherit'};
  padding: 0.75rem;
  border-radius: 8px;
  word-break: break-word;
`;

const MessageText = styled.p`
  margin: 0;
  line-height: 1.5;
`;

const MessageInfo = styled.div<{ isOwn: boolean }>`
  display: flex;
  justify-content: ${props => props.isOwn ? 'flex-end' : 'flex-start'};
  font-size: 0.8rem;
  color: #718096;
  margin-top: 0.25rem;
  gap: 0.5rem;
`;

const MessageSender = styled.span``;

const MessageTime = styled.span``;

const ChatInputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  border-top: 1px solid #e2e8f0;
  padding-top: 1rem;
`;

const ChatTextarea = styled.textarea`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  resize: none;
  min-height: 60px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const SendButton = styled.button<{ disabled: boolean }>`
  align-self: flex-end;
  padding: 0.5rem 1rem;
  background-color: ${props => props.disabled ? '#a0aec0' : '#4299e1'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.disabled ? '#a0aec0' : '#3182ce'};
  }
`;

const LoadingIndicator = styled.div`
  text-align: center;
  padding: 2rem;
  color: #718096;
`;

const UserChat: React.FC<UserChatProps> = ({ clubId, clubName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // In a real app, you would fetch messages from an API and use WebSockets for real-time updates
  useEffect(() => {
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock data - this would come from your API
      const mockMessages = [
        {
          id: 1,
          content: "안녕하세요 여러분! 이번 주말에 사진 워크샵이 있다는 것을 상기시켜 드립니다.",
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
          content: "알려주셔서 감사합니다! 자신의 장비를 가져와야 하나요?",
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
          content: "네, 카메라를 가져오세요. 필요한 경우 대여할 수 있는 여분의 렌즈가 있습니다.",
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
          content: "워크샵이 기대돼요! 풍경 사진 실력을 향상시키고 싶었어요.",
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
          content: "좋아요! 풍경 기술에 대해서도 다룰 예정입니다.",
          sender: {
            id: 101,
            name: "Park Ji-woo",
            initials: "PJ"
          },
          timestamp: "2023-05-18T09:32:20",
          isOwn: false
        }
      ];
      
      setMessages(mockMessages);
      setLoading(false);
    }, 800);
  }, [clubId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // In a real app, you would send this to your API and get a response with the created message
    const newMessageObj: Message = {
      id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1,
      content: newMessage,
      sender: {
        id: 103,
        name: "Kim Min-ji",
        initials: "KM"
      },
      timestamp: new Date().toISOString(),
      isOwn: true
    };
    
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return <LoadingIndicator>채팅 로딩 중...</LoadingIndicator>;
  }

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>{clubName} 채팅</ChatTitle>
      </ChatHeader>
      
      <ChatMessages>
        {messages.map(message => (
          <MessageContainer key={message.id} isOwn={message.isOwn}>
            <MessageAvatar isOwn={message.isOwn}>
              {message.sender.initials}
            </MessageAvatar>
            <MessageContent>
              <MessageBubble isOwn={message.isOwn}>
                <MessageText>{message.content}</MessageText>
              </MessageBubble>
              <MessageInfo isOwn={message.isOwn}>
                <MessageSender>{message.sender.name}</MessageSender>
                <MessageTime>{formatTimestamp(message.timestamp)}</MessageTime>
              </MessageInfo>
            </MessageContent>
          </MessageContainer>
        ))}
        <div ref={messagesEndRef} />
      </ChatMessages>
      
      <ChatInputContainer>
        <ChatTextarea 
          placeholder="메시지를 입력하세요..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SendButton 
          onClick={handleSendMessage}
          disabled={newMessage.trim() === ''}
        >
          전송
        </SendButton>
      </ChatInputContainer>
    </ChatContainer>
  );
};

export default UserChat;