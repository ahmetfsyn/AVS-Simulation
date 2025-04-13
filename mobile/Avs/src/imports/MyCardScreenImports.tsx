import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import WaterCard from '../components/Card/WaterCard';
import {ActivityIndicator, IconButton, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddCard from '../components/Card/AddCard';
import {useNavigation} from '@react-navigation/native';
import {useDeleteWaterCard} from '../hooks/useDeleteWaterCard';

export {
  View,
  ActivityIndicator,
  AddCard,
  IconButton,
  MaterialCommunityIcons,
  React,
  ScrollView,
  StyleSheet,
  useSelector,
  WaterCard,
  useTheme,
  useNavigation,
  useDeleteWaterCard,
};
