import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Modal, Image, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [listCharacters, setListCharacters] = useState()
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    fetch("https://thronesapi.com/api/v2/Characters")
      .then(response => response.json())
      .then(data => setListCharacters(data))
  },[])

  const Character = ({ item }) => {

    return (
      <>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <Text>{item.fullName}</Text>
          <Text>{item.family}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </Modal>
        <Pressable onPress={() => setModalVisible(true)}>
          <View style={styles.imageContainer}>
            <Text>{item.fullName}</Text>
            <Image
              style={styles.image}
              source={{
                uri: item.imageUrl
              }}
            />
          </View>
        </Pressable>
      </>
    )
  }

  console.log(listCharacters)
  return (
    <>
      <View style={styles.container}>
        <FlatList data={listCharacters} renderItem={Character} />
      </View>
    </>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  imageContainer: {
    marginBottom: 10
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});
