import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import MessageModal from '../components/MessageModal';
import StickyNote from '../components/StickyNote';
import './HomePage.css';

export default function HomePage() {
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(docs);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching messages:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDeleteMessage = (id) => {
    // TODO: Implement delete functionality
    console.log('Delete message:', id);
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1 className="title">🎓 Marian's Graduation Board 🎓</h1>
        <p className="subtitle">
          Congratulations Meg, we love you and are so proud of you!
        </p>
        <button
          className="add-message-btn"
          onClick={() => setIsModalOpen(true)}
        >
          Leave a message
        </button>
      </header>

      <MessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMessageAdded={() => setMessages(messages)}
      />

      <div className="sticky-notes-wall">
        {loading ? (
          <div className="loading">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="empty-state">
            <p>No messages yet. Be the first to congratulate Marian!</p>
            <button
              className="add-message-btn-secondary"
              onClick={() => setIsModalOpen(true)}
            >
              Leave a message
            </button>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={msg.id}
              className="sticky-note-wrapper"
            >
              <StickyNote
                message={msg.message}
                name={msg.name}
                colorIndex={index}
                onDelete={() => handleDeleteMessage(msg.id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
