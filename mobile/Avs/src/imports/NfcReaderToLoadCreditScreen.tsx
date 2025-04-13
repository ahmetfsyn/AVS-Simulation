import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Card, Text, useTheme} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {showMessage} from '../utils/showMessage';
import {useNavigation, useRoute} from '@react-navigation/native';
import NfcManager from 'react-native-nfc-manager';
import {useReadNdef} from '../hooks/useReadNdef';
import {useLoadCredit} from '../hooks/useLoadCredit';
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
  useLoadCredit,
  useEffect,
  useNavigation,
  useReadNdef,
  useRoute,
  useTheme,
  Card,
  Text,
  useState,
};
