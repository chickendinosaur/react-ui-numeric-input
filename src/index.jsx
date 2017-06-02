import React from 'react';

export function _formatValue(value) {
  if (isNaN(parseFloat(value))) {
    return null;
  }

  return parseFloat(value);
}

export default class NumericInput extends React.PureComponent {
  static defaultProps = {
    value: null,
    defaultValue: null,
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    precision: 0,
    step: 1,
    stepDelay: 500,
    stepSpeed: 100,
    clamp: true,
    disabled: false,
    textfieldDisabled: false,
    wrap: false,
    className: null,
    style: null,
    btnStyle: null,
    textfieldStyle: null,
    onChange: null
  };

  constructor(props) {
    super(props);

    this._timeoutRef = null;
    this._intervalRef = null;

    this.state = {
      value: _formatValue(this._formatDisplayValue(props.value)),
      displayValue: this._formatDisplayValue(props.value)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value ||
      nextProps.value < this.props.min ||
      nextProps.value > this.props.max) {
      this.setState(() => {
        return {
          value: _formatValue(this._formatDisplayValue(nextProps.value)),
          displayValue: this._formatDisplayValue(nextProps.value)
        };
      });
    }
  }

  _roundValue(value) {
    if (value >= 0) {
      return +(Math.sign(value) * (`${Math.ceil(`${Math.abs(value)}e${this.props.precision}`)}e-${this.props.precision}`));
    }

    return +(Math.sign(value) * (`${Math.floor(`${Math.abs(value)}e${this.props.precision}`)}e-${this.props.precision}`));
  }

  _formatDisplayValue(value) {
    if (value === '-') {
      return value;
    }

    if (isNaN(parseFloat(value))) {
      return '';
    }

    value = value.toString();

    const indexOfDecimal = value.indexOf('.');

    if (
      this.props.precision === 0 ||
      indexOfDecimal < value.length - 1
    ) {
      return this._clampValueToBounds(this._roundValue(parseFloat(value))).toString();
    }

    return value;
  }

  _clampValueToBounds(value) {
    if (this.props.clamp) {
      if (value === null) {
        return value;
      }

      if (value < this.props.min) {
        return this.props.min;
      } else if (value > this.props.max) {
        return this.props.max;
      }
    }

    return value;
  }

  _wrapValue(value) {
    if (this.props.wrap) {
      if (value < this.props.min) {
        return this.props.max;
      } else if (value > this.props.max) {
        return this.props.min;
      }
    }

    return value;
  }

  _step(direction) {
    const step = direction === '-' ? -this.props.step : this.props.step;
    let nextValue = this.state.value;

    if (nextValue === null) {
      if (this.props.defaultValue !== null) {
        nextValue = this.props.defaultValue + step;
      } else if (direction === '+') {
        nextValue = this.props.min + step;
      } else {
        nextValue = this.props.max + step;
      }
    } else {
      nextValue += step;
      nextValue = this._wrapValue(nextValue);
    }

    this._setValues(nextValue);
  }

  _setValues(nextDisplayValue) {
    if (nextDisplayValue !== this.state.displayValue) {
      nextDisplayValue = this._formatDisplayValue(nextDisplayValue);

      this.setState((prevState, props) => {
        // Trigger onChange event.
        if (props.onChange !== null) {
          const nextValue = _formatValue(nextDisplayValue);

          if (nextValue !== prevState.value) {
            props.onChange(_formatValue(nextDisplayValue));
          }
        }

        // Create new state.
        return {
          displayValue: this._formatDisplayValue(nextDisplayValue),
          value: _formatValue(nextDisplayValue)
        };
      });
    }
  }

  _handleValueChange = (e) => {
    this._setValues(e.target.value);
  }

  _handleAddSubtractBtnDown = (e) => {
    const id = e.target.dataset.id;

    this._step(id);

    this._timeoutRef = setTimeout(() => {
      this._timeoutRef = null;

      this._step(id);

      this._intervalRef = setInterval(() => {
        this._step(id);
      }, this.props.stepSpeed);
    }, this.props.stepDelay);
  }

  _handleAddSubtractBtnUp = () => {
    if (this._timeoutRef !== null) {
      clearTimeout(this._timeoutRef);
    }

    if (this._intervalRef !== null) {
      clearInterval(this._intervalRef);
    }
  }

  render() {
    return (
      <div
        style={this.props.style}
        className={`react-ui-numeric-input ${this.props.className ? this.props.className : ''}`}
      >
        <button
          data-id="-"
          style={this.props.btnStyle}
          className="down"
          disabled={this.props.disabled}
          onMouseDown={this._handleAddSubtractBtnDown}
          onTouchStart={this._handleAddSubtractBtnDown}
          onMouseUp={this._handleAddSubtractBtnUp}
          onMouseOut={this._handleAddSubtractBtnUp}
          onTouchEnd={this._handleAddSubtractBtnUp}
        />
        <input
          style={this.props.textfieldStyle}
          type="text"
          disabled={this.props.textfieldDisabled || this.props.disabled}
          value={this.state.displayValue}
          onChange={this._handleValueChange}
        />
        <button
          data-id="+"
          style={this.props.btnStyle}
          className="up"
          disabled={this.props.disabled}
          onMouseDown={this._handleAddSubtractBtnDown}
          onTouchStart={this._handleAddSubtractBtnDown}
          onMouseUp={this._handleAddSubtractBtnUp}
          onMouseOut={this._handleAddSubtractBtnUp}
          onTouchEnd={this._handleAddSubtractBtnUp}
        />
      </div>
    );
  }
}
