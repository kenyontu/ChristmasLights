import React, {useMemo, useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {throttle} from 'lodash';
import color from 'color';
import {useSprings} from 'react-spring';
import shortid from 'shortid';

import {Color} from '../types';
import ChristmastLightBulb from './ChristmasLightBulb';
import {useInterval} from '../hooks';

const lightsInRow = 7;

interface Props {
  colors: Color[];
  rows?: number;
  isPlaying?: boolean;
}

const Container = styled.div<{spacing: number}>`
  display: grid;
  grid-template-columns: repeat(${lightsInRow}, 1fr);
  grid-column-gap: ${props => props.spacing}px;
  grid-row-gap: ${props => props.spacing}px;
  justify-items: center;
  align-items: center;
`;

const ChristmasLights: React.FC<Props> = ({
  colors,
  rows = 1,
  isPlaying = true
}) => {
  const {bulbSize, spacing} = useSizes();
  const lightBulbs = useRenderLightBulbs(
    isPlaying,
    colors,
    rows * lightsInRow,
    bulbSize
  );
  return <Container spacing={spacing}>{lightBulbs}</Container>;
};

/**
 * Hook that calculates the sizes of the light bulbs and the spacing between
 * them
 */
const useSizes = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const onResize = throttle(() => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    });
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [screenSize]);

  const sizes = useMemo(() => {
    let smallestSize =
      screenSize.width < screenSize.height
        ? screenSize.width
        : screenSize.height;

    return {
      bulbSize: (60 * (smallestSize / 100)) / lightsInRow,
      spacing: (25 * (smallestSize / 100)) / lightsInRow
    };
  }, [screenSize]);

  return sizes;
};

// Hook that returns rendered light bulbs
const useRenderLightBulbs = (
  isPlaying: boolean,
  colors: Color[],
  numberOfLights: number,
  bulbSize: number
) => {
  // A counter for the steps in the animation, used to calculate
  // which lights are on
  const stepCounter = useRef(0);

  // Creates an array of lightbulbs
  const lightBulbs: {
    id: string;
    color: string;
    offColor: string;
  }[] = useMemo(() => {
    const arr = [];

    // Colors for the off state
    const offColors = colors.map(c =>
      color(c.value)
        .darken(0.8)
        .rgb()
        .toString()
    );

    let colorIndex = 0;
    for (let i = 0; i < numberOfLights; i++) {
      colorIndex = i % lightsInRow;
      arr.push({
        id: shortid.generate(),
        color: colors[colorIndex].value,
        offColor: offColors[colorIndex]
      });
    }

    return arr;
  }, [colors, numberOfLights]);

  const createSpring = (i: number) => {
    // Controls which lights are on.
    // Cycles between two states:
    // The 1st, 3rd, 5th and 7th lights only, are on
    // The 2nd, 4th and 6th lights only, are on
    //
    // This could became a function parameter in the future to allow different
    // Animation patterns, for example:
    // i % lightsInRow === stepCounter.current % lightsInRow
    // would turn on and off lights in a column sequentially
    if ((i % lightsInRow) % 2 === stepCounter.current % 2) {
      return {
        to: {
          backgroundColor: lightBulbs[i].color,
          boxShadow: `0px 0px ${bulbSize * 0.5}px ${bulbSize * 0.2}px ${
            lightBulbs[i].color
          }`,
          zIndex: 1
        },
        immediate: (s: string) => s === 'zIndex'
      };
    }

    return {
      to: {
        backgroundColor: lightBulbs[i].offColor,
        boxShadow: `0px 0px 0px 0px rgba(0,0,0,0)`,
        zIndex: 0
      },
      immediate: (s: string) => s === 'zIndex' || s === 'boxShadow'
    };
  };

  const [springs, set] = useSprings(numberOfLights, createSpring);

  useInterval(() => {
    if (isPlaying) {
      stepCounter.current++;
      set(createSpring);
    }
  }, 500);

  return springs.map((spring, i) => (
    <ChristmastLightBulb
      key={lightBulbs[i].id}
      style={spring}
      size={bulbSize}
    />
  ));
};

export default React.memo(ChristmasLights);
