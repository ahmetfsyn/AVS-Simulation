import { View, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { Card, Text } from "react-native-paper";

const HomeScreen = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Card.Title title="qlwmldas"></Card.Title>
      </Card>
    </SafeAreaView>
  );
};

export default HomeScreen;
