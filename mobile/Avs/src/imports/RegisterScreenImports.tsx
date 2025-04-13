import React from 'react';
import {View} from 'react-native';
import {Card} from 'react-native-paper';
import CustomTextInput from '../components/TextInput/CustomTextInput';
import CustomButton from '../components/Button/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {ScrollView} from 'react-native-gesture-handler';
import {
  passwordMaxLength,
  validationSchema,
} from '../validations/RegisterValidations';
import {styles} from '../styles/registerScreenStyles';
import {useSignUp} from '../hooks/useSignUp';

export {
  Card,
  CustomButton,
  CustomTextInput,
  Formik,
  ScrollView,
  View,
  passwordMaxLength,
  styles,
  validationSchema,
  useNavigation,
  useSignUp,
  React,
};
