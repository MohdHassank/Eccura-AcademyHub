// app/index.tsx
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

const myLogo = require("../assets/images/logo.png"); // Agar assets folder root par hai toh path sahi dhyan rakhna
const mockupImage = require("../assets/images/Welcome-mockup.png");
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function LandingPage() {
  const router = useRouter();

  // 1. Slider ka features data array
  const slidesData = [
    {
      id: "1",
      title: "Secure & Reliable",
      desc: "Your data is always safe with us",
      icon: "🛡️",
      iconColor: "#137333",
      bgColor: "#E6F4EA",
    },
    {
      id: "2",
      title: "Smart & Efficient",
      desc: "AI-powered tools for better learning",
      icon: "🚀",
      iconColor: "#7C3AED",
      bgColor: "#F3E8FF",
    },
    {
      id: "3",
      title: "Connected Community",
      desc: "Students, teachers & parents in one place",
      icon: "👥",
      iconColor: "#EA580C",
      bgColor: "#FFEDD5",
    },
  ];

  // 2. State aur Refs slide active track karne ke liye
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onViewRef = React.useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <SafeAreaView style={styles.container}>
      {/* Phone ki status bar ko clean white rakhne ke liye */}
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ScrollView taaki chote phone par bhi design kategi nahi, user scroll kar sake */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= SECTION 1: LOGO ================= */}
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image source={myLogo} style={styles.actualLogo} />
        </View>

        {/* ================= SECTION 2: HERO TEXT ================= */}
        <View style={styles.heroContainer}>
          <Text style={styles.mainHeading}>Smart Coaching.</Text>
          <Text style={[styles.mainHeading, { color: "#2563EB" }]}>
            Better Learning.
          </Text>
          <Text style={[styles.mainHeading, { color: "#10B981" }]}>
            Bigger Results.
          </Text>
        </View>

        {/* ================= SECTION 3: CENTER GRAPHIC ================= */}
        <View style={styles.illustrationContainer}>
          {/* Aapke mockup jaisa vector placeholder */}
          <Image source={mockupImage} style={styles.mockupImage} />
        </View>

        {/* ================= SECTION 4: DYNAMIC SLIDER ================= */}
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
                <View
                  style={[styles.iconCircle, { backgroundColor: item.bgColor }]}
                >
                  <Text style={{ fontSize: 22, color: item.iconColor }}>
                    {item.icon}
                  </Text>
                </View>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureDesc}>{item.desc}</Text>
              </View>
            )}
          />

          {/* DYNAMIC PAGINATION DOTS */}
          <View style={styles.paginationDotsContainer}>
            {slidesData.map((_, index) => {
              const isActive = index === activeIndex;
              return (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    isActive ? styles.activeDot : styles.inactiveDot,
                  ]}
                />
              );
            })}
          </View>
        </View>

        {/* ================= SECTION 5: BUTTONS ================= */}
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.9}
          onPress={() => router.push("/signup")} // <--- Yeh ab aapko Sign Up page par bhejega
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.alreadyText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            {" "}
            {/* <--- Yeh Login page par bhejega */}
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ================= DESIGN STYLE SHEETS =================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FBFE", // Bilkul pure white aesthetic look jaisa figma me hai
  },
  scrollContent: {
    paddingHorizontal: 24,
    alignItems: "center",
    paddingBottom: 30,
  },
  logoContainer: {
    alignItems: "center", // Logo ko screen ke bilkul center (beech) mein laane ke liye
    marginTop: 4, // Upar se thoda gap dene ke liye
    marginBottom: -49, // Niche heading se thoda gap rakhne ke liye
    width: "100%",
  },
  actualLogo: {
    width: 450, // Isko aap 180 se 220 ke beech badal kar check kar sakte hain
    height: 200, // Width ke hisab se perfect height
    resizeMode: "contain", // Sabse zaroori! Isse image bina stretch hue box mein fit hoti hai
  },
  logoIconBg: {
    width: 38,
    height: 38,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    // Soft glow shadow effect
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  logoIconText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    fontStyle: "italic",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E293B",
    letterSpacing: -0.5,
  },
  heroContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  mainHeading: {
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.8,
    lineHeight: 42,
    color: "#1E293B",
  },
  subHeading: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    marginTop: 14,
    lineHeight: 22,
    paddingHorizontal: 15,
  },
  illustrationContainer: {
    width: "100%",
    height: 280,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  mockupImage: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
    resizeMode: "cover",
  },
  paginationDots: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 35,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#CBD5E1",
    marginHorizontal: 5,
  },
  activeDot: {
    width: 24, // Bada dash dot jaisa figma me hai
    backgroundColor: "#2563EB",
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#2563EB", // Perfect Blue
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  loginRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  alreadyText: {
    fontSize: 14,
    color: "#64748B",
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2563EB",
  },

  // ---> IN STYLES KO STYLESHEET KE ANDAR SABSE NICHE ADD KAREIN <---
  sliderWrapper: {
    width: "100%",
    alignItems: "center",
    marginVertical: 15,
  },
  slideCard: {
    width: SCREEN_WIDTH - 48, // Padding minus karke text ko beech me fit karega
    alignItems: "center",
    paddingHorizontal: 10,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    textAlign: "center",
  },
  featureDesc: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    marginTop: 4,
    lineHeight: 18,
  },
  paginationDotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: "#CBD5E1",
  },
});
