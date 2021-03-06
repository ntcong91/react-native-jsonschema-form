import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import styles from '../styles';

class TextareaWidget extends Component {
  state = {
    focus: false,
  };

  onFocusInput = e => {
    this.setState({ focus: true });
    this.props.onFocus(e);
  };

  onBlurInput = e => {
    this.setState({ focus: false });
    this.props.onBlur(e);
  };

  render() {
    const {
      options,
      placeholder,
      value,
      disabled,
      readonly,
      autofocus,
      onChange,
      keyboardAppearance,
    } = this.props;
    const _onChange = value => {
      return onChange(value === '' ? options.emptyValue : value);
    };
    const { focus } = this.state;
    return (
      <TextInput
        value={typeof value === 'undefined' ? '' : value}
        style={[
          styles.component.textInputStyle,
          focus == true ? styles.component.textInputFocus : null,
        ]}
        keyboardAppearance={keyboardAppearance == null ? 'light' : keyboardAppearance}
        autoFocus={autofocus}
        multiline={true}
        placeholder={placeholder}
        numberOfLines={options.rows}
        ref={input => (this.input = input)}
        onChangeText={_onChange}
        onBlur={this.onBlurInput}
        onFocus={this.onFocusInput}
        disabled={disabled}
        editable={!readonly}
      />
    );
  }
}

TextareaWidget.defaultProps = {
  autofocus: false,
  options: {},
};

if (process.env.NODE_ENV !== 'production') {
  TextareaWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.shape({
      rows: PropTypes.number,
    }),
    value: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  };
}

export default TextareaWidget;
