# 🚀 CodSodRNKit - Ultimate React Native Boilerplate

<p align="center">
  <img src="https://raw.githubusercontent.com/codsode/CodSodRNKit/main/assets/codsod-logo.png" alt="CodSod Logo" width="300" />
</p>

<p align="center">
  <b>⚛️ Jumpstart your app development with this powerful React Native template. Created by the CodSod Computer Science Education Channel.</b>
</p>

<div align="center">
  
  ![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)
  ![React Native Boilerplate Downloads](https://flat.badgen.net/npm/dt/@codsod/react-native-kit)
  ![React Native Boilerplate Top Language](https://img.shields.io/github/languages/top/codsode/CodSodRNKit)
  [![npm version](https://img.shields.io/npm/v/@codsod/react-native-kit)](https://www.npmjs.com/package/@codsod/react-native-kit)
  ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
  
</div>

## ✨ Why Choose CodSodRNKit?

CodSodRNKit provides a professionally configured React Native environment designed for production-ready applications. Skip the tedious setup and dive straight into building amazing features for your app.

<table>
<tr>
<td width="50%">

### 🎯 Key Features

- **📱 Modern Tech Stack**: Built with React Native, TypeScript, and the latest libraries
- **🌓 Theming**: Built-in support for light/dark mode with react-native-unistyles
- **🌎 Internationalization**: Ready-to-use i18n setup with multiple languages
- **⚡ State Management**: Integrated Redux Toolkit for global state
- **📊 Data Fetching**: TanStack Query (React Query) for efficient data management
- **🔐 Authentication Flow**: Complete auth screens and navigation
- **🧩 Component Library**: Pre-built UI components to accelerate development
- **🧪 Testing**: Jest and React Testing Library configured
- **⚙️ CI/CD Ready**: Basic GitHub Actions workflow included
- **🔍 Code Quality**: ESLint, Prettier, and TypeScript strict mode

</td>
<td width="50%">

### 🛠️ Development Experience

- **📂 Organized Structure**: Intuitive project structure that scales
- **🔄 Hot Reloading**: Fast refresh for rapid development
- **📝 Type Safety**: Full TypeScript support with strict mode
- **🧭 Navigation**: React Navigation v7 pre-configured
- **🔌 API Integration**: Axios setup with interceptors
- **💾 Storage**: MMKV for high-performance storage
- **🎨 Styling**: Flexible styling with react-native-unistyles
- **📱 Responsive Design**: Built with responsive layouts in mind
- **🔄 State Persistence**: Redux persistence configured
- **📊 Performance Monitoring**: Basic performance tracking setup

</td>
</tr>
</table>

## 🚀 Quick Start

Create a new project using our template with a single command:

```bash
npx @react-native-community/cli@latest init MyApp --template @codsod/react-native-kit
```

That's it! Your project is ready to run with all the features mentioned above!

## 📚 Tech Stack

<details>
<summary><b>Click to see the full list of libraries and tools</b></summary>

### Core

- [React Native](https://reactnative.dev/) - Build native apps using React
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types

### UI & Navigation

- [@react-navigation/native](https://reactnavigation.org/) - Routing and navigation
- [react-native-screens](https://github.com/software-mansion/react-native-screens) - Native navigation primitives
- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) - Handle safe area
- [@react-navigation/native-stack](https://reactnavigation.org/docs/native-stack-navigator/) - Native stack navigator
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/) - Native gesture system
- [react-native-unistyles](https://github.com/jpudysz/react-native-unistyles) - Universal styling solution

### State Management & Data Fetching

- [react-redux](https://react-redux.js.org/) - React bindings for Redux
- [@reduxjs/toolkit](https://redux-toolkit.js.org/) - The official Redux toolset
- [@tanstack/react-query](https://tanstack.com/query/latest) - Async data management
- [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) - Fast storage solution

### Internationalization

- [i18next](https://www.i18next.com/) - Internationalization framework
- [react-i18next](https://react.i18next.com/) - React integration for i18next
- [@os-team/i18next-react-native-language-detector](https://github.com/os-team/i18next-react-native-language-detector) - Language detection
- [intl-pluralrules](https://formatjs.io/docs/polyfills/intl-pluralrules) - Pluralization support

### Network & API

- [axios](https://axios-http.com/) - Promise-based HTTP client

### Utilities

- [react-native-keyboard-aware-scroll-view](https://github.com/APSL/react-native-keyboard-aware-scroll-view) - Handle keyboard appearance
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) - Animation library
- [react-native-restart](https://github.com/avishayil/react-native-restart) - Restart React Native app

### Testing

- [jest](https://jestjs.io/) - JavaScript testing framework
- [@testing-library/react-native](https://callstack.github.io/react-native-testing-library/) - Testing utilities

</details>

## 📋 Project Structure

The template follows a feature-based structure to keep your code organized and maintainable:

```
src/
├── api/                # API services and config
├── assets/             # Static assets (images, fonts)
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
├── navigation/         # Navigation configuration
├── screens/            # Screen components
├── services/           # Business logic services
├── store/              # Redux store and slices
├── theme/              # Styling themes and constants
├── translations/       # i18n translations
└── utils/              # Utility functions
```

## 📱 Features In Detail

### 🌓 Theming System

Switch between light and dark modes with a well-structured theming system:

```typescript
// Access theme in your components
import { useStyles } from "@/theme";

function MyComponent() {
  const { styles, theme } = useStyles();

  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.text }}>Themed Text</Text>
    </View>
  );
}
```

### 🌎 Internationalization

Easily add multi-language support to your app:

```typescript
// Using translations in components
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();

  return <Text>{t("hello_world")}</Text>;
}
```

### 📊 API Integration

Pre-configured Axios instance with interceptors for authentication and error handling:

```typescript
// Example API call
import { api } from "@/api";

async function fetchData() {
  try {
    const response = await api.get("/endpoint");
    return response.data;
  } catch (error) {
    // Error handling
  }
}
```

## 🧩 Available Screens

The template includes several pre-built screens to get you started:

- **Authentication**: Login, Register, Forgot Password
- **Onboarding**: Introduction slides for new users
- **Home**: Main dashboard layout
- **Profile**: User profile management
- **Settings**: App settings with theme toggle and language selection

## 📈 Performance Optimization

CodSodRNKit is built with performance in mind:

- Efficient re-rendering with React.memo and useCallback
- MMKV for high-performance storage
- Optimized list rendering with FlatList
- React Native's new architecture ready

## 🧪 Testing

Write reliable tests using the pre-configured testing environment:

```typescript
import { render, fireEvent } from "@testing-library/react-native";
import MyComponent from "./MyComponent";

test("component renders correctly", () => {
  const { getByText } = render(<MyComponent />);
  const element = getByText("Hello World");
  expect(element).toBeTruthy();
});
```

## 🔍 Requirements

- Node 18 or greater
- For iOS development: Mac with Xcode 10+
- For Android development: Android Studio

Follow the [React Native environment setup guide](https://reactnative.dev/docs/environment-setup) to ensure your system is ready.

## 🏗️ Getting Started

### Step 1: Start Metro

```bash
# Install dependencies
npm install
# OR
yarn install

# Start Metro bundler
npm start
# OR
yarn start
```

### Step 2: Run Your App

#### For Android:

```bash
npm run android
# OR
yarn android
```

#### For iOS:

```bash
cd ios && pod install
cd ..
npm run ios
# OR
yarn ios
```

## 📚 Documentation

For more detailed documentation:

- Check out our [Documentation](https://github.com/codsode/CodSodRNKit/blob/main/documentation.html)
- View the [Troubleshooting Guide](https://github.com/codsode/CodSodRNKit/blob/main/documentation.html#troubleshooting)

## 🎓 Learn More

Visit the [CodSod YouTube Channel](https://www.youtube.com/channel/codsod) for detailed tutorials on React Native development and computer science education.

## 🤝 Contributing

We welcome contributions to improve this template! Feel free to submit issues or pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgements

This package was inspired by [theCodingMachine's React Native Boilerplate](https://github.com/thecodingmachine/react-native-boilerplate) and [brew-react-native-kit](https://github.com/CodeBrewLabs7/BrewRNKit). We are grateful for their contributions to the React Native community.

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

<p align="center">
  <a href="https://www.youtube.com/@_codsod">
    <img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube" />
  </a>
  <a href="https://github.com/codsode/CodSodRNKit">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="https://www.npmjs.com/package/@codsod/react-native-kit">
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm" />
  </a>
</p>

<p align="center">
  Developed with ❤️ by <a href="https://github.com/codsode">CodSod</a>
</p>
