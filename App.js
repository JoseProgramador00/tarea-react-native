import React, { Component } from 'react';
import { View,Text,StyleSheet } from 'react-native';

import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


// Components
import CreateLibroScreen from "./screens/CreateLibroScreen";
import LibroDetailScreen from "./screens/LibroDetailScreen";
import LibrosList from "./screens/LibrosList";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#621FF7",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="LibrosList"
        component={LibrosList}
        options={{ title: "Libros prestados" }}
      />
    <Stack.Screen
        name="CreateLibroScreen"
        component={CreateLibroScreen}
        options={{ title: "Agregar prestamos" }}
      />
  
      <Stack.Screen
        name="LibroDetailScreen"
        component={LibroDetailScreen}
        options={{ title: "Detalle del libro" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});