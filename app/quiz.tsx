import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar,
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Dimensions,
  ActivityIndicator,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';

const { width } = Dimensions.get('window');

// TypeScript Interfaces based on API JSON
interface QuizItem {
  id: number;
  studentId: number;
  title: string;
  subject: string;
  description: string;
  questions: number;
  duration: string;
  difficulty: string;
  faculty: string;
  updatedDate: string;
}

interface ApiResponse {
  success: boolean;
  quizzes: QuizItem[];
}

export default function QuizScreen() {
  const router = useRouter();
  
  // API States
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');

  // Fetch Data from API
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>('http://192.168.29.49:5000/api/student/quiz/3');
        if (response.data && response.data.success) {
          setQuizzes(response.data.quizzes);
        } else {
          setQuizzes([]);
        }
      } catch (error) {
        console.error("Quiz API Error:", error);
        Alert.alert("Network Error", "Bhai, server se quizzes load nahi ho paye. Ek baar connection check karo.");
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // Generate subjects dynamically from API data
  const dynamicSubjects = ['All', ...Array.from(new Set(quizzes.map(q => q.subject)))];

  // Client side filtering & searching logic
  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch = 
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = selectedSubject === 'All' || quiz.subject === selectedSubject;
    
    return matchesSearch && matchesSubject;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFBFD" />

      {/* HEADER NAV */}
      <View style={styles.topHeaderNav}>
        <TouchableOpacity style={styles.headerBackButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.topHeaderTitle}>Quiz Center</Text>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by title or subject..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      {/* SUBJECT CHIPS FILTER */}
      <View style={styles.filterWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {dynamicSubjects.map((sub) => (
            <TouchableOpacity
              key={sub}
              style={[styles.filterChip, selectedSubject === sub && styles.filterChipActive]}
              onPress={() => setSelectedSubject(sub)}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterChipText, selectedSubject === sub && styles.filterChipTextActive]}>
                {sub}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* MAIN DATA MODULE CONTAINER */}
      {loading ? (
        <View style={styles.centeredState}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Fetching chapter quizzes...</Text>
        </View>
      ) : filteredQuizzes.length === 0 ? (
        <ScrollView contentContainerStyle={styles.centeredState}>
          <MaterialCommunityIcons name="file-document-remove-outline" size={64} color="#CBD5E1" />
          <Text style={styles.emptyTitleText}>No Quizzes Available</Text>
          <Text style={styles.emptySubText}>Bhai, aapke criteria ke mutabik koi practice test nahi mila.</Text>
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {filteredQuizzes.map((quiz) => (
            <View key={quiz.id} style={styles.quizCard}>
              <View style={styles.cardTopRow}>
                <View style={styles.tagWrapper}>
                  <View style={[styles.subjectTag, { backgroundColor: quiz.subject === 'Physics' ? '#EFF6FF' : '#F5F3FF' }]}>
                    <Text style={[styles.subjectTagText, { color: quiz.subject === 'Physics' ? '#2563EB' : '#7C3AED' }]}>
                      {quiz.subject}
                    </Text>
                  </View>
                  <View style={styles.difficultyTag}>
                    <Text style={styles.difficultyTagText}>{quiz.difficulty}</Text>
                  </View>
                </View>
                <Text style={styles.dateText}>{quiz.updatedDate}</Text>
              </View>

              <Text style={styles.cardTitle}>{quiz.title}</Text>
              <Text style={styles.cardDesc}>{quiz.description}</Text>

              <View style={styles.dividerLine} />

              <View style={styles.cardBottomRow}>
                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <MaterialCommunityIcons name="help-circle-outline" size={16} color="#64748B" />
                    <Text style={styles.metaText}>{quiz.questions} Qs</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={16} color="#64748B" />
                    <Text style={styles.metaText}>{quiz.duration}</Text>
                  </View>
                </View>
                
                <Text style={styles.facultyText}>By: {quiz.faculty}</Text>
              </View>

              <TouchableOpacity style={styles.startBtn} activeOpacity={0.8}>
                <Text style={styles.startBtnText}>Start Quiz</Text>
                <Ionicons name="play-circle" size={16} color="#FFFFFF" style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFBFD' },
  topHeaderNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FAFBFD',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerBackButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  topHeaderTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginLeft: 14 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 12,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 13, color: '#0F172A', fontWeight: '500' },
  filterWrapper: { marginTop: 12, marginBottom: 4 },
  filterScroll: { paddingHorizontal: 16, gap: 8 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterChipActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  filterChipText: { fontSize: 12, fontWeight: '600', color: '#64748B' },
  filterChipTextActive: { color: '#FFFFFF' },
  scrollContent: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 32 },
  centeredState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  loadingText: { marginTop: 10, fontSize: 13, color: '#64748B', fontWeight: '500' },
  emptyTitleText: { fontSize: 16, fontWeight: '700', color: '#334155', marginTop: 12 },
  emptySubText: { fontSize: 12, color: '#64748B', textAlign: 'center', marginTop: 4, lineHeight: 16 },
  quizCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 1,
    shadowColor: '#0F172A',
    shadowOpacity: 0.01,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }
  },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tagWrapper: { flexDirection: 'row', gap: 6 },
  subjectTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  subjectTagText: { fontSize: 10, fontWeight: '700' },
  difficultyTag: { backgroundColor: '#F8FAFC', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#E2E8F0' },
  difficultyTagText: { fontSize: 10, fontWeight: '600', color: '#475569' },
  dateText: { fontSize: 10, color: '#94A3B8', fontWeight: '500' },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginTop: 10 },
  cardDesc: { fontSize: 11, color: '#64748B', marginTop: 4, lineHeight: 15 },
  dividerLine: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 12 },
  cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metaRow: { flexDirection: 'row', gap: 12 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 11, fontWeight: '600', color: '#475569' },
  facultyText: { fontSize: 10, fontWeight: '600', color: '#64748B', fontStyle: 'italic' },
  startBtn: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 38,
    borderRadius: 10,
    marginTop: 14,
  },
  startBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' }
});