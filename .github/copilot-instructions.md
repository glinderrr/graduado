# Marian's Graduation Congratulations Board - Development Guide

## Project Overview

This is a React Router + Firebase web application that allows friends and family to leave congratulatory messages for Marian's graduation. Messages appear as interactive sticky notes on the page and are stored in real-time with Firebase Firestore.

## Tech Stack

- **Frontend**: React 18, React Router v6, Vite
- **Backend**: Firebase Firestore
- **Styling**: Tailwind CSS, Custom CSS
- **Animations**: Framer Motion
- **Build Tool**: Vite with HMR support

## Key Features

1. **Modal Message Submission** - Users submit messages through a centered modal
2. **Sticky Notes Display** - Messages appear as colorful, randomly rotated sticky notes
3. **Real-time Updates** - Messages sync instantly from Firestore
4. **Responsive Design** - Works on mobile and desktop
5. **No Authentication** - Anonymous and named submissions allowed

## Project Structure

```
src/
├── components/
│   ├── StickyNote.jsx       # Sticky note UI component with animations
│   ├── StickyNote.css       # Sticky note styling
│   ├── MessageModal.jsx     # Modal form for submissions
│   └── MessageModal.css     # Modal styling
├── pages/
│   ├── HomePage.jsx         # Main page with notes wall
│   └── HomePage.css         # Page layout and styles
├── config/
│   └── firebase.js          # Firebase initialization
├── App.jsx                  # Router setup
├── main.jsx                 # Entry point
└── index.css                # Global styles
```

## Development Workflow

### Starting Development

```bash
npm run dev
```

The app runs on `http://localhost:5173` with HMR enabled.

### Building

```bash
npm run build
```

Creates optimized production build in `dist/` folder.

## Firebase Configuration

Messages are stored in Firestore with this structure:

**Collection**: `messages`
- `id`: Document ID
- `name`: String (user name or "Anonymous")
- `message`: String (congratulations text)
- `timestamp`: Server timestamp

### Firestore Rules

Public read access, time-limited write access:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{document=**} {
      allow read: if true;
      allow write: if request.time < timestamp.date(2026, 12, 31);
    }
  }
}
```

## Component Details

### StickyNote Component

- Props: `message`, `name`, `onDelete`
- Features:
  - Random color selection from 8 colors
  - Random rotation (-3 to 3 degrees)
  - Entry animation with scale and fade
  - Hover effects with scale increase
  - Delete button (hover to show)

### MessageModal Component

- Props: `isOpen`, `onClose`, `onMessageAdded`
- Features:
  - Backdrop blur overlay
  - Form validation
  - Character counter (300 max)
  - Loading state
  - Error handling
  - Auto-close on success

### HomePage Component

- Displays message wall
- Fetches messages from Firestore in real-time
- Renders sticky notes with random scatter positioning
- Loading and empty states
- Responsive grid layout

## Common Tasks

### Adding a New Feature

1. Create component in `src/components/` or `src/pages/`
2. Add corresponding CSS file
3. Import in parent component
4. Update README if needed

### Modifying Styling

- Component-specific styles: In component's CSS file
- Global styles: `src/index.css`
- Tailwind classes: Available in HTML elements

### Working with Firebase

- Import from `src/config/firebase.js`
- Use Firestore hooks: `collection`, `query`, `onSnapshot`, `addDoc`
- Handle errors in try-catch blocks

## Environment Variables

Required in `.env` file:

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

## Debugging

### Common Issues

1. **Messages not loading**: Check Firebase credentials in `.env` and Firestore rules
2. **Modal not opening**: Check React state and CSS z-index
3. **Styling issues**: Check CSS file imports and class names
4. **Firebase errors**: Check browser console for detailed error messages

### Useful Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Future Enhancements

- [ ] Admin dashboard for message moderation
- [ ] Message reactions (emojis)
- [ ] Photo upload support
- [ ] Search and filter messages
- [ ] Dark mode theme
- [ ] Email notifications
- [ ] Analytics tracking
- [ ] Message export/download

## Deployment

The app can be deployed to:
- Firebase Hosting
- Vercel
- Netlify
- GitHub Pages

Ensure `.env` variables are set in deployment environment.
