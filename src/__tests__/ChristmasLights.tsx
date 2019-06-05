import React from 'react';
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import {render, cleanup} from 'react-testing-library';

import ChristmasLights from '../components/ChristmasLights';

afterEach(cleanup);

const colors = [
  '#165B33',
  '#BB2528',
  '#146B3A',
  '#BB2528',
  '#146B3A',
  '#BB2528',
  '#165B33'
];

test('Renders 7 light bulbs', () => {
  const {getAllByTestId} = render(
    <ChristmasLights isPlaying colors={colors} rows={1} />
  );

  const lightBulbs = getAllByTestId('light-bulb');
  expect(lightBulbs).toHaveProperty('length', 7);
});

test('Renders 14 light bulbs with 2 rows', () => {
  const {getAllByTestId} = render(
    <ChristmasLights isPlaying colors={colors} rows={2} />
  );

  const lightBulbs = getAllByTestId('light-bulb');
  expect(lightBulbs).toHaveProperty('length', 14);
});

test('Renders 49 light bulbs with 7 rows', () => {
  const {getAllByTestId} = render(
    <ChristmasLights isPlaying colors={colors} rows={7} />
  );

  const lightBulbs = getAllByTestId('light-bulb');
  expect(lightBulbs).toHaveProperty('length', 49);
});
