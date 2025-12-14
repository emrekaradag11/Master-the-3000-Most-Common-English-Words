import { LEVEL_STYLES } from '@/constants/levelStyles';
import { useApp } from '@/context/AppContext';
import { calculateStats } from '@/utils/helpers';
import { Storage } from '@/utils/storage';
import React, { useMemo } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function StatsScreen() {
  const { words, learnedWords, setLearnedWords, t } = useApp();

  const stats = useMemo(() => 
    calculateStats(words, learnedWords),
    [words, learnedWords]
  );

  const handleReset = () => {
    Alert.alert(
      t('resetProgress'),
      t('confirmReset'),
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'OK', 
          onPress: async () => {
            setLearnedWords(new Set());
            await Storage.clearAll();
          }, 
          style: 'destructive' 
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.overallCard}>
        <Text style={styles.percentage}>%{stats.percentage}</Text>
        <Text style={styles.overallLabel}>{t('totalCompleted')}</Text>
        <Text style={styles.overallDetail}>
          {stats.learned} / {stats.total} words
        </Text>
      </View>

      <View style={styles.levelStats}>
        {Object.entries(stats.byLevel).map(([level, data]) => {
          const levelStyle = LEVEL_STYLES[level as keyof typeof LEVEL_STYLES] || LEVEL_STYLES.A1;
          const percent = data.total > 0 ? (data.learned / data.total) * 100 : 0;
          
          if (!levelStyle) return null;
          
          return (
            <View key={level} style={styles.levelStatCard}>
              <View style={styles.levelStatHeader}>
                <View style={[styles.levelStatBadge, { backgroundColor: levelStyle.backgroundColor }]}>
                  <Text style={[styles.levelStatBadgeText, { color: levelStyle.textColor }]}>
                    {level}
                  </Text>
                </View>
                <Text style={styles.levelStatCount}>
                  {data.learned}/{data.total}
                </Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${percent}%`, backgroundColor: levelStyle.borderColor }]} />
              </View>
            </View>
          );
        })}
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>🔄 {t('resetProgress')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FF',
    paddingTop: 50,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  overallCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  percentage: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 8,
  },
  overallLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  overallDetail: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  levelStats: {
    gap: 12,
    marginBottom: 20,
  },
  levelStatCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  levelStatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelStatBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  levelStatBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  levelStatCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  resetButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  resetButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
});

