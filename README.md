# Tom's Coding Hub

This is an online coding web application designed for Tom, a professional JavaScript lecturer, who wishes to continue following his students’ progress while being away. The application provides a collaborative coding environment where students and mentors can work together in real time.

## Features

### Lobby Page
- The Lobby page is the first page users encounter. It displays a list of code blocks (at least 4).
- Clicking on an item redirects users to the corresponding code block page.
- No authentication is required to access the lobby.

### Code Block Page
- Each code block page displays the title, a description, a code editor with syntax highlighting, and a role indicator (student/mentor).
- **Mentors**:
  - The first user who accesses the code block page is considered the mentor (Tom).
  - Mentors see the selected code block in a read-only mode.
- **Students**:
  - Any other user accessing the code block is treated as a student.
  - Students can change the code, and the changes are broadcast in real time to all users in the room using WebSockets.
- The code editor allows syntax highlighting for JavaScript.
- If the student’s code matches the predefined solution, a big smiley face is displayed.

### Real-time Updates with WebSockets
- Changes made by students are immediately visible to all other users in the room.
- Users can see how many students are currently in the room.

### Admin Mode (Bonus Feature)
- The application includes an **Admin Mode** where administrators can easily add new code blocks to the database. This functionality is accessible through a simple interface for easy management.

## Technologies Used
- **Frontend**: React, Vite
- **Backend**: Node.js (Socket.io for real-time communication)
- **Database**: MongoDB (or any relational database of your choice)
- **Code Editor**: CodeMirror (for syntax highlighting)
