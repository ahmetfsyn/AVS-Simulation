import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Card, Text} from 'react-native-paper';
import CustomTextInput from '../components/TextInput/CustomTextInput';
import CustomButton from '../components/Button/CustomButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import WaterCard from '../components/Card/WaterCard';
import WaterCardInfoCard from '../components/Card/WaterCardInfoCard';
import {ScrollView} from 'react-native-gesture-handler';
import {showMessage} from '../utils/showMessage';
import {MIN_CREDIT} from '../hooks/useLoadCredit';

export {
  Card,
  Text,
  CustomTextInput,
  CustomButton,
  useNavigation,
  useRoute,
  WaterCard,
  WaterCardInfoCard,
  ScrollView,
  showMessage,
  MIN_CREDIT,
  StyleSheet,
  React,
  useState,
};
