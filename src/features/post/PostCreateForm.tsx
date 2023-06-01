import { Button, Input } from 'antd';
import { useCreatePost } from 'entitites/post/api';
import React from 'react';
import { TUserData } from 'shared/types/user';

type PostCreateFormProps = {
  recipientId: TUserData['id'];
  creatorId: TUserData['id'];
};

const PostCreateForm: React.FC<PostCreateFormProps> = ({ recipientId, creatorId }) => {
  const [content, setContent] = React.useState<string>('');
  const { mutate: createPost, isLoading } = useCreatePost();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onCreate = () => {
    createPost({ content, creatorId, recipientId });
    setContent('');
  };

  return (
    <>
      <Input.TextArea
        placeholder='О чем бы вы хотели рассказать?'
        rows={4}
        value={content}
        onChange={onChange}
      />
      <Button
        loading={isLoading}
        onClick={onCreate}
        size='middle'
        type='primary'
        block>
        Создать пост
      </Button>
    </>
  );
};

export { PostCreateForm };
