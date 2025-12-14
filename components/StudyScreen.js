import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FlipCard from './FlipCard';

export default function StudyScreen({ 
  currentWord, 
  currentLevel, 
  studyList,
  onBack, 
  onRepeat, 
  onKnown,
  t,
  lang 
}) {
  if (!currentWord) {
    return (
      <ScrollView contentContainerStyle={styles.completionContainer}>
        <Text style={styles.trophyIcon}>🏆</Text>
        <Text style={styles.congratsTitle}>{t('congrats')}</Text>
        <Text style={styles.congratsText}>{t('levelComplete')}</Text>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>{t('checkOtherLevels')}</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.menuButton}>
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
          lang={lang}
          onRepeat={onRepeat}
          onKnown={onKnown}
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
    padding: 20,
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