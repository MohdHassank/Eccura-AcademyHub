import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, 
        tabBarStyle: styles.tabBar,
      }}
    >
      {/* 1. PERFORMANCE TAB */}
      <Tabs.Screen
        name="Performance"
        options={{
          title: "Performance",
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <MaterialCommunityIcons
                name="chart-timeline-variant"
                size={24}
                color={focused ? "#00B686" : "#64748B"}
              />
              <Text numberOfLines={1} style={[styles.tabLabel, focused && styles.activeTabLabel]}>
                Perf.
              </Text>
            </View>
          ),
        }}
      />

      {/* 2. COMMUNICATION TAB */}
      <Tabs.Screen
        name="Communication"
        options={{
          title: "Communication",
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <MaterialCommunityIcons
                name="message-text-outline"
                size={22}
                color={focused ? "#00B686" : "#64748B"}
              />
              <Text numberOfLines={1} style={[styles.tabLabel, focused && styles.activeTabLabel]}>
                Comm.
              </Text>
            </View>
          ),
        }}
      />

      {/* 3. CENTER HOME TAB */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? "#00B686" : "#64748B"}
              />
              <Text numberOfLines={1} style={[styles.tabLabel, focused && styles.activeTabLabel]}>
                Home
              </Text>
            </View>
          ),
        }}
      />

      {/* 4. FEES TAB */}
      <Tabs.Screen
        name="Fees"
        options={{
          title: "Fees",
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Ionicons
                name="wallet-outline"
                size={22}
                color={focused ? "#00B686" : "#64748B"}
              />
              <Text numberOfLines={1} style={[styles.tabLabel, focused && styles.activeTabLabel]}>
                Fees
              </Text>
            </View>
          ),
        }}
      />

      {/* 5. PROFILE TAB */}
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Feather
                name="user"
                size={22}
                color={focused ? "#00B686" : "#64748B"}
              />
              <Text numberOfLines={1} style={[styles.tabLabel, focused && styles.activeTabLabel]}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

// ============== PREMIUM BOTTOM-FIXED STYLING ==============
const styles = StyleSheet.create({
  tabBar: {
    // position: "absolute",
    bottom: 6, // Bottom space ko khatam kiya taaki peeche ka background na jhaanke
    left: 0,   // Full width edge-to-edge layout
    right: 0,  // Full width edge-to-edge layout
    backgroundColor: "#FFFFFF",
    height: Platform.OS === "ios" ? 88 : 68, // iOS ke safe area notch ke liye extra height
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0", // Premium subtle top divider line
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: Platform.OS === "ios" ? 22 : 8, // Device navigation bar ke upar safe text placement
    // Soft standard top shadow shadow
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  tabLabel: {
    fontSize: 12, // Ekdum sahi readable font size
    fontWeight: "600", // Solid Premium Bold text
    color: "#64748B",
    marginTop: 4,
    textAlign: "center",
    width: "100%",
  },
  activeTabLabel: {
    color: "#00B686",
    fontWeight: "700",
  },
});