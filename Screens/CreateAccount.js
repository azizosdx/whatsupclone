import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  BackHandler,
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import firebase from "../Config";

const auth = firebase.auth()

export default function CreateAccount(props) {

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  return (
    <ImageBackground
      source={require("../assets/pic1.jpg")}
      style={styles.container}
    >
      <View
        style={{
          backgroundColor: "#0004",
          width: "90%",
          height: "350",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 34,
            fontWeight: "bold",
            fontStyle: "italic",
            color: "dark",
          }}
        >
          Create Account
        </Text>
        <TextInput
        onChangeText={(text) => {
          setemail(text)
        }}
          style={styles.input}
          keyboardType="email-address"
          placeholder="email@site.com"
        ></TextInput>
        <TextInput
        onChangeText={(text) => {
          setpassword(text)
        }}
          style={styles.input}
          keyboardType="default"
          placeholder="Password"
        ></TextInput>
        <TextInput
        onChangeText={(text) => {
          setConfirmPassword(text)
        }
        }
          style={styles.input}
          keyboardType="default"
          placeholder="Confirm password"
        ></TextInput>
        <View
          style={{
            flexDirection: "row",
            gap: 15,
          }}
        >
          <Button
            //onPress={() => {props.navigation.navigate("Auth")}}
            //onPress={() => {console.log(email)}}
            onPress={() => {
              if (password === ConfirmPassword) {
                auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                  alert("account created")
                  props.navigation.navigate("Home")
                })
                .catch((error) => {
                  alert(error.message)
                })
              } else {
                alert("passwords are not the same")
              }
            }}
            color={"gray"}
            title="validate"
          ></Button>
          <Button
            onPress={() => {props.navigation.goBack()}}
            color={"gray"}
            title="Back"
          ></Button>
        </View>
        <Text
        onPress={() => {props.navigation.navigate("Auth")}}
         style={{
          marginTop: 10,
          marginRight: 10,
          width: "100%",
          textAlign: "center",
          fontSize: 14,
          fontStyle: "italic",
          color: "white",
        }}>
          you have already an account
        </Text>
      </View>

      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    width: "90%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});
