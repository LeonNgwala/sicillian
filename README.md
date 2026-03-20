# SkillsGrid

Sicillian is a full-stack platform designed to bridge the gap between learners, educational institutions, and employers. It facilitates skill-based matching for learnerships, internships, and jobs, while providing real-time data on skill gaps to SETAs and institutions.

---

##  Tech Stack

### **Backend**
- **Framework:** [Django 4.2](https://www.djangoproject.com/)
- **API:** [Django REST Framework (DRF)](https://www.django-rest-framework.org/)
- **Database:** SQLite (Development)
- **Security:** `django-cors-headers` for cross-origin resource sharing
- **Environment Management:** `python-dotenv`

### **Frontend**
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/) & [Base UI](https://base-ui.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

---

##  Project Structure

```text
sicillian/
├── Backend/                # Django project root
│   └── sicillian/          # Django project settings
│       ├── core/           # Main application logic (Models, Views, Serializers)
│       └── manage.py       # Django CLI
├── front-end/              # Next.js project root
│   ├── src/
│   │   ├── app/            # App Router (Pages & Layouts)
│   │   ├── components/     # UI Components (shadcn/ui)
│   │   └── lib/            # Utility functions
│   └── package.json        # Frontend dependencies
└── README.md
```

---

##  Getting Started

### **Prerequisites**
- Python 3.9+
- Node.js 20+
- npm or yarn

### **Backend Setup**
1. Navigate to the backend directory:
   ```bash
   cd Backend/sicillian
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables:
   Create a `.env` file in `Backend/sicillian/` and add:
   ```text
   DEBUG=True
   SECRET_KEY=your_secret_key
   ```
5. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
6. Start the server:
   ```bash
   python manage.py runserver
   ```

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   cd front-end
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the application at `http://localhost:3000`.

---

## API Endpoints

The backend exposes the following RESTful endpoints under `/api/`:

| Endpoint | Description |
| :--- | :--- |
| `GET /api/users/` | List and create users |
| `GET /api/institutions/` | List and create institutions |
| `GET /api/learner-profiles/` | List and create learner profiles |
| `GET /api/opportunities/` | List and create opportunities (jobs/learnerships) |
| `GET /api/applications/` | Manage job/learnership applications |
| `GET /api/matches/` | View AI-driven learner-opportunity matches |
| `GET /api/gap-alerts/` | Monitor regional skill gaps |

---

##  Security
- **CORS:** Configured to allow requests from `http://localhost:3000`.
- **Environment Variables:** Sensitive data is managed via `.env` (backend) and `.env.local` (frontend).

##  License
This project is licensed under the MIT License.
