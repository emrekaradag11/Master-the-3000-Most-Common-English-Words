import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  LANGUAGE: '@oxford_app_lang',
  LEARNED_WORDS: '@oxford_learned_words',
};

export const Storage = {
  // Dil ayarlarını kaydet
  async setLanguage(lang) {
    try {
      await AsyncStorage.setItem(KEYS.LANGUAGE, lang);
    } catch (error) {
      console.error('Language save error:', error);
    }
  },

  // Dil ayarlarını al
  async getLanguage() {
    try {
      return await AsyncStorage.getItem(KEYS.LANGUAGE);
    } catch (error) {
      console.error('Language load error:', error);
      return null;
    }
  },

  // Öğrenilen kelimeleri kaydet
  async saveLearnedWords(words) {
    try {
      const wordsArray = Array.from(words);
      await AsyncStorage.setItem(KEYS.LEARNED_WORDS, JSON.stringify(wordsArray));
    } catch (error) {
      console.error('Learned words save error:', error);
    }
  },

  // Öğrenilen kelimeleri al
  async getLearnedWords() {
    try {
      const data = await AsyncStorage.getItem(KEYS.LEARNED_WORDS);
      return data ? new Set(JSON.parse(data)) : new Set();
    } catch (error) {
      console.error('Learned words load error:', error);
      return new Set();
    }
  },

  // Tüm verileri temizle
  async clearAll() {
    try {
      await AsyncStorage.removeItem(KEYS.LEARNED_WORDS);
    } catch (error) {
      console.error('Clear error:', error);
    }
  },
};