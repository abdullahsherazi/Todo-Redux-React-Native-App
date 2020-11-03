import React from 'react';
import colors from '../constants/colors';
import fontSizes from '../constants/fontSizes';
import {Text, TouchableOpacity} from 'react-native';

export default class GlobalButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          width: this.props.width ? this.props.width : '90%',
          flexDirection: 'row',
          height: this.props.height ? this.props.height : 50,
          marginTop: this.props.marginTop ? this.props.marginTop : 10,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: this.props.alignSelf ? this.props.alignSelf : 'center',
          borderWidth: this.props.borderWidth ? this.props.borderWidth : 0,
          borderColor: this.props.borderColor
            ? this.props.borderColor
            : colors.themeColor,
          backgroundColor: this.props.backgroundColor
            ? this.props.backgroundColor
            : colors.themeColor,
          borderRadius: this.props.borderRadius ? this.props.borderRadius : 20,
          marginLeft: this.props.marginLeft ? this.props.marginLeft : 0,
          marginBottom: this.props.marginBottom ? this.props.marginBottom : 2,
        }}
        onPress={() => this.props.submit()}
        // disabled={this.props.disabled ? this.props.disabled : false}
      >
        <Text
          style={{
            color: this.props.textColor
              ? this.props.textColor
              : colors.whiteColor,
            textAlign: 'center',

            fontSize: this.props.fontSize
              ? this.props.fontSize
              : fontSizes.normal,
            marginLeft: 10,

            fontWeight: this.props.fontWeight ? this.props.fontWeight : null,
          }}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}
