import { 
  View, Text, StyleSheet, ImageBackground, FlatList, Image, TouchableOpacity 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import firebase from '../../Config';
import Icon from 'react-native-vector-icons/Ionicons';
import { Linking, Alert } from 'react-native';


export default function ListUsers(props) {
  const userId = props.route.params.userId;
  const database = firebase.database();
  const [data, setData] = useState([]);

  const list_ref = database.ref("ListUsers");

  useEffect(() => {
    getAllUsers();
    return () => {
      list_ref.off(); // Arrête l'écoute pour éviter les fuites mémoire
    };
  }, [list_ref]);

  function getAllUsers() {
    list_ref.on("value", (snapshot) => {
      let tempData = [];
      snapshot.forEach((child) => {
        if (child.key !== userId) { // Correction de la condition
          tempData.push({
            id: child.key, 
            pseudo: child.val().pseudo,
            numero: child.val().numero,
            urlImage: child.val().urlimage,
            actif: child.val().actif,
          });
        }
      });
      setData(tempData);
    });
  }

  function handleCall(numero) {
    const phoneNumber = `tel:${numero}`;
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneNumber);
        } else {
          Alert.alert("Erreur", "Impossible de passer l'appel.");
        }
      })
      .catch((err) => console.error("Erreur lors de l'appel :", err));
  }
  
  function handleMessage(item) {
    props.navigation.navigate("Chat", { currentId: userId, secondId: item.id ,pseudo: item.pseudo,
    numero: item.numero, status: item.actif, urlImage: item.urlImage });
  }

  return (
    <ImageBackground 
      source={require("../../assets/backprofile.jpg")} 
      style={styles.container}
    >
      <Text style={styles.header}>Liste des Utilisateurs</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <View style={styles.avatarContainer}>
              <Image 
                
                source={item.urlImage ? { uri: item.urlImage } :  require("../../assets/profile.jpg") } 
                style={styles.avatar} 
              />
              <View 
                style={[
                  styles.statusIndicator, 
                  { backgroundColor: item.actif === "yes" ? "#25D366" : "#B0B0B0" }
                ]}
              />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.pseudo}>{item.pseudo}</Text>
              <Text style={styles.numero}>{item.numero}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleCall(item.numero)} style={styles.iconButton}>
                <Icon name="call-outline" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMessage(item)} style={styles.iconButton}>
                <Icon name="chatbubbles-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    paddingTop: 50,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#075E54",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  userContainer: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    elevation: 3,
    width: "95%",
    justifyContent: "space-between",
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  statusIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff",
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  pseudo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  numero: {
    fontSize: 14,
    color: "gray",
  },
  actions: {
    flexDirection: "row",
  },
  iconButton: {
    backgroundColor: "#25D366",
    padding: 10,
    borderRadius: 10,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 5,
    width: "90%",
  },
});
