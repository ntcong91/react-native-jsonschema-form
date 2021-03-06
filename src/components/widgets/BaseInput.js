// @flow

import React, { PureComponent } from 'react';
import { Text, View, TextInput, StyleSheet, type ViewStyle } from 'react-native';
import csstyles from '../styles';

type Props = {
  placeholder: string,
  autoCapitalize?: 'none' | 'words',
  type: 'email' | null,
  onChange?: (text: string) => void,
  value?: string,
  keyboardType?: 'email-address' | 'number-pad' | 'default',
  multiline?: boolean,
  password?: boolean,
  wrapperStyle?: ViewStyle,
  inputStyle?: ViewStyle,
  invalid?: boolean,
  invalidMessage?: string,
  blurOnSubmit?: boolean,
  disabled?: boolean,
  returnKeyType?: 'default' | 'send',
  onBlur: () => void,
  onFocus: () => void,
  rawErrors: Array,
  keyboardAppearance: string,
};

type State = {
  touched: boolean,
};

class BaseInput extends PureComponent<Props, State> {
  static defaultProps = {
    password: false,
    keyboardType: 'default',
    multiline: false,
  };

  state: State = {
    touched: false,
  };

  inputRef: TextInput | null = null;

  onBlur = () => {
    const { touched } = this.state;

    if (!touched) {
      this.setState({
        touched: true,
      });
    }
    this.props.onBlur();
  };

  focus = () => {
    this.inputRef && this.inputRef.focus();
    this.props.onFocus();
  };

  blur = () => {
    this.inputRef && this.inputRef.blur();
    this.props.onBlur();
  };

  _onChange = value => {
    const { options } = this.props;
    this.props.onChange(value === '' ? options.emptyValue : value);
  };

  render() {
    const {
      schema,
      placeholder,
      autoCapitalize,
      password,
      wrapperStyle,
      inputStyle,
      value,
      onChange,
      multiline,
      invalid,
      invalidMessage,
      blurOnSubmit,
      returnKeyType,
      formContext,
      onBlur,
      onFocus,
      options,
      disabled,
      rawErrors,
      keyboardType,
      type,
      keyboardAppearance,
    } = this.props;
    const { touched } = this.state;
    const showError = rawErrors && rawErrors.length > 0;
    let keyboardTypeUse = keyboardType ? keyboardType : 'default';
    let placeHoderUse = placeholder;
    if (schema && schema.hasOwnProperty('keyboardType')) {
      keyboardTypeUse = schema['keyboardType'];
    }
    if (schema && schema.hasOwnProperty('placeholder')) {
      placeHoderUse = schema['placeholder'];
    }
    let maxLength = null;
    if (schema && schema.hasOwnProperty('maxLength')) {
      maxLength = parseInt(schema.maxLength);
    }
    // let formatMoney = false
    // if (schema && schema.hasOwnProperty('mask')) {
    //   formatMoney = schema['mask'] === 'money'
    // }

    return (
      <View style={[styles.wrapper, wrapperStyle]}>
        <TextInput
          placeholder={placeHoderUse}
          keyboardType={keyboardTypeUse}
          value={value ? `${value}` : ''}
          onChangeText={this._onChange}
          secureTextEntry={type != null && type === 'password' ? true : false}
          style={[
            styles.textInput,
            multiline ? styles.textInputMultiLine : null,
            inputStyle,
            showError ? styles.textInputInvalid : null,
          ]}
          // spellCheck={false}
          // showSoftInputOnFocus={false}
          placeholderTextColor={csstyles.vars.csPlaceHolder}
          onBlur={this.onBlur}
          autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
          underlineColorAndroid="transparent"
          multiline={multiline}
          keyboardAppearance={keyboardAppearance ? keyboardAppearance : 'light'}
          ref={ref => {
            this.inputRef = ref;
          }}
          maxLength={maxLength ? maxLength : null}
          blurOnSubmit={blurOnSubmit ? blurOnSubmit : true}
          returnKeyType={returnKeyType}
          editable={!disabled}
        />
        {showError && (
          <View style={styles.errorWrapper}>
            {rawErrors.map((error, i) => (
              <Text key={i} style={styles.errorText}>
                {' '}
                {error}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: csstyles.vars.csBoxSpacing,
  },
  textInput: {
    height: csstyles.vars.csInputHeight,
    borderRadius: csstyles.vars.csInputBorderRaius,
    paddingHorizontal: csstyles.vars.csInputHorizontalPadding,
    overflow: 'visible',
    backgroundColor: csstyles.vars.csWhite,
    color: csstyles.vars.csGrey,
    ...csstyles.text.regular,
    fontSize: 15,
    ...csstyles.base.shadow,
  },
  formatMoney: {
    color: csstyles.vars.csGreen,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  textInputMultiLine: {
    borderRadius: csstyles.vars.csBoxBorderRadius,
    height: 'auto',
    minHeight: csstyles.vars.csInputHeight * 3,
    paddingTop: csstyles.vars.csInputHeight - 16 * 2,
    paddingBottom: csstyles.vars.csInputHeight - 16 * 2,
    textAlignVertical: 'top',
  },
  textInputInvalid: {
    borderColor: csstyles.vars.csDanger,
  },
  errorWrapper: {
    marginTop: 3,
    paddingHorizontal: csstyles.vars.csInputHorizontalPadding,
  },
  errorText: {
    ...csstyles.text.medium,
    color: csstyles.vars.csDanger,
    fontStyle: 'italic',
    fontSize: 13,
  },
});

export default BaseInput;
