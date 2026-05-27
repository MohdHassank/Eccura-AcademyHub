import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const myLogo = require("../assets/images/logo.png"); 
const mockupImage = require("../assets/images/Welcome-mockup.png");
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function LandingPage() {
  const router = useRouter();

  const slidesData = [
    { id: "1", title: "Secure & Reliable", desc: "Your data is always safe with us", icon: "🛡️", iconColor: "#137333", bgColor: "#E6F4EA" },
    { id: "2", title: "Smart & Efficient", desc: "AI-powered tools for better learning", icon: "🚀", iconColor: "#7C3AED", bgColor: "#F3E8FF" },
    { id: "3", title: "Connected Community", desc: "Students, teachers & parents in one place", icon: "👥", iconColor: "#EA580C", bgColor: "#FFEDD5" },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);

  const onViewRef = React.useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.logoContainer}>
          <Image source={myLogo} style={styles.actualLogo} />
        </View>

        <View style={styles.heroContainer}>
          <Text style={styles.mainHeading}>Smart Coaching.</Text>
          <Text style={[styles.mainHeading, { color: "#2563EB" }]}>Better Learning.</Text>
          <Text style={[styles.mainHeading, { color: "#10B981" }]}>Bigger Results.</Text>
        </View>

        <View style={styles.illustrationContainer}>
          <Image source={mockupImage} style={styles.mockupImage} />
        </View>

        <View style={styles.sliderWrapper}>
          <FlatList
            data={slidesData}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.slideCard}>
                <View style={[styles.iconCircle, { backgroundColor: item.bgColor }]}>
                  <Text style={{ fontSize: 22, color: item.iconColor }}>{item.icon}</Text>
                </View>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureDesc}>{item.desc}</Text>
              </View>
            )}
          />

          <View style={styles.paginationDotsContainer}>
            {slidesData.map((_, index) => {
              const isActive = index === activeIndex;
              return (
                <View key={index} style={[styles.dot, isActive ? styles.activeDot : styles.inactiveDot]} />
              );
            })}
          </View>
        </View>

        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.9} onPress={() => router.push("/signup")}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.alreadyText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FBFE" },
  scrollContent: { paddingHorizontal: 24, alignItems: "center", paddingBottom: 30 },
  logoContainer: { alignItems: "center", marginTop: 4, marginBottom: -49, width: "100%" },
  actualLogo: { width: 450, height: 200, resizeMode: "contain" },
  heroContainer: { alignItems: "center", marginBottom: 24 },
  mainHeading: { fontSize: 34, fontWeight: "800", textAlign: "center", letterSpacing: -0.8, lineHeight: 42, color: "#1E293B" },
  illustrationContainer: { width: "100%", height: 280, justifyContent: "center", alignItems: "center", marginBottom: 20 },
  mockupImage: { width: "100%", height: "100%", borderRadius: 24, resizeMode: "cover" },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#CBD5E1", marginHorizontal: 5 },
  activeDot: { width: 24, backgroundColor: "#2563EB" },
  inactiveDot: { width: 8, backgroundColor: "#CBD5E1" },
  primaryButton: { width: "100%", backgroundColor: "#2563EB", paddingVertical: 16, borderRadius: 16, alignItems: "center", shadowColor: "#2563EB", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 4 },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  loginRow: { flexDirection: "row", marginTop: 20 },
  alreadyText: { fontSize: 14, color: "#64748B" },
  loginLink: { fontSize: 14, fontWeight: "700", color: "#2563EB" },
  sliderWrapper: { width: "100%", alignItems: "center", marginVertical: 15 },
  slideCard: { width: SCREEN_WIDTH - 48, alignItems: "center", paddingHorizontal: 10 },
  iconCircle: { width: 50, height: 50, borderRadius: 25, justifyContent: "center", alignItems: "center", marginBottom: 10 },
  featureTitle: { fontSize: 16, fontWeight: "700", color: "#1E293B", textAlign: "center" },
  featureDesc: { fontSize: 13, color: "#64748B", textAlign: "center", marginTop: 4, lineHeight: 18 },
  paginationDotsContainer: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 15, marginBottom: 15 },
});