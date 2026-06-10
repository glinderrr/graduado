# 🎓 Marian's Graduation Congratulations Board

A React Router + Firebase web application for collecting and displaying congratulatory messages as interactive sticky notes.

## Features

- 📝 Modal-based message submission form
- 🎨 Colorful scattered sticky notes display
- 🔥 Real-time Firebase Firestore integration
- ⚡ Vite for fast development and builds
- 🎬 Smooth animations with Framer Motion
- 📱 Responsive mobile design
- 🎯 React Router v6 navigation

## Project Structure

```
src/
├── components/
│   ├── StickyNote.jsx       # Individual sticky note component
│   ├── StickyNote.css       # Sticky note styles
│   ├── MessageModal.jsx     # Modal form for submitting messages
│   └── MessageModal.css     # Modal styles
├── pages/
│   ├── HomePage.jsx         # Main congratulations board page
│   └── HomePage.css         # Page styles
├── config/
│   └── firebase.js          # Firebase configuration
├── App.jsx                  # Main app with routing
├── App.css                  # Global styles
├── main.jsx                 # Entry point
└── index.css                # Base styles
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Create a Firestore database
3. Get your Firebase config credentials
4. Copy `.env.example` to `.env` and fill in your Firebase credentials:

```bash
cp .env.example .env
```

Then update `.env` with your Firebase project details:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Set Firestore Rules

In Firebase Console, set your Firestore rules to allow public reading and authenticated writing:

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

## Running the Project

### Development Server

```bash
npm run dev
```

The app will start at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How It Works

1. **Submit Message**: Click "Add Message" button to open the modal
2. **Enter Details**: Add your name (optional) and congratulatory message
3. **View Messages**: Messages appear as colored sticky notes scattered on the page
4. **Real-time Updates**: All messages sync in real-time from Firebase Firestore

## Technologies Used

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Vite** - Build tool and dev server
- **Firebase** - Backend and database
- **Framer Motion** - Animations
- **Tailwind CSS** - Utility-first styling
- **JavaScript ES6+**

## Future Enhancements

- Admin delete functionality
- Message reactions/emojis
- Photo gallery integration
- Message search/filter
- Dark mode theme
- Share to social media
- Email notifications

## License

MIT

## Contributing

Feel free to open issues or submit pull requests!

