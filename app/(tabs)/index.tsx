import HomeScreen from '@/components/HomeScreen';
import LanguageSelector from '@/components/LanguageSelector';
import { TRANSLATIONS } from '@/constants/translations';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Language = keyof typeof TRANSLATIONS;

export default function StudyTab() {
  const router = useRouter();
  const { lang, setLang, learnedWords, t } = useApp();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  useEffect(() => {
    if (!lang) {
      setShowLanguageSelector(true);
    }
  }, [lang]);

  const handleLanguageSelect = async (language: Language) => {
    await setLang(language);
    setShowLanguageSelector(false);
  };

  if (showLanguageSelector || !lang) {
    return <LanguageSelector onSelectLanguage={handleLanguageSelect} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF2FF" />
      
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>Ox</Text>
          </View>
          <View>
            <Text style={styles.title}>{t('title')}</Text>
            <Text style={styles.subtitle}>{t('subtitle')}</Text>
          </View>
        </View>
        
        <View style={styles.headerRight}>
          <View style={styles.learnedBadge}>
            <Text style={styles.learnedText}>
              {learnedWords.size} {t('learnedTag')}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => setShowLanguageSelector(true)}
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <HomeScreen
          onNavigateToStudy={(level: string) => {
            router.push({
              pathname: '/study',
              params: { level },
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 40,
    height: 40,
    backgroundColor: '#4F46E5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 11,
    color: '#4F46E5',
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  learnedBadge: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  learnedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  settingsButton: {
    width: 36,
    height: 36,
    backgroundColor: 'white',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingsIcon: {
    fontSize: 18,
  },
  content: {
    flex: 1,
  },
});