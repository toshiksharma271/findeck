import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Image, Alert, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { scanDocument } from '../utils/helpers';
import { analyzeDocument } from '../services/api';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

const DocumentCard = ({ document, onPress }) => (
    <StyledTouchableOpacity
        onPress={onPress}
        className="bg-gray-800/50 rounded-2xl p-4 shadow-sm mb-4 backdrop-blur-lg"
    >
        <StyledView className="flex-row items-center">
            <StyledView className="w-16 h-16 rounded-xl bg-gray-700/50 items-center justify-center mr-4">
                <Ionicons name="document-text" size={24} color="#60a5fa" />
            </StyledView>
            <StyledView className="flex-1">
                <StyledText className="text-white text-lg font-medium">{document.title}</StyledText>
                <StyledText className="text-gray-400 text-sm mt-1">
                    {new Date(document.date).toLocaleDateString()}
                </StyledText>
                <StyledView className="flex-row items-center mt-2">
                    <StyledView className={`px-2 py-1 rounded-full ${document.status === 'Processed' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                        }`}>
                        <StyledText className={`text-xs font-medium ${document.status === 'Processed' ? 'text-green-400' : 'text-yellow-400'
                            }`}>
                            {document.status}
                        </StyledText>
                    </StyledView>
                    <StyledText className="text-gray-500 text-xs ml-2">
                        {document.type}
                    </StyledText>
                </StyledView>
            </StyledView>
            <Ionicons name="chevron-forward" size={20} color="#6b7280" />
        </StyledView>
    </StyledTouchableOpacity>
);

const DocumentsScreen = () => {
    const { documents, addDocument, addInsight } = useApp();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleDocumentPress = (document) => {
        // TODO: Implement document detail view
        console.log('Document pressed:', document);
    };

    const handleAddDocument = async () => {
        try {
            setIsProcessing(true);
            const result = await scanDocument();

            if (result && result.success) {
                const newDocument = {
                    id: result.data.documentId || `doc_${Date.now()}`,
                    title: `Document ${documents.length + 1}`,
                    date: new Date().toISOString(),
                    type: result.data.documentType || 'Unknown',
                    status: 'Processed',
                    uri: result.uri,
                    extractedText: result.data.extractedText,
                    confidence: result.data.confidence,
                };

                addDocument(newDocument);

                // Analyze document
                const analysisResult = await analyzeDocument(newDocument.id);

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
                } else {
                    Alert.alert('Warning', 'Document uploaded but analysis failed');
                }
            } else {
                Alert.alert('Error', 'Failed to scan and upload document');
            }
        } catch (error) {
            console.error('Document processing error:', error);
            Alert.alert('Error', 'Failed to process document');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <StyledView className="flex-1 bg-gray-900">
            <StyledScrollView className="flex-1 p-4">
                <StyledView className="flex-row justify-between items-center mb-6">
                    <StyledText className="text-xl font-bold text-white">Documents</StyledText>
                    <StyledTouchableOpacity
                        onPress={handleAddDocument}
                        disabled={isProcessing}
                        className="bg-blue-600/20 p-2 rounded-full"
                    >
                        {isProcessing ? (
                            <ActivityIndicator color="#60a5fa" />
                        ) : (
                            <Ionicons name="add" size={24} color="#60a5fa" />
                        )}
                    </StyledTouchableOpacity>
                </StyledView>

                {documents.length === 0 ? (
                    <StyledView className="items-center justify-center py-12">
                        <StyledView className="w-20 h-20 rounded-full bg-gray-800/50 items-center justify-center mb-4">
                            <Ionicons name="document-text" size={32} color="#6b7280" />
                        </StyledView>
                        <StyledText className="text-gray-400 text-lg font-medium">No documents yet</StyledText>
                        <StyledText className="text-gray-500 text-sm mt-2">
                            Scan or upload your first document
                        </StyledText>
                    </StyledView>
                ) : (
                    documents.map((doc) => (
                        <DocumentCard
                            key={doc.id}
                            document={doc}
                            onPress={() => handleDocumentPress(doc)}
                        />
                    ))
                )}
            </StyledScrollView>
        </StyledView>
    );
};

export default DocumentsScreen; 