import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_BACKGROUND_FETCH_TASK = 'background-location-fetch';

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(LOCATION_BACKGROUND_FETCH_TASK, async () => {
  Location.useBackgroundPermissions = true;
  
  let location = await Location.getCurrentPositionAsync();
  const receivedNewLocation = 'Fetched Location: ' + location;

  console.log('Current location', receivedNewLocation);

  return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundLocationFetchAsync() {
  return BackgroundFetch.registerTaskAsync(LOCATION_BACKGROUND_FETCH_TASK, {
    minimumInterval: 10, // 5 seconds
  });
}

export default function BackgroundLocationFetchDisplay() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    registerBackgroundLocationFetchAsync(location);
    // stopped here. need to write return statement to see if the background fetch runs
  };

  return (
    <View>
      <Text>Location: </Text>
    </View>
  );
}
