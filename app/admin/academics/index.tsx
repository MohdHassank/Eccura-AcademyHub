// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRouter } from 'expo-router';
// import {
//   GraduationCap,
//   Users,
//   Layers,
//   BookOpen,
//   ArrowRight,
//   ChevronRight,
//   School,
//   FlaskConical,
//   Clock,
//   Calendar,
//   MapPin,
//   FileText,
//   HelpCircle,
//   Scroll,
//   Video,
//   BarChart3,
// } from 'lucide-react-native';
// import AdminHeader from '@/components/AdminHeader';
// import SectionHeader from '@/components/SectionHeader';

// const academicModules = [
//   {
//     title: 'Faculty Management',
//     description: 'Manage teachers, salaries, performance and timetables',
//     icon: Users,
//     color: '#6366F1',
//     bgColor: '#EEF2FF',
//     route: '/academics/faculty',
//   },
//   {
//     title: 'Batch & Classes',
//     description: 'Organize batches, allocate classrooms and manage schedules',
//     icon: Layers,
//     color: '#10B981',
//     bgColor: '#ECFDF5',
//     route: '/academics/batches',
//   },
//   {
//     title: 'Content Control',
//     description: 'Manage notes, quizzes, papers and video content',
//     icon: BookOpen,
//     color: '#F59E0B',
//     bgColor: '#FFF7ED',
//     route: '/academics/content',
//   },
// ];

// const quickLinks = [
//   { title: 'Timetable', icon: Calendar, color: '#6366F1', bgColor: '#EEF2FF' },
//   { title: 'Classrooms', icon: School, color: '#10B981', bgColor: '#ECFDF5' },
//   { title: 'Subjects', icon: FlaskConical, color: '#F59E0B', bgColor: '#FFF7ED' },
//   { title: 'Attendance', icon: Clock, color: '#8B5CF6', bgColor: '#F5F3FF' },
// ];

// export default function AcademicsMenuScreen() {
//   const router = useRouter();

//   return (
//     <SafeAreaView style={styles.container} edges={['top']}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <AdminHeader
//           title="Academics"
//           subtitle="Manage academic operations and faculty"
//           notificationCount={4}
//         />

//         {/* Hero */}
//         <View style={styles.heroSection}>
//           <View style={styles.heroLeft}>
//             <Text style={styles.heroTitle}>Academic Operations</Text>
//             <Text style={styles.heroSubtitle}>
//               Manage faculty, batches, schedules and academic content in one place.
//             </Text>
//           </View>
//           <View style={styles.heroRight}>
//             <View style={styles.heroIconBg}>
//               <GraduationCap size={48} color="#6366F1" />
//             </View>
//           </View>
//         </View>

//         {/* Quick Links */}
//         <SectionHeader title="Quick Links" />
//         <View style={styles.quickLinksRow}>
//           {quickLinks.map((link, index) => (
//             <TouchableOpacity key={index} style={styles.quickLinkCard}>
//               <View style={[styles.quickLinkIconBg, { backgroundColor: link.bgColor }]}>
//                 <link.icon size={22} color={link.color} />
//               </View>
//               <Text style={styles.quickLinkTitle}>{link.title}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Main Modules */}
//         <SectionHeader title="Academic Modules" />
//         {academicModules.map((module, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.moduleCard}
//             onPress={() => router.push(module.route as any)}
//             activeOpacity={0.8}
//           >
//             <View style={styles.moduleLeft}>
//               <View style={[styles.moduleIconBg, { backgroundColor: module.bgColor }]}>
//                 <module.icon size={26} color={module.color} />
//               </View>
//             </View>
//             <View style={styles.moduleMiddle}>
//               <Text style={styles.moduleTitle}>{module.title}</Text>
//               <Text style={styles.moduleDescription} numberOfLines={2}>
//                 {module.description}
//               </Text>
//             </View>
//             <View style={styles.moduleRight}>
//               <View style={[styles.moduleArrow, { borderColor: module.color }]}>
//                 <ArrowRight size={16} color={module.color} />
//               </View>
//             </View>
//           </TouchableOpacity>
//         ))}

//         {/* Academic Stats */}
//         <SectionHeader title="Academic Overview" />
//         <View style={styles.statsGrid}>
//           <View style={styles.statCard}>
//             <Text style={styles.statValue}>52</Text>
//             <Text style={styles.statLabel}>Total Faculty</Text>
//           </View>
//           <View style={styles.statCard}>
//             <Text style={styles.statValue}>24</Text>
//             <Text style={styles.statLabel}>Total Batches</Text>
//           </View>
//           <View style={styles.statCard}>
//             <Text style={styles.statValue}>36</Text>
//             <Text style={styles.statLabel}>Classrooms</Text>
//           </View>
//           <View style={styles.statCard}>
//             <Text style={styles.statValue}>58</Text>
//             <Text style={styles.statLabel}>Subjects</Text>
//           </View>
//         </View>

//         <View style={styles.bottomSpacer} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8FAFC',
//   },
//   scrollContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   heroSection: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 24,
//     padding: 20,
//     marginBottom: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   heroLeft: {
//     flex: 1,
//     paddingRight: 16,
//   },
//   heroTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginBottom: 6,
//   },
//   heroSubtitle: {
//     fontSize: 13,
//     color: '#64748B',
//     lineHeight: 18,
//   },
//   heroRight: {
//     width: 80,
//     height: 80,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   heroIconBg: {
//     width: 72,
//     height: 72,
//     borderRadius: 20,
//     backgroundColor: '#EEF2FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   quickLinksRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 12,
//     marginBottom: 24,
//   },
//   quickLinkCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 16,
//     width: (Dimensions.get('window').width - 64) / 2,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   quickLinkIconBg: {
//     width: 48,
//     height: 48,
//     borderRadius: 14,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   quickLinkTitle: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#1E293B',
//     textAlign: 'center',
//   },
//   moduleCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 20,
//     marginBottom: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   moduleLeft: {
//     marginRight: 16,
//   },
//   moduleIconBg: {
//     width: 56,
//     height: 56,
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   moduleMiddle: {
//     flex: 1,
//   },
//   moduleTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginBottom: 4,
//   },
//   moduleDescription: {
//     fontSize: 13,
//     color: '#64748B',
//     lineHeight: 18,
//   },
//   moduleRight: {
//     marginLeft: 8,
//   },
//   moduleArrow: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     borderWidth: 1.5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   statsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 12,
//   },
//   statCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 16,
//     flex: 1,
//     minWidth: 140,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   statValue: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#64748B',
//   },
//   bottomSpacer: {
//     height: 20,
//   },
// });
