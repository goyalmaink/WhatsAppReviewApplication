# 💬 WhatsApp Product Review Collector

A simple, full-stack application that enables users to submit **product reviews** directly via **WhatsApp**, with an administrative **React dashboard** for viewing and managing them.

This project showcases a practical integration of modern web technologies with the Twilio WhatsApp API.

## 🚀 Features

This application delivers a seamless experience for both the user submitting the review and the administrator viewing it.

### **📱 WhatsApp Integration & Conversation Flow**
* **Direct Submission:** Users initiate and submit reviews by messaging the **Twilio WhatsApp Sandbox** number.
* **Guided Review Collection:** A conversational bot guides the user through the process, securely collecting:
    1.  **Product Name**
    2.  **User Name** (for identification)
    3.  **Review Text**

### **💾 Data Management**
* **Persistent Storage:** Reviews are reliably stored in a **Supabase Postgres** database.
* **RESTful API Endpoint:** A simple endpoint exposes the collected data: `GET /api/reviews` returns all reviews in **JSON** format.

### **💻 Admin Interface**
* **Clean React Dashboard:** A professional, responsive UI built with **React** and styled using **Tailwind CSS (CDN)**.
* **Real-time Viewing:** Administrators can easily view and manage all submitted product reviews.

## ⚙️ Technology Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Backend** | **Node.js** + **Express** | The server-side environment and routing logic. |
| **Database** | **Supabase Postgres** | Reliable, cloud-hosted relational database for storing reviews. |
| **Messaging** | **Twilio WhatsApp Sandbox** | Integration point for receiving messages and managing the conversational bot. |
| **Frontend** | **React** + **Tailwind CSS (CDN)** | The modern, component-based dashboard UI. |
| **Deployment** | **ngrok** | Tool used to securely expose the local backend server to the public internet for **Twilio Webhook** communication. |

---

## 🏗️ Project Structure

The project is logically separated into `backend` and `frontend` directories.
### **📁 Backend Structure (`/backend`)**
The backend manages the WhatsApp integration, database connection, and API endpoint.
```bash 
backend/ 
├── node_modules/
├── .env # Environment variables (Twilio, Supabase keys) 
├── server.js # Main Express application setup and routing 
├── config/ 
│── supabase.js # Supabase client initialization 
└── utils/ 
    └── twilio.js # Twilio webhook handler and conversation logic
    └── db.js # Supabase handler and conversation logic
```
### **🖥️ Frontend Structure (`/frontend`)**
The frontend is a simple React application displaying the collected reviews.
```bash
frontend/
├── node_modules/
├── public/ │
└── index.html # Main HTML file (includes Tailwind CDN)
└── src/
├── components/ 
└── App.jsx # Component to display a single review
└── main.jsx
```
Here's a visual representation of the project's folder structure:

<img width="560" height="1266" alt="image" src="https://github.com/user-attachments/assets/014d6664-64d5-41e1-8b99-c8752f19e5fb" />

---

## 🛠️ Setup and Installation

Follow these steps to get a local copy of the project up and running.

### **1. Prerequisites**

* **Node.js** and **npm** installed.
* A **Twilio** account with the **WhatsApp Sandbox** configured.
* A **Supabase** account with a Postgres database.
* **ngrok** installed.

### **2. Database Setup (Supabase)**

1.  In your Supabase project, create a table named `reviews` with the following columns:
    | Column Name | Data Type | Description |
    | :--- | :--- | :--- |
    | `id` | `UUID` / `Serial` | Primary key |
    | `product_name` | `TEXT` | The product being reviewed |
    | `user_name` | `TEXT` | Name of the reviewer |
    | `review_text` | `TEXT` | The actual review content |
    | `created_at` | `TIMESTAMPZ` | Timestamp of submission (default to `now()`) |
2.  Obtain your **Supabase Project URL** and **Service Role Key** (or Public Key for client-side).

### **3. Backend Configuration**

1.  Navigate to the `backend` directory and install dependencies:
    ```bash
    cd backend
    npm install
    ```
2.  Create a file named `.env` in the `backend` directory and populate it with your credentials:
    ```env
    # Twilio Configuration
    TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    TWILIO_AUTH_TOKEN=your_auth_token_here
    TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886 (Your Sandbox Number)

    # Supabase Configuration
    DATABASE_URL=[https://your-supabase-project.supabase.co](https://your-supabase-project.supabase.co)

    ```

### **4. Frontend Setup**

1.  Navigate to the `frontend` directory and install dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

### **5. Running the Application**

#### **Step A: Start the Backend and Expose it with ngrok**

1.  In your terminal, start the Express server:
    ```bash
    cd backend
    npm start # Or node server.js
    ```
2.  In a **separate terminal window**, start ngrok to expose your local server (default Express port is usually 3000):
    ```bash
    ngrok http 8000
    ```
3.  **Copy the public HTTPS URL** provided by ngrok (e.g., `https://abcdefg.ngrok.io`).

#### **Step B: Configure Twilio Webhook**

1.  Go to your **Twilio Console** $\rightarrow$ **Develop** $\rightarrow$ **Messaging** $\rightarrow$ **Try it out** $\rightarrow$ **Send a WhatsApp message**.
2.  Under **"When a message comes in"**, paste your ngrok HTTPS URL followed by the Twilio endpoint path:
    ```
    [Your ngrok URL]/webhook
    ```
3.  Set the request method to **HTTP POST** and save the configuration.

#### **Step C: Start the Frontend**

1.  In a **third terminal window**, start the React development server:
    ```bash
    cd frontend
    npm run dev # Or a similar command if using a different setup like vite/create-react-app
    npm start   #incase npm run dev is not working 
    ```
2.  Open your browser to the local frontend address (e.g., `http://localhost:5173`) to view the dashboard.

---

## 💡 How to Test

1.  Send the initial message (e.g., "**Hello**" or "**Start**") to your **Twilio WhatsApp Sandbox** number.
2.  The bot will prompt you for the **Product name**.
3.  Next, it will prompt for your **User name**.
4.  Finally, it will ask for the **Review**.
5.  After the bot confirms the submission, refresh your **React Dashboard** to see


## Preview /Screen-Shot

Working backend:

<img width="1602" height="138" alt="image" src="https://github.com/user-attachments/assets/ebdb832b-1396-4f19-bac0-b3da993aa571" />


Database Table Visualizer:

<img width="952" height="1286" alt="image" src="https://github.com/user-attachments/assets/8cb55e55-9390-48ac-9f1e-9becdac05125" />

Frontend:

<img width="1280" height="700" alt="image" src="https://github.com/user-attachments/assets/4dd548ca-a1d1-43e0-82f5-03afa8dffcbc" />

Ngrok Preview: 
```bash
ngrok http 8000
```
<img width="1600" height="294" alt="image" src="https://github.com/user-attachments/assets/59f61cc8-c7f1-4f99-ab85-0eb5907f2fed" />


Input(WhatsApp SandBox using Twilio):

<img width="2028" height="928" alt="image" src="https://github.com/user-attachments/assets/32aa2e9a-7592-442c-ae5b-8b5b40af615b" />


Output(Json File):
```bash
http://localhost:8000/api/reviews
```
<img width="1504" height="756" alt="image" src="https://github.com/user-attachments/assets/29d8f14d-cac1-4aaa-ace0-b33535ef33d3" />







