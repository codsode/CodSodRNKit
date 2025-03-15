# 🎉 Welcome to Your New App

<div align="center">
  <h3>Built with the CodSod React Native Template</h3>
  
  [![YouTube Channel](https://img.shields.io/badge/YouTube-CodSod-red?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@_codsod)
  [![GitHub](https://img.shields.io/badge/GitHub-CodSod-black?style=for-the-badge&logo=github&logoColor=white)](https://github.com/codsode)
</div>

## 🚀 About This Template

Your app is powered by the **CodSod React Native Template** - a professionally crafted boilerplate that combines modern architecture with development best practices. This template was created by the **CodSod Computer Science Education Channel** to help developers build beautiful and performant apps quickly.

### 🌟 What's Included

- **📱 Complete App Architecture**: Pre-configured with navigation, state management, and styling
- **🌓 Dark/Light Mode**: Built-in theme support with easy toggling
- **🌎 Internationalization**: Ready to translate into multiple languages
- **📊 Data Fetching**: Efficient API communication with React Query
- **⚡ Performance Optimizations**: Built with performance in mind from the start

## 💻 Quick Code Reference

<div align="center">
  <h3>📚 Professional Code Snippets</h3>
  <p>Ready-to-use code examples to help you get started with your application</p>
</div>

<div class="code-cards" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0;">

<!-- API Card -->
<div style="border: 1px solid #e1e4e8; border-radius: 6px; padding: 16px; margin-bottom: 10px;">
  <h3 style="margin-top: 0; color: #0366d6;">🔄 API Integration</h3>
  
  <details open>
  <summary style="font-weight: bold; cursor: pointer;">GET Requests</summary>
  
  ```typescript
  // Fetch data with React Query
  const { data, isLoading } = useCustomQuery<ResponseType>(
    "/endpoint", 
    "?param=value"
  );
  
  // Use the data in your component
  {isLoading ? (
    <ActivityIndicator />
  ) : (
    <Text>{data.title}</Text>
  )}
  ```
  </details>
  
  <details>
  <summary style="font-weight: bold; cursor: pointer;">POST Requests</summary>
  
  ```typescript
  const { mutate, isPending } = useCustomPost<
    ResponseType, 
    ErrorType, 
    RequestDataType
  >(
    "/auth/login",
    {
      onSuccess: ({ data }) => {
        // Handle success
      },
      onError: (error) => {
        // Handle error
      },
    }
  );
  
  // Call the mutation
  mutate({
    email: "user@example.com",
    password: "******"
  });
  ```
  </details>
</div>

<!-- Theme Card -->
<div style="border: 1px solid #e1e4e8; border-radius: 6px; padding: 16px; margin-bottom: 10px;">
  <h3 style="margin-top: 0; color: #0366d6;">🌓 Theme Management</h3>
  
  ```typescript
  // Access current theme
  const isDarkMode = UnistylesRuntime.themeName === "dark";
  
  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    
    // Save preference
    setItem("defaultTheme", { myTheme: newTheme });
    
    // Apply theme
    UnistylesRuntime.setTheme(newTheme);
  };
  
  // Example toggle button
  <Button 
    onPress={toggleTheme}
    title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`} 
  />
  ```
</div>

<!-- Language Card -->
<div style="border: 1px solid #e1e4e8; border-radius: 6px; padding: 16px; margin-bottom: 10px;">
  <h3 style="margin-top: 0; color: #0366d6;">🌍 Internationalization</h3>
  
  ```typescript
  // Using translations
  import { useTranslation } from "react-i18next";
  
  function MyComponent() {
    const { t } = useTranslation();
    
    return (
      <View>
        <Text>{t('greeting')}</Text>
        <Text>{t('welcome', { name: 'User' })}</Text>
      </View>
    );
  }
  
  // Changing language
  const changeLanguage = (languageCode) => {
    setItem("defaultLanguage", { sortName: languageCode });
    i18n.changeLanguage(languageCode);
    
    // Handle RTL if needed
    const isRTL = languageCode === "ar";
    I18nManager.forceRTL(isRTL);
    RNRestart.restart();
  };
  ```
</div>

<!-- Styling Card -->
<div style="border: 1px solid #e1e4e8; border-radius: 6px; padding: 16px; margin-bottom: 10px;">
  <h3 style="margin-top: 0; color: #0366d6;">🎨 Styling</h3>
  
  ```typescript
  import { createStyleSheet, useStyles } from "react-native-unistyles";
  
  // In your component
  function StyledComponent() {
    const { styles, theme } = useStyles(stylesheet);
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello World</Text>
        <TouchableOpacity 
          style={styles.button(true)} 
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            Press Me
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  // Theme-aware stylesheet
  const stylesheet = createStyleSheet((theme) => ({
    container: {
      backgroundColor: theme.colors.background,
      padding: 16,
      borderRadius: 8,
    },
    title: {
      fontSize: 18,
      color: theme.colors.text,
      fontWeight: "bold",
    },
    button: (isPrimary: boolean) => ({
      backgroundColor: isPrimary 
        ? theme.colors.primary 
        : theme.colors.secondary,
      padding: 12,
      borderRadius: 6,
      alignItems: "center",
    }),
    buttonText: {
      color: "white",
      fontWeight: "600",
    },
  }));
  ```
</div>

<!-- Navigation Card -->
<div style="border: 1px solid #e1e4e8; border-radius: 6px; padding: 16px; margin-bottom: 10px;">
  <h3 style="margin-top: 0; color: #0366d6;">🧭 Navigation</h3>
  
  ```typescript
  import { useNavigation } from "@react-navigation/native";
  
  // Type-safe navigation
  function MyScreen() {
    const navigation = useNavigation<
      NavigationProp<AppStackParamList>
    >();
    
    // Navigate to another screen
    const goToDetails = () => {
      navigation.navigate("Details", { 
        id: 123,
        title: "Item Details" 
      });
    };
    
    // Go back
    const goBack = () => navigation.goBack();
    
    // Reset navigation stack
    const resetToHome = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    };
    
    return (
      <View>
        <Button title="View Details" onPress={goToDetails} />
        <Button title="Go Back" onPress={goBack} />
        <Button title="Home" onPress={resetToHome} />
      </View>
    );
  }
  ```
</div>

<!-- List Rendering Card -->
<div style="border: 1px solid #e1e4e8; border-radius: 6px; padding: 16px; margin-bottom: 10px;">
  <h3 style="margin-top: 0; color: #0366d6;">📋 Lists & Performance</h3>
  
  ```typescript
  // Optimized list component
  function ProductList() {
    const { data } = useCustomQuery<ProductsResponse>("/products");
    
    // Memoize data to prevent re-renders
    const products = useMemo(() => data?.products || [], [data]);
    
    // Empty state component
    const renderEmpty = useCallback(() => (
      <EmptyState message="No products found" />
    ), []);
    
    return (
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductItem product={item} />
        )}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={renderEmpty}
        // Performance optimizations
        removeClippedSubviews={true}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={5}
        getItemLayout={(data, index) => ({
          length: 80,
          offset: 80 * index,
          index,
        })}
      />
    );
  }
  
  // Memoized list item
  const ProductItem = memo(({ product, onPress }) => {
    // Component implementation
  });
  ```
</div>

</div>

<div align="center">
  <h4>📘 More Code Examples</h4>
  <p>Find the complete code reference in <a href="./src/CODE_EXAMPLES.md">CODE_EXAMPLES.md</a></p>
</div>

## 🏃‍♂️ Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   # OR
   yarn install
   ```

2. **Start Metro**:
   ```bash
   npm start
   # OR
   yarn start
   ```

3. **Run on iOS/Android**:
   ```bash
   # iOS
   npm run ios
   # OR
   yarn ios
   
   # Android
   npm run android
   # OR
   yarn android
   ```

## 📚 Project Structure

The project follows a feature-based organization:

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

## 📺 Learn More with CodSod

<div align="center">
  <a href="https://www.youtube.com/@_codsod">
    <img src="https://img.shields.io/youtube/channel/subscribers/UCxxx?style=social" alt="YouTube Channel Subscribers" />
  </a>
</div>

### 🎓 CodSod YouTube Channel

Looking to enhance your computer science and React Native development skills? Subscribe to the **CodSod YouTube Channel** for:

- **🎯 In-depth React Native Tutorials**: Learn advanced patterns and techniques
- **🚀 Performance Optimization**: Make your apps faster and more responsive
- **🧩 UI/UX Best Practices**: Create beautiful and intuitive interfaces
- **🔍 Computer Science Fundamentals**: Strengthen your CS knowledge
- **⚙️ System Design**: Learn how to architect complex applications

[**Subscribe to CodSod on YouTube**](https://www.youtube.com/@_codsod)

## 🤝 Need Help?

Join our community for support:

- 📺 [YouTube Channel](https://www.youtube.com/@_codsod)
- 💻 [GitHub Repository](https://github.com/codsode/HelloWorld)
- 📦 [NPM Package](https://www.npmjs.com/package/@codsod/react-native-kit)

## 🙏 Acknowledgements

This template was created by **Vishal Chaturvedi** from the CodSod Computer Science Education Channel. If you find this template helpful, please consider:

- ⭐ Starring the [GitHub repository](https://github.com/codsode/HelloWorld)
- 📢 Sharing with fellow developers
- 📺 Subscribing to our [YouTube channel](https://www.youtube.com/@_codsod)

---

<div align="center">
  
  ### Made with ❤️ by [CodSod](https://github.com/codsode)
  
  **Computer Science Education Channel**
  
  <a href="https://www.youtube.com/@_codsod">
    <img src="https://img.shields.io/badge/Subscribe-red?style=for-the-badge&logo=youtube&logoColor=white" alt="Subscribe on YouTube" />
  </a>
</div>
