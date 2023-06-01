import React from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

type CustomLinkProps = {
  to: string;
  children: React.ReactNode;
};

const CustomLink: React.FC<CustomLinkProps> = ({ to, children }) => {
  const match = useMatch(to);
  const navigate = useNavigate();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (match) {
      return;
    }

    navigate(to);
  };

  return <a onClick={onClick}>{children}</a>;
};

export { CustomLink };
