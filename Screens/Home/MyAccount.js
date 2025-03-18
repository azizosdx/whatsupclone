import { View, Text, StyleSheet, ImageBackground, Image, TextInput, Button } from 'react-native'
import React, { useState } from 'react'

import firebase from '../../Config'
const database = firebase.database()
const ref_database = database.ref()  // reference globale


export default function MyAccount() {

    const [pseudo, setpseudo] = useState("")
    const [numero, setnumero] = useState("")


  return (
    <ImageBackground 
    source={require("../../assets/backprofile.jpg")}
    style={styles.container}
    >
    <Text
        style={{
            fontSize: 34,
            fontWeight: "bold",
            fontStyle: "italic",
            color: "dark",
        }}
    >
        Settings
    </Text>
    <Image
    source={require("../../assets/profile.jpg")}
    style={{
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "white",
        marginTop: 20,
    }}
    >

    </Image>
    <TextInput 
    onChangeText={(text) => {
        setpseudo(text)
    }
    }
    style={styles.input}
    //placeholderTextColor={"white"}
    placeholder="Pseudo">

    </TextInput>
    <TextInput
    onChangeText={(text) => {
        setnumero(text)
    }    
    }
    style={styles.input}
    //placeholderTextColor={"white"}
    placeholder="Numero">
    </TextInput>
    <Button 
    onPress={()=>{
        const ref_ListUsers = ref_database.child("ListUsers")
        const key = ref_ListUsers.push().key
        const ref_user = ref_ListUsers.child("userid"+key)
        ref_user.set({
            pseudo: pseudo,
            numero: numero,
        })
    }}
    title="Save"
    ></Button>
    <Button
    title='Log Out'
    >
    </Button>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
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