import { View } from "react-native";
import React from "react";
import { Divider, Text } from "react-native-paper";

const HeaderTitle = ({ title }: { title: string }) => {
  return (
    <View style={{ padding: 4, gap: 4 }}>
      <Text variant="titleLarge">{title}</Text>
      {/* <Divider
        style={{
          backgroundColor: "#EDF2F4",
        }}
      ></Divider> */}
    </View>
  );
};

export default HeaderTitle;
