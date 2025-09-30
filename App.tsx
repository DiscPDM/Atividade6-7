import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ItemView from './src/view/itemView';
import ItemDetailView from './src/view/itemDetailView';
import SettingsView from './src/view/settingsView';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { SettingsProvider } from './src/contexts/SettingsContext';
import { RootStackParamList } from './src/models/item';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'list';
          if (route.name === 'ItemList') {
            iconName = 'list';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1976d2',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="ItemList" 
        component={ItemView}
        options={{ tabBarLabel: 'Lista' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsView}
        options={{ tabBarLabel: 'Configurações' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="MainTabs"
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="MainTabs" component={TabNavigator} />
                <Stack.Screen name="ItemDetail" component={ItemDetailView} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}

