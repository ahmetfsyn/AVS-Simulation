import {StyleSheet, View} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import MapView, {Marker, UrlTile} from 'react-native-maps';
import {useTheme} from 'react-native-paper';
import {GOOGLE_MAPS_API_KEY} from 'react-native-dotenv';
const Map = (props: {
  mapViewRef: React.MutableRefObject<MapView | null>;
  servicePointsData: [];
}) => {
  const {mapViewRef, servicePointsData} = props;
  const theme = useTheme();

  return (
    <MapView
      provider="google"
      ref={mapViewRef}
      style={{flex: 1}}
      initialRegion={{
        latitude: 38.9637,
        longitude: 35.2433,
        latitudeDelta: 20,
        longitudeDelta: 20,
      }}
      followsUserLocation={true}>
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
  );
};

export default Map;

const styles = StyleSheet.create({});
