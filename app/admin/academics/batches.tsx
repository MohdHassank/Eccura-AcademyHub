// import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRouter } from 'expo-router';
// import {
//   Calendar,
//   Users,
//   Layers,
//   School,
//   BookOpen,
//   ArrowRight,
//   ChevronDown,
//   ChevronRight,
//   MapPin,
//   Clock,
//   Sun,
//   Utensils,
//   Check,
// } from 'lucide-react-native';
// import AdminHeader from '@/components/AdminHeader';
// import SectionHeader from '@/components/SectionHeader';
// import QuickAccessCard from '@/components/QuickAccessCard';

// const timetableData = [
//   {
//     time: '09:00 AM - 10:00 AM',
//     icon: <Sun size={14} color="#F59E0B" />,
//     slots: [
//       { day: 'Mon', subject: 'Mathematics', teacher: 'Prof. Rahul Verma', room: 'Room 201', color: '#6366F1' },
//       { day: 'Tue', subject: 'Physics', teacher: 'Prof. Neha Sharma', room: 'Lab 2', color: '#10B981' },
//       { day: 'Wed', subject: 'Chemistry', teacher: 'Prof. Anjali Mehta', room: 'Lab 3', color: '#F59E0B' },
//       { day: 'Thu', subject: 'English', teacher: 'Prof. Priya Patel', room: 'Room 205', color: '#6366F1' },
//       { day: 'Fri', subject: 'Computer Science', teacher: 'Prof. Sandeep Singh', room: 'Lab 1', color: '#8B5CF6' },
//       { day: 'Sat', subject: 'Mathematics', teacher: 'Prof. Rahul Verma', room: 'Room 201', color: '#6366F1' },
//     ],
//   },
//   {
//     time: '10:00 AM - 11:00 AM',
//     icon: <Sun size={14} color="#F59E0B" />,
//     slots: [
//       { day: 'Mon', subject: 'English', teacher: 'Prof. Priya Patel', room: 'Room 205', color: '#6366F1' },
//       { day: 'Tue', subject: 'Mathematics', teacher: 'Prof. Rahul Verma', room: 'Room 201', color: '#6366F1' },
//       { day: 'Wed', subject: 'Physics', teacher: 'Prof. Neha Sharma', room: 'Lab 2', color: '#10B981' },
//       { day: 'Thu', subject: 'Computer Science', teacher: 'Prof. Sandeep Singh', room: 'Lab 1', color: '#8B5CF6' },
//       { day: 'Fri', subject: 'Chemistry', teacher: 'Prof. Anjali Mehta', room: 'Lab 3', color: '#F59E0B' },
//       { day: 'Sat', subject: 'English', teacher: 'Prof. Priya Patel', room: 'Room 205', color: '#6366F1' },
//     ],
//   },
//   {
//     time: '11:00 AM - 12:00 PM',
//     icon: <Sun size={14} color="#F59E0B" />,
//     slots: [
//       { day: 'Mon', subject: 'Chemistry', teacher: 'Prof. Anjali Mehta', room: 'Lab 3', color: '#F59E0B' },
//       { day: 'Tue', subject: 'English', teacher: 'Prof. Priya Patel', room: 'Room 205', color: '#6366F1' },
//       { day: 'Wed', subject: 'Mathematics', teacher: 'Prof. Rahul Verma', room: 'Room 201', color: '#6366F1' },
//       { day: 'Thu', subject: 'Physics', teacher: 'Prof. Neha Sharma', room: 'Lab 2', color: '#10B981' },
//       { day: 'Fri', subject: 'AI & ML', teacher: 'Prof. Vivek Patel', room: 'Lab 4', color: '#8B5CF6' },
//       { day: 'Sat', subject: 'Computer Science', teacher: 'Prof. Sandeep Singh', room: 'Lab 1', color: '#8B5CF6' },
//     ],
//   },
//   {
//     time: '12:00 PM - 01:00 PM',
//     icon: <Utensils size={14} color="#F59E0B" />,
//     slots: [
//       { day: 'Mon', subject: 'Lunch Break', teacher: '', room: '', color: '#F59E0B' },
//       { day: 'Tue', subject: 'Lunch Break', teacher: '', room: '', color: '#F59E0B' },
//       { day: 'Wed', subject: 'Lunch Break', teacher: '', room: '', color: '#F59E0B' },
//       { day: 'Thu', subject: 'Lunch Break', teacher: '', room: '', color: '#F59E0B' },
//       { day: 'Fri', subject: 'Lunch Break', teacher: '', room: '', color: '#F59E0B' },
//       { day: 'Sat', subject: 'Lunch Break', teacher: '', room: '', color: '#F59E0B' },
//     ],
//   },
// ];

// export default function BatchManagementScreen() {
//   const router = useRouter();

//   return (
//     <SafeAreaView style={styles.container} edges={['top']}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <AdminHeader
//           title="Batch & Class Management"
//           subtitle="Organize batches, allocate classes and manage academic flow"
//           notificationCount={4}
//         />

//         {/* Hero Section */}
//         <View style={styles.heroSection}>
//           <View style={styles.heroLeft}>
//             <View style={styles.heroIconBg}>
//               <School size={48} color="#6366F1" />
//             </View>
//           </View>
//           <View style={styles.heroRight}>
//             <Text style={styles.heroTitle}>Smarter Scheduling.</Text>
//             <Text style={styles.heroHighlight}>Better Learning.</Text>
//             <Text style={styles.heroSubtitle}>
//               Create batches, assign classrooms, map subjects and automate timetables with ease.
//             </Text>
//           </View>
//         </View>

//         {/* Manage Academic Structure */}
//         <SectionHeader title="Manage Academic Structure" />
//         <View style={styles.structureGrid}>
//           <QuickAccessCard
//             title="Timetable"
//             description="Create and manage class schedules effortlessly"
//             icon={<Calendar size={22} color="#6366F1" />}
//             iconBgColor="#EEF2FF"
//             accentColor="#6366F1"
//           />
//           <QuickAccessCard
//             title="Batch Creation"
//             description="Create new batches and organize students efficiently"
//             icon={<Users size={22} color="#10B981" />}
//             iconBgColor="#ECFDF5"
//             accentColor="#10B981"
//           />
//           <QuickAccessCard
//             title="Classroom Allocation"
//             description="Allocate classrooms to batches and manage capacity"
//             icon={<School size={22} color="#F59E0B" />}
//             iconBgColor="#FFF7ED"
//             accentColor="#F59E0B"
//           />
//           <QuickAccessCard
//             title="Subject Mapping"
//             description="Map subjects to batches and faculty seamlessly"
//             icon={<BookOpen size={22} color="#3B82F6" />}
//             iconBgColor="#DBEAFE"
//             accentColor="#3B82F6"
//           />
//         </View>

//         {/* Academic Summary */}
//         <View style={styles.academicSummaryCard}>
//           <Text style={styles.academicSummaryTitle}>Academic Summary</Text>
//           <View style={styles.academicSummaryItem}>
//             <View style={[styles.summaryIconBg, { backgroundColor: '#EEF2FF' }]}>
//               <Users size={18} color="#6366F1" />
//             </View>
//             <View style={styles.summaryInfo}>
//               <Text style={styles.summaryLabel}>Total Batches</Text>
//               <Text style={styles.summaryValue}>24</Text>
//             </View>
//             <ChevronRight size={18} color="#CBD5E1" />
//           </View>
//           <View style={styles.academicSummaryItem}>
//             <View style={[styles.summaryIconBg, { backgroundColor: '#ECFDF5' }]}>
//               <School size={18} color="#10B981" />
//             </View>
//             <View style={styles.summaryInfo}>
//               <Text style={styles.summaryLabel}>Total Classrooms</Text>
//               <Text style={styles.summaryValue}>36</Text>
//             </View>
//             <ChevronRight size={18} color="#CBD5E1" />
//           </View>
//           <View style={styles.academicSummaryItem}>
//             <View style={[styles.summaryIconBg, { backgroundColor: '#FFF7ED' }]}>
//               <BookOpen size={18} color="#F59E0B" />
//             </View>
//             <View style={styles.summaryInfo}>
//               <Text style={styles.summaryLabel}>Subjects Mapped</Text>
//               <Text style={styles.summaryValue}>58</Text>
//             </View>
//             <ChevronRight size={18} color="#CBD5E1" />
//           </View>
//           <View style={styles.academicSummaryItem}>
//             <View style={[styles.summaryIconBg, { backgroundColor: '#F5F3FF' }]}>
//               <Calendar size={18} color="#8B5CF6" />
//             </View>
//             <View style={styles.summaryInfo}>
//               <Text style={styles.summaryLabel}>Timetable Entries</Text>
//               <Text style={styles.summaryValue}>120</Text>
//             </View>
//             <ChevronRight size={18} color="#CBD5E1" />
//           </View>
//         </View>

//         {/* Weekly Timetable Snapshot */}
//         <View style={styles.timetableSection}>
//           <View style={styles.timetableHeader}>
//             <SectionHeader title="Weekly Timetable Snapshot" />
//             <TouchableOpacity style={styles.batchSelector}>
//               <Text style={styles.batchSelectorText}>Batch 11B</Text>
//               <ChevronDown size={14} color="#64748B" />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.timetableCard}>
//             {/* Header Row */}
//             <View style={styles.timetableHeaderRow}>
//               <View style={styles.timeHeaderCell}>
//                 <Text style={styles.timeHeaderText}>Time</Text>
//               </View>
//               {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
//                 <View key={day} style={styles.dayHeaderCell}>
//                   <Text style={styles.dayHeaderText}>{day}</Text>
//                 </View>
//               ))}
//             </View>
//             {/* Data Rows */}
//             {timetableData.map((row, rowIndex) => (
//               <View key={rowIndex} style={styles.timetableDataRow}>
//                 <View style={styles.timeCell}>
//                   <View style={styles.timeIconBg}>{row.icon}</View>
//                   <Text style={styles.timeText}>{row.time}</Text>
//                 </View>
//                 {row.slots.map((slot, slotIndex) => (
//                   <View
//                     key={slotIndex}
//                     style={[
//                       styles.slotCell,
//                       slot.subject === 'Lunch Break' && { backgroundColor: '#FFF7ED' },
//                     ]}
//                   >
//                     {slot.subject !== 'Lunch Break' ? (
//                       <>
//                         <Text style={[styles.slotSubject, { color: slot.color }]}>{slot.subject}</Text>
//                         <Text style={styles.slotTeacher}>{slot.teacher}</Text>
//                         <Text style={[styles.slotRoom, { color: slot.color }]}>{slot.room}</Text>
//                       </>
//                     ) : (
//                       <Text style={styles.lunchText}>Lunch Break</Text>
//                     )}
//                   </View>
//                 ))}
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* Keep Everything in Sync */}
//         <View style={styles.syncCard}>
//           <View style={styles.syncLeft}>
//             <View style={styles.syncIconBg}>
//               <Check size={24} color="#6366F1" />
//             </View>
//             <View>
//               <Text style={styles.syncTitle}>Keep everything in sync</Text>
//               <Text style={styles.syncSubtitle}>
//                 Manage schedules, rooms and subjects in one place for a smooth academic experience.
//               </Text>
//             </View>
//           </View>
//           <TouchableOpacity style={styles.syncButton}>
//             <Text style={styles.syncButtonText}>View Full Timetable</Text>
//             <ArrowRight size={14} color="#FFFFFF" />
//           </TouchableOpacity>
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
//     justifyContent: 'center',
//     marginRight: 16,
//   },
//   heroIconBg: {
//     width: 80,
//     height: 80,
//     borderRadius: 20,
//     backgroundColor: '#EEF2FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   heroRight: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   heroTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1E293B',
//   },
//   heroHighlight: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#6366F1',
//     marginBottom: 8,
//   },
//   heroSubtitle: {
//     fontSize: 13,
//     color: '#64748B',
//     lineHeight: 18,
//   },
//   structureGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 12,
//     marginBottom: 24,
//   },
//   academicSummaryCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 20,
//     marginBottom: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   academicSummaryTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginBottom: 16,
//   },
//   academicSummaryItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F1F5F9',
//   },
//   summaryIconBg: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   summaryInfo: {
//     flex: 1,
//   },
//   summaryLabel: {
//     fontSize: 13,
//     color: '#64748B',
//   },
//   summaryValue: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1E293B',
//   },
//   timetableSection: {
//     marginBottom: 24,
//   },
//   timetableHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   batchSelector: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderWidth: 1,
//     borderColor: '#E2E8F0',
//   },
//   batchSelectorText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#1E293B',
//   },
//   timetableCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   timetableHeaderRow: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: '#F1F5F9',
//     paddingBottom: 8,
//     marginBottom: 8,
//   },
//   timeHeaderCell: {
//     width: 70,
//     justifyContent: 'center',
//   },
//   timeHeaderText: {
//     fontSize: 10,
//     fontWeight: '600',
//     color: '#94A3B8',
//   },
//   dayHeaderCell: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   dayHeaderText: {
//     fontSize: 10,
//     fontWeight: '600',
//     color: '#1E293B',
//   },
//   timetableDataRow: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: '#F1F5F9',
//     paddingVertical: 8,
//   },
//   timeCell: {
//     width: 70,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   timeIconBg: {
//     width: 24,
//     height: 24,
//     borderRadius: 6,
//     backgroundColor: '#FFF7ED',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   timeText: {
//     fontSize: 9,
//     color: '#64748B',
//   },
//   slotCell: {
//     flex: 1,
//     padding: 4,
//     borderRadius: 8,
//     marginHorizontal: 2,
//     backgroundColor: '#F8FAFC',
//     minHeight: 60,
//   },
//   slotSubject: {
//     fontSize: 9,
//     fontWeight: '600',
//     marginBottom: 2,
//   },
//   slotTeacher: {
//     fontSize: 8,
//     color: '#94A3B8',
//     marginBottom: 2,
//   },
//   slotRoom: {
//     fontSize: 8,
//     fontWeight: '600',
//   },
//   lunchText: {
//     fontSize: 9,
//     color: '#F59E0B',
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   syncCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   syncLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   syncIconBg: {
//     width: 44,
//     height: 44,
//     borderRadius: 12,
//     backgroundColor: '#EEF2FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   syncTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1E293B',
//     marginBottom: 2,
//   },
//   syncSubtitle: {
//     fontSize: 11,
//     color: '#94A3B8',
//     lineHeight: 16,
//   },
//   syncButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//     backgroundColor: '#6366F1',
//     borderRadius: 10,
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//   },
//   syncButtonText: {
//     color: '#FFFFFF',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   bottomSpacer: {
//     height: 20,
//   },
// });
