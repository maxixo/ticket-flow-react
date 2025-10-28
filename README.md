📘 TicketFlow – React Ticket Management System

TicketFlow is a lightweight ticket management system built with React + TypeScript.
It allows users to create, edit, and track support tickets easily — all stored locally in the browser using LocalStorage.

The design is inspired by a Twig-based UI, recreated with inline CSS for simplicity and modern responsiveness.

🚀 Features

✅ User Authentication (Signup / Login / Logout)
✅ Dashboard with Ticket Statistics
✅ Create, Edit, and Delete Tickets
✅ Local Storage Data Persistence (No backend required)
✅ Modern Inline Styling (no Tailwind or external CSS)
✅ Responsive Design – looks great on desktop & mobile
✅ TypeScript-safe with strong typing for Tickets and Users

🧱 Tech Stack
Category	Technology
Frontend Framework	React (TypeScript)
Routing	React Router v6
State Management	React useState + Local Storage
Styling	Inline CSS (No Tailwind / No CSS Framework)
Deployment	Vercel / Netlify compatible

📁 Project Structure

ticketflow-react/
│
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── RequireAuth.tsx
│   │
│   ├── pages/
│   │   ├── Landings.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Dashboard.tsx
│   │   ├── TicketList.tsx
│   │   ├── CreateTicket.tsx
│   │   └── EditTickets.tsx
│   │
│   ├── utils/
│   │   └── storage.ts      # LocalStorage helper functions
│   │
│   ├── types/
│   │   └── index.ts        # Type definitions for Tickets & Users
│   │
│   └── App.tsx             # Main app routes & navbar logic
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── package.json
├── tsconfig.json
├── README.md
└── vite.config.ts

1️⃣ Clone the repository

git clone https://github.com/<your-username>/ticketflow-react.git
cd ticketflow-react

2️⃣ Install dependencies

npm install
# or
yarn install


https://ticket-flow-react.vercel.app/