# Twitter Clone Project Report

## 1. Project Overview
This project is a full-stack Twitter-like social media application with a React/Next.js frontend and a Node.js/Express backend.

The app supports:
- user registration/login
- tweet creation, update, and deletion
- following/unfollowing users
- likes, retweets, comments, bookmarks
- real-time chat and notifications via WebSockets
- audio tweet uploads with OTP verification
- subscription plans with Razorpay payment integration
- forgot password and OTP-based reset flows
- mobile access policies and security checks

## 2. Architecture
### Frontend
- Built with **Next.js (App Router)** and **React 19**
- Uses **TypeScript** for type safety
- UI styled with **Tailwind CSS** and **Radix UI components**
- Connects to backend via **Axios**
- Real-time updates through **Socket.IO Client**
- Uses React Context for authentication and socket state

### Backend
- Built with **Node.js** and **Express**
- Stores data in **MongoDB** using **Mongoose** models
- Handles file uploads with **multer**
- Sends emails via **nodemailer**
- Manages web sockets with **Socket.IO**
- Supports payment processing via **Razorpay**
- Supports OTP and SMS logic with **Twilio**
- Uses **Firebase Admin** for user password management and secure user updates

## 3. Key Features and Implementation
### User Authentication and Profile
- Users register/login through the frontend and backend API routes.
- `/register`, `/login`, and `/loggedinuser` routes are used to create and fetch user records.
- Frontend uses `authcontext.tsx` for global authentication state.

### Feed and Tweet Management
- Users can post tweets, comment, like, retweet, and delete tweets.
- Backend routes include `/tweet`, `/post`, `/tweet/:id`, `/tweet/:id/like`, `/tweet/:id/retweet`, `/tweet/:id/comment`, and `/tweet/:id/comments`.
- Tweet data is stored in a `Tweet` Mongoose model and populated with author data.

### Follow / Unfollow
- Users follow or unfollow others via `/user/:id/follow`.
- Follow status is stored in user documents and updated atomically.
- Notifications are created on follow events.

### Bookmarks
- Users bookmark tweets using the `/user/bookmark` endpoint.
- Bookmarked tweets are fetched via `/user/:id/bookmarks`.

### Explore and Search
- Search functionality is supported by `/explore`.
- This route returns matched tweets and users using regular expressions.

### Real-time Chat and Notifications
- Socket.IO handles real-time communication and presence.
- Backend maintains `onlineUsers` map to track active socket sessions.
- Events include `newMessage`, `notification`, and `onlineUsers` updates.
- Frontend subscribes to socket events via `socketcontext.tsx`.

### Audio Upload with OTP Verification
- A special audio upload route `/upload-audio` accepts audio files.
- Uploads are stored in `uploads/` and served through Express static middleware.
- OTP verification is required before the upload is accepted.

### Payment and Subscription
- Subscription plans are defined in the backend with pricing and tweet limits.
- `/create-order`, `/verify-payment`, and `/subscription-status` endpoints manage payment flow.
- Razorpay is used for transaction processing.
- Backend validates payment signatures and updates user subscription status.

### Forgot Password and Secure Reset
- Forgot password flow is supported through `/forgot-password` and `/verify-forgot-password-otp`.
- Firebase Admin manages secure password resets when email delivery fails.
- OTP fallback is implemented for cases where email resets are unavailable.

### Mobile Access Policy
- Middleware enforces restricted mobile access hours (10:00 AM - 1:00 PM IST).
- Requests outside these hours receive a policy error.

## 4. Libraries and Packages Used
### Frontend packages
- `next` — React framework for production web apps
- `react`, `react-dom` — foundational UI library
- `axios` — API HTTP client
- `socket.io-client` — real-time socket support
- `tailwindcss`, `@tailwindcss/postcss` — styling engine
- `@radix-ui/react-avatar`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-label`, `@radix-ui/react-separator`, `@radix-ui/react-slot`, `@radix-ui/react-tabs` — accessible UI primitives
- `lucide-react` — icon library
- `clsx`, `class-variance-authority`, `tailwind-merge` — CSS class utilities
- `firebase` — Firebase SDK for client-side auth integration

### Backend packages
- `express` — HTTP server framework
- `cors` — cross-origin resource sharing support
- `dotenv` — environment variable loader
- `mongoose` — MongoDB object modeling
- `mongodb` — native MongoDB driver
- `socket.io` — real-time server sockets
- `multer` — multipart/form-data upload handling
- `nodemailer` — email transport
- `firebase-admin` — Firebase Admin SDK for secure auth actions
- `razorpay` — payments integration
- `twilio` — SMS and OTP delivery
- `crypto` — built-in Node module for secure OTP and signatures

## 5. Important Concepts Used
- **REST API design** with Express endpoints for all core data operations.
- **Real-time WebSockets** for chat, online presence, and notifications.
- **JWT / session-like state** managed in the frontend via React Context.
- **File upload handling** with `multer` and secure server-side validation.
- **Payment flow** with secure signature verification and subscription state.
- **OTP verification** for sensitive actions such as audio uploads and password reset.
- **CORS allowlists** to permit only trusted frontend domains.
- **Environmental configuration** via `process.env` and `next.config.ts`.
- **Progressive UI and component-driven architecture** with reusable UI primitives.

## 6. Implementation Highlights
### Backend
- CORS policy includes allowed frontend URLs and local development origins.
- Socket.IO uses a custom path and authentication query/userId handling.
- Uploaded media is stored in `uploads/` and served by Express.
- Payment route restricts transactions to a strict window and verifies Razorpay signatures.
- Forgot password flow supports both email reset and OTP fallback.

### Frontend
- UI components are organized under `components/` and layout pieces under `app/layout`.
- `authcontext.tsx` handles logged-in state and shares user info.
- `socketcontext.tsx` manages Socket.IO connection lifetime and reconnection.
- `tweetcomposer.tsx` handles tweet creation and audio upload OTP flows.
- `forgot-password/page.tsx` handles password recovery and OTP verification.

## 7. Issues Overcome
- Solved **CORS origin restrictions** between frontend and backend by updating backend allowed origins and frontend environment variables.
- Replaced legacy localhost fallbacks with the deployed backend URL for production readiness.
- Ensured **Socket.IO origin validation** worked for deployed frontend domains.
- Added **secure mobile access policy** to protect the service from off-hours abuse.
- Implemented fallback OTP delivery when email service is unavailable.
- Handled **payment window restrictions** and subscription expiry logic robustly.
- Managed **online user state and socket reconnects** to ensure chat reliability.

## 8. How to Run
### Backend
1. Navigate to `backend/`
2. Create `.env` with required values:
   - `PORT`
   - `MONGODB_URL`
   - `EMAIL_USER`, `EMAIL_PASS`
   - `FIREBASE_SERVICE_ACCOUNT`
   - `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
   - `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`
3. Run:
   ```bash
   npm install
   npm start
   ```

### Frontend
1. Navigate to `twiller_clone/`
2. Add `.env.local` with backend URL and keys if needed.
3. Run:
   ```bash
   npm install
   npm run dev
   ```

## 9. File Structure Summary
- `backend/index.js` — main backend server and API
- `backend/modals/` — Mongoose schema models for users, tweets, comments, notifications, messages
- `twiller_clone/app/` — Next.js pages and routes, including auth and forgot-password pages
- `twiller_clone/components/` — UI and feature components like tweet composer and page modules
- `twiller_clone/context/` — React context providers for auth and socket connectivity
- `twiller_clone/lib/axiosinstance.ts` — centralized API client
- `twiller_clone/next.config.ts` — environment exposure and headers

## 10. Client Presentation Notes
- Emphasize the project is a **fully working social platform** with end-to-end flows.
- Highlight the **real-time chat and notification engine** as a standout feature.
- Point out the **payment/subscription model** and **secure OTP workflows** for compliance.
- Mention that the app is production-ready with **deployed backend URL support**, cross-origin configuration, and hosted service compatibility.
- Note the **modular design**: frontend components + backend services are separately maintainable.
