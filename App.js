import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>This is the Home Screen!</Text>
        <StatusBar style="auto" />
      </View>
      <Button
        title="Go to CYK Screen"
        onPress={() => navigation.navigate("Check Your Knowledge")}
      />
    </SafeAreaView>
  );
}

function CYKScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>This is the Check Your Knowledge Screen!</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        // screenOptions={{ title: "ChecKno" }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Overview" }}
        />
        <Stack.Screen name="Check Your Knowledge" component={CYKScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
