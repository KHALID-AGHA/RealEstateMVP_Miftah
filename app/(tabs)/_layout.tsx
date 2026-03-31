import { Tabs } from "expo-router";
import React from "react";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image } from "expo-image";
import { Compass, Home, MapIcon, PlusSquare } from "lucide-react-native";
import { Text, View } from "react-native";
import { Colors } from "@/constants/theme";

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "light";
    const theme = Colors[colorScheme];
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.tint }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Miftah",
          tabBarIcon: ({ color }) => <Home color={color} />,
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/Miftah_logo.jpg")}
                style={{ width: 40, height: 40, borderRadius: 6 }}
                contentFit="contain"
                alt="Miftah Logo"
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginLeft: 10,
                  color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
                }}
              >
                Miftah
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => <Compass color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => <MapIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Add",
          tabBarIcon: ({ color }) => <PlusSquare color={color} />,
        }}
      />
    </Tabs>
  );
}
