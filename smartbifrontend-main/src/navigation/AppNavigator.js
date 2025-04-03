import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';

// Import screens
import DashboardScreen from '../screens/DashboardScreen';
import DocumentsScreen from '../screens/DocumentsScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import InsightsScreen from '../screens/InsightsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const StyledView = styled(View);

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        switch (route.name) {
                            case 'Dashboard':
                                iconName = focused ? 'home' : 'home-outline';
                                break;
                            case 'Documents':
                                iconName = focused ? 'document-text' : 'document-text-outline';
                                break;
                            case 'Analytics':
                                iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                                break;
                            case 'Insights':
                                iconName = focused ? 'bulb' : 'bulb-outline';
                                break;
                            case 'Settings':
                                iconName = focused ? 'settings' : 'settings-outline';
                                break;
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#60a5fa',
                    tabBarInactiveTintColor: '#6b7280',
                    tabBarStyle: {
                        backgroundColor: '#1f2937',
                        borderTopWidth: 0,
                        paddingBottom: 8,
                        paddingTop: 8,
                    },
                    headerStyle: {
                        backgroundColor: '#1f2937',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerShown: true,
                })}
            >
                <Tab.Screen
                    name="Dashboard"
                    component={DashboardScreen}
                    options={{
                        title: 'SmartBI',
                    }}
                />
                <Tab.Screen
                    name="Documents"
                    component={DocumentsScreen}
                    options={{
                        title: 'Documents',
                    }}
                />
                <Tab.Screen
                    name="Analytics"
                    component={AnalyticsScreen}
                    options={{
                        title: 'Analytics',
                    }}
                />
                <Tab.Screen
                    name="Insights"
                    component={InsightsScreen}
                    options={{
                        title: 'AI Insights',
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        title: 'Settings',
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator; 