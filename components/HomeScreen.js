import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LEVEL_STYLES } from '../constants/levelStyles';
import { useApp } from '../context/AppContext';

export default function HomeScreen({ onNavigateToStudy }) {
  const { words, isFileLoaded, setWords, setIsFileLoaded, t } = useApp();

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        const fileContent = await FileSystem.readAsStringAsync(result.uri);
        const json = JSON.parse(fileContent);
        
        if (Array.isArray(json)) {
          const validWords = json.filter(item => item.word && item.level);
          setWords(validWords);
          setIsFileLoaded(true);
          Alert.alert('Success', t('fileSuccess').replace('{count}', validWords.length));
        } else {
          Alert.alert('Error', t('fileErrorJSON'));
        }
      }
    } catch (error) {
      Alert.alert('Error', t('fileErrorRead') + error.message);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {!isFileLoaded && words.length <= 10 && (
        <View style={styles.uploadCard}>
          <Text style={styles.uploadIcon}>📤</Text>
          <Text style={styles.uploadTitle}>{t('uploadTitle')}</Text>
          <Text style={styles.uploadDesc}>{t('uploadDesc')}</Text>
          
          <TouchableOpacity style={styles.uploadButton} onPress={handleFilePick}>
            <Text style={styles.uploadButtonText}>{t('chooseFile')}</Text>
          </TouchableOpacity>
          
          {!isFileLoaded && (
            <Text style={styles.demoText}>{t('demoMode')}</Text>
          )}
        </View>
      )}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('levelSelectTitle')}</Text>
        <Text style={styles.headerDesc}>{t('levelSelectDesc')}</Text>
      </View>

      <View style={styles.levelGrid}>
        {['A1', 'A2', 'B1', 'B2', 'C1'].map(level => {
          const levelStyle = LEVEL_STYLES[level];
          return (
            <TouchableOpacity
              key={level}
              style={[styles.levelCard, { borderColor: levelStyle.borderColor }]}
              onPress={() => onNavigateToStudy(level)}
              activeOpacity={0.7}
            >
              <Text style={[styles.levelName, { color: levelStyle.textColor }]}>
                {level}
              </Text>
              <Text style={styles.levelDesc}>
                {t(`levels.${level}`) || level}
              </Text>
              <View style={styles.startRow}>
                <Text style={styles.startText}>{t('start')}</Text>
                <Text style={styles.arrow}>→</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.allLevelsButton}
        onPress={() => onNavigateToStudy('ALL')}
        activeOpacity={0.7}
      >
        <Text style={styles.filterIcon}>🔀</Text>
        <Text style={styles.allLevelsText}>{t('allLevels')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  uploadCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#C7D2FE',
    alignItems: 'center',
  },
  uploadIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  uploadDesc: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
  demoText: {
    marginTop: 16,
    fontSize: 11,
    color: '#9CA3AF',
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerDesc: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  levelGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  levelCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  levelName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  levelDesc: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 16,
  },
  startRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  startText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  arrow: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  allLevelsButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  filterIcon: {
    fontSize: 18,
  },
  allLevelsText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
});