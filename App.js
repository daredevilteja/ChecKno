import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, Button, Modal, StyleSheet, Text, View } from "react-native";
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
  const [currCapital, setCurrCapital] = useState("");
  const currCapitalCopy = [...capitals];
  const currOptions = [data[currState]];
  const currOptionsTemp = [];
  const [showModal, setShowModal] = useState(false);
  const [showAnsStatus, setShowAnsStatus] = useState("");
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

  const checkAnswer = (val) => {
    if (val == data[currState].toUpperCase()) {
      setShowAnsStatus("Right");
    } else {
      setShowAnsStatus("Wrong");
      setCurrCapital(data[currState]);
    }
    setShowModal(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {!showModal ? (
          <>
            <Text>
              What is the capital of {currState.toString().toUpperCase()}?
            </Text>
            <View style={{ height: 200, justifyContent: "space-around" }}>
              <View
                style={{
                  width: 300,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  title={currOptionsTemp[0].toUpperCase()}
                  onPress={() => checkAnswer(currOptionsTemp[0].toUpperCase())}
                />
                <Button
                  title={currOptionsTemp[1].toUpperCase()}
                  onPress={() => checkAnswer(currOptionsTemp[1].toUpperCase())}
                />
              </View>
              <View
                style={{
                  width: 300,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  title={currOptionsTemp[2].toUpperCase()}
                  onPress={() => checkAnswer(currOptionsTemp[2].toUpperCase())}
                />
                <Button
                  title={currOptionsTemp[3].toUpperCase()}
                  onPress={() => checkAnswer(currOptionsTemp[3].toUpperCase())}
                />
              </View>
            </View>

            <Button
              title="Generate Random"
              onPress={() => navigation.push("Check Your Knowledge")}
            />
            <Button title="End" onPress={() => navigation.popToTop()} />
            <StatusBar style="auto" />
          </>
        ) : (
          <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setShowModal(!showModal);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{showAnsStatus} Answer</Text>
                {showAnsStatus === "Wrong" ? (
                  <Text style={styles.modalText}>
                    Right Answer is {currCapital.toUpperCase()}
                  </Text>
                ) : (
                  <></>
                )}

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setShowModal(!showModal)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
