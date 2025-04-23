import { View, Text, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import firebase from '../../Config';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

const database = firebase.database();
const ref_database = database.ref();

export default function MyAccount(props) {
    const userId = props.route.params.userId;

    const [pseudo, setPseudo] = useState("");
    const [numero, setNumero] = useState("");
    const [localurlimage, setlocalurlimage] = useState("");
    const [isdefaultimage, setisdefaultimage] = useState(true);

    useEffect(() => {
        const ref_user = ref_database.child(`ListUsers/user${userId}`);
        ref_user.once("value")
            .then(snapshot => {
                const userData = snapshot.val();
                if (userData) {
                    setPseudo(userData.pseudo || "");
                    setNumero(userData.numero || "");
                    if (userData.urlimage) {
                        setlocalurlimage(userData.urlimage);
                        setisdefaultimage(false);
                    }
                }
            })
            .catch(err => {
                console.log("Erreur de récupération :", err);
                Alert.alert("Erreur", "Impossible de récupérer les données.");
            });
    }, []);

    async function handleSave() {

        const linkImage = await uploadImageToStorage(localurlimage);

        const ref_listusers= ref_database.child("ListUsers");
        const ref_user = ref_listusers.child(userId);
        //const ref_user = ref_database.child(`ListUsers/user${userId}`);
        ref_user.set({ 
            pseudo, 
            numero, 
            id: userId, 
            urlimage: linkImage, 
            connected: true
        })
            .then(() => Alert.alert("Succès", "Utilisateur enregistré avec succès !"))
            .catch((error) => Alert.alert("Erreur", error.message));
    }

    function handleLogout() {
        firebase.auth().signOut()
            .then(() => {
                const ref_listusers = ref_database.child("ListUsers");
                const ref_user = ref_listusers.child(userId);
    
                ref_user.update({
                    connected: false
                }).then(() => {
                    props.navigation.replace("Auth");
                }).catch((error) => {
                    console.log("Erreur lors de la mise à jour de l'état connecté :", error);
                });
            })
            .catch((error) => {
                console.log("Erreur lors de la déconnexion :", error);
            });
    }
    
    
    const  uploadImageToStorage = async (urilocal) => {
        const response = await fetch(urilocal);
        const blob = await response.blob();
       
        const arraybuffer = await new Response(blob).arrayBuffer();
        
        // // upload to storage
        // await supabase.storage
        //   .from("images")
        //   .upload(userId + ".jpg", arraybuffer, {
        //     cacheControl: "3600",
        //     upsert: true,
        //   });
        // const { data } = supabase.storage
        //   .from("images")
        //   .getPublicUrl(userId + ".jpg");
        // return data.publicUrl;
      };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setlocalurlimage(result.assets[0].uri);
            setisdefaultimage(false);
        }
    };

    return (
        <ImageBackground source={require("../../assets/backprofile.jpg")} style={styles.container}>
            <Text style={styles.header}>Paramètres</Text>

            <TouchableOpacity onPress={pickImage}>
                <Image 
                    source={isdefaultimage ? require("../../assets/profile.jpg") : { uri: localurlimage }} 
                    style={styles.avatar} 
                />
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <Icon name="person" size={24} color="gray" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Pseudo"
                    placeholderTextColor="gray"
                    value={pseudo}
                    onChangeText={setPseudo}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="phone" size={24} color="gray" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Numéro"
                    placeholderTextColor="gray"
                    keyboardType="phone-pad"
                    value={numero}
                    onChangeText={setNumero}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Enregistrer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
                <Text style={styles.buttonText}>Se déconnecter</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 50,
        backgroundColor: "#f5f5f5",
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#075E54",
        marginBottom: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: "white",
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        width: "90%",
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    button: {
        width: "90%",
        backgroundColor: "#25D366",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    logoutButton: {
        backgroundColor: "#D32F2F",
    },
    buttonText: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },
});
