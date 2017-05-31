import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import NumericInput from '../src/index.jsx';

const _handleChange = function (value) {
  action('click')(value);
};

storiesOf('NumericInput', module)
  .addDecorator((story) => {
    return (
      <div className="storybook-content">
        {story()}
      </div>
    );
  })
  .add('default', () => {
    return (
      <NumericInput
        value="1"
        onChange={_handleChange}
      />
    );
  })
  .add('min: -1, max: 1', () => {
    return (
      <NumericInput
        value="1"
        min={-1}
        max={1}
        onChange={_handleChange}
      />
    );
  })
  .add('min: -1, max: 1, loop: true', () => {
    return (
      <NumericInput
        value="1"
        min={-1}
        max={1}
        loop
        onChange={_handleChange}
      />
    );
  })
  .add('step: 0.11, precision: 2', () => {
    return (
      <NumericInput
        value="1"
        step={0.11}
        precision={2}
        onChange={_handleChange}
      />
    );
  })
  .add('step: 0.11, precision: 1', () => {
    return (
      <NumericInput
        value="1"
        step={0.11}
        precision={1}
        onChange={_handleChange}
      />
    );
  });
