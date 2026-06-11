import { Feather, FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function SignUpPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [securePass, setSecurePass] = useState(true);
  const [secureConfirmPass, setSecureConfirmPass] = useState(true);

  const [selectedRole, setSelectedRole] = useState("student");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!fullName.trim() || !email.trim() || !phone.trim() || !password || !confirmPassword) {
      Alert.alert("Registration Failed", "Please fill all the mandatory fields!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      Alert.alert("Invalid Email", "Please enter a valid email address!");
      return;
    }

    if (phone.trim().length < 10) {
      Alert.alert("Invalid Phone", "Please enter a valid 10-digit phone number!");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Security Restriction", "Password must be at least 6 characters long!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Security Mismatch", "Passwords do not match!");
      return;
    }

    if (!isAgreed) {
      Alert.alert("Policy Agreement Required", "You must agree to the Terms of Service!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://192.168.29.49:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            password,
            role: selectedRole,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        Alert.alert(
          "Success 🎉",
          data.message || "Account created successfully!",
          [
            {
              text: "OK",
              onPress: () => router.push("/login"),
            },
          ]
        );
      } else {
        Alert.alert(
          "Signup Failed",
          data.message || "Something went wrong."
        );
      }
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Network Error",
        "Unable to connect to backend server."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={20} color="#1E293B" />
        </TouchableOpacity>

        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Image source={require("../assets/images/logo.png")} style={styles.miniLogo} />
            <Text style={styles.mainTitle}>Create Your</Text>
            <Text style={[styles.mainTitle, { color: "#2563EB" }]}>Account</Text>
            <Text style={styles.subTitle}>Join Academy Hub and start your learning journey today!</Text>
          </View>
          <Image source={require("../assets/images/Signup-image.png")} style={styles.topIllustration} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Sign Up</Text>
          <Text style={styles.sectionSubTitle}>Fill in the details to create your account</Text>

          <Text style={styles.inputLabel}>Full Name</Text>
          <View style={styles.inputWrapper}>
            <Feather name="user" size={18} color="#94A3B8" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Enter your full name" placeholderTextColor="#94A3B8" value={fullName} onChangeText={setFullName} />
          </View>

          <Text style={styles.inputLabel}>Email Address</Text>
          <View style={styles.inputWrapper}>
            <Feather name="mail" size={18} color="#94A3B8" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Enter your email address" placeholderTextColor="#94A3B8" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
          </View>

          <Text style={styles.inputLabel}>Phone Number</Text>
          <View style={styles.inputWrapper}>
            <Feather name="phone" size={18} color="#94A3B8" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Enter your phone number" placeholderTextColor="#94A3B8" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
          </View>

          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={18} color="#94A3B8" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Create a password" placeholderTextColor="#94A3B8" secureTextEntry={securePass} value={password} onChangeText={setPassword} />
            <TouchableOpacity onPress={() => setSecurePass(!securePass)}>
              <Feather name={securePass ? "eye-off" : "eye"} size={18} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={18} color="#94A3B8" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Confirm your password" placeholderTextColor="#94A3B8" secureTextEntry={secureConfirmPass} value={confirmPassword} onChangeText={setConfirmPassword} />
            <TouchableOpacity onPress={() => setSecureConfirmPass(!secureConfirmPass)}>
              <Feather name={secureConfirmPass ? "eye-off" : "eye"} size={18} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>Select Role</Text>
          <View style={styles.roleContainer}>
            <TouchableOpacity style={[styles.roleCard, selectedRole === "student" && styles.activeRoleCard]} onPress={() => setSelectedRole("student")}>
              <View style={styles.roleHeaderRow}>
                <FontAwesome5 name="user-graduate" size={20} color={selectedRole === "student" ? "#2563EB" : "#94A3B8"} />
                <MaterialIcons name={selectedRole === "student" ? "radio-button-checked" : "radio-button-unchecked"} size={20} color={selectedRole === "student" ? "#2563EB" : "#CBD5E1"} />
              </View>
              <Text style={[styles.roleTitle, selectedRole === "student" && styles.activeRoleText]}>I'm a Student</Text>
              <Text style={styles.roleDesc}>Access learning materials and more</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.roleCard, selectedRole === "teacher" && styles.activeRoleCard]} onPress={() => setSelectedRole("teacher")}>
              <View style={styles.roleHeaderRow}>
                <FontAwesome5 name="chalkboard-teacher" size={18} color={selectedRole === "teacher" ? "#10B981" : "#94A3B8"} />
                <MaterialIcons name={selectedRole === "teacher" ? "radio-button-checked" : "radio-button-unchecked"} size={20} color={selectedRole === "teacher" ? "#2563EB" : "#CBD5E1"} />
              </View>
              <Text style={[styles.roleTitle, selectedRole === "teacher" && styles.activeRoleText]}>I'm a Teacher</Text>
              <Text style={styles.roleDesc}>Teach and manage your classes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.roleCard, selectedRole === "guardian" && styles.activeRoleCard]} onPress={() => setSelectedRole("guardian")}>
              <View style={styles.roleHeaderRow}>
                <FontAwesome5 name="users" size={18} color={selectedRole === "guardian" ? "#7C3AED" : "#94A3B8"} />
                <MaterialIcons name={selectedRole === "guardian" ? "radio-button-checked" : "radio-button-unchecked"} size={20} color={selectedRole === "guardian" ? "#2563EB" : "#CBD5E1"} />
              </View>
              <Text style={[styles.roleTitle, selectedRole === "guardian" && styles.activeRoleText]}>I'm a Guardian</Text>
              <Text style={styles.roleDesc}>Monitor and support child's learning</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.checkboxRow} activeOpacity={0.8} onPress={() => setIsAgreed(!isAgreed)}>
            <Feather name={isAgreed ? "check-square" : "square"} size={20} color={isAgreed ? "#2563EB" : "#94A3B8"} />
            <Text style={styles.checkboxText}>
              I agree to the <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.submitButton,
              isLoading && { backgroundColor: "#93C5FD" },
            ]}
            activeOpacity={0.9}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>
                Create Account
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or sign up with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <Ionicons name="logo-google" size={18} color="#EA4335" />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <Ionicons name="logo-apple" size={20} color="#000000" style={{ marginTop: -2 }} />
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <FontAwesome name="facebook-official" size={18} color="#1877F2" />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.footerLink}>Login</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 40 },
  backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center", marginTop: 12, borderWidth: 1, borderColor: "#F1F5F9", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 15, marginBottom: 10 },
  headerLeft: { flex: 1, paddingRight: 5 },
  miniLogo: { width: 150, height: 100, resizeMode: "contain", marginLeft: -7, marginBottom: -28, marginTop: -13 },
  mainTitle: { fontSize: 28, fontWeight: "800", color: "#1E293B", lineHeight: 34, marginTop: 5 },
  subTitle: { fontSize: 12, color: "#64748B", marginTop: 6, lineHeight: 16 },
  topIllustration: { width: 140, height: 140, resizeMode: "contain" },
  formContainer: { backgroundColor: "#FFFFFF", borderRadius: 24, padding: 20, shadowColor: "#0F172A", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 16, elevation: 2 },
  sectionTitle: { fontSize: 20, fontWeight: "700", color: "#1E293B" },
  sectionSubTitle: { fontSize: 13, color: "#64748B", marginTop: 2, marginBottom: 15 },
  inputLabel: { fontSize: 13, fontWeight: "600", color: "#1E293B", marginBottom: 6, marginTop: 12 },
  inputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 12, paddingHorizontal: 14, height: 50 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: "#1E293B", fontSize: 14 },
  roleContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 5, gap: 8 },
  roleCard: { flex: 1, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 12, padding: 10, minHeight: 100 },
  activeRoleCard: { borderColor: "#2563EB", backgroundColor: "#F0F5FF" },
  roleHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  roleTitle: { fontSize: 12, fontWeight: "700", color: "#475569" },
  activeRoleText: { color: "#2563EB" },
  roleDesc: { fontSize: 9, color: "#64748B", marginTop: 2, lineHeight: 12 },
  checkboxRow: { flexDirection: "row", alignItems: "center", marginTop: 15, paddingRight: 10 },
  checkboxText: { fontSize: 12, color: "#64748B", marginLeft: 8, lineHeight: 16 },
  linkText: { color: "#2563EB", fontWeight: "600" },
  submitButton: { backgroundColor: "#2563EB", height: 52, borderRadius: 12, justifyContent: "center", alignItems: "center", marginTop: 20, shadowColor: "#2563EB", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 3 },
  submitButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  dividerRow: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#E2E8F0" },
  dividerText: { fontSize: 12, color: "#94A3B8", paddingHorizontal: 10 },
  socialRow: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  socialButton: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 12, height: 46, gap: 6 },
  socialButtonText: { fontSize: 13, fontWeight: "600", color: "#334155" },
  footerRow: { flexDirection: "row", justifyContent: "center", marginTop: 25 },
  footerText: { fontSize: 14, color: "#64748B" },
  footerLink: { fontSize: 14, fontWeight: "700", color: "#2563EB" },
});