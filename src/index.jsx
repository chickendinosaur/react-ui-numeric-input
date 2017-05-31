import React from 'react';

export default class NumericInput extends React.PureComponent {
  static defaultProps = {
    style: null,
    className: null,
    value: null,
    min: null,
    max: null,
    step: 1,
    loop: false,
    precision: 0,
    btnStyle: null,
    textfieldStyle: null,
    onChange: null
  };

  constructor(props) {
    super(props);

    this.state = {
      value: parseFloat(props.value)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value ||
      this.state.value < this.props.min ||
      this.state.value > this.props.max) {
      this.setState((prevState, props) => {
        return {
          value: this.assureValueBounds(props.value)
        };
      }, this._handleOnChange);
    }
  }

  assureValueBounds(value) {
    let nextValue = value;

    if (this.props.min !== null &&
        nextValue < this.props.min) {
      nextValue = this.props.min;
    } else if (this.props.max !== null &&
        nextValue > this.props.max) {
      nextValue = this.props.max;
    }

    return nextValue;
  }

  _roundValue(val) {
    return Number(Math.sign(val) * (`${Math.round(`${Math.abs(val)}e${this.props.precision}`)}e-${this.props.precision}`));
  }

  _handleAddSubtractBtnClick = (e) => {
    const step = e.target.dataset.id === '-' ? -this.props.step : this.props.step;
    let nextValue = parseFloat(this.state.value);

    if (isNaN(nextValue)) {
      nextValue = step;
    } else {
      nextValue += step;

      if (this.props.min !== null &&
          nextValue < this.props.min) {
        // Allow looping.
        if (this.props.loop &&
          this.props.max !== null) {
          nextValue = this.props.max;
        } else {
          nextValue = this.props.min;
        }
      } else if (this.props.max !== null &&
          nextValue > this.props.max) {
            // Allow looping.
        if (this.props.loop &&
              this.props.min !== null) {
          nextValue = this.props.min;
        } else {
          nextValue = this.props.max;
        }
      }

        // Ensure rounding precision;
      nextValue = this._roundValue(nextValue);
    }


    if (nextValue !== this.state.value) {
      this.setState(() => {
        return {
          value: nextValue
        };
      }, this._handleOnChange);
    }
  }

  _handleValueChange = (e) => {
    let nextValue = e.target.value;

    if (nextValue.indexOf('-') >= 0) {
      nextValue = nextValue.replace(/-+/, '-');
    }

    if (nextValue !== '-') {
      nextValue = parseFloat(e.target.value);

      if (isNaN(nextValue)) {
        nextValue = null;
      } else {
        nextValue = this.assureValueBounds(nextValue);

        nextValue = this._roundValue(nextValue);
      }
    }

    if (nextValue !== this.state.value &&
        this.props.value !== nextValue) {
      this.setState(() => {
        return {
          value: nextValue
        };
      }, this._handleOnChange);
    }
  }

  _handleOnChange = () => {
    if (this.props.onChange &&
        this.state.value !== '-') {
      this.props.onChange(this.state.value);
    }
  }

  render() {
    return (
      <div
        style={this.props.style}
        className="react-ui-numeric-input"
      >
        <button
          data-id="-"
          style={this.props.btnStyle}
          className="react-ui-numeric-input-btn"
          onClick={this._handleAddSubtractBtnClick}
          onTouchStart={this._handleAddSubtractBtnClick}
        >
          -
        </button>
        <input
          style={this.props.textfieldStyle}
          className="react-ui-numeric-input-textfield"
          type="text"
          value={this.state.value === null ? '' : this.state.value}
          onChange={this._handleValueChange}
        />
        <button
          data-id="+"
          style={this.props.btnStyle}
          className="react-ui-numeric-input-btn"
          onClick={this._handleAddSubtractBtnClick}
          onTouchStart={this._handleAddSubtractBtnClick}
        >
          +
        </button>
      </div>
    );
  }
}
