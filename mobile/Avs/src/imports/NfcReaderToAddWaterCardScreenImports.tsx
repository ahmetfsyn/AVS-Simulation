import {View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {showMessage} from '../utils/showMessage';
import {useNavigation} from '@react-navigation/native';
import NfcManager from 'react-native-nfc-manager';
import {useReadNdef} from '../hooks/useReadNdef';
import {useAddWaterCard} from '../hooks/useAddWaterCard';
import PageInfoCard from '../components/Card/PageInfoCard';

export {
  ActivityIndicator,
  LottieView,
  NfcManager,
  PageInfoCard,
  React,
  StyleSheet,
  View,
  showMessage,
  useAddWaterCard,
  useEffect,
  useNavigation,
  useReadNdef,
};
