# Kafein Badminton

A modern, responsive badminton match management system built with Next.js and Tailwind CSS, featuring a beautiful glassmorphism design.

## Features

### 🏸 Player Management
- Add/remove players manually
- Set player status (active/inactive)
- Track player statistics (games played, wins, losses, K/D ratio)
- Minimum 4 players required to generate matches

### 🎯 Match Generation
- **Random Match Generation**: Automatically create balanced matches
- **Manual Match Generation**: Select specific players (future enhancement)
- **2-Court System**: Support for 2 simultaneous courts
- **Smart Queue System**: Queue next matches for efficient rotation

### 📊 Live Match Management
- Real-time score tracking with validation
- First to 25 points (win by 2) match format
- Automatic match completion detection
- Queue rotation when matches complete

### 📈 Statistics & History
- **Leaderboard**: Ranked by win rate, total games, and K/D ratio
- **Match History**: Complete record of past matches with scores
- **Player Stats**: Comprehensive tracking of performance metrics

### 🎨 Design Features
- **Glassmorphism**: Modern, translucent design with backdrop blur
- **Responsive**: Mobile-friendly design that works on all devices
- **Dark Theme**: Easy on the eyes with vibrant accent colors
- **Smooth Animations**: Polished transitions and micro-interactions

### 💾 Data Persistence
- Local storage for player data and match history
- Session reset functionality
- Automatic save on all data changes

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **State Management**: React hooks (useState, useEffect, useMemo)
- **Icons**: SVG icons for UI elements
- **Storage**: Browser localStorage for data persistence

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies:

```bash
cd frontend
npm install
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## How to Use

1. **Add Players**: Use the player management section to add players by name
2. **Set Status**: Mark players as active or inactive (only active players are included in matches)
3. **Generate Matches**: Click "Generate Random Matches" to create 2-court matches
4. **Track Scores**: Input scores for live matches using the + and - buttons
5. **View Stats**: Check the leaderboard for rankings and history for past matches
6. **Reset Session**: Use the reset button to clear all data and start fresh

## Match Rules

- **Format**: First to 25 points, win by 2
- **Teams**: 2 vs 2 doubles format
- **Courts**: 2 courts running simultaneously
- **Queue**: Next matches automatically queued when available

## Data Structure

- **Players**: Track name, status, games, wins, losses, and point differential
- **Matches**: Live matches with real-time score tracking
- **Queue**: Upcoming matches for efficient court rotation
- **History**: Complete record of completed matches

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with CSS backdrop-filter support

## Future Enhancements

- Manual team selection
- Tournament mode
- Player performance analytics
- Cloud sync functionality
- Mobile app version
- Advanced scoring options (rally points, deuce handling)
- Player profiles with photos
- Court scheduling system