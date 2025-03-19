import { View, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { Button, Card, List, Text, useTheme } from "react-native-paper";
import MapView, { Marker, UrlTile } from "react-native-maps";
import { ScrollView } from "react-native-gesture-handler";

const servicePointsData = [
  {
    id: 1,
    lat: 36.9135,
    long: 34.8831,
    title: "Kiosk 1",
    description: "Makbuz Verilemiyor",
    isActive: false,
  },
  {
    id: 2,
    lat: 36.9123,
    long: 34.8907,
    title: "Kiosk 2",
    description: "Aktif",
    isActive: true,
  },
  {
    id: 3,
    lat: 36.9201,
    long: 34.8754,
    title: "Kiosk 3",
    description: "Tarsus Kiosk 3",
    isActive: false,
  },
  {
    id: 4,
    lat: 36.9058,
    long: 34.8702,
    title: "Kiosk 4",
    description: "Aktif",
    isActive: true,
  },
  {
    id: 5,
    lat: 36.9182,
    long: 34.8604,
    title: "Kiosk 5",
    description: "Aktif",
    isActive: true,
  },
];

const ServicePointsScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const mapViewRef = useRef<MapView | null>(null);

  const zoomToLocation = (servicePoint) => {
    mapViewRef?.current?.animateToRegion(
      {
        latitude: servicePoint.lat,
        longitude: servicePoint.long,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      },
      750
    );
  };

  const findByLocation = () => {
    try {
      console.log("konuma göre en yakın servis noktaları : ", ["qwe", "aasd"]);
    } catch (error) {
      console.log(error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      gap: 10,
    },
    servicePointsCard: {
      backgroundColor: theme.colors.cardBackground,
    },
  });

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 38.9637,
          longitude: 35.2433,
          latitudeDelta: 20,
          longitudeDelta: 20,
        }}
        followsUserLocation={true}
      >
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          zIndex={-1}
        />

        {servicePointsData?.length > 0 &&
          servicePointsData.map((servicePoint, index) => (
            <Marker
              coordinate={{
                latitude: servicePoint.lat,
                longitude: servicePoint.long,
              }}
              pinColor={
                servicePoint.isActive
                  ? theme.colors.success
                  : theme.colors.warning
              }
              key={index}
              title={servicePoint.title}
              description={servicePoint.description}
            />
          ))}
      </MapView>

      <View>
        <Card style={styles.servicePointsCard}>
          <Card.Title
            title="Yakındaki Servis Noktaları"
            titleVariant="titleMedium"
          ></Card.Title>
          <Card.Content>
            <ScrollView style={{ maxHeight: 200 }}>
              <List.Section>
                {servicePointsData?.length > 0 ? (
                  servicePointsData.map((servicePoint, index) => {
                    return (
                      <List.Item
                        key={index}
                        title={servicePoint.title}
                        description={servicePoint.description}
                        onPress={() => zoomToLocation(servicePoint)}
                        left={(props) =>
                          servicePoint.isActive ? (
                            <List.Icon
                              {...props}
                              icon="check-circle"
                              color={theme.colors.success}
                            />
                          ) : (
                            <List.Icon
                              {...props}
                              icon="alert-circle"
                              color={theme.colors.warning}
                            />
                          )
                        }
                      />
                    );
                  })
                ) : (
                  <Text variant="bodyLarge" style={{ textAlign: "center" }}>
                    Yakında Servis Noktası Bulunamadı
                  </Text>
                )}
              </List.Section>
            </ScrollView>
          </Card.Content>
        </Card>
      </View>
      <Button
        mode="contained"
        disabled={loading}
        loading={loading}
        onPressIn={findByLocation}
      >
        En Yakın Servis Noktaları
      </Button>
    </View>
  );
};

export default ServicePointsScreen;
