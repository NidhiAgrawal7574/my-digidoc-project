// DigiDoc AI Symptom Checker - JavaScript Logic
// Handles user interactions, symptom detection, and API communication

console.log('script.js file loaded successfully!');

// API Configuration
const API_URL = 'http://127.0.0.1:8000/predict';

// Symptom keywords mapping (user input -> API format)
const SYMPTOM_KEYWORDS = {
    'fever': 'fever',
    'cough': 'cough',
    'sore throat': 'sore_throat',
    'throat': 'sore_throat',
    'fatigue': 'fatigue',
    'tired': 'fatigue',
    'exhausted': 'fatigue',
    'headache': 'headache',
    'head pain': 'headache',
    'nausea': 'nausea',
    'nauseated': 'nausea',
    'sick': 'nausea',
    'vomiting': 'vomiting',
    'vomit': 'vomiting',
    'throw up': 'vomiting',
    'diarrhea': 'diarrhea',
    'loose stool': 'diarrhea',
    'stomach': 'diarrhea',
    'chest pain': 'chest_pain',
    'chest': 'chest_pain',
    'shortness of breath': 'shortness_of_breath',
    'breathing': 'shortness_of_breath',
    'breathe': 'shortness_of_breath',
    'body pain': 'body_pain',
    'body ache': 'body_pain',
    'muscle pain': 'body_pain',
    'ache': 'body_pain',
    'loss of smell': 'loss_of_smell',
    'smell': 'loss_of_smell',
    'taste': 'loss_of_smell'
};

// All possible symptoms for API (initialize to 0)
const ALL_SYMPTOMS = [
    'fever', 'cough', 'sore_throat', 'fatigue', 'headache', 'nausea', 
    'vomiting', 'diarrhea', 'chest_pain', 'shortness_of_breath', 
    'body_pain', 'loss_of_smell'
];

// DOM Elements
let messageInput;
let sendButton;
let chatMessages;
let loadingIndicator;

// Initialize the chatbot when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing chatbot...');
    initializeChatbot();
});

// Initialize chatbot functionality
function initializeChatbot() {
    console.log('Initializing chatbot...');
    
    // Get DOM elements
    messageInput = document.getElementById('messageInput');
    sendButton = document.getElementById('sendButton');
    chatMessages = document.getElementById('chatMessages');
    loadingIndicator = document.getElementById('loadingIndicator');
    
    // Check if elements exist
    if (!messageInput || !sendButton || !chatMessages) {
        console.error('Required DOM elements not found!');
        console.log('messageInput:', messageInput);
        console.log('sendButton:', sendButton);
        console.log('chatMessages:', chatMessages);
        return;
    }
    
    console.log('All DOM elements found successfully');
    
    // Set welcome message timestamp
    const welcomeTime = document.getElementById('welcomeTime');
    if (welcomeTime) {
        welcomeTime.textContent = getCurrentTime();
    }
    
    // Event listeners
    sendButton.addEventListener('click', function() {
        console.log('Send button clicked!');
        handleSendMessage();
    });
    
    messageInput.addEventListener('keypress', function(event) {
        console.log('Key pressed:', event.key);
        handleKeyPress(event);
    });
    
    messageInput.addEventListener('input', function() {
        console.log('Input changed:', messageInput.value);
        handleInputChange();
    });
    
    // Focus on input field
    messageInput.focus();
    console.log('Chatbot initialization complete');
}

// Handle Enter key press in input field
function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSendMessage();
    }
}

// Handle input changes (enable/disable send button)
function handleInputChange() {
    const message = messageInput.value.trim();
    sendButton.disabled = message.length === 0;
}

// Main function to handle sending messages
async function handleSendMessage() {
    console.log('handleSendMessage called');
    
    const message = messageInput.value.trim();
    console.log('Message content:', message);
    
    // Validate input
    if (!message) {
        console.log('Empty message, returning');
        return;
    }
    
    console.log('Processing message:', message);
    
    // Disable input during processing
    setInputState(false);
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input field
    messageInput.value = '';
    
    // Show loading indicator
    showLoading(true);
    
    try {
        // Detect symptoms from user message
        const detectedSymptoms = detectSymptoms(message);
        
        console.log('Detected symptoms:', detectedSymptoms);
        
        // Check if any symptoms were detected
        if (Object.values(detectedSymptoms).every(value => value === 0)) {
            console.log('No symptoms detected');
            // No symptoms detected
            const noSymptomsResponse = "I couldn't identify any specific symptoms from your message. Please try describing your symptoms more clearly, such as:\n\n• Fever or high temperature\n• Cough or throat issues\n• Fatigue or tiredness\n• Headache or body pain\n• Breathing difficulties\n• Nausea or stomach problems";
            
            addMessage(noSymptomsResponse, 'bot');
            showLoading(false);
            setInputState(true);
            return;
        }
        
        console.log('Sending to API...');
        // Send to API
        const prediction = await sendToAPI(detectedSymptoms);
        console.log('API response:', prediction);
        
        // Create bot response
        const botResponse = createBotResponse(prediction, detectedSymptoms);
        
        // Add bot message to chat
        addMessage(botResponse, 'bot');
        
    } catch (error) {
        console.error('Error processing message:', error);
        
        // Handle different types of errors
        let errorMessage = "I'm sorry, I'm having trouble connecting to the diagnostic system. ";
        
        if (error.message.includes('fetch') || error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
            errorMessage += "Please make sure the DigiDoc API is running on http://127.0.0.1:8000";
        } else {
            errorMessage += "Please try again in a moment.";
        }
        
        addMessage(errorMessage, 'bot');
    } finally {
        // Re-enable input and hide loading
        showLoading(false);
        setInputState(true);
        messageInput.focus();
    }
}

// Detect symptoms from user message using keyword matching
function detectSymptoms(message) {
    const symptoms = {};
    
    // Initialize all symptoms to 0
    ALL_SYMPTOMS.forEach(symptom => {
        symptoms[symptom] = 0;
    });
    
    // Convert message to lowercase for case-insensitive matching
    const lowerMessage = message.toLowerCase();
    
    // Check for each keyword
    Object.entries(SYMPTOM_KEYWORDS).forEach(([keyword, symptomKey]) => {
        if (lowerMessage.includes(keyword)) {
            symptoms[symptomKey] = 1;
        }
    });
    
    return symptoms;
}

// Send symptoms to FastAPI backend
async function sendToAPI(symptoms) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            symptoms: symptoms
        })
    });
    
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    return data.prediction;
}

// Create formatted bot response
function createBotResponse(prediction, detectedSymptoms) {
    // Get list of detected symptoms for display
    const detectedList = Object.entries(detectedSymptoms)
        .filter(([key, value]) => value === 1)
        .map(([key]) => key.replace('_', ' '))
        .map(symptom => symptom.charAt(0).toUpperCase() + symptom.slice(1))
        .join(', ');
    
    let response = `Based on the symptoms you've described (${detectedList}), the preliminary assessment suggests: **${prediction}**\n\n`;
    
    response += "⚠️ **Important Disclaimer:**\n";
    response += "This is an AI-powered preliminary assessment and should not replace professional medical advice. ";
    response += "Please consult with a healthcare professional for proper diagnosis and treatment.\n\n";
    
    response += "Would you like to describe any additional symptoms or ask about specific concerns?";
    
    return response;
}

// Add message to chat (user or bot)
function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    // Handle markdown-style formatting for bot messages
    if (sender === 'bot') {
        messageContent.innerHTML = formatBotMessage(content);
    } else {
        messageContent.textContent = content;
    }
    
    const messageTime = document.createElement('div');
    messageTime.className = 'message-time';
    messageTime.textContent = getCurrentTime();
    
    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(messageTime);
    
    chatMessages.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    scrollToBottom();
}

// Format bot messages (handle basic markdown)
function formatBotMessage(content) {
    return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
        .replace(/\n/g, '<br>') // Line breaks
        .replace(/•/g, '•'); // Bullet points
}

// Show/hide loading indicator
function showLoading(show) {
    if (show) {
        loadingIndicator.classList.add('show');
    } else {
        loadingIndicator.classList.remove('show');
    }
    scrollToBottom();
}

// Enable/disable input controls
function setInputState(enabled) {
    messageInput.disabled = !enabled;
    sendButton.disabled = !enabled;
    
    if (enabled) {
        messageInput.focus();
    }
}

// Auto-scroll chat to bottom
function scrollToBottom() {
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
}

// Get current time in readable format
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
}

// Error handling for network issues
window.addEventListener('online', function() {
    console.log('Connection restored');
});

window.addEventListener('offline', function() {
    console.log('Connection lost');
    addMessage("Connection lost. Please check your internet connection and try again.", 'bot');
});

// Initialize input state on load
document.addEventListener('DOMContentLoaded', function() {
    // Enable send button only when there's text
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    
    if (messageInput && sendButton) {
        sendButton.disabled = true;
    }
});