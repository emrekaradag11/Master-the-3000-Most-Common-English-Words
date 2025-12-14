import FlipCard from '@/components/FlipCard';
import { useApp } from '@/context/AppContext';
import { filterStudyList } from '@/utils/helpers';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Level = 'ALL' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export default function StudyPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ level?: string }>();
  const { words, learnedWords, addLearnedWord, t } = useApp();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  const currentLevel = (params.level || 'ALL') as Level;

  const studyList = useMemo(() => 
    filterStudyList(words, learnedWords, currentLevel),
    [words, learnedWords, currentLevel]
  );

  const currentWord = studyList[currentCardIndex];

  useEffect(() => {
    setCurrentCardIndex(0);
  }, [currentLevel]);

  const handleNextCard = () => {
    if (currentCardIndex >= studyList.length - 1) {
      setCurrentCardIndex(0);
    } else {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const handleMarkAsKnown = () => {
    if (currentWord) {
      addLearnedWord(currentWord.word);
      if (currentCardIndex >= studyList.length - 1) {
        setCurrentCardIndex(0);
      } else {
        setCurrentCardIndex(prev => prev + 1);
      }
    }
  };

  if (!currentWord) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.completionContainer}>
          <Text style={styles.trophyIcon}>🏆</Text>
          <Text style={styles.congratsTitle}>{t('congrats')}</Text>
          <Text style={styles.congratsText}>{t('levelComplete')}</Text>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>{t('checkOtherLevels')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.menuButton}>
          <Text style={styles.menuText}>← {t('menu')}</Text>
        </TouchableOpacity>
        
        <View style={styles.levelBadge}>
          <Text style={styles.levelBadgeText}>
            {currentLevel === 'ALL' ? t('mixed') : `${t('level')} ${currentLevel}`}
          </Text>
        </View>
      </View>

      <View style={styles.cardWrapper}>
        <FlipCard
          word={currentWord}
          t={t}
          onRepeat={handleNextCard}
          onKnown={handleMarkAsKnown}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.remainingText}>
          {t('remaining')}: {studyList.length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FF',
    padding: 20,
    paddingTop:50
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuButton: {
    padding: 8,
  },
  menuText: {
    fontSize: 15,
    color: '#6B7280',
  },
  levelBadge: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  levelBadgeText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  cardWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  remainingText: {
    fontSize: 14,
    color: '#6B7280',
  },
  completionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  trophyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  congratsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  congratsText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  backButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

