import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import NumericInput from '../src/index.jsx';

const _handleChange = function (value) {
  action('change')(value);
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
      <NumericInput />
    );
  })
  .add('vertical: true', () => {
    return (
      <NumericInput
        value="1"
        vertical
      />
    );
  })
  .add('textfieldDisabled: true', () => {
    return (
      <NumericInput
        value="1"
        textfieldDisabled
      />
    );
  })
  .add('disabled: true', () => {
    return (
      <NumericInput
        value="1"
        disabled
      />
    );
  })
  .add('min: -1, max: 1', () => {
    return (
      <NumericInput
        value="1"
        min={-1}
        max={1}
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
      />
    );
  })
  .add('step: 0.11, precision: 2', () => {
    return (
      <NumericInput
        value="1"
        step={0.11}
        precision={2}
      />
    );
  })
  .add('step: 0.11, precision: 1', () => {
    return (
      <NumericInput
        value="1"
        step={0.11}
        precision={1}
      />
    );
  })
  .add('onChange', () => {
    return (
      <NumericInput
        value="1"
        onChange={_handleChange}
      />
    );
  });
