import {StyleProp, TextStyle, View} from 'react-native';
import React from 'react';
import {Card, Text} from 'react-native-paper';
import {VariantProp} from 'react-native-paper/lib/typescript/components/Typography/types';

export type PageInfoCardProps = {
  style?: StyleProp<TextStyle>;
  variant?: VariantProp<string>;
  text?: string;
};

const PageInfoCard = ({style, variant, text}: PageInfoCardProps) => {
  return (
    <Card>
      <Card.Content>
        <Text style={style} variant={variant}>
          {text}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default PageInfoCard;
