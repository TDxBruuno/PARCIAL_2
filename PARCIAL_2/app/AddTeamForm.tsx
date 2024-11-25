import React, {useState} from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddTeamForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goals, setGoals] = useState("");
  const [points, setPoints] = useState("");
  const [logo, setLogo] = useState("");
  const navigation = useNavigation();

 const handleAddTeam = () => {
    if (!name || !description || !goals || !points || !logo) {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }

    const newTeam = {
      name,
      description,
      goals: Number(goals),
      points: Number(points),
      logo,
    };

    fetch("http://161.35.143.238:8000/bmendez", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTeam),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al agregar el equipo");
        }
        Alert.alert("Éxito", "Equipo agregado exitosamente");
        navigation.goBack();
      })
      .catch((error) => {
        console.error(error.message);
        Alert.alert("Error", "No se pudo agregar el Equipo");
      });
    }
    
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nombre"
          />
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Descripción"
          />
          <TextInput
            style={styles.input}
            value={goals}
            onChangeText={setGoals}
            placeholder="Goles"
          />
          <TextInput
            style={styles.input}
            value={points}
            onChangeText={setPoints}
            placeholder="Puntos"
          />
          <TextInput
            style={styles.input}
            value={logo}
            onChangeText={setLogo}
            placeholder="Logo"
          />
          <Button title="Agregar Equipo" onPress={handleAddTeam} />
        </View>
      );
    };


const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  input: {
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 4,
  },
});

export default AddTeamForm;