// CustomInputPhoneMask.tsx
import React from 'react';
import MaskInput from 'react-native-mask-input';
import CustomTextInput from './CustomTextInput';

const CustomInputPhoneMask: React.FC<any> = props => {
  const {setFieldValue, fieldName, mask} = props;
  return (
    <MaskInput
      {...props}
      onChangeText={(_, unmasked) => setFieldValue(fieldName, unmasked)}
      mask={mask}
    />
  );
};

export default CustomInputPhoneMask;
