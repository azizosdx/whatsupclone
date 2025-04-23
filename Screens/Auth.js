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

export default function Auth(props) {

  // const [email, setemail] = useState("aziz@gmail.com")
  // const [password, setpassword] = useState("azizaziz")

  const [email, setemail] = useState("yassine@gmail.com")
  const [password, setpassword] = useState("yassine")

  return (
    <ImageBackground
      source={require("../assets/pic1.jpg")}
      style={styles.container}
    >
      <View
        style={{
          backgroundColor: "#0004",
          width: "90%",
          height: "300",
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
          Bienvenue
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
          placeholder="*********"
        ></TextInput>
        <View
          style={{
            flexDirection: "row",
            gap: 15,
          }}
        >
          <Button
          
          onPress={()=>{
             if (email != "" && password != "") {
              auth.signInWithEmailAndPassword(email, password)
              .then(() => { 
                const userId = auth.currentUser.uid

                const ref_listusers= ref_database.child("ListUsers");
                  const ref_user = ref_listusers.child(userId);

                  ref_user.update({
                    id:userId,
                    connected: true
                  });

                props.navigation.navigate("Home", {userId}) 
                })
              .catch((error) => {
                alert(error)
              })
               } else {
              alert("email ou mot de passe incorrect")
            } 
          }}
            //onPress={() => { props.navigation.navigate("Home") }}
            color={"gray"}
            title="validate"
          ></Button>
          <Button
            onPress={() => { BackHandler.exitApp() }}
            color={"gray"}
            title="Quitter"
          ></Button>
        </View>
        <Text
          onPress={() => { props.navigation.navigate("CreateAccount") }}
          style={{
            marginTop: 10,
            marginRight: 10,
            width: "100%",
            textAlign: "center",
            fontSize: 14,
            fontStyle: "italic",
            color: "white",
          }}>
          creer un nouveau compte
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
