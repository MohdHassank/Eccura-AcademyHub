import React, { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

interface MenuRowProps {
  icon: keyof typeof Feather.glyphMap | keyof typeof Ionicons.glyphMap;
  isIonicons?: boolean;
  title: string;
  subtitle: string;
  accentColor: string;
  onPress: () => void;
  showBadge?: boolean;
}

export default function ParentProfileScreen() {
  const router = useRouter();
  const [parentData, setParentData] = useState<any>(null);

  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const [childrenModalVisible, setChildrenModalVisible] = useState(false);

  const [linkedChildren, setLinkedChildren] = useState([]);

  const fetchParentProfile = async () => {

    try {

      const userString =
        await AsyncStorage.getItem("user");

      if (!userString) return;

      const user = JSON.parse(userString);

      const response = await axios.get(
        `http://192.168.29.49:5000/api/parent/profile/${user.id}`
      );

      if (response.data.success) {
        setParentData(response.data.parent);
      }

    } catch (error) {

      console.log(error);

    }

  };


  const fetchLinkedChildren = async () => {

    try {

      const userString =
        await AsyncStorage.getItem("user");

      if (!userString) return;

      const user = JSON.parse(userString);

      const response = await axios.get(
        `http://192.168.29.49:5000/api/parent/children/${user.id}`
      );

      if (response.data.success) {

        setLinkedChildren(
          response.data.children
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    fetchParentProfile();
    fetchLinkedChildren();
  }, []);

  // Reusable Option Component
  const MenuRowItem = ({ icon, isIonicons, title, subtitle, accentColor, onPress, showBadge }: MenuRowProps) => (
    <TouchableOpacity style={styles.menuRow} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.menuRowLeft}>
        <View style={[styles.iconContainerFrame, { backgroundColor: `${accentColor}10` }]}>
          {isIonicons ? (
            <Ionicons name={icon as any} size={18} color={accentColor} />
          ) : (
            <Feather name={icon as any} size={18} color={accentColor} />
          )}
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.menuTitle}>{title}</Text>
          <Text style={styles.menuSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.menuRowRight}>
        {showBadge && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>Primary</Text>
          </View>
        )}
        <Feather name="chevron-right" size={16} color="#94A3B8" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* HEADER NAVIGATION */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollCanvas}>

        {/* TOP AVATAR IDENTIFIER HERO CARD */}
        <View style={styles.avatarHeroCard}>
          <View style={styles.heroAvatarCircle}>
            <MaterialCommunityIcons name="account-tie" size={42} color="#6D28D9" />
          </View>
          <Text style={styles.heroParentName}>{parentData?.fullName || "Parent"}</Text>
        </View>

        {/* CORE PROFILE LIST FRAME */}
        <Text style={styles.sectionLabelTitle}>Profile Configuration</Text>
        <View style={styles.cardWrapper}>

          <MenuRowItem
            icon="user"
            title="Parent Profile"
            subtitle="Personal details, contact numbers & email"
            accentColor="#3B82F6"
            showBadge={true}
            onPress={() =>
              setProfileModalVisible(true)
            }
          />

          <MenuRowItem
            icon="users"
            title="Linked Student"
            subtitle={
              linkedChildren.length > 0
                ? `${linkedChildren.length} Linked Student  ${linkedChildren.length > 1 ? "" : ""}`
                : "No Student Linked"
            }
            accentColor="#6D28D9"
            onPress={() => setChildrenModalVisible(true)}
          />

          <MenuRowItem
            icon="help-circle"
            title="Contact Support"
            subtitle="Direct helpline desk, raise instant tickets"
            accentColor="#0D9488"
            onPress={() =>
              router.push("/parent/contact-support")
            }
          />

          <MenuRowItem
            icon="settings"
            title="Settings"
            subtitle="App preferences, alerts configuration & language"
            accentColor="#4B5563"
            onPress={() => Alert.alert('App Settings', 'System notifications toggles register parameters yahan hain.')}
          />

        </View>

        {/* SECURITY & DATA DOCK */}
        <Text style={styles.sectionLabelTitle}>Security & Privacy</Text>
        <View style={styles.cardWrapper}>
          <MenuRowItem
            icon="lock"
            title="Change Passcode"
            subtitle="Update security login parameters"
            accentColor="#64748B"
            onPress={() => { }}
          />
        </View>

        {/* ACCOUNT DEACTIVATION ACTION */}
        <TouchableOpacity
          style={styles.logoutButtonCta}
          activeOpacity={0.8}
          onPress={() => {

            Alert.alert(
              "Logout",
              "Are you sure you want to logout?",
              [
                {
                  text: "Cancel",
                  style: "cancel"
                },
                {
                  text: "Logout",
                  onPress: async () => {

                    await AsyncStorage.clear();

                    router.replace("/login");

                  }
                }
              ]
            );

          }}
        >
          <Feather name="log-out" size={16} color="#EF4444" style={{ marginRight: 8 }} />
          <Text style={styles.logoutCtaText}>Logout from Device</Text>
        </TouchableOpacity>

      </ScrollView>

      <Modal
        visible={profileModalVisible}
        transparent
        animationType="fade"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            padding: 20
          }}
        >
          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 20,
              padding: 20
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                marginBottom: 20
              }}
            >
              Parent Information
            </Text>

            <Text>Name</Text>
            <Text style={{ marginBottom: 12 }}>
              {parentData?.fullName}
            </Text>

            <Text>Email</Text>
            <Text style={{ marginBottom: 12 }}>
              {parentData?.email}
            </Text>

            <Text>Phone</Text>
            <Text style={{ marginBottom: 12 }}>
              {parentData?.phone || "Not Available"}
            </Text>

            <TouchableOpacity
              onPress={() =>
                setProfileModalVisible(false)
              }
            >
              <Text
                style={{
                  color: "#2563EB",
                  fontWeight: "700"
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      <Modal
        visible={childrenModalVisible}
        transparent
        animationType="fade"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            padding: 20
          }}
        >
          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 20,
              padding: 20
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                marginBottom: 20
              }}
            >
              Linked Children
            </Text>

            {linkedChildren.map((child: any) => (
              <View
                key={child.id}
                style={{
                  marginBottom: 12
                }}
              >
                <Text
                  style={{
                    fontWeight: "600"
                  }}
                >
                  {child.fullName}
                </Text>

                <Text>
                  {child.class_name}
                </Text>
              </View>
            ))}

            <TouchableOpacity
              onPress={() =>
                setChildrenModalVisible(false)
              }
            >
              <Text
                style={{
                  color: "#2563EB",
                  fontWeight: "700"
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFBFD' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#FFFFFF',
    borderBottomWidth: 1, borderBottomColor: '#F1F5F9'
  },
  backButton: {
    width: 38, height: 38, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0',
    justifyContent: 'center', alignItems: 'center'
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A' },

  // Canvas configuration
  scrollCanvas: { padding: 16, paddingBottom: 40 },

  // Top Hero Profile Badge
  avatarHeroCard: {
    backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20,
    alignItems: 'center', borderWidth: 1, borderColor: '#F1F5F9', marginBottom: 24,
    elevation: 2, shadowColor: '#0F172A', shadowOpacity: 0.02, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }
  },
  heroAvatarCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#F3E8FF', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  heroParentName: { fontSize: 17, fontWeight: '700', color: '#0F172A' },
  heroParentMeta: { fontSize: 11, color: '#94A3B8', marginTop: 4, fontWeight: '500' },

  // List Sections Base Settings
  sectionLabelTitle: { fontSize: 12, fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.5, paddingLeft: 4, marginBottom: 10 },
  cardWrapper: { backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 14, borderWidth: 1, borderColor: '#F1F5F9', marginBottom: 24 },

  // Individual Rows Structural Setup
  menuRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
  menuRowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 0.85 },
  iconContainerFrame: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  textBlock: { justifyContent: 'center' },
  menuTitle: { fontSize: 13, fontWeight: '600', color: '#1E293B' },
  menuSubtitle: { fontSize: 11, color: '#94A3B8', marginTop: 2, lineHeight: 14 },
  menuRowRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },

  // Custom badges details
  verifiedBadge: { backgroundColor: '#E6F4EA', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  verifiedText: { fontSize: 9, fontWeight: '700', color: '#137333', textTransform: 'uppercase' },

  // Logout CTA Component button
  logoutButtonCta: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#FFF5F5', borderWidth: 1, borderColor: '#FEE2E2',
    height: 46, borderRadius: 14, marginTop: 10
  },
  logoutCtaText: { color: '#EF4444', fontSize: 13, fontWeight: '700' }
});