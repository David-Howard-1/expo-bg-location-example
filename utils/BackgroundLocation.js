import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const FETCH_LOCATION = 'background-location-fetch';

const requestPermissions = async () => {
  const { status: foregroundStatus } =
    await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === 'granted') {
    const { status: backgroundStatus } =
      await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus === 'granted') {
      await Location.startLocationUpdatesAsync(FETCH_LOCATION, {
        accuracy: Location.Accuracy.Balanced,
        showsBackgroundLocationIndicator: true
      });
    }
  }
};

const PermissionsButton = () => (
  <View style={styles.container}>
    <Button onPress={requestPermissions} title="Enable background location" />
  </View>
);

TaskManager.defineTask(FETCH_LOCATION, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data;

    console.log(`Received new location at ${new Date()}: `, locations);

    return;
  }
});

export default PermissionsButton;

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
  },
});
