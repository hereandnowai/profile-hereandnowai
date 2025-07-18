import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import branding from '../branding.json';

const ChatWindow = styled(motion.div)`
  width: 100%;
  max-width: 600px; /* Adjust as needed */
  height: 500px; /* Adjust as needed */
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 50px auto; /* Center the chatbot and add some margin */
`;

const ChatHeader = styled.div`
  padding: 15px;
  background: ${branding.brand.colors.secondary};
  color: white;
  font-weight: bold;
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 18px;
  max-width: 80%;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  background: ${props => props.isUser ? branding.brand.colors.primary : '#f1f1f1'};
  color: #000;
`;

const ChatInputContainer = styled.div`
    display: flex;
    padding: 10px;
    border-top: 1px solid #ddd;
`;

const ChatInput = styled.input`
    flex-grow: 1;
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 10px 15px;
    margin-right: 10px;
`;

const SendButton = styled.button`
  background: ${branding.brand.colors.primary};
  color: #000;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, isUser: true };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // TODO: Backend API call
        const response = "This is a placeholder response from the chatbot.";
        const botMessage = { text: response, isUser: false };
        setMessages(prev => [...prev, botMessage]);
    };


    return (
        <section id="chatbot" style={{ padding: '100px 0', background: '#f0f2f5', textAlign: 'center' }}>
            <h1>Chat with our AI</h1>
            <ChatWindow
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <ChatHeader>Huronow AI Bot</ChatHeader>
                <MessagesContainer>
                    {messages.map((msg, index) => (
                        <Message key={index} isUser={msg.isUser}>{msg.text}</Message>
                    ))}
                </MessagesContainer>
                <ChatInputContainer>
                    <ChatInput
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask me anything..."
                    />
                    <SendButton onClick={handleSend}><FaPaperPlane /></SendButton>
                </ChatInputContainer>
            </ChatWindow>
        </section>
    );
};

export default Chatbot;