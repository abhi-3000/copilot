# ⚡ BOLT - AI Code Copilot

Hi, this is **Bolt**. It's a full-stack application I built to generate code snippets using AI. The goal was to create something that feels like a professional tool—combining a clean "Glassmorphism" UI with a solid, scalable backend.

Instead of just mocking data, I integrated the real Gemini API and backed it with a PostgreSQL database to handle user history properly.

## 🔗 Live Demo & Links

* **🚀 Live Frontend:** [https://copilot-tan.vercel.app](https://copilot-tan.vercel.app)
* **⚙️ Live Backend:** [https://copilot-1o8e.onrender.com/](https://copilot-1o8e.onrender.com/)
* **🎥 Video Walkthrough:** [Watch on Google Drive](https://drive.google.com/file/d/1wFt07EnZklw_nL5MO23XdGQcs8uxyK6h/view?usp=sharing)
* **🗄️ ER Diagram:** You can find `er-diagram.png` in the root folder of this repo.

---

## 🛠️ The Tech Stack

I stuck to the tools I know best but swapped the database to meet the relational requirement:

* **Frontend:** React (Vite) + Tailwind CSS (for that dark mode/responsive look).
* **Backend:** Node.js + Express.js.
* **Database:** PostgreSQL (Hosted on Neon.tech).
* **ORM:** Prisma (I used this to manage the schema and type safety).
* **AI:** Google Gemini API (`gemini-2.5-flash` model).
* **Security:** Helmet headers, Rate Limiting, and CORS.

---

## 🏗️ Engineering Decisions (Database & Schema)

### 1. Why PostgreSQL?
The assignment required a relational database, but honestly, it was the right choice anyway. The relationship here is strict: **One User** has **Many Generations**.

I didn't want to use MongoDB here because structured data like this benefits from the constraints SQL provides. I created two tables:
* `User` (holds the identity).
* `Generation` (holds the code, prompt, and language).

### 2. Normalization & Constraints
I kept the database normalized (3NF).
* **Why?** I separated the User details from the Generation data. This avoids redundancy—if a user updates their email, it doesn't need to update 50 different history records.
* **Safety:** I used a **Foreign Key** on the `Generation` table linking to `User.id`. This ensures data integrity; you can't have a "ghost" generation that doesn't belong to a valid user.

---

## 🧠 Complexity Analysis (The "Why it Scales" Part)

### 1. Time Complexity of Pagination
**Complexity:** **O(log N + K)**

For the history feed, I used SQL offset pagination.
* **N** is the total rows in the database.
* **K** is the page limit (20 items).

Standard offset pagination can be slow on massive tables, but **it's fast here**. Why? Because of the index I added. The database engine uses a B-Tree search (**log N**) to find the specific user's records instantly, then just grabs the next 20 items (**K**).

### 2. Indexing Strategy
**Did I use indexes? Yes.**

I explicitly added `@@index([userId])` in my Prisma schema.
* **Without it:** The database would have to do a **Sequential Scan** (O(N)), meaning it would look at *every single row* in the table to see if it belonged to the current user. That gets slow very fast.
* **With it:** The database performs an **Index Scan**. It jumps straight to the user's data. This is what makes the app scalable to millions of records without the history feed lagging.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/generate` | Accepts `{ prompt, language, userId }`. Calls Gemini AI and saves the result. Rate-limited to 20 req/min. |
| `GET` | `/api/history` | Returns paginated history. params: `?userId=1&page=1`. |
| `POST` | `/api/seed` | A helper route to create/get a demo user so you don't have to register. |

---

## ⚙️ How to Run Locally

If you want to run this on your machine:

1. **Clone the repo**
   ```bash
   git clone <your-repo-link>
   cd automation-edge-assignment
