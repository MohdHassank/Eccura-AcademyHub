// import { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Image,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { User, Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react-native';

// export default function LoginScreen() {
//   const router = useRouter();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleLogin = () => {
//     router.replace('/(admin)');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardView}
//       >
//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           {/* Logo */}
//           <View style={styles.logoContainer}>
//             <View style={styles.logoWrapper}>
//               <View style={styles.logoIcon}>
//                 <Text style={styles.logoLetter}>A</Text>
//               </View>
//               <Text style={styles.logoText}>
//                 Academy<Text style={styles.logoTextHighlight}>Hub</Text>
//               </Text>
//             </View>
//           </View>

//           {/* Illustration */}
//           <View style={styles.illustrationContainer}>
//             <View style={styles.illustrationCircle}>
//               <ShieldCheck size={64} color="#6366F1" />
//             </View>
//           </View>

//           {/* Title */}
//           <Text style={styles.title}>Admin Login</Text>
//           <Text style={styles.subtitle}>
//             Welcome back! Please login to access the admin dashboard.
//           </Text>

//           {/* Form */}
//           <View style={styles.formContainer}>
//             {/* Name Field */}
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Name</Text>
//               <View style={styles.inputWrapper}>
//                 <User size={20} color="#6366F1" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter your name"
//                   placeholderTextColor="#94A3B8"
//                   value={name}
//                   onChangeText={setName}
//                   autoCapitalize="words"
//                 />
//               </View>
//             </View>

//             {/* Email Field */}
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Email</Text>
//               <View style={styles.inputWrapper}>
//                 <Mail size={20} color="#6366F1" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter your email"
//                   placeholderTextColor="#94A3B8"
//                   value={email}
//                   onChangeText={setEmail}
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                 />
//               </View>
//             </View>

//             {/* Password Field */}
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Password</Text>
//               <View style={styles.inputWrapper}>
//                 <Lock size={20} color="#6366F1" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter your password"
//                   placeholderTextColor="#94A3B8"
//                   value={password}
//                   onChangeText={setPassword}
//                   secureTextEntry={!showPassword}
//                 />
//                 <TouchableOpacity
//                   onPress={() => setShowPassword(!showPassword)}
//                   style={styles.eyeIcon}
//                 >
//                   {showPassword ? (
//                     <EyeOff size={20} color="#6366F1" />
//                   ) : (
//                     <Eye size={20} color="#6366F1" />
//                   )}
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Remember Me & Forgot Password */}
//             <View style={styles.optionsRow}>
//               <TouchableOpacity
//                 style={styles.rememberMeContainer}
//                 onPress={() => setRememberMe(!rememberMe)}
//               >
//                 <View
//                   style={[
//                     styles.checkbox,
//                     rememberMe && styles.checkboxChecked,
//                   ]}
//                 >
//                   {rememberMe && <Text style={styles.checkmark}>✓</Text>}
//                 </View>
//                 <Text style={styles.rememberMeText}>Remember me</Text>
//               </TouchableOpacity>
//               <TouchableOpacity>
//                 <Text style={styles.forgotPassword}>Forgot password?</Text>
//               </TouchableOpacity>
//             </View>

//             {/* Login Button */}
//             <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//               <Text style={styles.loginButtonText}>Login</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Footer */}
//           <View style={styles.footer}>
//             <Text style={styles.footerText}>
//               Secure access to your admin dashboard
//             </Text>
//             <ShieldCheck size={16} color="#6366F1" />
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8FAFC',
//   },
//   keyboardView: {
//     flex: 1,
//   },
//   scrollContent: {
//     flexGrow: 1,
//     paddingHorizontal: 24,
//     paddingTop: 40,
//     paddingBottom: 32,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: 32,
//   },
//   logoWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   logoIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     backgroundColor: '#6366F1',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   logoLetter: {
//     color: '#FFFFFF',
//     fontSize: 22,
//     fontWeight: '700',
//   },
//   logoText: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#1E293B',
//   },
//   logoTextHighlight: {
//     color: '#6366F1',
//   },
//   illustrationContainer: {
//     alignItems: 'center',
//     marginBottom: 32,
//   },
//   illustrationCircle: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: '#EEF2FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#1E293B',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#64748B',
//     textAlign: 'center',
//     marginBottom: 32,
//     lineHeight: 20,
//   },
//   formContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 24,
//     padding: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1E293B',
//     marginBottom: 8,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8FAFC',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#E2E8F0',
//     paddingHorizontal: 12,
//   },
//   inputIcon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     fontSize: 14,
//     color: '#1E293B',
//     paddingVertical: 14,
//   },
//   eyeIcon: {
//     padding: 4,
//   },
//   optionsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   rememberMeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   checkbox: {
//     width: 18,
//     height: 18,
//     borderRadius: 4,
//     borderWidth: 1.5,
//     borderColor: '#CBD5E1',
//     marginRight: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   checkboxChecked: {
//     backgroundColor: '#6366F1',
//     borderColor: '#6366F1',
//   },
//   checkmark: {
//     color: '#FFFFFF',
//     fontSize: 11,
//     fontWeight: '700',
//   },
//   rememberMeText: {
//     fontSize: 13,
//     color: '#64748B',
//   },
//   forgotPassword: {
//     fontSize: 13,
//     color: '#6366F1',
//     fontWeight: '600',
//   },
//   loginButton: {
//     backgroundColor: '#6366F1',
//     borderRadius: 12,
//     paddingVertical: 16,
//     alignItems: 'center',
//   },
//   loginButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   footer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 24,
//     gap: 6,
//   },
//   footerText: {
//     fontSize: 12,
//     color: '#94A3B8',
//   },
// });
