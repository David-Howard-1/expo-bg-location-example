import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { View, Text, StyleSheet } from 'react-native';

const LocationDisplay = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  return (
    <View style={styles.container}>
      {location ? (
        <Text style={styles.locationText}>
          Latitude = {location.coords.latitude}
        </Text>
      ) : (
        <Text style={styles.waitingText}>Waiting for location..</Text>
      )}
      {location ? (
        <Text style={styles.locationText}>
          Longitude = {location.coords.longitude}
        </Text>
      ) : null}
    </View>
  );
};

export default LocationDisplay;

const styles = StyleSheet.create({
  waitingText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 24,
  },
  container: {
    margin: 10,
  },
});
