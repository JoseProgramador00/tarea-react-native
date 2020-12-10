import React, {useState} from 'react';
import {Button,
    View,
    StyleSheet,
    TextInput,
    ScrollView} from 'react-native';
    import firebase from '../database/firebase';

const CreateLibroScreen = (props) => {
  const initalState = {
    nombre:"",
    autor:"",
    categoria:"",
  }

  const [state, setState] = useState(initalState);
  const handleChangeText = (value, nombre) =>{
    setState({...state, [nombre]: value});
  };

  const saveNewBook = async() =>{
   if(state.nombre ===""){
    alert("porfavor escriba algo");
   }
   else{
     try{
       await firebase.db.collection("libros").add({
         nombre: state.nombre,
         autor: state.autor,
         categoria: state.categoria,

       });
       
       props.navigation.navigate("LibrosList");
     }catch(error){
       console.log(error)
     }
   }
  }

    return (
    <ScrollView style={styles.container}>
        
     <View style={styles.inputGroup}>
      <TextInput placeholder="nombre" 
      onChangeText={(value) => handleChangeText(value,"nombre")}
      value={state.nombre}/>
     </View>
     <View style={styles.inputGroup}>
      <TextInput placeholder="autor"
      onChangeText={(value) => handleChangeText(value,"autor")}
      value={state.autor}/>
     </View>
     <View style={styles.inputGroup}>
      <TextInput placeholder="categoria"
      onChangeText={(value)=> handleChangeText(value,"categoria")}
      value={state.categoria}/>
     </View>
     <View style={styles.button}>
        <Button title="Guardar libro" onPress={() => saveNewBook()} />
      </View>
    </ScrollView>
    )
}

const styles  = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
      },
      inputGroup:{
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc", 
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
      
})

export default CreateLibroScreen
