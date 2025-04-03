import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Alert, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { analyzeDocument } from '../services/mockApi';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

const InsightCard = ({ insight, onPress }) => (
    <StyledTouchableOpacity
        onPress={onPress}
        className="bg-gray-800/50 rounded-2xl p-4 shadow-sm mb-4 backdrop-blur-lg"
    >
        <StyledView className="flex-row items-start">
            <StyledView className="w-10 h-10 rounded-full bg-purple-600/20 items-center justify-center mr-3 mt-1">
                <Ionicons name="bulb" size={20} color="#a78bfa" />
            </StyledView>
            <StyledView className="flex-1">
                <StyledText className="text-white text-lg font-medium mb-2">
                    {insight.title || 'Business Insight'}
                </StyledText>
                <StyledText className="text-gray-400 text-sm mb-3">
                    {insight.insights[0]}
                </StyledText>
                <StyledView className="flex-row flex-wrap">
                    {insight.recommendations.slice(0, 2).map((rec, index) => (
                        <StyledView
                            key={index}
                            className="bg-blue-600/20 rounded-full px-3 py-1 mr-2 mb-2"
                        >
                            <StyledText className="text-blue-400 text-xs">
                                {rec}
                            </StyledText>
                        </StyledView>
                    ))}
                </StyledView>
                <StyledText className="text-gray-500 text-xs mt-3">
                    Generated on {new Date(insight.date).toLocaleDateString()}
                </StyledText>
            </StyledView>
        </StyledView>
    </StyledTouchableOpacity>
);

const MetricCard = ({ title, value, icon, color }) => (
    <StyledView className="bg-gray-800/50 rounded-2xl p-4 shadow-sm mb-4 backdrop-blur-lg">
        <StyledView className="flex-row justify-between items-center">
            <StyledView className="flex-1">
                <StyledText className="text-gray-400 text-sm">{title}</StyledText>
                <StyledText className="text-2xl font-bold mt-1 text-white">{value}</StyledText>
            </StyledView>
            <StyledView className={`w-10 h-10 rounded-full ${color} items-center justify-center`}>
                <Ionicons name={icon} size={20} color="white" />
            </StyledView>
        </StyledView>
    </StyledView>
);

const InsightsScreen = () => {
    const { documents, insights, addInsight } = useApp();
    const [isGenerating, setIsGenerating] = useState(false);

    const handleInsightPress = (insight) => {
        Alert.alert(
            'Insight Details',
            `Title: ${insight.title || 'Business Insight'}\n\nInsights:\n${insight.insights.join('\n')}\n\nRecommendations:\n${insight.recommendations.join('\n')}`,
            [{ text: 'Close', style: 'default' }]
        );
    };

    const handleGenerateInsights = async () => {
        if (documents.length === 0) {
            Alert.alert('No Documents', 'Please scan or upload documents first to generate insights.');
            return;
        }

        setIsGenerating(true);
        try {
            // Generate insights for each document
            for (const doc of documents) {
                if (!doc.insightGenerated) {
                    const analysisResult = await analyzeDocument(doc.id);

                    if (analysisResult.success) {
                        const newInsight = {
                            id: `insight_${Date.now()}`,
                            documentId: doc.id,
                            title: `Analysis for ${doc.title}`,
                            date: new Date().toISOString(),
                            insights: analysisResult.data.insights,
                            recommendations: analysisResult.data.recommendations,
                            metrics: analysisResult.data.metrics,
                        };

                        addInsight(newInsight);
                    }
                }
            }

            Alert.alert('Success', 'New insights generated successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to generate insights. Please try again.');
            console.error('Insight generation error:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const totalRecommendations = insights.reduce((acc, insight) => acc + insight.recommendations.length, 0);

    return (
        <StyledView className="flex-1 bg-gray-900">
            <StyledScrollView className="flex-1 p-4">
                <StyledView className="flex-row justify-between items-center mb-6">
                    <StyledText className="text-xl font-bold text-white">AI Insights</StyledText>
                    <StyledTouchableOpacity
                        className="bg-purple-600/20 p-2 rounded-full"
                        onPress={handleGenerateInsights}
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                            <ActivityIndicator color="#a78bfa" />
                        ) : (
                            <Ionicons name="refresh" size={24} color="#a78bfa" />
                        )}
                    </StyledTouchableOpacity>
                </StyledView>

                {insights.length === 0 ? (
                    <StyledView className="items-center justify-center py-12">
                        <StyledView className="w-20 h-20 rounded-full bg-gray-800/50 items-center justify-center mb-4">
                            <Ionicons name="bulb" size={32} color="#6b7280" />
                        </StyledView>
                        <StyledText className="text-gray-400 text-lg font-medium">No insights yet</StyledText>
                        <StyledText className="text-gray-500 text-sm mt-2">
                            Process documents to generate insights
                        </StyledText>
                        <StyledTouchableOpacity
                            className="bg-purple-600/20 rounded-full px-6 py-3 mt-4 flex-row items-center"
                            onPress={handleGenerateInsights}
                            disabled={isGenerating}
                        >
                            <Ionicons name="bulb" size={20} color="#a78bfa" />
                            <StyledText className="text-purple-400 font-medium ml-2">
                                Generate Insights
                            </StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                ) : (
                    insights.map((insight) => (
                        <InsightCard
                            key={insight.id}
                            insight={insight}
                            onPress={() => handleInsightPress(insight)}
                        />
                    ))
                )}
            </StyledScrollView>
        </StyledView>
    );
};

export default InsightsScreen; 