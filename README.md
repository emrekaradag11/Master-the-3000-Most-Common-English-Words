<div align="center">

# 🌟 NativeEnglish

### Master the 3000 Most Common English Words

*An interactive, multilingual vocabulary learning app built with React Native & Expo*

[![React Native](https://img.shields.io/badge/React%20Native-0.81-61dafb?style=for-the-badge&logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0-000020?style=for-the-badge&logo=expo)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Features](#-features) • [Languages](#-supported-languages) • [Installation](#-installation) • [Usage](#-usage) • [Contributing](#-contributing)

<img src="intro.gif" alt="App Demo" width="300" />

</div>

---

## 🎯 About

**NativeEnglish** is a powerful language learning application designed to help users master the **3000 most frequently used English words** through an engaging, interactive flashcard system. Whether you're a beginner or looking to expand your vocabulary, NativeEnglish provides a seamless learning experience in your native language.

---

## ✨ Features

### 🃏 **Interactive Flip Cards**
- Tap to reveal translations, definitions, and example sentences
- Smooth animations powered by React Native Reanimated
- Intuitive gesture-based learning

### 📊 **Smart Progress Tracking**
- Mark words as **Known** ✓ or **Repeat** ✕
- Track your learning journey across difficulty levels (A1, A2, B1, B2, C1, C2)
- Personalized vocabulary lists based on your progress

### 📖 **Rich Learning Resources**
- **Cambridge Dictionary Integration** - Access authoritative definitions, phonetics, and usage examples
- **Google Translate Integration** - Quick translations in your native language
- Offline-ready word database

### 🎨 **Beautiful Design**
- Modern, clean interface with glassmorphism effects
- Level-based color coding for easy difficulty identification
- Responsive design optimized for all screen sizes

### 🌐 **Multi-Language Support**
- Full UI localization in 11 languages
- Native language translations for all 3000 words
- Seamless language switching

---

## 🌍 Supported Languages

<div align="center">

| Language | Code | Flag |
|----------|------|------|
| English | EN | 🇬🇧 |
| Spanish | ES | 🇪🇸 |
| Turkish | TR | 🇹🇷 |
| Chinese | ZH | 🇨🇳 |
| Hindi | HI | 🇮🇳 |
| Arabic | AR | 🇸🇦 |
| Portuguese | PT | 🇵🇹 |
| Vietnamese | VI | 🇻🇳 |
| Indonesian | ID | 🇮🇩 |
| Thai | TH | 🇹🇭 |
| Russian | RU | 🇷🇺 |

</div>

---

## 🚀 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI** (optional, but recommended)

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/nativeEnglish.git

# Navigate to project directory
cd nativeEnglish

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running the App

After starting the development server, you can run the app on:

- 📱 **iOS Simulator** - Press `i` in the terminal
- 🤖 **Android Emulator** - Press `a` in the terminal
- 📲 **Physical Device** - Scan the QR code with Expo Go app
- 🌐 **Web Browser** - Press `w` in the terminal

---

## 📖 Usage

### Getting Started

1. **Select Your Language** 🌐
   - Open the app and navigate to Settings
   - Choose your preferred interface language

2. **Start Learning** 📚
   - Browse through flashcards organized by difficulty level
   - Tap any card to flip and reveal the English word, translation, and definition

3. **Track Your Progress** 📊
   - Use **✓ Known** button to mark words you've mastered
   - Use **✕ Repeat** button to review challenging words later

4. **Explore Definitions** 📖
   - Tap the Cambridge Dictionary button for detailed definitions
   - Access Google Translate for additional context

### Learning Levels

- **A1** - Beginner
- **A2** - Elementary
- **B1** - Intermediate
- **B2** - Upper Intermediate
- **C1** - Advanced
- **C2** - Proficiency

---

## � Tech Stack

- **[React Native](https://reactnative.dev/)** - Cross-platform mobile framework
- **[Expo](https://expo.dev/)** - Development platform and toolchain
- **[Expo Router](https://docs.expo.dev/router/introduction/)** - File-based routing
- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)** - Smooth animations
- **[AsyncStorage](https://react-native-async-storage.github.io/async-storage/)** - Local data persistence
- **[Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)** - Tactile feedback

---

## 📁 Project Structure

```
nativeEnglish/
├── app/                    # Main application screens (Expo Router)
│   ├── (tabs)/            # Tab-based navigation
│   └── _layout.js         # Root layout
├── components/            # Reusable UI components
│   ├── FlipCard.js       # Interactive flashcard component
│   └── ...
├── constants/            # App constants and configurations
│   ├── levelStyles.js   # Level-based styling
│   └── translations.js  # UI translations
├── context/             # React Context providers
│   └── AppContext.js    # Global state management
├── utils/               # Helper functions
│   └── helpers.js       # API calls and utilities
└── assets/              # Images, fonts, and static files
```

---

## 🤝 Contributing

Contributions are welcome! Whether it's bug fixes, new features, or translations, your help makes NativeEnglish better for everyone.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Word frequency data based on the Oxford 3000 word list
- Dictionary definitions powered by Cambridge Dictionary API
- Translations provided by Google Translate

---

## 📞 Contact & Support

- 🐛 **Report Issues**: [GitHub Issues](https://github.com/yourusername/nativeEnglish/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/yourusername/nativeEnglish/discussions)
- 📧 **Email**: your.email@example.com

---

<div align="center">

**Made with ❤️ for language learners worldwide**

⭐ Star this repo if you find it helpful!

</div>
