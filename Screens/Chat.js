import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
} from 'react-native';
import firebase from "../Config";
import { ref } from 'firebase/database';

const database = firebase.database();
const ref_listOfDiscussion = database.ref().child('listOfDiscussion');

export default function Chat({ route }) {
  const { currentId, secondId, pseudo, numero, status, urlImage } = route.params;

  const idDiscussion = currentId > secondId ? currentId + secondId : secondId + currentId;
  const ref_discussion = ref_listOfDiscussion.child(idDiscussion);
  const ref_ListOfMessages = ref_discussion.child('ListOfMessages');

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const [istyping, setistyping] = useState(true);

  const ref_typing = ref_discussion.child(secondId+'istyping');
  useEffect(() => {
    ref_typing.on("value", (snapshot) => {
      const typingStatus = snapshot.val();
      setistyping(typingStatus);
    });
  
    return () => {
      ref_typing.off("value"); // Nettoyage de l'écouteur
    }
  }, [])
  
  

  useEffect(() => {
    const listener = ref_ListOfMessages.on("value", (snapshot) => {
      const msgs = [];
      snapshot.forEach((msg) => {
        msgs.push(msg.val());
      });
      setMessages(msgs);
    });

    return () => {
      ref_ListOfMessages.off("value", listener); // Nettoyage
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const key = ref_ListOfMessages.push().key;
    const ref_Unmessage = ref_ListOfMessages.child(key);
    ref_Unmessage.set({
      body: newMessage,
      time: new Date().toLocaleString(),
      sender: currentId,
      reciver: secondId,
    });

    setNewMessage('');
  };

  const renderItem = ({ item }) => {
    const isCurrentUser = item.sender === currentId;
    return (
      <View style={[styles.messageContainer, isCurrentUser ? styles.right : styles.left]}>
        <Text style={styles.messageText}>{item.body}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🟢 Header */}
      <View style={styles.header}>
        <Image
          source={urlImage ? { uri: urlImage } : require("../assets/profile.jpg")}
          style={styles.profileImage}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.userName}>{pseudo}</Text>
          <Text style={styles.status}>
            {status === 'yes' ? 'En ligne' : 'Hors ligne'} • {numero}
          </Text>
        </View>
      </View>

      {/* 💬 Messages */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <FlatList
          data={messages}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 10 }}
        />

        {istyping && (
          <Text style={styles.typingText}>L'utilisateur est en train d'écrire...</Text>
        )}

        {/* ✍️ Input */}
        <View style={styles.inputContainer}>
          <TextInput
            onFocus={()=>{
              const ref_typing = ref_discussion.child(currentId+'istyping').set(true);
            }
            }
            onBlur={()=>{
              const ref_typing = ref_discussion.child(currentId+'istyping').set(false);
            }
            }
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Tapez un message..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5ddd5',
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#075e54',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    color: '#d0f0c0',
    fontSize: 14,
  },
  messageContainer: {
    maxWidth: '70%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 20,
  },
  left: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 0,
  },
  right: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
    borderTopRightRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#075e54',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  typingText: {
  paddingHorizontal: 15,
  fontStyle: 'italic',
  color: 'gray',
  marginBottom: 5,
},

});
