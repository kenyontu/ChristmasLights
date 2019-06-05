import React from 'react';
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import {render, cleanup, fireEvent} from 'react-testing-library';

import App from '../App';

afterEach(cleanup);

test('Should show the settings view after the settings button is clicked', async () => {
  const {queryByTestId, getByTestId} = render(<App />);
  expect(queryByTestId('settings-view')).toBeNull();

  const settingsButton = getByTestId('open-settings-btn');
  fireEvent.click(settingsButton);

  getByTestId('settings-view');
});
