import React, {useState} from 'react';
import styled from 'styled-components';
import {FiPlay, FiPause, FiSettings} from 'react-icons/fi';

import ChristmastLights from './components/ChristmasLights';
import {Settings} from './types';
import {assignIdsToArrayItems} from './utils';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuContainer = styled.div`
  display: flex;
  position: fixed;
  top: 5px;
  right: 5px;
  transition: 0.3s;
  z-index: 10;
  color: rgba(255, 255, 255, 0.1);
  &:hover {
    color: rgba(255, 255, 255, 0.5);
  }
  & svg {
    width: 50px;
    height: 50px;
    margin: 5px;
    cursor: pointer;
    &:active {
      color: rgba(255, 255, 255, 0.9);
    }
  }
  @media (orientation: portrait) {
    flex-direction: row;
  }
  @media (orientation: landscape) {
    flex-direction: column-reverse;
  }
`;

const initialSettings: Settings = {
  colors: assignIdsToArrayItems([
    '#165B33',
    '#BB2528',
    '#146B3A',
    '#BB2528',
    '#146B3A',
    '#BB2528',
    '#165B33'
  ]),
  rows: 1
};

const App: React.FC = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handlePauseClick = () => {
    setIsPlaying(false);
  };

  return (
    <Container>
      <MenuContainer>
        {isPlaying ? (
          <FiPause onClick={handlePauseClick} />
        ) : (
          <FiPlay onClick={handlePlayClick} />
        )}

        <FiSettings />
      </MenuContainer>
      <ChristmastLights
        isPlaying={isPlaying}
        colors={settings.colors}
        rows={settings.rows}
      />
    </Container>
  );
};

export default App;
