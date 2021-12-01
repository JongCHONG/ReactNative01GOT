import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [listCharacters, setListCharacters] = useState()

  useEffect(() => {
    fetch("https://thronesapi.com/api/v2/Characters")
      .then(response => response.json())
      .then(data => setListCharacters(data))
  },[])

  console.log(listCharacters)
  return (
      <View style={styles.container}>
        <FlatList data={listCharacters} renderItem={Character} />
      <Text>Test</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const Character = ({ item }) => {
  return (
    <View style={styles.imageContainer}>
      <Text>{item.fullName}</Text>
      <Image
        style={styles.image}
        source={{
          uri: item.imageUrl
        }}
      />
    </View>
  )
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
  imageContainer: {
    marginBottom: 10
  },
});
