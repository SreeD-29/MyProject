import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';

class UICalendar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.transformIncomingProps(props);
  }

  transformIncomingProps = (props) => {
    const state = {};
    state['isOpen'] = false;
    state['value'] = props.defaultValue;

    return state;
  }

  /**
   * Updating Component State
   */
  handleChange = (value) => {
    this.setState({
      'value': value
    }, this.sendCallBack);
  };

  sendCallBack = () => {
    const { name, callBack } = this.props;

    if(callBack) {
      callBack(name, this.state['value']);
    }
  }

  toggleDatePicker = (toggle) => {
    this.setState({
      'isOpen': toggle
    })
  }

  render () {
    const { label, placeholder, fullWidth } = this.props;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className="calender"
          disableToolbar={true}
          clearable={true}
          autoOk={false}
          fullWidth={fullWidth}
          // variant="inline"
          disablePast = {false}
          inputVariant="outlined"
          margin="dense"
          label={label}
          placeholder={placeholder}
          format="MM/dd/yyyy"
          value={this.state['value']}
          onChange={this.handleChange}
          TextFieldComponent={TextField}
          open={this.state['isOpen']}
          onClick={() => this.toggleDatePicker(true)}
          onClose={() => this.toggleDatePicker(false)}
        />
      </MuiPickersUtilsProvider>
    );
  }

  /**
   * Default Props for Calendar Component
   */
  static defaultProps = {
    'label': 'Calendar',
    'name': 'calendar',
    'defaultValue': null,
    'placeholder': null,
    'fullWidth': true
  }

  /**
   * Props Types used in Calendar Component
   */
  static propTypes = {
    'label': PropTypes.string,
    'name': PropTypes.string.isRequired,
    'defaultValue': PropTypes.oneOfType([
                              PropTypes.string,
                              PropTypes.instanceOf(Date),
                      ]),
    'callBack': PropTypes.func
  }
}

export default UICalendar;
