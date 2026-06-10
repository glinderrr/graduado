import { useState } from 'react';
import { motion } from 'framer-motion';
import './StickyNote.css';

const colors = [
  'sticky-note-yellow',
  'sticky-note-pink',
  'sticky-note-blue',
  'sticky-note-green',
  'sticky-note-purple',
  'sticky-note-orange',
  'sticky-note-red',
  'sticky-note-indigo',
];

function hashText(text) {
  return [...text].reduce(
    (hash, character) => Math.imul(hash ^ character.charCodeAt(0), 16777619),
    2166136261
  ) >>> 0;
}

function seededValue(seed) {
  const mixed = Math.imul(seed ^ (seed >>> 16), 2246822507);
  return ((mixed ^ (mixed >>> 13)) >>> 0) / 4294967296;
}

export default function StickyNote({ message, name, colorIndex = 0, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const canExpand = message.length > 110;
  const seed = hashText(`${name || 'Anonymous'}:${message}`);
  const presentation = {
    color: colors[colorIndex % colors.length],
    rotation: seededValue(seed) * 6 - 3,
    x: seededValue(seed + 1) * 200 - 100,
    y: seededValue(seed + 2) * 200 - 100,
  };

  return (
    <motion.div
      className={`sticky-note ${presentation.color}${isExpanded ? ' sticky-note-expanded' : ''}`}
      style={{
        rotate: presentation.rotation,
      }}
      initial={{ opacity: 0, x: presentation.x, y: presentation.y, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, zIndex: 50 }}
    >
      <div className="sticky-note-content">
        <p className={`message-text${isExpanded ? ' message-text-expanded' : ''}`}>
          {message}
        </p>
        {canExpand && (
          <button
            type="button"
            className="more-btn"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded((expanded) => !expanded)}
          >
            {isExpanded ? 'Less' : 'More'}
          </button>
        )}
        <p className="message-from">- {name || 'Anonymous'}</p>
      </div>
      {onDelete && (
        <button
          onClick={onDelete}
          className="delete-btn"
          title="Delete message"
        >
          ×
        </button>
      )}
    </motion.div>
  );
}
