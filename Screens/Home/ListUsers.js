import { View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native'
import React from 'react'

const data = [
    {pseudo : "yassine", numero : "1234567"},
    {pseudo : "aziz", numero : "1234567"}

]

export default function ListUsers() {
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
        >List Users</Text>
        <FlatList
        style={{
            width: "90%",
            height: "60%",
            backgroundColor: "#0004",
            borderRadius: 10,
            padding: 10,
            margin: 10,
        }}
        data={data}
        renderItem={({item}) => {
            return (
                <View style={{flexDirection: "row"}}>
                    <Text>{item.pseudo}</Text>
                    <Text>{item.numero}</Text>
                </View>
            )
        }}
        ></FlatList>

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