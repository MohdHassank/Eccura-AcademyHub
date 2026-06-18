import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

interface PastDoubt {
  id: string;
  subject: string;
  question: string;
  status: 'Pending' | 'Resolved' | 'Under Review';
  date: string;
}

export default function DoubtSupportScreen() {
  const router = useRouter();

  // Form States
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [doubtText, setDoubtText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Subjects List Array
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'Electronics'];

  // Mock Past Doubts Data Pipeline
  const [pastDoubts, setPastDoubts] = useState<PastDoubt[]>([
    { id: '1', subject: 'Mathematics', question: 'How to solve second-order differential equations using Laplace transform?', status: 'Resolved', date: '18 June 2026' },
    { id: '2', subject: 'Physics', question: 'Doubt in semiconductor energy gap derivation for GaAs material.', status: 'Pending', date: '19 June 2026' },
    { id: '3', subject: 'Computer Science', question: 'Explain time complexity of quicksort in worst-case scenario.', status: 'Under Review', date: '15 June 2026' },
  ]);

  // Submit Doubt Action Handler
  const handleSubmitDoubt = () => {
    if (!selectedSubject) {
      Alert.alert('Subject Missing', 'Bhai, pehle list se ek subject select karo.');
      return;
    }
    if (!doubtText.trim()) {
      Alert.alert('Empty Question', 'Bhai, apna doubt toh likho tabhi toh solution milega.');
      return;
    }

    setIsSubmitting(true);

    // Simulating Axios POST Request to Backend Engine
    setTimeout(() => {
      const newDoubt: PastDoubt = {
        id: Date.now().toString(),
        subject: selectedSubject,
        question: doubtText.trim(),
        status: 'Pending',
        date: 'Today'
      };

      setPastDoubts([newDoubt, ...pastDoubts]);
      setDoubtText('');
      setSelectedSubject('');
      setIsSubmitting(false);
      Alert.alert('Success 🎉', 'Aapka doubt successfully faculty pipeline me register ho gaya hai.');
    }, 1200);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Resolved': return { bg: '#E6F4EA', text: '#137333', icon: 'check-circle' };
      case 'Under Review': return { bg: '#FEF3C7', text: '#B45309', icon: 'hourglass-empty' };
      default: return { bg: '#EFF6FF', text: '#2563EB', icon: 'schedule' };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* HEADER NAV */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doubt Support</Text>
        <View style={{ width: 38 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          
          {/* ASK A NEW DOUBT SECTION */}
          <View style={styles.cardFrame}>
            <View style={styles.sectionHeadingRow}>
              <View style={[styles.iconIndicator, { backgroundColor: '#FFF7ED' }]}>
                <FontAwesome5 name="question" size={14} color="#F97316" />
              </View>
              <Text style={styles.sectionTitle}>Ask a New Doubt</Text>
            </View>

            {/* SUBJECT PILLS SELECTOR */}
            <Text style={styles.inputLabel}>Select Subject</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.subjectPillsRow}>
              {subjects.map((sub) => {
                const isSelected = selectedSubject === sub;
                return (
                  <TouchableOpacity
                    key={sub}
                    style={[styles.subjectPill, isSelected && styles.subjectPillSelected]}
                    onPress={() => setSelectedSubject(sub)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.subjectPillText, isSelected && styles.subjectPillTextSelected]}>
                      {sub}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* TEXT INPUT FIELD */}
            <Text style={styles.inputLabel}>Describe your Doubt</Text>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textAreaInput}
                placeholder="Bhai, apna question poora detail me likho ya derivation complex ho toh formula text format me dalo..."
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                value={doubtText}
                onChangeText={setDoubtText}
              />
            </View>

            {/* MOCK ATTACHMENT CARD */}
            <TouchableOpacity style={styles.attachmentButton} activeOpacity={0.7}>
              <Feather name="image" size={16} color="#64748B" />
              <Text style={styles.attachmentText}>Upload Diagram / Equation Screenshot</Text>
              <Ionicons name="add" size={16} color="#64748B" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>

            {/* SUBMIT BUTTON */}
            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && { opacity: 0.7 }]}
              onPress={handleSubmitDoubt}
              disabled={isSubmitting}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Posting Doubt...' : 'Submit to Faculty Desk'}
              </Text>
              <Feather name="arrow-right" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>

          {/* PAST DOUBTS HISTORY SECTION */}
          <Text style={styles.historySectionTitle}>Your Recent Doubts</Text>
          
          {pastDoubts.map((item) => {
            const statusConfig = getStatusStyle(item.status);
            return (
              <View key={item.id} style={styles.historyCard}>
                <View style={styles.historyCardHeader}>
                  <View style={styles.subjectBadge}>
                    <Text style={styles.subjectBadgeText}>{item.subject.toUpperCase()}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
                    <MaterialIcons name={statusConfig.icon} size={12} color={statusConfig.text} style={{ marginRight: 4 }} />
                    <Text style={[styles.statusBadgeText, { color: statusConfig.text }]}>{item.status}</Text>
                  </View>
                </View>

                <Text style={styles.historyQuestionText} numberOfLines={3}>
                  {item.question}
                </Text>

                <View style={styles.historyCardFooter}>
                  <Text style={styles.dateText}>Posted: {item.date}</Text>
                  {item.status === 'Resolved' && (
                    <TouchableOpacity style={styles.viewSolutionBtn} activeOpacity={0.7}>
                      <Text style={styles.viewSolutionBtnText}>View Solution</Text>
                      <Feather name="chevron-right" size={12} color="#6D28D9" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })}

        </ScrollView>
      </KeyboardAvoidingView>
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
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#0F172A' },
  scrollContainer: { padding: 16, paddingBottom: 40 },
  cardFrame: {
    backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16,
    borderWidth: 1, borderColor: '#F1F5F9', marginBottom: 24,
    elevation: 3, shadowColor: '#0F172A', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }
  },
  sectionHeadingRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  iconIndicator: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  inputLabel: { fontSize: 12, fontWeight: '600', color: '#64748B', marginTop: 12, marginBottom: 8 },
  subjectPillsRow: { gap: 8, paddingBottom: 4 },
  subjectPill: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10,
    backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#E2E8F0'
  },
  subjectPillSelected: {
    backgroundColor: '#FFF7ED', borderColor: '#F97316'
  },
  subjectPillText: { fontSize: 12, fontWeight: '500', color: '#475569' },
  subjectPillTextSelected: { color: '#F97316', fontWeight: '700' },
  textAreaContainer: {
    backgroundColor: '#F8FAFC', borderRadius: 14, borderWidth: 1,
    borderColor: '#E2E8F0', paddingHorizontal: 12, paddingVertical: 10, marginTop: 4
  },
  textAreaInput: { fontSize: 13, color: '#0F172A', minHeight: 100, fontWeight: '500', lineHeight: 18 },
  attachmentButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC',
    borderWidth: 1, borderColor: '#E2E8F0', borderStyle: 'dashed',
    borderRadius: 12, padding: 12, marginTop: 14, gap: 8
  },
  attachmentText: { fontSize: 12, color: '#64748B', fontWeight: '500' },
  submitButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#F97316', borderRadius: 14, height: 46, marginTop: 18,
    elevation: 2, shadowColor: '#F97316', shadowOpacity: 0.2, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }
  },
  submitButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  historySectionTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B', marginBottom: 12, paddingLeft: 2 },
  historyCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, marginBottom: 12,
    borderWidth: 1, borderColor: '#F1F5F9'
  },
  historyCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  subjectBadge: { backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  subjectBadgeText: { fontSize: 9, fontWeight: '700', color: '#475569' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusBadgeText: { fontSize: 10, fontWeight: '600' },
  historyQuestionText: { fontSize: 13, color: '#334155', fontWeight: '500', lineHeight: 18, marginBottom: 12 },
  historyCardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F8FAFC', paddingTop: 10 },
  dateText: { fontSize: 11, color: '#94A3B8', fontWeight: '500' },
  viewSolutionBtn: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  viewSolutionBtnText: { fontSize: 11, fontWeight: '700', color: '#6D28D9' }
});