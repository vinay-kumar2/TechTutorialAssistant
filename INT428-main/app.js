const API_KEY = "AIzaSyDRaVJAIzdpuvms242NBB9ZX3aycYLsxVw"; 
const API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"; 

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Theme switching functionality
const themeSwitcher = document.getElementById('theme-switcher');
let currentTheme = 1;

themeSwitcher.addEventListener('click', () => {
    currentTheme = (currentTheme % 7) + 1;
    document.body.setAttribute('data-theme', `theme${currentTheme}`);
    
    // Animate the button
    themeSwitcher.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        themeSwitcher.style.transform = 'rotate(0deg)';
    }, 300);
});

// Function to detect if text is in Hindi or Hinglish
function isHindiOrHinglish(text) {
    const hindiRegex = /[\u0900-\u097F]/;
    const hinglishRegex = /(hai|ka|ki|ke|ko|me|se|ne|kaun|kya|kahan|kab|kyun|kaise|kitna|kuch|bahut|bhi|nahi|nahin|na|hi|to|bhi|aur|ya|ye|wo|us|un|in|is|itne|itni|itna|aap|tum|tu|main|hum|sab|kuch|kuchh|kya|kyun|kaise|kahan|kab|kitna|kuch|bahut|bhi|nahi|nahin|na|hi|to|bhi|aur|ya|ye|wo|us|un|in|is|itne|itni|itna|aap|tum|tu|main|hum|sab)/i;
    return hindiRegex.test(text) || hinglishRegex.test(text);
}

const TECH_PROMPT = `You are Tech Tutorial Assistant, an advanced AI-powered tech tutorial assistant designed to help users learn and master various technology topics. Your purpose is to provide clear, comprehensive, and practical guidance on programming, web development, AI, and other tech-related subjects.

Behavior Rules:

When users ask about technology topics, provide detailed information about:
- Programming languages and frameworks
- Web development concepts and best practices
- AI and machine learning fundamentals
- Software development methodologies
- Data structures and algorithms
- System design and architecture
- Cloud computing and DevOps
- Cybersecurity and best practices
- Emerging technologies and trends

Format your responses with:
1. Start with a brief introduction or context
2. When showing code examples:
   - Use proper language-specific syntax highlighting
   - Include descriptive comments
   - Show output or expected results
   - Explain the code after showing it
3. Format code blocks exactly like this:

\`\`\`[language]
// Your code here with proper indentation
// and comments
\`\`\`

4. For programming questions, structure your response like this:
   - Brief explanation of what the code does
   - Code block with syntax highlighting
   - Explanation of key concepts
   - Expected output or result

Example response format:
Sure! Here's a simple Java program that prints "Hello, World!" — a classic beginner example:

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

Let me know if you want a simple Java program that does something else — like taking user input, adding two numbers, or working with loops or conditions.

Use relevant emojis for different topics:
   - 💻 for programming
   - 🌐 for web development
   - 🤖 for AI and ML
   - 🔧 for tools and frameworks
   - 📚 for learning resources
   - 💡 for tips and best practices
   - ⚡ for performance optimization
   - 🔒 for security
   - 🚀 for deployment and DevOps

If the user asks anything unrelated to technology, politely respond:
"I am a tech tutorial assistant and I can only help with technology-related topics."

If the user asks who created you, respond:
"I was created by a team of developers passionate about making tech education accessible to everyone."

Be informative, professional, and encouraging in your tone. Keep your responses clear, concise, and practical.`;

const HINGLISH_TECH_PROMPT = TECH_PROMPT + "\n\nIMPORTANT: The user is asking in Hinglish (mix of Hindi and English). Please understand their Hinglish query and respond in English.";

// Animation functionality
const animationToggle = document.getElementById('animation-toggle');
let currentAnimation = 'none';
let animationContainer = null;

function createAnimationContainer() {
    if (animationContainer) {
        animationContainer.remove();
    }
    animationContainer = document.createElement('div');
    animationContainer.id = 'animation-container';
    animationContainer.style.position = 'fixed';
    animationContainer.style.top = '0';
    animationContainer.style.left = '0';
    animationContainer.style.width = '100%';
    animationContainer.style.height = '100%';
    animationContainer.style.pointerEvents = 'none';
    animationContainer.style.zIndex = '1000';
    document.body.appendChild(animationContainer);
}

function createSnowflakes() {
    for (let i = 0; i < 10; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'animation-element snowflake';
        snowflake.innerHTML = '❄';
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.animationDuration = `${7 + Math.random() * 6}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        animationContainer.appendChild(snowflake);
    }
}

function createRaindrops() {
    for (let i = 0; i < 20; i++) {
        const raindrop = document.createElement('div');
        raindrop.className = 'animation-element raindrop';
        raindrop.style.left = `${Math.random() * 100}%`;
        raindrop.style.animationDuration = `${1 + Math.random() * 2}s`;
        raindrop.style.animationDelay = `${Math.random() * 2}s`;
        animationContainer.appendChild(raindrop);
    }
}

function createFire() {
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'animation-element fire-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${2 + Math.random() * 2}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        animationContainer.appendChild(particle);
    }
}

function createStars() {
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'animation-element star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${2 + Math.random() * 3}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        animationContainer.appendChild(star);
    }
}

function createAsteroids() {
    for (let i = 0; i < 5; i++) {
        const asteroid = document.createElement('div');
        asteroid.className = 'animation-element asteroid';
        asteroid.innerHTML = '☄️';
        asteroid.style.top = `${Math.random() * 100}%`;
        asteroid.style.animationDuration = `${8 + Math.random() * 4}s`;
        asteroid.style.animationDelay = `${Math.random() * 2}s`;
        animationContainer.appendChild(asteroid);
    }
}

function setAnimation(type) {
    currentAnimation = type;
    createAnimationContainer();
    
    switch(type) {
        case 'snow':
            createSnowflakes();
            break;
        case 'rain':
            createRaindrops();
            break;
        case 'fire':
            createFire();
            break;
        case 'stars':
            createStars();
            break;
        case 'asteroids':
            createAsteroids();
            break;
        case 'none':
            animationContainer.remove();
            break;
    }
}

// Add click handlers for animation options
document.querySelectorAll('.animation-option').forEach(option => {
    option.addEventListener('click', () => {
        const animationType = option.dataset.animation;
        setAnimation(animationType);
        
        // Animate the toggle button
        animationToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            animationToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
});

// Initialize with no animation
document.addEventListener("DOMContentLoaded", () => {
    try {
        setAnimation('none');
        displayMessage("Hi Vinay! I'm Tech Tutorial Assistant — your personal guide to mastering technology and programming. How can I help you today? 💻✨", "bot-message");

        // Ensure all required elements are present
        if (!userInput || !sendButton || !chatBox) {
            throw new Error("Required elements not found");
        }

        userInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") sendMessage();
        });

        sendButton.addEventListener("click", sendMessage);

        // Initialize theme
        document.body.setAttribute('data-theme', `theme${currentTheme}`);
    } catch (error) {
        console.error("Initialization error:", error);
    }
});

function displayMessage(text, classNames) {
    try {
        const messageDiv = document.createElement("div");
        messageDiv.className = Array.isArray(classNames) ? classNames.join(" ") : classNames;
        
        if (!text) {
            text = "An error occurred while processing the message.";
        }
        
        if (classNames.includes("user-message")) {
            messageDiv.textContent = text;
        } else {
            // For bot messages, handle code blocks and formatting
            text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
                try {
                    const pre = document.createElement('pre');
                    pre.className = 'code-block';
                    
                    const codeElement = document.createElement('code');
                    codeElement.className = language ? `language-${language}` : '';
                    codeElement.textContent = code.trim();
                    
                    const copyButton = document.createElement('button');
                    copyButton.className = 'copy-button';
                    copyButton.innerHTML = '📋';
                    copyButton.title = 'Copy code';
                    copyButton.onclick = async () => {
                        try {
                            await navigator.clipboard.writeText(code.trim());
                            copyButton.innerHTML = '✓';
                            setTimeout(() => {
                                copyButton.innerHTML = '📋';
                            }, 2000);
                        } catch (error) {
                            console.error("Copy failed:", error);
                            copyButton.innerHTML = '❌';
                            setTimeout(() => {
                                copyButton.innerHTML = '📋';
                            }, 2000);
                        }
                    };
                    
                    pre.appendChild(codeElement);
                    pre.appendChild(copyButton);
                    
                    return pre.outerHTML;
                } catch (error) {
                    console.error("Code block formatting error:", error);
                    return match; // Return original text if formatting fails
                }
            });
            
            // Convert markdown-style bold to HTML
            text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            
            // Convert line breaks to HTML
            text = text.replace(/\n/g, '<br>');
            
            messageDiv.innerHTML = text;
        }
        
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        return messageDiv;
    } catch (error) {
        console.error("Message display error:", error);
        const errorDiv = document.createElement("div");
        errorDiv.className = "bot-message error";
        errorDiv.textContent = "An error occurred while displaying the message.";
        chatBox.appendChild(errorDiv);
        return errorDiv;
    }
}

async function sendMessage() {
    try {
        const message = userInput.value.trim();
        if (message === "") return;

        // Display the message as-is without HTML encoding
        displayMessage(message, "user-message");
        userInput.value = "";

        const typingElement = displayMessage("💭 Processing your request...", ["bot-message", "typing"]);

        try {
            const response = await callGeminiAPI(message);
            typingElement.remove();
            displayMessage(response, "bot-message");
        } catch (error) {
            console.error("API Error:", error);
            typingElement.remove();
            displayMessage("I apologize, but I'm having trouble processing your request right now. Please try again later.", "bot-message");
        }
    } catch (error) {
        console.error("Send message error:", error);
        displayMessage("An error occurred while sending your message. Please try again.", "bot-message");
    }
}

async function callGeminiAPI(userMessage) {
    try {
        if (!API_KEY || !API_ENDPOINT) {
            throw new Error("API configuration missing");
        }

        const prompt = isHindiOrHinglish(userMessage) ? HINGLISH_TECH_PROMPT : TECH_PROMPT;
        
        const requestBody = {
            contents: [{
                parts: [{
                    text: `${prompt}\n\nUser: ${userMessage}\n\nAssistant:`
                }]
            }]
        };

        const response = await fetch(`${API_ENDPOINT}?key=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
            throw new Error("Invalid API response format");
        }

        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("API call error:", error);
        throw error;
    }
}
