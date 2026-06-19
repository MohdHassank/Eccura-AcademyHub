// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//   Wallet,
//   ArrowUpRight,
//   ArrowDownRight,
//   TrendingUp,
//   TrendingDown,
//   CreditCard,
//   Receipt,
//   PiggyBank,
//   ChevronRight,
//   Calendar,
//   AlertCircle,
// } from 'lucide-react-native';
// import AdminHeader from '@/components/AdminHeader';
// import SectionHeader from '@/components/SectionHeader';

// const recentTransactions = [
//   { id: 1, name: 'Rahul Sharma', type: 'Fee Payment', amount: 25000, date: '18 Jun 2025', status: 'Completed' },
//   { id: 2, name: 'Priya Patel', type: 'Admission Fee', amount: 15000, date: '17 Jun 2025', status: 'Completed' },
//   { id: 3, name: 'Amit Kumar', type: 'Pending Fee', amount: 12000, date: '16 Jun 2025', status: 'Pending' },
//   { id: 4, name: 'Sneha Gupta', type: 'Fee Payment', amount: 30000, date: '15 Jun 2025', status: 'Completed' },
//   { id: 5, name: 'Vikram Singh', type: 'Late Fee', amount: 5000, date: '14 Jun 2025', status: 'Overdue' },
// ];

// const pendingFees = [
//   { name: 'Batch 11A', amount: 45000, count: 12, dueDate: '20 Jun 2025' },
//   { name: 'Batch 12B', amount: 38000, count: 8, dueDate: '22 Jun 2025' },
//   { name: 'Batch 10A', amount: 52000, count: 15, dueDate: '25 Jun 2025' },
// ];

// const { width } = Dimensions.get('window');

// export default function FinanceScreen() {
//   return (
//     <SafeAreaView style={styles.container} edges={['top']}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <AdminHeader
//           title="Fees & Finance"
//           subtitle="Manage fees, payments and financial reports"
//           notificationCount={3}
//         />

//         {/* Overview Stats */}
//         <View style={styles.statsRow}>
//           <View style={styles.overviewCard}>
//             <View style={[styles.overviewIconBg, { backgroundColor: '#EEF2FF' }]}>
//               <Wallet size={20} color="#6366F1" />
//             </View>
//             <Text style={styles.overviewValue}>₹ 24,75,000</Text>
//             <Text style={styles.overviewLabel}>Total Revenue</Text>
//             <View style={styles.overviewChange}>
//               <TrendingUp size={12} color="#10B981" />
//               <Text style={styles.overviewChangeText}>18.6%</Text>
//             </View>
//           </View>
//           <View style={styles.overviewCard}>
//             <View style={[styles.overviewIconBg, { backgroundColor: '#FFF7ED' }]}>
//               <Receipt size={20} color="#F59E0B" />
//             </View>
//             <Text style={styles.overviewValue}>₹ 8,75,000</Text>
//             <Text style={styles.overviewLabel}>Total Expenses</Text>
//             <View style={styles.overviewChange}>
//               <TrendingUp size={12} color="#EF4444" />
//               <Text style={[styles.overviewChangeText, { color: '#EF4444' }]}>6.3%</Text>
//             </View>
//           </View>
//           <View style={styles.overviewCard}>
//             <View style={[styles.overviewIconBg, { backgroundColor: '#ECFDF5' }]}>
//               <PiggyBank size={20} color="#10B981" />
//             </View>
//             <Text style={styles.overviewValue}>₹ 16,00,000</Text>
//             <Text style={styles.overviewLabel}>Net Profit</Text>
//             <View style={styles.overviewChange}>
//               <TrendingUp size={12} color="#10B981" />
//               <Text style={styles.overviewChangeText}>20.1%</Text>
//             </View>
//           </View>
//           <View style={styles.overviewCard}>
//             <View style={[styles.overviewIconBg, { backgroundColor: '#F5F3FF' }]}>
//               <CreditCard size={20} color="#8B5CF6" />
//             </View>
//             <Text style={styles.overviewValue}>82.4%</Text>
//             <Text style={styles.overviewLabel}>Collection Rate</Text>
//             <View style={styles.overviewChange}>
//               <TrendingUp size={12} color="#10B981" />
//               <Text style={styles.overviewChangeText}>14.8%</Text>
//             </View>
//           </View>
//         </View>

//         {/* Quick Actions */}
//         <SectionHeader title="Quick Actions" />
//         <View style={styles.actionsRow}>
//           <TouchableOpacity style={styles.actionCard}>
//             <View style={[styles.actionIconBg, { backgroundColor: '#EEF2FF' }]}>
//               <Receipt size={22} color="#6366F1" />
//             </View>
//             <Text style={styles.actionTitle}>Collect Fee</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.actionCard}>
//             <View style={[styles.actionIconBg, { backgroundColor: '#ECFDF5' }]}>
//               <CreditCard size={22} color="#10B981" />
//             </View>
//             <Text style={styles.actionTitle}>Add Expense</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.actionCard}>
//             <View style={[styles.actionIconBg, { backgroundColor: '#FFF7ED' }]}>
//               <Wallet size={22} color="#F59E0B" />
//             </View>
//             <Text style={styles.actionTitle}>Salary Pay</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.actionCard}>
//             <View style={[styles.actionIconBg, { backgroundColor: '#F5F3FF' }]}>
//               <Calendar size={22} color="#8B5CF6" />
//             </View>
//             <Text style={styles.actionTitle}>Reports</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Recent Transactions */}
//         <SectionHeader title="Recent Transactions" actionText="View All" />
//         <View style={styles.transactionsCard}>
//           {recentTransactions.map((tx, index) => (
//             <View key={tx.id} style={[styles.transactionItem, index < recentTransactions.length - 1 && styles.transactionItemBorder]}>
//               <View style={[styles.txIconBg, { 
//                 backgroundColor: tx.status === 'Completed' ? '#ECFDF5' : tx.status === 'Pending' ? '#FFF7ED' : '#FEF2F2' 
//               }]}>
//                 <Wallet size={16} color={tx.status === 'Completed' ? '#10B981' : tx.status === 'Pending' ? '#F59E0B' : '#EF4444'} />
//               </View>
//               <View style={styles.txInfo}>
//                 <Text style={styles.txName}>{tx.name}</Text>
//                 <Text style={styles.txType}>{tx.type} · {tx.date}</Text>
//               </View>
//               <View style={styles.txRight}>
//                 <Text style={[styles.txAmount, { color: tx.status === 'Overdue' ? '#EF4444' : '#1E293B' }]}>
//                   ₹ {tx.amount.toLocaleString()}
//                 </Text>
//                 <View style={[styles.txStatus, { 
//                   backgroundColor: tx.status === 'Completed' ? '#ECFDF5' : tx.status === 'Pending' ? '#FFF7ED' : '#FEF2F2' 
//                 }]}>
//                   <Text style={[styles.txStatusText, { 
//                     color: tx.status === 'Completed' ? '#10B981' : tx.status === 'Pending' ? '#F59E0B' : '#EF4444' 
//                   }]}>
//                     {tx.status}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           ))}
//         </View>

//         {/* Pending Fees */}
//         <SectionHeader title="Pending Fees by Batch" />
//         <View style={styles.pendingFeesCard}>
//           {pendingFees.map((batch, index) => (
//             <View key={index} style={[styles.pendingFeeItem, index < pendingFees.length - 1 && styles.pendingFeeBorder]}>
//               <View style={styles.pendingFeeLeft}>
//                 <View style={styles.pendingFeeIconBg}>
//                   <AlertCircle size={18} color="#F59E0B" />
//                 </View>
//                 <View>
//                   <Text style={styles.pendingFeeName}>{batch.name}</Text>
//                   <Text style={styles.pendingFeeMeta}>{batch.count} students · Due {batch.dueDate}</Text>
//                 </View>
//               </View>
//               <View style={styles.pendingFeeRight}>
//                 <Text style={styles.pendingFeeAmount}>₹ {batch.amount.toLocaleString()}</Text>
//                 <TouchableOpacity style={styles.remindButton}>
//                   <Text style={styles.remindButtonText}>Remind</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))}
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
//   statsRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 12,
//     marginBottom: 24,
//     marginTop: 8,
//   },
//   overviewCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 16,
//     flex: 1,
//     minWidth: 140,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   overviewIconBg: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   overviewValue: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginBottom: 4,
//   },
//   overviewLabel: {
//     fontSize: 12,
//     color: '#64748B',
//     marginBottom: 4,
//   },
//   overviewChange: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 2,
//   },
//   overviewChangeText: {
//     fontSize: 11,
//     color: '#10B981',
//     fontWeight: '500',
//   },
//   actionsRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 12,
//     marginBottom: 24,
//   },
//   actionCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 16,
//     width: (width - 64) / 2,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   actionIconBg: {
//     width: 48,
//     height: 48,
//     borderRadius: 14,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   actionTitle: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#1E293B',
//   },
//   transactionsCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//   },
//   transactionItemBorder: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#F1F5F9',
//   },
//   txIconBg: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   txInfo: {
//     flex: 1,
//   },
//   txName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1E293B',
//     marginBottom: 2,
//   },
//   txType: {
//     fontSize: 12,
//     color: '#94A3B8',
//   },
//   txRight: {
//     alignItems: 'flex-end',
//   },
//   txAmount: {
//     fontSize: 14,
//     fontWeight: '700',
//     marginBottom: 4,
//   },
//   txStatus: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 8,
//   },
//   txStatusText: {
//     fontSize: 10,
//     fontWeight: '600',
//   },
//   pendingFeesCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   pendingFeeItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//   },
//   pendingFeeBorder: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#F1F5F9',
//   },
//   pendingFeeLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   pendingFeeIconBg: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     backgroundColor: '#FFF7ED',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   pendingFeeName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1E293B',
//     marginBottom: 2,
//   },
//   pendingFeeMeta: {
//     fontSize: 12,
//     color: '#94A3B8',
//   },
//   pendingFeeRight: {
//     alignItems: 'flex-end',
//   },
//   pendingFeeAmount: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginBottom: 4,
//   },
//   remindButton: {
//     backgroundColor: '#6366F1',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//   },
//   remindButtonText: {
//     color: '#FFFFFF',
//     fontSize: 11,
//     fontWeight: '600',
//   },
//   bottomSpacer: {
//     height: 20,
//   },
// });

