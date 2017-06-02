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
  .add('defaultValue: 0', () => {
    return (
      <NumericInput
        defaultValue={0}
      />
    );
  })
  .add('value: "0"', () => {
    return (
      <NumericInput
        value="0"
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
  .add('min: 0, max: 1', () => {
    return (
      <NumericInput
        min={0}
        max={1}
      />
    );
  })
  .add('value: 0, min: -1, max: 1, wrap: true', () => {
    return (
      <NumericInput
        value={0}
        min={-1}
        max={1}
        wrap
      />
    );
  })
  .add('value: 0, min: -1, max: 1, clamp: false', () => {
    return (
      <NumericInput
        value={0}
        min={-1}
        max={1}
        clamp={false}
      />
    );
  })
  .add('value: 0, step: 0.11, precision: 2', () => {
    return (
      <NumericInput
        value={0}
        step={0.11}
        precision={2}
      />
    );
  })
  .add('value: 0, step: 0.11, precision: 1', () => {
    return (
      <NumericInput
        value={0}
        step={0.11}
        precision={1}
      />
    );
  })
  .add('stepDelay: 2000', () => {
    return (
      <NumericInput
        value={0}
        stepDelay={2000}
      />
    );
  })
  .add('stepSpeed: 1000', () => {
    return (
      <NumericInput
        value={0}
        stepSpeed={1000}
      />
    );
  })
  .add('value: 0, precision: 5, onChange', () => {
    return (
      <NumericInput
        value={0}
        precision={5}
        onChange={_handleChange}
      />
    );
  });
