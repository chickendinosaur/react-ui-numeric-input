import React from 'react';

export default class NumericInput extends React.PureComponent {
  static defaultProps = {
    style: null,
    className: null,
    value: null,
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    step: 1,
    loop: false,
    precision: 0,
    vertical: false,
    disabled: false,
    textfieldDisabled: false,
    btnStyle: null,
    textfieldStyle: null,
    onChange: null
  };

  constructor(props) {
    super(props);

    this._timerRef = null;

    this.state = {
      value: (props.value === null || props.value === '') ? null : parseFloat(props.value)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value ||
      nextProps.value < this.props.min ||
      nextProps.value > this.props.max) {
      this.setState(() => {
        return {
          value: this._assureValueBounds(nextProps.value)
        };
      });
    }
  }

  _assureValueBounds(value) {
    let nextValue = value;

    if (nextValue === null) {
      nextValue = null;
    } else if (nextValue < this.props.min) {
      nextValue = this.props.min;
    } else if (nextValue > this.props.max) {
      nextValue = this.props.max;
    }

    return nextValue;
  }

  _roundValue(val) {
    return +(Math.sign(val) * (`${Math.round(`${Math.abs(val)}e${this.props.precision}`)}e-${this.props.precision}`));
  }

  _setValue = (nextValue) => {
    if (nextValue !== this.state.value) {
      this.setState(() => {
        return {
          value: nextValue
        };
      }, this._handleOnChange);
    }
  }

  _handleOnChange = () => {
    if (this.props.onChange !== null &&
        this.state.value !== '-') {
      this.props.onChange(this.state.value);
    }
  }

  _step = (direction) => {
    const step = direction === '-' ? -this.props.step : this.props.step;
    let nextValue = parseFloat(this.state.value);

    if (isNaN(nextValue)) {
      nextValue = step;
    } else {
      nextValue += step;

      if (nextValue < this.props.min) {
        // Allow looping.
        if (this.props.loop) {
          nextValue = this.props.max;
        } else {
          nextValue = this.props.min;
        }
      } else if (nextValue > this.props.max) {
            // Allow looping.
        if (this.props.loop) {
          nextValue = this.props.min;
        } else {
          nextValue = this.props.max;
        }
      }

      // Ensure rounding precision;
      nextValue = this._roundValue(nextValue);
    }


    this._setValue(nextValue);
  }

  _handleValueChange = (e) => {
    let nextValue = e.target.value;

    if (nextValue !== '-') {
      nextValue = parseFloat(e.target.value);

      if (isNaN(nextValue)) {
        nextValue = null;
      } else {
        nextValue = this._assureValueBounds(nextValue);

        nextValue = this._roundValue(nextValue);
      }
    }

    this._setValue(nextValue);
  }

  _handleAddSubtractBtnDown = (e) => {
    const id = e.target.dataset.id;

    this._step(id);

    this._autoIncrementTimeoutRef = setTimeout(() => {
      this._autoIncrementTimeoutRef = null;

      this._autoIncrementIntervalRef = setInterval(() => {
        this._step(id);
      }, 100);
    }, 500);
  }

  _handleAddSubtractBtnUp = () => {
    if (this._autoIncrementTimeoutRef !== null) {
      clearTimeout(this._autoIncrementTimeoutRef);
    }

    if (this._autoIncrementIntervalRef !== null) {
      clearInterval(this._autoIncrementIntervalRef);
    }
  }

  render() {
    return (
      <div
        style={this.props.style}
        className={`react-ui-numeric-input ${this.props.className ? this.props.className : ''} ${this.props.vertical ? 'vertical' : ''}`}
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
          value={this.state.value === null ? '' : this.state.value}
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
