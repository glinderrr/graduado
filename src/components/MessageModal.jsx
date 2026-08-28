import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import './MessageModal.css';

export default function MessageModal({ isOpen, onClose, onMessageAdded }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!message.trim()) {
      setError('Please type a message!');
      return;
    }

    // Basic Firebase config validation to avoid hanging requests when env is not set
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY || '';
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || '';
    if (
      apiKey.trim() === '' ||
      apiKey.includes('your') ||
      apiKey.includes('Dummy') ||
      projectId.trim() === '' ||
      projectId.includes('your') ||
      projectId === 'graduado'
    ) {
      setError('Firebase is not configured. Please add your Firebase credentials to the .env file.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'messages'), {
        name: name.trim() || 'Anonymous',
        message: message.trim(),
        timestamp: serverTimestamp(),
      });

      setName('');
      setMessage('');
      onMessageAdded?.();
      onClose();
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, y: -50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: -50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={onClose}>
              ×
            </button>

            <h2 className="modal-title">Type your message</h2>

            <form onSubmit={handleSubmit} className="message-form">
              <div className="form-group">
                <label htmlFor="name">Your Name (optional)</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name or leave blank for Anonymous"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength="50"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Birthday Message</label>
                <textarea
                  id="message"
                  placeholder="Write your birthday message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength="300"
                  rows="6"
                />
                <span className="char-count">
                  {message.length}/300
                </span>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="submit-btn"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
