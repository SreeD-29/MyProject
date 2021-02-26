import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

class UICheckSelection extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.transformIncomingProps(props);
  }

  transformIncomingProps = (props) => {
    const state = {};

    state['value'] = props.defaultValue;

    return state;
  }

  componentDidUpdate(prevProps) {
    if(!isEqual(prevProps.defaultValue, this.props.defaultValue)) {
      this.setState({
        'value': this.props.defaultValue
      });
    }
  }

  /**
   * Updating Component State
   */
  handleChange = (event) => {
    const name = event.target.value;
    const value = event.target.checked;

    this.setState((prevState) => {
      const newValue = [...prevState['value']];

      newValue[name] = value;

      return {
        'value': newValue
      }
    }, this.sendCallBack);
  };

  sendCallBack = () => {
    const { name, callBack } = this.props;

    if(callBack) {
      callBack(name, this.state['value']);
    }
  }

  render() {
    const { label, name, choices, className, disabled, errorMessage } = this.props;

    return (
      <FormControl component="fieldset" className={className} disabled={disabled}>
        { label && <FormLabel component="legend">{label}</FormLabel> }
        <FormGroup>
          {
            choices.map((choice, inx) => {
              const { label, value } = choice;
              const key = value ? `${name}-${value}` : `${name}-${inx}`;
              const _name = `${name}-${inx}`;

              return(
                <FormControlLabel
                  key={key}
                  control={<Checkbox checked={this.state.value[inx]} name={_name} color="primary" onChange={this.handleChange} value={inx} />}
                  label={label}
                />
              );
            })
          }
        </FormGroup>
        { errorMessage && <FormHelperText>{errorMessage}</FormHelperText> }
      </FormControl>
    );
  }

  /**
   * Default Props for Calendar Component
   */
  static defaultProps = {
    'label': null,
    'name': 'checkbox',
    'defaultValue': null,
    'choices': [],
  }

  /**
   * Props Types used in Calendar Component
   */
  static propTypes = {
    'label': PropTypes.string,
    'name': PropTypes.string.isRequired,
    'choices': PropTypes.arrayOf(
      PropTypes.shape({
        'label': PropTypes.string.isRequired,
        'value': PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string
        ]).isRequired
      })
    ).isRequired,
    'disabled': PropTypes.bool,
    'callBack': PropTypes.func,
  }
}

export default UICheckSelection;
