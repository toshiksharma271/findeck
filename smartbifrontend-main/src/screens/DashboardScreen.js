import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Alert, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { scanDocument } from '../utils/helpers';
import { processDocument, analyzeDocument } from '../services/mockApi';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

const MetricCard = ({ title, value, icon, color, trend }) => (
    <StyledView className="bg-gray-800/50 rounded-2xl p-4 shadow-sm mb-4 backdrop-blur-lg">
        <StyledView className="flex-row justify-between items-center">
            <StyledView className="flex-1">
                <StyledText className="text-gray-400 text-sm font-medium">{title}</StyledText>
                <StyledText className="text-3xl font-bold mt-1 text-white">{value}</StyledText>
                {trend && (
                    <StyledView className="flex-row items-center mt-2">
                        <Ionicons
                            name={trend > 0 ? 'trending-up' : 'trending-down'}
                            size={16}
                            color={trend > 0 ? '#10b981' : '#ef4444'}
                        />
                        <StyledText
                            className={`text-sm ml-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}
                        >
                            {Math.abs(trend)}% from last month
                        </StyledText>
                    </StyledView>
                )}
            </StyledView>
            <StyledView className={`w-12 h-12 rounded-full ${color} items-center justify-center`}>
                <Ionicons name={icon} size={24} color="white" />
            </StyledView>
        </StyledView>
    </StyledView>
);

const QuickAction = ({ title, icon, onPress, disabled, loading }) => (
    <StyledTouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        className="bg-gray-800/50 rounded-2xl p-4 shadow-sm mb-4 backdrop-blur-lg"
    >
        <StyledView className="flex-row items-center">
            <StyledView className="w-10 h-10 rounded-full bg-blue-900/50 items-center justify-center mr-3">
                {loading ? (
                    <ActivityIndicator color="#60a5fa" />
                ) : (
                    <Ionicons name={icon} size={20} color="#60a5fa" />
                )}
            </StyledView>
            <StyledText className="text-lg font-medium text-white">
                {loading ? 'Processing...' : title}
            </StyledText>
        </StyledView>
    </StyledTouchableOpacity>
);

const DashboardScreen = () => {
    const { documents, insights, addDocument, addInsight } = useApp();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleScanDocument = async () => {
        try {
            setIsProcessing(true);
            const imageUri = await scanDocument();

            if (imageUri) {
                const processResult = await processDocument(imageUri);

                if (processResult.success) {
                    const newDocument = {
                        id: processResult.data.documentId,
                        title: `Document ${documents.length + 1}`,
                        date: new Date().toISOString(),
                        type: processResult.data.documentType,
                        status: 'Processed',
                        uri: imageUri,
                        extractedText: processResult.data.extractedText,
                        confidence: processResult.data.confidence,
                    };

                    addDocument(newDocument);

                    const analysisResult = await analyzeDocument(processResult.data.documentId);

                    if (analysisResult.success) {
                        const newInsight = {
                            id: `insight_${Date.now()}`,
                            documentId: newDocument.id,
                            date: new Date().toISOString(),
                            insights: analysisResult.data.insights,
                            recommendations: analysisResult.data.recommendations,
                            metrics: analysisResult.data.metrics,
                        };

                        addInsight(newInsight);
                        Alert.alert('Success', 'Document processed and analyzed successfully!');
                    }
                } else {
                    Alert.alert('Error', processResult.error || 'Failed to process document');
                }
            }
        } catch (error) {
            Alert.alert('Error', 'An unexpected error occurred');
            console.error('Document processing error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <StyledView className="flex-1 bg-gray-900">

            <StyledScrollView className="flex-1 p-4">
                <StyledText className="text-xl font-bold mb-4 text-white">Overview</StyledText>
                <MetricCard
                    title="Total Documents"
                    value={documents.length.toString()}
                    icon="document-text"
                    color="bg-yellow-600"
                    trend={15}
                />
                <MetricCard
                    title="Pending Documents"
                    value={documents.filter(doc => doc.status === 'Pending').length.toString()}
                    icon="time"
                    color="bg-red-600"
                    trend={-5}
                />
                <MetricCard
                    title="AI Insights"
                    value={`${insights.length} Available`}
                    icon="bulb"
                    color="bg-purple-600"
                    trend={25}
                />

                <StyledText className="text-xl font-bold mt-6 mb-4 text-white">Quick Actions</StyledText>
                <QuickAction
                    title="Scan Document"
                    icon="scan"
                    onPress={handleScanDocument}
                    loading={isProcessing}
                />
            </StyledScrollView>
        </StyledView>
    );
};

export default DashboardScreen; 