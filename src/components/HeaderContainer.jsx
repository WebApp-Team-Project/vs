import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../index.css';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header2 = styled(Header)`
  position: relative;
  align-items: center;
  justify-content: flex-start;

  h1 {
    color: var(--light--font);
    font-family: D2Coding;
    font-size: 16px;
    font-weight: 700;
    text-align: center;

    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  img {
    cursor: pointer;
  }
`;

const HeaderIcon = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 14px;

  img {
    cursor: pointer;
  }
`;

function HeaderContainer(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };

  const handleClick2 = () => {
    navigate(`/notification`);
  };

  const handleClick3 = () => {
    navigate(`/profile`);
  };

  const type = props.type || 'default';
  const title = props.title || ' ';
  if (type === 'default') {
    return (
      <Header>
        <div>
          <img />
        </div>
        <HeaderIcon>
          <img src='/images/icon_search.svg' />
          <img onClick={handleClick2} src='/images/icon_alert.svg' />
          <img onClick={handleClick3} src='/images/icon_profile.svg' />
        </HeaderIcon>
      </Header>
    );
  } else if (type === 'pages') {
    return (
      <Header2>
        <img onClick={handleClick} src='/images/icon_back.svg' />
        <h1>{title || 'page'}</h1>
      </Header2>
    );
  }
}

export default HeaderContainer;
