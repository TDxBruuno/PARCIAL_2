import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "⚽EQUIPOS PARTICIPANTES⚽" }}
      />
      <Stack.Screen
        name="TeamDetails"
        options={{ title: "Detalles del Equipo" }}
      />
      <Stack.Screen
        name="AddTeamForm"
        options={{ title: "Agregar Equipo" }}
      />
    </Stack>
  );
}
