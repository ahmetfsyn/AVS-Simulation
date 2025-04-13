import React, {useState} from 'react';
import {View} from 'react-native';
import {Card, Checkbox, Text, useTheme} from 'react-native-paper';
import CustomTextInput from '../components/TextInput/CustomTextInput';
import CustomButton from '../components/Button/CustomButton';
import {Formik} from 'formik';
import {styles} from '../styles/loginScreenStyles';
import {validationSchema} from '../validations/LoginValidations';
import {passwordMaxLength} from '../validations/RegisterValidations';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSignIn} from '../hooks/useSignIn';

export {
  styles,
  validationSchema,
  passwordMaxLength,
  useNavigation,
  useSignIn,
  CustomTextInput,
  CustomButton,
  Formik,
  ScrollView,
  View,
  Card,
  Text,
  useTheme,
  Checkbox,
  React,
  useState,
};
