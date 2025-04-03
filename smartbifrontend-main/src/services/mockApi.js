// Simulated API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock document processing
export const processDocument = async (imageUri) => {
    try {
        // Simulate API call delay
        await delay(500);

        // Mock successful response
        return {
            success: true,
            data: {
                documentId: `doc_${Date.now()}`,
                extractedText: "Sample extracted text from document...",
                confidence: 0.95,
                documentType: "invoice",
                processedAt: new Date().toISOString(),
            }
        };
    } catch (error) {
        // Simulate error response
        return {
            success: false,
            error: "Failed to process document"
        };
    }
};

// Mock document analysis
export const analyzeDocument = async (documentId) => {
    try {
        await delay(1500);

        return {
            success: true,
            data: {
                insights: [
                    "Revenue increased by 15% compared to last month",
                    "Top performing product category: Electronics",
                    "Customer satisfaction score: 4.5/5"
                ],
                recommendations: [
                    "Consider expanding the electronics category",
                    "Invest in customer service training",
                    "Review pricing strategy for competitive products"
                ],
                metrics: {
                    revenue: 250000,
                    growth: 15,
                    customerCount: 1200
                }
            }
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to analyze document"
        };
    }
}; 