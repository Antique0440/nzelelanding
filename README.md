# Nzele Art — Luxury Waitlist Landing Site

This is the premium waitlist and marketing landing site for **Nzele**, a luxury art ecommerce brand launching soon.

The design features a quiet luxury aesthetic: whitespace-dominant layouts, refined Google Fonts (`Cormorant Garamond` serif and `Inter` sans-serif), custom slow animations (400–600ms hover transitions), and professional portrait aspect-ratio imagery.

---

## 🛠️ Technology Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 (configured via `@theme` variables in `app/globals.css`)
- **API Services:** Built-in API Route Handlers
- **Waitlist Service:** Resend (Audience Contacts API) with a zero-config local mock fallback
- **Hosting:** Fully compatible for one-click deployment to **Vercel**

---

## 🚀 Getting Started

### 1. Install Dependencies
Run the following command at the root of the project:
```bash
npm install
```

### 2. Configure Environment Variables
Copy the template environment file:
```bash
cp .env.example .env.local
```

Open `.env.local` and customize the values:
- `NEXT_PUBLIC_MOCK_WAITLIST="true"`: Keeps the application in offline-testing mode. All waitlist registrations are appended locally to a file named `waitlist-signups.log` inside the project root (no internet or API keys required!).
- `RESEND_API_KEY`: Set this to your Resend API Key (`re_...`) when you are ready to test live delivery.
- `RESEND_AUDIENCE_ID`: Set this to your Resend Audience ID to add subscribers directly to a contact group. If omitted but `RESEND_API_KEY` is present, Nzele will default to sending email notifications using Resend.

### 3. Run Locally
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Branding & Placeholders

All branding elements and high-definition mock art files are in the `/public` folder:
- **Logo:** `/public/Nzele_logo.png`
  - *Note: Our header uses `mix-blend-multiply` so you can swap this with any high-contrast transparent PNG logo, and it will blend beautifully over header transitions.*
- **Hero Image:** `/public/hero-bg.jpg` (Neutral abstract textured painting backdrop)
- **About Canvas:** `/public/about-art.jpg` (Asymmetric layout display art)
- **Teaser Artworks:** `/public/artwork1.jpg` through `/public/artwork4.jpg` (Used in the acquisition teaser grid)

To customize the branding, simply swap these files out with your actual photography while maintaining the naming conventions.

---

## 📦 Deployment to Vercel

The project is structured to deploy to Vercel with zero extra server configuration:

1. **Push your code** to a GitHub, GitLab, or Bitbucket repository.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. **Import** the repository.
4. Under **Environment Variables**, add:
   - `RESEND_API_KEY` = `your_resend_api_key`
   - `RESEND_AUDIENCE_ID` = `your_resend_audience_id`
5. Click **Deploy**. Vercel will automatically compile the TypeScript, bundle Tailwind CSS, and spin up the Serverless Route Handler for your waitlist.
