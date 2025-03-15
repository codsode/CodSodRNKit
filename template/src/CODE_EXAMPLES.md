# 📚 CodSod React Native Template - Code Examples

<p align="center">
  <img src="https://raw.githubusercontent.com/codsode/HelloWorld/main/assets/codsod-logo.png" alt="CodSod Logo" width="200" />
</p>

<div align="center">
  <p><strong>Comprehensive code reference for the CodSod React Native Template</strong></p>
  <p>A professional guide to help you use template features effectively</p>
</div>

<hr>

## 📋 Table of Contents

| Feature | Description |
|---------|-------------|
| [API Integration](#api-integration) | Network requests, data fetching, and error handling |
| [Theme Management](#theme-management) | Toggling between light and dark themes |
| [Internationalization](#internationalization) | Multi-language support with RTL handling |
| [Styling](#styling-with-unistyles) | Theme-aware styling with Unistyles |
| [Authentication](#authentication) | User authentication flows |
| [Navigation](#navigation) | Type-safe screen navigation |
| [List Rendering](#optimized-lists) | Performance-optimized list components |

<hr>

## API Integration

### GET Request with React Query

<table>
<tr>
<td width="70%">

```typescript
// Define your response type for type safety
interface HomeData {
    name: string;
    products: Product[];
}

// Use the custom hook for GET requests
const { 
    data,           // The response data
    isLoading,      // Loading state
    isError,        // Error state
    refetch,        // Function to refresh data
    fetchNextPage   // For pagination
} = useCustomQuery<HomeData>(
    "/products",    // Base endpoint
    "?limit=150"    // Query parameters
);

// Memoize data to prevent unnecessary re-renders
const memoizedData = useMemo(() => data, [data]);

// Use the data in your component
return (
    <>
        {isLoading && <LoadingIndicator />}
        {isError && <ErrorMessage />}
        {data && <ProductsList products={data.products} />}
    </>
);
```

</td>
<td width="30%">

#### Key Points

- **Type Safety**: Define interfaces for your responses
- **Loading States**: Handle loading and error states
- **Memoization**: Prevent unnecessary re-renders
- **Caching**: Data is automatically cached
- **Refetching**: Easy refresh with `refetch()`
- **Pagination**: Built-in support with `fetchNextPage`

</td>
</tr>
</table>

### POST Request with Error Handling

<table>
<tr>
<td width="70%">

```typescript
// Define request and response types
interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    success: boolean;
    token: string;
    user: {
        id: number;
        name: string;
    };
}

// Use the custom hook for POST requests
const { 
    mutate,         // Function to call the API
    isPending,      // Loading state during request
    isError,        // Whether an error occurred
    error           // Error details
} = useCustomPost<LoginResponse, Error, LoginRequest>(
    "/auth/login",  // Endpoint
    {
        onSuccess: ({ data }) => {
            // Save user data to Redux store
            dispatch(saveUserData(data));
            // Navigate to dashboard
            navigation.navigate('Dashboard');
        },
        onError: (error) => {
            // Display error message
            alertFunction("Login Failed", error.message);
        },
    }
);

// Call the mutation in a form submission
const handleSubmit = () => {
    mutate({
        email: formValues.email,
        password: formValues.password
    });
};
```

</td>
<td width="30%">

#### Key Features

- **Full TypeScript Support**: Request and response types
- **Error Handling**: Centralized error management
- **Loading States**: Track request status with `isPending`
- **Success Callbacks**: Execute code after successful requests
- **Form Integration**: Easy to use with form submissions
- **Progress Tracking**: Monitor upload progress for files

</td>
</tr>
</table>

## Theme Management

<table>
<tr>
<td width="70%">

```typescript
import { UnistylesRuntime } from "react-native-unistyles";

// Check current theme
const isDarkMode = UnistylesRuntime.themeName === "dark";

// Theme switching function
const changeTheme = (mode: ThemeMode) => {
    // Save user preference to storage for persistence
    setItem("defaultTheme", { myTheme: mode });
    
    // Apply the theme immediately
    UnistylesRuntime.setTheme(mode);
    
    // Optional: analytics tracking
    analytics.track('theme_changed', { theme: mode });
};

// Example: Toggle between light and dark mode
const toggleTheme = () => {
    changeTheme(isDarkMode ? "light" : "dark");
};

// Example UI implementation
return (
    <View style={styles.settingsItem}>
        <Text style={styles.settingsLabel}>
            Dark Mode
        </Text>
        <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{
                false: "#767577",
                true: "#81b0ff"
            }}
        />
    </View>
);
```

</td>
<td width="30%">

#### Implementation Notes

- **Theme Detection**: Easily check current theme
- **Persistent Preferences**: Save user choices
- **Instant Application**: Changes apply immediately
- **System Integration**: Can follow system settings
- **Analytics**: Track theme preferences
- **Component Integration**: Works with standard components

</td>
</tr>
</table>

## Internationalization

<table>
<tr>
<td width="70%">

```typescript
// Get available languages and current language from Redux
const { languages, defaultLanguage } = useSelector(
    (state: any) => state.settings
);

// Function to change the app language
const changeLanguage = (lng: LanguageInterface) => {
    // Skip if current language is selected
    if (i18n.language === lng.sortName) {
        return;
    }
    
    // Save preference to storage
    setItem("defaultLanguage", lng);
    
    // Apply language change
    i18n.changeLanguage(lng.sortName);
    
    // Handle Right-to-Left languages (e.g., Arabic)
    const isRTL = lng.sortName === "ar";
    I18nManager.forceRTL(isRTL);
    
    // Restart app to apply RTL changes correctly
    RNRestart.restart();
};

// Using translations in components
function TranslatedComponent() {
    const { t } = useTranslation();
    
    return (
        <View>
            <Text>{t('common.welcome')}</Text>
            <Text>{t('common.hello', { name: 'John' })}</Text>
            <Text>{t('common.items', { count: 5 })}</Text>
        </View>
    );
}
```

</td>
<td width="30%">

#### Key Features

- **Multiple Languages**: Support unlimited languages
- **RTL Support**: Right-to-left language handling
- **Dynamic Values**: Pass variables to translations
- **Pluralization**: Handle quantity-based text
- **Namespaces**: Organize translations by feature
- **Fallbacks**: Default text when translation missing

</td>
</tr>
</table>

## Styling with Unistyles

<table>
<tr>
<td width="70%">

```typescript
import { createStyleSheet, useStyles } from "react-native-unistyles";

// In your component
function StyledComponent() {
    // Get styles and theme variables
    const { styles, theme } = useStyles(stylesheet);
    
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Welcome to Your App
            </Text>
            
            <View style={styles.card}>
                <Text style={styles.cardTitle}>
                    Feature Highlight
                </Text>
                <Text style={styles.cardBody}>
                    This component uses theme-aware styling.
                </Text>
            </View>
            
            <TouchableOpacity
                style={styles.button(true)}
                activeOpacity={0.8}
                onPress={() => {}}
            >
                <Text style={styles.buttonText}>
                    Primary Button
                </Text>
            </TouchableOpacity>
        </View>
    );
}

// Define your stylesheet with theme support
const stylesheet = createStyleSheet((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 16,
    },
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        ...theme.shadows.medium,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: 8,
    },
    cardBody: {
        fontSize: 14,
        color: theme.colors.text,
        opacity: 0.8,
    },
    button: (isPrimary: boolean) => ({
        backgroundColor: isPrimary 
            ? theme.colors.primary 
            : theme.colors.secondary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.small,
    }),
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
}));
```

</td>
<td width="30%">

#### Styling Best Practices

- **Theme Access**: Get colors and values from current theme
- **Dynamic Styles**: Create style functions with parameters
- **Responsive Design**: Adapt to different screen sizes
- **Shadow Utilities**: Easy cross-platform shadows
- **Composition**: Combine basic styles for complex UIs
- **Performance**: Styles are memoized automatically

</td>
</tr>
</table>

## Authentication

<table>
<tr>
<td width="70%">

```typescript
// Logout implementation
const onPressLogout = () => {
    // Display confirmation dialog
    Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Logout",
                style: "destructive",
                onPress: performLogout
            }
        ]
    );
};

// Actual logout function
const performLogout = () => {
    // Clear all stored data
    storage.clearAll();
    
    // Clear auth token from API client
    api.setAuthToken(null);
    
    // Reset Redux state to initial values
    dispatch({ type: types.CLEAR_REDUX_STATE });
    
    // Navigate to authentication screen
    navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }]
    });
    
    // Track analytics event
    analytics.track('user_logged_out');
};
```

</td>
<td width="30%">

#### Security Features

- **Secure Storage**: MMKV encrypted storage
- **Token Management**: Automatic token refresh
- **State Cleanup**: Proper state reset on logout
- **Session Expiry**: Automatic handling of expired sessions
- **Navigation Reset**: Clean navigation stack after auth changes
- **Confirmation**: User confirmation for important actions

</td>
</tr>
</table>

## Navigation

<table>
<tr>
<td width="70%">

```typescript
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppStackParamList } from '@/navigation/types';

// Get typed navigation object
function ProfileScreen() {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    
    // Navigate to another screen with parameters
    const goToSettings = () => {
        navigation.navigate('Settings', { 
            section: 'privacy',
            userId: 123
        });
    };
    
    // Go back to previous screen
    const goBack = () => {
        navigation.goBack();
    };
    
    // Reset navigation stack and go to specific screen
    const resetToHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
        });
    };
    
    // Replace current screen
    const replaceWithDetails = () => {
        navigation.replace('Details', { id: 123 });
    };
    
    // Navigate to nested stack
    const goToAuthStack = () => {
        navigation.navigate('Auth', { 
            screen: 'Login',
            params: { referrer: 'profile' }
        });
    };
    
    return (
        <View>
            {/* Navigation UI */}
        </View>
    );
}
```

</td>
<td width="30%">

#### Navigation Features

- **Type Safety**: Full TypeScript support for routes and params
- **Deep Linking**: Support for external deep links
- **Nested Navigation**: Stack, tab, and drawer navigation
- **Screen Options**: Dynamic header configuration
- **Transitions**: Custom screen transitions
- **State Persistence**: Navigation state can be persisted
- **Event Listeners**: Listen for navigation events

</td>
</tr>
</table>

## Optimized Lists

<table>
<tr>
<td width="70%">

```typescript
// Efficient FlatList implementation
function ProductListScreen() {
    // Fetch data with React Query
    const { data, isLoading, isError } = useCustomQuery<ProductsResponse>(
        "/products"
    );
    
    // Memoize data to prevent unnecessary re-renders
    const products = useMemo(() => data?.products || [], [data]);
    
    // Memoized render item function
    const renderItem = useCallback(({ item }: { item: Product }) => (
        <ProductListItem 
            product={item}
            onPress={() => handleProductPress(item)}
        />
    ), []);
    
    // Memoized empty component
    const renderEmpty = useCallback(() => (
        <EmptyState 
            icon="shopping-bag"
            title="No Products Found"
            message="Try adjusting your filters or search terms"
        />
    ), []);
    
    // Memoized key extractor
    const keyExtractor = useCallback((item: Product) => 
        `product-${item.id}`, []
    );
    
    // Handle product selection
    const handleProductPress = useCallback((product: Product) => {
        navigation.navigate('ProductDetails', { id: product.id });
    }, [navigation]);
    
    return (
        <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={renderEmpty}
            ListHeaderComponent={<FiltersHeader />}
            ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
            
            // Performance optimizations
            removeClippedSubviews={true}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={5}
            getItemLayout={(_, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
            })}
            
            // Pull to refresh
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={() => refetch()}
                    colors={[theme.colors.primary]}
                />
            }
        />
    );
}

// Memoized list item component for optimal performance
const ProductListItem = memo(({ product, onPress }: ProductItemProps) => {
    const { styles } = useStyles(itemStyles);
    
    // Memoized press handler
    const handlePress = useCallback(() => {
        onPress(product);
    }, [product, onPress]);
    
    return (
        <Pressable 
            style={styles.container}
            onPress={handlePress}
        >
            <Image 
                source={{ uri: product.image }} 
                style={styles.image}
            />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>
                    {product.name}
                </Text>
                <Text style={styles.price}>
                    ${product.price.toFixed(2)}
                </Text>
            </View>
        </Pressable>
    );
});
```

</td>
<td width="30%">

#### Performance Tips

- **Memoization**: Use `React.memo()` for all list items
- **useCallback**: Memoize event handlers
- **useMemo**: Memoize derived values and arrays
- **FlatList Optimization**:
  - `removeClippedSubviews={true}`
  - Reasonable `initialNumToRender`
  - Optimize `windowSize` and `maxToRenderPerBatch`
  - Use `getItemLayout` for fixed-height items
- **Image Optimization**:
  - Use appropriate image sizes
  - Consider using FastImage
- **Virtualization**: Ensures only visible items are rendered

</td>
</tr>
</table>

## Additional Tips

<table>
<tr>
<th width="33%">Performance</th>
<th width="33%">Architecture</th>
<th width="33%">Development</th>
</tr>
<tr valign="top">
<td>

- Use `useCallback` for event handlers
- Memoize expensive computations with `useMemo`
- Optimize image loading with proper dimensions
- Use `PureComponent` or `memo` for components
- Keep components small and focused
- Avoid anonymous functions in renders
- Debounce user input for search fields

</td>
<td>

- Follow the container/presenter pattern
- Keep business logic in hooks and services
- Use Redux for global, shared state only
- Consider Context for localized state
- Leverage code generators for repetitive code
- Structure Redux store by domain/feature
- Create reusable base components

</td>
<td>

- Use TypeScript for better code quality
- Write snapshot and unit tests
- Document complex logic with comments
- Use consistent naming conventions
- Consider Storybook for UI component development
- Create small, focused PRs
- Document API interfaces with Swagger

</td>
</tr>
</table>

---

<div align="center">
  <h2>📱 Learn More with CodSod</h2>
  <p>Take your React Native skills to the next level with our comprehensive courses and tutorials.</p>
  <a href="https://www.youtube.com/@_codsod">
    <img src="https://img.shields.io/badge/Subscribe-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Subscribe on YouTube" />
  </a>
</div>

---

<div align="center">
  <p>
    <strong>Created by Vishal Chaturvedi</strong><br/>
    <small>CodSod Computer Science Education Channel</small>
  </p>
</div> 