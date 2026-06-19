import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function LoginPage() {
  const router = useRouter();

  // Form States
  const [identifier, setIdentifier] = useState(""); // Email or Phone number
  const [password, setPassword] = useState("");
  const [securePass, setSecurePass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Commercial-Grade Authentication Validation
  const handleLogin = async () => {
    const trimmedIdentifier = identifier.trim();

    // 1. Mandatory Field Enforcement
    if (!trimmedIdentifier || !password) {
      Alert.alert("Authentication Failed", "Please fill in all mandatory fields.");
      return;
    }

    // 2. Multi-Format Validation Check (Regex Patterns)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    const isEmail = emailRegex.test(trimmedIdentifier);
    const isPhone = phoneRegex.test(trimmedIdentifier);

    if (!isEmail && !isPhone) {
      Alert.alert(
        "Invalid Input",
        "Please enter a valid email address or a 10-digit phone number.",
      );
      return;
    }

    // 3. Password Integrity Boundary Check
    if (password.length < 6) {
      Alert.alert(
        "Security Restriction",
        "Password must consist of at least 6 characters.",
      );
      return;
    }

    // 🚀 Start API Integration Logic Layer
    setIsLoading(true);

    try {
      const response = await fetch("http://192.168.29.49:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: trimmedIdentifier,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {

        await AsyncStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        console.log("Authenticated User Payload Data:", data.user);

        Alert.alert("Welcome Back! 🎉", data.message, [
          {
            text: "Let's Go",
            onPress: () => {

              if (data.user.role === "student") {
                router.replace("/(tabs)/home");
              }

              else if (data.user.role === "teacher") {
                router.replace("/teacher/home");
              }

             else if (data.user.role === "admin") {
                router.replace("/admin");
              }
              else if (
                data.user.role === "guardian" ||
                data.user.role === "parent"
              ) {
                router.replace("/parent/home");
              }

              else {
                router.replace("/(tabs)/home");
              }

            },
          },
        ]);
      } else {
        // Backend Validation Errors (User not found OR Invalid Password)
        Alert.alert("Login Failed ❌", data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Login Network Request Error:", error);
      Alert.alert(
        "Network Timeout 🌐",
        "Unable to talk to AcademyHub server. Check your system's IP endpoint connection!"
      );
    } finally {
      setIsLoading(false); // Turn off loader overlay
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* NATIVE BACK NAVIGATION HANDLER */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={20} color="#1E293B" />
        </TouchableOpacity>

        {/* ================= HERO GRAPHIC & LOGO HEADER ================= */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.miniLogo}
            />
            <Text style={styles.mainTitle}>
              Welcome <Text style={styles.accentText}>Back!</Text>
            </Text>
            <Text style={styles.subTitle}>
              Login to continue your learning journey with Academy Hub.
            </Text>
          </View>
          <Image
            source={require("../assets/images/Login-image.png")}
            style={styles.topIllustration}
          />
        </View>

        {/* ================= CENTRAL AUTH CARD CONTEXT ================= */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Login to your account</Text>
          <Text style={styles.sectionSubTitle}>Enter your details below</Text>

          {/* Identifier Input Box */}
          <Text style={styles.inputLabel}>Email / Phone Number</Text>
          <View style={styles.inputWrapper}>
            <Feather
              name="mail"
              size={18}
              color="#94A3B8"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your email or phone number"
              placeholderTextColor="#94A3B8"
              autoCapitalize="none"
              autoCorrect={false}
              value={identifier}
              onChangeText={setIdentifier}
            />
          </View>

          {/* Password Input Box */}
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            <Feather
              name="lock"
              size={18}
              color="#94A3B8"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#94A3B8"
              secureTextEntry={securePass}
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setSecurePass(!securePass)}>
              <Feather
                name={securePass ? "eye-off" : "eye"}
                size={18}
                color="#94A3B8"
              />
            </TouchableOpacity>
          </View>

          {/* FORGOT PASSWORD ANCHOR LINK */}
          <TouchableOpacity
            style={styles.forgotContainer}
            onPress={() =>
              Alert.alert(
                "Reset Route",
                "Password recovery sub-system linkage.",
              )
            }
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* PRIMARY EXECUTION GATEWAY */}
          {/* Import ActivityIndicator component from 'react-native' at top */}
          <TouchableOpacity
            style={[styles.submitButton, isLoading && { backgroundColor: "#93C5FD" }]}
            activeOpacity={0.9}
            onPress={handleLogin}
            disabled={isLoading} // Anti-spam block
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          {/* OAUTH SECTION SPLITTER */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* IMMUTABLE BRAND INTEGRITY LOGOS */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <Ionicons name="logo-google" size={18} color="#EA4335" />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <Ionicons
                name="logo-apple"
                size={20}
                color="#000000"
                style={{ marginTop: -2 }}
              />
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <FontAwesome name="facebook-official" size={18} color="#1877F2" />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
          </View>

          {/* CROSS NAVIGATION BOUNDARY */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/signup")}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ================= ARCHITECTURAL LAYOUT & STYLESHEET =================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 15,
  },
  headerLeft: {
    flex: 1,
    paddingRight: 10,
  },
  miniLogo: {
    width: 150,
    height: 100,
    resizeMode: "contain",
    marginLeft: -7,
    marginBottom: -28,
    marginTop: -13,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E293B",
    lineHeight: 34,
    marginTop: 5,
  },
  accentText: {
    color: "#2563EB",
  },
  subTitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 8,
    lineHeight: 18,
  },
  topIllustration: {
    width: 135,
    height: 135,
    resizeMode: "contain",
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
  },
  sectionSubTitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 6,
    marginTop: 14,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#1E293B",
    fontSize: 14,
  },
  forgotContainer: {
    alignSelf: "flex-end",
    marginTop: 12,
    marginBottom: 8,
  },
  forgotText: {
    color: "#2563EB",
    fontSize: 13,
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "#2563EB",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  dividerText: {
    fontSize: 12,
    color: "#94A3B8",
    paddingHorizontal: 10,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    height: 46,
    gap: 6,
  },
  socialButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  footerText: {
    fontSize: 14,
    color: "#64748B",
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2563EB",
  },
});
