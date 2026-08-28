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
        <h1 className="title">Happy birthday Andy🥳❤️</h1>
        <p className="subtitle">
          Wishing you a year filled with happiness, good health, unforgettable
          memories, and endless success. Thank you for being such an amazing
          friend and for bringing so much positivity wherever you go. May this
          new chapter be your best one yet. Here's to celebrating you today and
          always. Happy Birthday! 🥳❤️
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
            <p>No messages yet. Be the first to wish Andy a happy birthday</p>
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
