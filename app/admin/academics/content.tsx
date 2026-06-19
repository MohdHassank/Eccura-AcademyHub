// import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRouter } from 'expo-router';
// import {
//   FileText,
//   HelpCircle,
//   Scroll,
//   Video,
//   ArrowRight,
//   FileCheck,
//   CircleHelp,
//   BookMarked,
//   PlayCircle,
// } from 'lucide-react-native';
// import AdminHeader from '@/components/AdminHeader';
// import SectionHeader from '@/components/SectionHeader';

// const contentModules = [
//   {
//     title: 'Notes Library',
//     description: 'Upload, organize and share study notes with students.',
//     count: '1,248',
//     countLabel: 'Notes',
//     icon: <FileText size={28} color="#6366F1" />,
//     iconBgColor: '#EEF2FF',
//     accentColor: '#6366F1',
//   },
//   {
//     title: 'Quiz Library',
//     description: 'Create, manage and organize quizzes for assessments.',
//     count: '532',
//     countLabel: 'Quizzes',
//     icon: <HelpCircle size={28} color="#10B981" />,
//     iconBgColor: '#ECFDF5',
//     accentColor: '#10B981',
//   },
//   {
//     title: 'Old Papers',
//     description: 'Store and manage old question papers for reference.',
//     count: '876',
//     countLabel: 'Papers',
//     icon: <Scroll size={28} color="#F59E0B" />,
//     iconBgColor: '#FFF7ED',
//     accentColor: '#F59E0B',
//   },
//   {
//     title: 'Video Management',
//     description: 'Upload, organize and manage educational videos.',
//     count: '324',
//     countLabel: 'Videos',
//     icon: <Video size={28} color="#8B5CF6" />,
//     iconBgColor: '#F5F3FF',
//     accentColor: '#8B5CF6',
//   },
// ];

// export default function ContentControlScreen() {
//   const router = useRouter();

//   return (
//     <SafeAreaView style={styles.container} edges={['top']}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <AdminHeader
//           title="Content Control"
//           subtitle="Manage and organize academic content"
//           notificationCount={8}
//         />

//         {/* Content Module Cards */}
//         {contentModules.map((module, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.contentCard}
//             activeOpacity={0.8}
//           >
//             <View style={styles.contentLeft}>
//               <View style={[styles.contentIconBg, { backgroundColor: module.iconBgColor }]}>
//                 {module.icon}
//               </View>
//             </View>
//             <View style={styles.contentMiddle}>
//               <Text style={[styles.contentTitle, { color: module.accentColor }]}>
//                 {module.title}
//               </Text>
//               <Text style={styles.contentDescription} numberOfLines={2}>
//                 {module.description}
//               </Text>
//               <View style={styles.contentCountRow}>
//                 <View style={[styles.countIconBg, { backgroundColor: module.iconBgColor }]}>
//                   {module.icon}
//                 </View>
//                 <Text style={[styles.contentCount, { color: module.accentColor }]}>
//                   {module.count} {module.countLabel}
//                 </Text>
//               </View>
//             </View>
//             <View style={styles.contentRight}>
//               <View style={[styles.contentArrowBg, { backgroundColor: module.iconBgColor }]}>
//                 <ArrowRight size={18} color={module.accentColor} />
//               </View>
//             </View>
//           </TouchableOpacity>
//         ))}

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
//   contentCard: {
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
//   contentLeft: {
//     marginRight: 16,
//   },
//   contentIconBg: {
//     width: 64,
//     height: 64,
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   contentMiddle: {
//     flex: 1,
//   },
//   contentTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     marginBottom: 6,
//   },
//   contentDescription: {
//     fontSize: 13,
//     color: '#64748B',
//     lineHeight: 18,
//     marginBottom: 10,
//   },
//   contentCountRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//   },
//   countIconBg: {
//     width: 24,
//     height: 24,
//     borderRadius: 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   contentCount: {
//     fontSize: 13,
//     fontWeight: '600',
//   },
//   contentRight: {
//     marginLeft: 8,
//   },
//   contentArrowBg: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   bottomSpacer: {
//     height: 20,
//   },
// });
