# AI Study Assistant

<div align="center">
  <a href="https://app.netlify.com/projects/ai-study-assistant-red/deploys">
    <img src="https://api.netlify.com/api/v1/badges/83a0222d-3880-4f21-8948-b8406b9e81c4/deploy-status" alt="Netlify Status">
  </a>
</div>

This project is a study assistant that uses AI to help students learn more effectively. It is a single-page application built with a separate frontend and backend.

## Architecture

This project follows a microservices-like architecture with a separate frontend and backend.

*   **Frontend (This Repository):** The frontend is built using **React** and utilizes **Clerk** for secure user authentication.
*   **Backend:** The backend service is a **Python** application that uses **MongoDB** for database management. You can find the backend repository here: [https://github.com/Drihmia/AI_STUDY_ASSISTANT_BACKEND](https://github.com/Drihmia/AI_STUDY_ASSISTANT_BACKEND)

## Features

*   **AI-powered study assistance:** The application uses AI to provide students with personalized learning recommendations, practice problems, and feedback.
*   **Interactive learning:** The application includes a variety of interactive features, such as quizzes, flashcards, and simulations, to help students learn in a more engaging way.
*   **Cross-Device Conversation History:** Secure authentication allows users to access their chat history and continue their learning journey on any device.
*   **Direct User Communication:** Includes forms for users to contact the teacher directly and provide valuable feedback on the application.
*   **Localization:** The application supports multiple languages for a global user base.
*   **Image Upload in Chat:** Users can now upload images directly into the chat, allowing the AI to analyze and discuss visual content.

## Getting Started

To get this project running, you will need to set up both the frontend and the backend services.

### Prerequisites

*   Node.js and npm installed on your machine.
*   Git installed on your machine.

### 1. Backend Setup

First, clone and set up the backend service.

```bash
git clone https://github.com/Drihmia/AI_STUDY_ASSISTANT_BACKEND.git
cd AI_STUDY_ASSISTANT_BACKEND
```

Once inside the backend directory, please follow the setup and installation instructions provided in its specific `README.md` file.

### 2. Frontend Setup

Next, clone and set up the frontend service (this repository).

```bash
git clone https://github.com/Drihmia/AI_STUDY_ASSISTANT_FRONTEND.git
cd AI_STUDY_ASSISTANT_FRONTEND
npm install
npm start
```

The application frontend will now be running at `http://localhost:3000` and will be ready to connect to the backend service.

## Project Evolution: A Journey of User-Centric Improvements

This project has continuously evolved to provide a better experience for students. Here are some of the key challenges we've addressed and the solutions we've implemented, turning ideas into impactful features.

### Visual Learning: Bringing Images into the Conversation

*   **The Challenge:** Learning isn't limited to text. Students often work with complex diagrams, charts, and handwritten notes. The AI assistant was blind to this visual context, limiting its ability to provide comprehensive help.
*   **The Solution:** We've integrated an image upload feature directly into the chat. Users can now share visual materials, allowing the AI to analyze and discuss them in the context of the conversation.
*   **The Impact:** This transforms the study assistant into a multimedia learning partner. Students can now get help understanding complex diagrams, ask questions about visual data, or even get feedback on their handwritten work. It breaks down the barrier between text-based and visual learning, making the assistant a more versatile and powerful tool.

### Introducing Direct Communication Channels

*   **The Challenge:** As the user base grew, there was no direct way for users to ask questions or provide feedback about the application. This made it difficult to gather user insights and address their concerns.
*   **The Solution:** We have now introduced two key communication features: a **Contact Teacher** form and a **Feedback Page**. Authenticated users can easily send messages and submit ratings, with their identity securely passed from the frontend to the backend. This allows for a clear and reliable communication loop.
*   **The Impact:** These new channels empower users to contribute to the app's development and get the support they need. It provides the development team with direct access to user feedback, which is crucial for making informed decisions on future improvements and features.

### Seamless Learning Across Devices with Secure Authentication

*   **The Challenge:** Initially, user conversations were tracked using browser cookies. This meant if a user switched from their laptop to their phone, their entire chat history was lost. This created a fragmented and frustrating experience, hindering continuous learning.
*   **The Solution:** We moved from a cookie-based approach to a full-fledged authentication system using Clerk. This decision was twofold: to explore and implement modern authentication technology and to avoid the security and maintenance overhead of managing a custom user database.
*   **The Impact:** Users can now sign in and have their conversations seamlessly synced across all their devices. This provides a persistent and continuous learning journey. By using a specialized service like Clerk, we also enhance user data security and privacy, allowing us to focus on what matters most: the learning experience.

### Performance First: A Smoother, Faster Experience

*   **The Challenge:** A snappy, responsive UI is crucial for a good user experience. We identified that the application could be faster and more efficient, especially in the chat interface.
*   **The Solution:** We conducted a thorough performance audit and implemented a series of optimizations using React's performance-tuning features.
    *   **Memoization:** We wrapped key components in `React.memo` to prevent unnecessary re-renders.
    *   **Callback and Memoization Hooks:** We used the `useCallback` and `useMemo` hooks to memoize functions and values, ensuring that they are not recreated on every render.
*   **The Impact:** These optimizations have resulted in a significantly more responsive and fluid user interface, allowing students to focus on learning without any performance hiccups.

### Beyond Conversations: The Future is Personalized Progress Tracking

*   **The Foundation:** With secure user accounts now in place, we've solved the critical challenge of providing a seamless, cross-device conversation history. But this is just the beginning. This persistent user identity lays the groundwork for a much deeper, more personalized learning experience.
*   **The Vision:** The next evolution for the AI Study Assistant is to move from simply remembering conversations to actively tracking learning progress. We envision a system that can analyze user interactions to identify strengths and weaknesses, offering personalized feedback and detailed performance reports.
*   **The Impact:** This will transform the application from a reactive study tool into a proactive learning partner. Imagine the assistant suggesting specific topics for review, creating personalized quizzes based on your chat history, and providing visual dashboards of your progress over time. It’s not just about what you’ve learned, but about understanding *how* you learn best and where to focus your efforts for maximum impact.

### Centralized Learning Hub: The Future of Teacher-Curated Resources

*   **The Foundation:** We've established direct communication channels between the teacher and students. The next logical step is to create a dedicated space for sharing high-quality learning materials.
*   **The Vision:** We envision a future where the teacher can create and manage a centralized library of resources—such as documents, lecture notes, and important links—directly within the application. This gives students a single, trusted place to find all the official course materials.
*   **The Impact:** This feature will bridge the gap between AI-driven conversation and traditional course content. Students will have a reliable "source of truth" to refer to while interacting with the AI, and the AI itself could even be enhanced to draw upon this curated knowledge base, providing more contextually aware and accurate assistance. It transforms the app from just a study tool into a comprehensive learning hub.

### From a Single-Language App to a Global Platform

*   **The Challenge:** The application was initially only available in English, which limited its reach and accessibility for a global audience.
*   **The Solution:** We implemented a robust localization system. This involved creating a global context for language and integrating translations for all user-facing components. Users can now select their preferred language, and the entire UI updates instantly.
*   **The Impact:** The AI Study Assistant is now a more inclusive platform, accessible to students from different linguistic backgrounds, making learning a universal experience.

### Enhancing User Experience and Performance

*   **The Challenge:** A slow and clunky interface can be a major distraction from learning. We noticed issues with initial load times and the chat's responsiveness.
*   **The Solution:**
    *   **Backend Optimization:** We implemented server-side compression for all HTTP responses and enabled long-term browser caching for static files.
    *   **Frontend Performance:** We fixed the chat's scrolling behavior to feel more natural and optimized component rendering to prevent UI bottlenecks.
    *   **UI/UX Refinements:** The application's layout and styling have been continuously refined for a more intuitive and visually appealing experience.
*   **The Impact:** Users now enjoy a significantly faster, smoother, and more engaging interaction, allowing them to focus on their studies without interruption.

### Making the Assistant Discoverable

*   **The Challenge:** A great tool is only useful if people can find it. The application needed to be more visible on the web.
*   **The Solution:** We implemented SEO-friendly headers to improve the application's ranking and visibility on search engines.
*   **The Impact:** More students can now discover and benefit from the AI Study Assistant through organic search.

## License

This project is licensed under the **GNU Affero General Public License v3.0**.

See the [LICENSE](LICENSE) file for more details.
