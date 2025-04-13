import {View} from 'react-native';
import React from 'react';
import {Marquee} from '@animatereactnative/marquee';
import {Text} from 'react-native-paper';

const MarqueeBanner = (props: any) => {
  const {text} = props;
  return (
    <Marquee spacing={24} speed={0.75}>
      <Text variant="titleLarge">{text}</Text>
    </Marquee>
  );
};

export default MarqueeBanner;
