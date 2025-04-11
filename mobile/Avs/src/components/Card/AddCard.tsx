import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {Card, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export type AddCardProps = {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'>;
  path: string;
};

const AddCard = (props: AddCardProps) => {
  const {navigation, path} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(path);
      }}>
      <Card>
        <Card.Content
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
          <Text variant="bodyLarge">Kart eklemek için tıklayınız.</Text>
          <MaterialCommunityIcons
            name="plus-circle"
            size={48}
            color={'white'}
          />
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default AddCard;
