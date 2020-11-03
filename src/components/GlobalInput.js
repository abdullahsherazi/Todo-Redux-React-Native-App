import React from 'react';
import {View, TextInput} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import colors from '../constants/colors';
import fontSizes from '../constants/fontSizes';

const GlobalInput = React.forwardRef((props, ref) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        width: props.width ? props.width : '90%',
        height: props.height ? props.height : 43,
        marginTop: props.marginTop ? props.marginTop : 10,
      }}>
      <TextInput
        returnKeyType={props.returnKeyType ? props.returnKeyType : null}
        maxLength={props.maxLength ? props.maxLength : null}
        style={{
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : colors.blackColor,
          opacity: props.opacity ? props.opacity : null,
          width: '100%',
          marginRight: props.marginRight ? props.marginRight : 0,
          borderRadius: props.borderRadius ? props.borderRadius : 10,
          borderWidth: 1,
          borderColor: props.borderColor
            ? props.borderColor
            : colors.googleGrey,
          padding: props.padding ? props.padding : 10,
          paddingRight: props.paddingRight ? props.paddingRight : 10,
          fontSize: fontSizes.normal,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          paddingLeft: props.paddingLeft ? props.paddingLeft : 40,
        }}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType ? props.keyboardType : null}
        placeholderTextColor={
          props.placeholderTextColor
            ? props.placeholderTextColor
            : colors.blackColor
        }
        editable={props.editable ? props.editable : true}
        onChangeText={(text) => {
          props.changeText(text);
        }}
        value={props.value ? props.value : null}
      />
      {props.visible ? (
        <MaterialIcons
          name="visibility"
          style={{position: 'absolute', right: 10, top: 10}}
          size={20}
          color={colors.blackColor}
          onPress={props.changePasswordState}
        />
      ) : props.notVisible ? (
        <MaterialIcons
          name="visibility-off"
          style={{position: 'absolute', right: 10, top: 10}}
          size={20}
          color={colors.blackColor}
          onPress={props.changePasswordState}
        />
      ) : null}
    </View>
  );
});

export default GlobalInput;
