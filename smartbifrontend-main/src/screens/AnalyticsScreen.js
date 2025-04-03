import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { LineChart } from 'react-native-chart-kit';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

const ChartCard = ({ title, value, change, icon, color }) => (
    <StyledView className="bg-gray-800/50 rounded-2xl p-4 shadow-sm mb-4 backdrop-blur-lg">
        <StyledView className="flex-row justify-between items-center mb-4">
            <StyledText className="text-white text-lg font-medium">{title}</StyledText>
            <StyledView className={`w-10 h-10 rounded-full ${color} items-center justify-center`}>
                <Ionicons name={icon} size={20} color="white" />
            </StyledView>
        </StyledView>
        <StyledText className="text-2xl font-bold text-white mb-2">{value}</StyledText>
        <StyledView className="flex-row items-center">
            <Ionicons
                name={change >= 0 ? 'trending-up' : 'trending-down'}
                size={16}
                color={change >= 0 ? '#10b981' : '#ef4444'}
            />
            <StyledText
                className={`text-sm ml-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}
            >
                {Math.abs(change)}% from last period
            </StyledText>
        </StyledView>
    </StyledView>
);

const MetricRow = ({ title, value, trend }) => (
    <StyledView className="flex-row justify-between items-center py-3 border-b border-gray-700/50">
        <StyledText className="text-gray-400">{title}</StyledText>
        <StyledView className="flex-row items-center">
            <StyledText className="text-white font-medium mr-2">{value}</StyledText>
            <StyledText className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {trend >= 0 ? '+' : ''}{trend}%
            </StyledText>
        </StyledView>
    </StyledView>
);

const AnalyticsScreen = () => {
    const { insights } = useApp();

    // Mock data for demonstration
    const metrics = {
        revenue: {
            value: '$250,000',
            change: 15,
        },
        customers: {
            value: '1,200',
            change: 8,
        },
        growth: {
            value: '25%',
            change: 5,
        },
    };

    const performanceMetrics = [
        { title: 'Revenue Growth', value: '$250,000', trend: 15 },
        { title: 'Customer Acquisition', value: '120', trend: 8 },
        { title: 'Customer Retention', value: '92%', trend: 2 },
        { title: 'Average Order Value', value: '$208', trend: -3 },
    ];

    return (
        <StyledView className="flex-1 bg-gray-900">
            <StyledScrollView className="flex-1 p-4">
                <StyledText className="text-xl font-bold mb-6 text-white">Analytics Overview</StyledText>

                <StyledView className="flex justify-between mb-6 ">
                    <ChartCard
                        title="Revenue"
                        value={metrics.revenue.value}
                        change={metrics.revenue.change}
                        icon="trending-up"
                        color="bg-green-600"
                    />
                    <ChartCard
                        title="Customers"
                        value={metrics.customers.value}
                        change={metrics.customers.change}
                        icon="people"
                        color="bg-blue-600"
                    />
                    <ChartCard
                        title="Growth"
                        value={metrics.growth.value}
                        change={metrics.growth.change}
                        icon="bar-chart"
                        color="bg-purple-600"
                    />
                </StyledView>

                <StyledView className="bg-gray-800/50 rounded-2xl p-4 shadow-sm mb-4 backdrop-blur-lg">
                    <StyledText className="text-white text-lg font-medium mb-4">Performance Metrics</StyledText>
                    {performanceMetrics.map((metric, index) => (
                        <MetricRow
                            key={index}
                            title={metric.title}
                            value={metric.value}
                            trend={metric.trend}
                        />
                    ))}
                </StyledView>

                <StyledTouchableOpacity className="bg-blue-600/20 rounded-2xl p-4 flex-row items-center justify-center mb-5">
                    <Ionicons name="download" size={20} color="#60a5fa" />
                    <StyledText className="text-blue-400 font-medium ml-2">
                        Download Full Report
                    </StyledText>
                </StyledTouchableOpacity>
            </StyledScrollView>
        </StyledView>
    );
};

export default AnalyticsScreen; 