import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

interface Game {
  id: string;
  name: string;
  description: string;
  goals: number;
  points: number;
  logo: string;
}

const FutbolGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorted, setSorted] = useState(false);
  const navigation = useNavigation();

  //me traigo los datos del back
  const fetchGames = async () => {
    setLoading(true);
    fetch("http://161.35.143.238:8000/bmendez")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error.message);
        setLoading(false);
        Alert.alert("Error", "No se pudieron obtener los planetas.");
      });
  };

  //uso useFocusEffect para que se actualice la lista de juegos cada vez que se entre a la pantalla
  useFocusEffect(
    useCallback(() => {
      fetchGames();
    }, [])
  );

  //funcion para ordenar los juegos por puntos
  const handleSortByPoints = () => {
    const sortedGames = [...games].sort((a, b) => b.points - a.points);
    setGames(sortedGames);
    setSorted(true);
  };

  //funcion para restablecer el orden original
  const handleResetOrder = () => {
    fetchGames();
    setSorted(false);
  };

    //funcion para eliminar un equipo
  const handleDeleteTeam = (id: string) => {
    fetch(`http://161.35.143.238:8000/bmendez/${id}`, {
      method: "DELETE",
    })
    .then(() => fetchGames())
      .catch((error) => {
        console.error("Delete error:", error.message);
        Alert.alert("Error", "No se pudo eliminar el Equipo.");
      });
    };

    if (loading) {
      return (
        <View style={styles.container}>
          <Text>Cargando...</Text>
        </View>
      );
    }

    return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddTeamForm" as never)}
        >
          <Text style={styles.addButtonText}>Agregar Equipo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sorted && styles.disabledButton]}
          onPress={handleSortByPoints}
          disabled={sorted}
        >
          <Text style={styles.sortButtonText}>Ordenar por Puntos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={handleResetOrder}>
          <Text style={styles.resetButtonText}>Restablecer</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.teamContainer}
            onPress={() =>
              navigation.navigate("TeamDetails" as never, { team: item } as never)
            }
          >
            <Text style={styles.teamName}>
              {item.name} - {item.points} puntos
            </Text>
            <Image source={{ uri: item.logo }} style={styles.teamImage} />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteTeam(item.id)}
            >
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sortButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: "#a5d6a7",
  },
  sortButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  resetButton: {
    backgroundColor: "#FF9800",
    padding: 10,
    borderRadius: 5,
  },
  resetButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  teamContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  teamName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  teamImage: {
    width: "100%",
    height: 150,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default FutbolGames;
