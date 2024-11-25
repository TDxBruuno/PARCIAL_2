import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const TeamDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { team } = route.params;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTeam, setEditedTeam] = useState({
    name: team.name,
    description: team.description,
    goals: String(team.goals),
    points: String(team.points),
    logo: team.logo,
  });

  // Maneja la actualización del equipo
  const handleSaveEdit = () => {
    if (
      !editedTeam.name ||
      !editedTeam.description ||
      !editedTeam.goals ||
      !editedTeam.points ||
      !editedTeam.logo
    ) {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }

    const updatedTeam = {
      ...team,
      name: editedTeam.name,
      description: editedTeam.description,
      goals: Number(editedTeam.goals),
      points: Number(editedTeam.points),
      logo: editedTeam.logo,
    };

    fetch(`http://161.35.143.238:8000/bmendez/${team.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTeam),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar el equipo");
        }
        Alert.alert("Éxito", "Equipo actualizado exitosamente.");
        setIsEditing(false);
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error al actualizar:", error.message);
        Alert.alert("Error", "No se pudo actualizar el equipo.");
      });
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={editedTeam.name}
            onChangeText={(text) =>
              setEditedTeam((prev) => ({ ...prev, name: text }))
            }
          />
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={styles.input}
            value={editedTeam.description}
            onChangeText={(text) =>
              setEditedTeam((prev) => ({ ...prev, description: text }))
            }
          />
          <Text style={styles.label}>Goles</Text>
          <TextInput
            style={styles.input}
            value={editedTeam.goals}
            onChangeText={(text) =>
              setEditedTeam((prev) => ({ ...prev, goals: text }))
            }
            keyboardType="numeric"
          />
          <Text style={styles.label}>Puntos</Text>
          <TextInput
            style={styles.input}
            value={editedTeam.points}
            onChangeText={(text) =>
              setEditedTeam((prev) => ({ ...prev, points: text }))
            }
            keyboardType="numeric"
          />
          <Text style={styles.label}>Logo</Text>
          <TextInput
            style={styles.input}
            value={editedTeam.logo}
            onChangeText={(text) =>
              setEditedTeam((prev) => ({ ...prev, logo: text }))
            }
          />
          <Button title="Guardar Cambios" onPress={handleSaveEdit} />
          <Button
            title="Cancelar"
            onPress={() => setIsEditing(false)}
            color="red"
          />
        </>
      ) : (
        <>
          <Text style={styles.title}>{team.name}</Text>
          <Text style={styles.text}>Descripción: {team.description}</Text>
          <Text style={styles.text}>Goles: {team.goals}</Text>
          <Text style={styles.text}>Puntos: {team.points}</Text>
          <Button title="Editar" onPress={() => setIsEditing(true)} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
});

export default TeamDetails;
