import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { createComment } from '../../utils/api/comment';
import { CommentData } from '../../types/Datas';
import CommentList from '../CommentList';
import { loginState } from '../../recoil/atom';

interface Props {
  worldcupId: string;
}

function Comment({ worldcupId }: Props): JSX.Element {
  const isLoggedIn = useRecoilValue(loginState);
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState<CommentData[]>([]);
  const [offset, setOffset] = useState(0);

  const onSubmit = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (message === '') {
        return;
      }
      setMessage('');
      const { commentId, userId, nickname, createdAt, message: newMessage } = await createComment(worldcupId, message);
      setComments([{ commentId, userId, nickname, createdAt, message: newMessage }, ...comments]);
    },
    [comments, message],
  );

  const commentChangeEvent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = event;
      setMessage(value);
    },
    [message],
  );

  return (
    <Wrapper>
      <InputContainer>
        <Text>나의 한마디</Text>
        {isLoggedIn ? (
          <CommentInput placeholder="메시지를 입력하세요." onChange={commentChangeEvent} value={message} />
        ) : (
          <CommentInput placeholder="로그인이 필요합니다." onChange={commentChangeEvent} value={message} disabled />
        )}

        <SubmitButton onClick={onSubmit}>확인</SubmitButton>
      </InputContainer>
      <CommentList
        worldcupId={worldcupId}
        comments={comments}
        offset={offset}
        setOffset={setOffset}
        setComments={setComments}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  background-color: ${({ theme }) => theme.color.lightpink};
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const Text = styled.div`
  margin-bottom: 10px;
  ${({ theme }) => theme.fontStyle.bodyBold};
`;

const CommentInput = styled.input`
  ${({ theme }) => theme.fontStyle.body}
  background-color: ${({ theme }) => theme.color.white};
  padding-left: 3%;
  padding-right: 3%;
  height: 61px;
  border: 0;
  border-radius: 10px;
`;

const SubmitButton = styled.button`
  margin-top: 5px;
  width: 60px;
  height: 30px;
  border: 0;
  border-radius: 5px;
  align-self: end;
  ${({ theme }) => theme.fontStyle.body}
  background-color: ${({ theme }) => theme.color.primary};
`;

export default Comment;