import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const data = {
  andhraPradesh: "hyderabad",
  arunachalPradesh: "itanagar",
  assam: "dispur",
  bihar: "patna",
  goa: "panaji",
  gujarat: "gandhinagar",
  haryana: "chandigarh",
  himachalPradesh: "shimla",
  jammuKashmir: "srinagar",
  karnataka: "bengaluru",
  kerala: "thiruvananthapuram",
  madhyaPradesh: "bhopal",
  maharashtra: "mumbai",
  manipur: "imphal",
  meghalaya: "shillong",
  mizoram: "aizawl",
  nagaland: "kohima",
  orissa: "bhubaneswar",
  punjab: "chandigarh",
  rajasthan: "jaipur",
  sikkim: "gangtok",
  tamilNadu: "chennai",
  tripura: "agartala",
  uttarPradesh: "lucknow",
  westBengal: "kolkata",
  chhattisgarh: "raipur",
  uttarakhand: "dehradun",
  jharkhand: "ranchi",
  telangana: "hyderabad",
};

const states = Object.keys(data);
const capitals = Object.values(data);

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>This is the Home Screen!</Text>
        <View style={{ flexDirection: "row" }}>
          <Button
            title="Profile"
            onPress={() => navigation.navigate("Profile")}
          />
          <Button
            title="Check Your Knowledge"
            onPress={() => navigation.navigate("Check Your Knowledge")}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

function CYKScreen({ navigation, route }) {
  const { itemId, otherParam } = route.params;
  const currState = states[Math.floor(Math.random() * 30)];
  const currCapital = data[currState];
  const currCapitalCopy = [...capitals];
  const currOptions = [data[currState]];
  const currOptionsTemp = [];
  let count = 0;
  while (count < 3) {
    const currNum = Math.floor(Math.random() * currCapitalCopy.length);
    currOptions.push(currCapitalCopy[currNum]);
    currCapitalCopy.splice(
      currCapitalCopy.indexOf(currCapitalCopy[currNum]),
      1
    );
    count += 1;
  }

  count = 0;

  while (count < 4) {
    const currNum = Math.floor(Math.random() * currOptions.length);
    currOptionsTemp.push(currOptions[currNum]);
    currOptions.splice(currOptions.indexOf(currOptions[currNum]), 1);
    count += 1;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>
          What is the capital of {currState.toString().toUpperCase()}?
        </Text>
        <View>
          <Text>{currOptionsTemp[0].toUpperCase()}</Text>
          <Text>{currOptionsTemp[1].toUpperCase()}</Text>
          <Text>{currOptionsTemp[2].toUpperCase()}</Text>
          <Text>{currOptionsTemp[3].toUpperCase()}</Text>
        </View>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <StatusBar style="auto" />
        <Button
          title="Go to CYK Screen"
          onPress={() =>
            navigation.push("Check Your Knowledge", {
              itemId: Math.floor(Math.random() * 100),
            })
          }
        />
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate("Home")}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <Button
          title="Go back to first screen in stack"
          onPress={() => navigation.popToTop()}
        />
      </View>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Home" }}
          />
          <Stack.Screen
            name="Check Your Knowledge"
            component={CYKScreen}
            initialParams={{ itemId: 42 }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
