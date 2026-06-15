import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ProfileScreen() {

  const router = useRouter();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");

      router.replace("/login");
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

const handleProfileUpdate = async () => {
  try {
    const response = await fetch(
      `http://192.168.29.49:5000/api/auth/profile/${user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: editName,
          email: editEmail,
          phone: editPhone,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      const updatedUser = {
        ...user,
        fullName: editName,
        email: editEmail,
        phone: editPhone,
      };

      await AsyncStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);

      setModalVisible(false);

      Alert.alert(
        "Success 🎉",
        "Profile updated successfully"
      );
    } else {
      Alert.alert(
        "Error",
        data.message
      );
    }
  } catch (error) {
    console.log(error);

    Alert.alert(
      "Network Error",
      "Unable to connect to server"
    );
  }
};

  const loadUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.log("User Load Error:", error);
    }
  };
  const [user, setUser] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");

  // Mock User Analytics (Engagement Metrics)
  const userStats = [
    { id: "s1", label: "Global Rank", value: "#12", icon: "trophy", color: "#FBBF24" },
    { id: "s2", label: "Total XP", value: "11,230", icon: "lightning-bolt", color: "#7C3AED" },
    { id: "s3", label: "Attendance", value: "92%", icon: "calendar-check", color: "#10B981" },
  ];

  // Menu Options Array
  const menuItems = [
    { id: "m1", title: "My Certificates", icon: "award", color: "#3B82F6", type: "link" },
    { id: "m2", title: "Academic Performance", icon: "trending-up", color: "#10B981", type: "link" },
    { id: "m3", title: "Fee Receipts & History", icon: "credit-card", color: "#F59E0B", type: "link" },
    { id: "m4", title: "Saved Notes & Papers", icon: "bookmark", color: "#EC4899", type: "link" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* ================= HEADER CUSTOM ================= */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton}>
          <Feather name="chevron-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            setEditName(user?.fullName || "");
            setEditEmail(user?.email || "");
            setEditPhone(user?.phone || "");
            setModalVisible(true);
          }}
        >
          <Feather name="edit-3" size={18} color="#4F46E5" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>

        {/* ================= HERO PROFILE CARD ================= */}
        <View style={styles.profileHeroSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
              }}
              style={styles.profileAvatar}
            />
            <TouchableOpacity style={styles.cameraBadgeButton}>
              <Feather name="camera" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userNameText}>
            {user?.fullName || "Loading..."}
          </Text>
          <Text style={styles.userMetaText}>
            {user?.role || "Student"}
          </Text>
          <Text style={styles.userRollText}>
            {user?.email || ""}
          </Text>

          {/* Quick Level Indicator */}
          <View style={styles.levelBadgePill}>
            <MaterialCommunityIcons name="shield-star" size={14} color="#4F46E5" />
            <Text style={styles.levelBadgeText}>Level 4 Advanced Scholar</Text>
          </View>
        </View>

        {/* ================= ENGAGEMENT STATS GRID ================= */}
        <View style={styles.statsFlexGridRow}>
          {userStats.map((stat) => (
            <View key={stat.id} style={styles.statMiniCard}>
              <View style={[styles.statIconCircle, { backgroundColor: `${stat.color}15` }]}>
                {stat.icon === "lightning-bolt" ? (
                  <MaterialCommunityIcons name={stat.icon} size={18} color={stat.color} />
                ) : (
                  <FontAwesome5 name={stat.icon} size={14} color={stat.color} />
                )}
              </View>
              <Text style={styles.statValueText}>{stat.value}</Text>
              <Text style={styles.statLabelText}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* ================= ACADEMIC UTILITIES LINKS ================= */}
        <View style={styles.menuSectionContainer}>
          <Text style={styles.menuSectionHeadingText}>Academic Center</Text>
          <View style={styles.menuCardBoxWrapper}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuRowItem,
                  index === menuItems.length - 1 && { borderBottomWidth: 0 }
                ]}
              >
                <View style={styles.menuRowLeftGroup}>
                  <View style={[styles.menuIconBox, { backgroundColor: `${item.color}10` }]}>
                    <Feather name={item.icon as any} size={16} color={item.color} />
                  </View>
                  <Text style={styles.menuItemTitleText}>{item.title}</Text>
                </View>
                <Feather name="chevron-right" size={16} color="#94A3B8" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ================= PREFERENCES / PRESETS ================= */}
        <View style={styles.menuSectionContainer}>
          <Text style={styles.menuSectionHeadingText}>Preferences</Text>
          <View style={styles.menuCardBoxWrapper}>
            {/* Dark Mode Toggle Switch Option */}
            <View style={styles.menuRowItem}>
              <View style={styles.menuRowLeftGroup}>
                <View style={[styles.menuIconBox, { backgroundColor: "#64748B10" }]}>
                  <Feather name="moon" size={16} color="#64748B" />
                </View>
                <Text style={styles.menuItemTitleText}>Dark Mode Preview</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={(val) => setIsDarkMode(val)}
                trackColor={{ false: "#CBD5E1", true: "#A5B4FC" }}
                thumbColor={isDarkMode ? "#4F46E5" : "#F4F3F4"}
              />
            </View>

            {/* Notification Control Menu Link */}
            <TouchableOpacity style={[styles.menuRowItem, { borderBottomWidth: 0 }]}>
              <View style={styles.menuRowLeftGroup}>
                <View style={[styles.menuIconBox, { backgroundColor: "#EF444410" }]}>
                  <Feather name="bell" size={16} color="#EF4444" />
                </View>
                <Text style={styles.menuItemTitleText}>Push Notifications</Text>
              </View>
              <Feather name="chevron-right" size={16} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= SIGN OUT ACCOUNT ACTION ================= */}
        <TouchableOpacity
          style={styles.logoutActionRowButton}
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={18} color="#EF4444" />
          <Text style={styles.logoutButtonText}>Sign Out Account</Text>
        </TouchableOpacity>

        {/* Version Footer Label */}
        <Text style={styles.appVersionFooterLabel}>v2.4.0 • Made with ❤️ for Students</Text>
      </ScrollView>
      <Modal
  visible={modalVisible}
  transparent
  animationType="slide"
>
  <View
    style={{
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "700",
          marginBottom: 20,
        }}
      >
        Edit Profile
      </Text>

      <TextInput
        value={editName}
        onChangeText={setEditName}
        placeholder="Full Name"
        style={styles.input}
      />

      <TextInput
        value={editEmail}
        onChangeText={setEditEmail}
        placeholder="Email"
        style={styles.input}
      />

      <TextInput
        value={editPhone}
        onChangeText={setEditPhone}
        placeholder="Phone"
        style={styles.input}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={styles.cancelBtn}
        >
          <Text style={{ color: "#fff" }}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleProfileUpdate}
          style={styles.saveBtn}
        >
          <Text style={{ color: "#fff" }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Light premium slate background
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: "#F8FAFC",
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },
  editButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
  },
  profileHeroSection: {
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 14,
  },
  profileAvatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  cameraBadgeButton: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#4F46E5",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  userNameText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  userMetaText: {
    fontSize: 13,
    color: "#475569",
    fontWeight: "600",
    marginTop: 4,
  },
  userRollText: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "500",
    marginTop: 2,
  },
  levelBadgePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 12,
    gap: 4,
    borderWidth: 1,
    borderColor: "#E0E7FF",
  },
  levelBadgeText: {
    fontSize: 11,
    color: "#4F46E5",
    fontWeight: "700",
  },
  statsFlexGridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 10,
  },
  statMiniCard: {
    width: "30.5%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  statIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValueText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },
  statLabelText: {
    fontSize: 10,
    color: "#64748B",
    fontWeight: "600",
    marginTop: 2,
  },
  menuSectionContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuSectionHeadingText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  menuCardBoxWrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    paddingHorizontal: 14,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  menuRowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
  },
  menuRowLeftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemTitleText: {
    fontSize: 13.5,
    fontWeight: "600",
    color: "#1E293B",
  },
  logoutActionRowButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEF2F2",
    marginHorizontal: 20,
    marginTop: 30,
    height: 48,
    borderRadius: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  logoutButtonText: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#EF4444",
  },
  appVersionFooterLabel: {
    textAlign: "center",
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "500",
    marginTop: 20,
  },
   input: {
  borderWidth: 1,
  borderColor: "#CBD5E1",
  borderRadius: 10,
  paddingHorizontal: 12,
  height: 50,
  marginBottom: 12,
},

saveBtn: {
  backgroundColor: "#2563EB",
  paddingHorizontal: 25,
  paddingVertical: 12,
  borderRadius: 10,
},

cancelBtn: {
  backgroundColor: "#EF4444",
  paddingHorizontal: 25,
  paddingVertical: 12,
  borderRadius: 10,
},
});