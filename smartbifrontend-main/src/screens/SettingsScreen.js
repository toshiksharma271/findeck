import React from 'react';
import { ScrollView, TouchableOpacity, View, Text, Switch } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

const SettingItem = ({ title, description, icon, onPress, value, type = 'button' }) => (
    <StyledTouchableOpacity
        onPress={onPress}
        className="bg-gray-800/50 rounded-2xl p-4 shadow-sm mb-4 backdrop-blur-lg"
    >
        <StyledView className="flex-row items-center">
            <StyledView className="w-10 h-10 rounded-full bg-gray-700/50 items-center justify-center mr-3">
                <Ionicons name={icon} size={20} color="#60a5fa" />
            </StyledView>
            <StyledView className="flex-1">
                <StyledText className="text-white text-lg font-medium">{title}</StyledText>
                <StyledText className="text-gray-400 text-sm mt-1">{description}</StyledText>
            </StyledView>
            {type === 'button' ? (
                <Ionicons name="chevron-forward" size={20} color="#6b7280" />
            ) : (
                <Switch
                    value={value}
                    onValueChange={onPress}
                    trackColor={{ false: '#374151', true: '#3b82f6' }}
                    thumbColor={value ? '#60a5fa' : '#9ca3af'}
                />
            )}
        </StyledView>
    </StyledTouchableOpacity>
);

const SettingsScreen = () => {
    const { theme, toggleTheme } = useApp();
    const [notifications, setNotifications] = React.useState(true);
    const [autoScan, setAutoScan] = React.useState(false);

    const handleThemeToggle = () => {
        toggleTheme();
    };

    const handleNotificationsToggle = () => {
        setNotifications(!notifications);
    };

    const handleAutoScanToggle = () => {
        setAutoScan(!autoScan);
    };

    return (
        <StyledView className="flex-1 bg-gray-900">
            <StyledScrollView className="flex-1 p-4">
                <StyledText className="text-xl font-bold mb-6 text-white">Settings</StyledText>

                <StyledText className="text-gray-400 text-sm font-medium mb-4">Appearance</StyledText>
                <SettingItem
                    title="Dark Mode"
                    description="Toggle dark/light theme"
                    icon="moon"
                    onPress={handleThemeToggle}
                    value={theme === 'dark'}
                    type="switch"
                />

                <StyledText className="text-gray-400 text-sm font-medium mb-4 mt-6">Notifications</StyledText>
                <SettingItem
                    title="Push Notifications"
                    description="Receive updates and alerts"
                    icon="notifications"
                    onPress={handleNotificationsToggle}
                    value={notifications}
                    type="switch"
                />

                <StyledText className="text-gray-400 text-sm font-medium mb-4 mt-6">Document Processing</StyledText>
                <SettingItem
                    title="Auto-Scan"
                    description="Automatically scan documents when opened"
                    icon="scan"
                    onPress={handleAutoScanToggle}
                    value={autoScan}
                    type="switch"
                />

                <StyledText className="text-gray-400 text-sm font-medium mb-4 mt-6">Account</StyledText>
                <SettingItem
                    title="Profile"
                    description="Manage your account settings"
                    icon="person"
                    onPress={() => { }}
                />
                <SettingItem
                    title="Subscription"
                    description="View and manage your subscription"
                    icon="card"
                    onPress={() => { }}
                />

                <StyledText className="text-gray-400 text-sm font-medium mb-4 mt-6">Support</StyledText>
                <SettingItem
                    title="Help Center"
                    description="Get help and support"
                    icon="help-circle"
                    onPress={() => { }}
                />
                <SettingItem
                    title="About"
                    description="App information and version"
                    icon="information-circle"
                    onPress={() => { }}
                />

                <StyledTouchableOpacity className="bg-red-600/20 rounded-2xl p-4 flex-row items-center justify-center mt-6">
                    <Ionicons name="log-out" size={20} color="#ef4444" />
                    <StyledText className="text-red-400 font-medium ml-2">
                        Sign Out
                    </StyledText>
                </StyledTouchableOpacity>
            </StyledScrollView>
        </StyledView>
    );
};

export default SettingsScreen; 