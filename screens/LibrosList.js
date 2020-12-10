
import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const LibrosList = (props) => {
    const [libros, setLibros] = useState([]);

    useEffect(() => {
      firebase.db.collection("libros").onSnapshot((querySnapshot) => {
        const libros = [];
        querySnapshot.docs.forEach((doc) => {
          const { nombre, autor, categoria } = doc.data();
          libros.push({
            id: doc.id,
            nombre,
            autor,
            categoria,
          });
        });
        setLibros(libros);
      });
    }, []);
    return (
        <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateLibroScreen")}
        title="Agregar Libro"
      />
      {libros.map((libro) => {
        return (
          <ListItem
            key={libro.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("LibroDetailScreen", {
                libroId: libro.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>Titulo: {libro.nombre}</ListItem.Title>
              <ListItem.Subtitle>Nombre del Autor: {libro.autor}</ListItem.Subtitle>
              <ListItem.Subtitle>Categoria: {libro.categoria}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
    )
}

export default LibrosList
