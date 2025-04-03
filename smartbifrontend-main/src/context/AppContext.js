import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [documents, setDocuments] = useState([]);
    const [insights, setInsights] = useState([]);
    const [settings, setSettings] = useState({
        notifications: true,
        darkMode: true,
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [savedDocuments, savedInsights, savedSettings] = await Promise.all([
                AsyncStorage.getItem('documents'),
                AsyncStorage.getItem('insights'),
                AsyncStorage.getItem('settings'),
            ]);

            if (savedDocuments) setDocuments(JSON.parse(savedDocuments));
            if (savedInsights) setInsights(JSON.parse(savedInsights));
            if (savedSettings) setSettings(JSON.parse(savedSettings));
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const saveData = async () => {
        try {
            await Promise.all([
                AsyncStorage.setItem('documents', JSON.stringify(documents)),
                AsyncStorage.setItem('insights', JSON.stringify(insights)),
                AsyncStorage.setItem('settings', JSON.stringify(settings)),
            ]);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const addDocument = (document) => {
        const newDocuments = [document, ...documents];
        setDocuments(newDocuments);
        AsyncStorage.setItem('documents', JSON.stringify(newDocuments));
    };

    const addInsight = (insight) => {
        const newInsights = [insight, ...insights];
        setInsights(newInsights);
        AsyncStorage.setItem('insights', JSON.stringify(newInsights));
    };

    const updateSettings = (newSettings) => {
        setSettings(newSettings);
        AsyncStorage.setItem('settings', JSON.stringify(newSettings));
    };

    return (
        <AppContext.Provider
            value={{
                documents,
                insights,
                settings,
                addDocument,
                addInsight,
                updateSettings,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}; 