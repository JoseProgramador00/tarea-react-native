import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import firebase from "../database/firebase";

const LibroDetailScreen = (props) => {
  const initialState = {
    id: "",
    nombre: "",
    autor: "",
    categoria: "",
  };

  const [libro, setLibro] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setLibro({ ...libro, [prop]: value });
  };

  const getLibroById = async (id) => {
    const dbRef = firebase.db.collection("libros").doc(id);
    const doc = await dbRef.get();
    const libro = doc.data();
    setLibro({ ...libro, id: doc.id });
    setLoading(false);
  };

  const deleteLibro = async () => {
    setLoading(true);
    const dbRef = firebase.db
      .collection("libros")
      .doc(props.route.params.libroId);
    await dbRef.delete();
    setLoading(false);
    props.navigation.navigate("LibrosList");
  };



  const updateLibro = async () => {
    const libroRef = firebase.db.collection("libros").doc(libro.id);
    await libroRef.set({
      nombre: libro.nombre,
      autor: libro.autor,
      categoria: libro.categoria,
    });
    setLibro(initialState);
    props.navigation.navigate("LibrosList");
  };

  useEffect(() => {
    getLibroById(props.route.params.libroId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Nombre"
          autoCompleteType="bookname"
          style={styles.inputGroup}
          value={libro.nombre}
          onChangeText={(value) => handleTextChange(value, "nombre")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Autor"
          autoCompleteType="aut"
          style={styles.inputGroup}
          value={libro.autor}
          onChangeText={(value) => handleTextChange(value, "autor")}
        />
      </View>
      <View>
        <TextInput
          placeholder="categoria"
          autoCompleteType="catego"
          style={styles.inputGroup}
          value={libro.categoria}
          onChangeText={(value) => handleTextChange(value, "categoria")}
        />
      </View>
      <View style={styles.btn}>
        <Button title="Borrar" onPress={() => deleteLibro()} color="#E37399" />
      </View>
      <View>
        <Button title="Actualisar" onPress={() => updateLibro()} color="#19AC52" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default LibroDetailScreen;
