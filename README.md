# 🛒 বাজার দর (BazarDor)

> প্রয়োজনীয় পণ্যের দাম এক নজরে — a Bengali market price tracker for everyday essentials.

🔗 **Live Site:** `https://your-app.vercel.app`

---

## 📖 About the Project

**BazarDor (বাজার দর)** Helps people check today's prices of daily essentials such as rice, lentils, oil, vegetables, fish, meat, dairy and spices. It shows what got more expensive or cheaper today, lets users browse by category and gives a market-by-market price breakdown (minimum, maximum and average) for every product. The whole interface is in Bengali, including Bengali numerals.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) (App Router) | Routing, server components & server-side data fetching |
| [React](https://react.dev/) | UI components |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Responsive styling |
| [Better-Auth](https://better-auth.com/) | Email & password authentication and sessions |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Database for users and sessions |
| [React Hot Toast](https://react-hot-toast.com/) | Success and error notifications |
| [React Fast Marquee](https://www.react-fast-marquee.com/) | Infinite scrolling price ticker |

---

## ✨ Key Features

1. **Live Price Ticker** — an infinite scrolling strip under the navbar showing every product with its price per unit and an up/down percentage change.

2. **Daily Risers & Fallers** — the home page highlights the top 6 products whose prices rose and the top 6 whose prices fell today, plus a full list of all products as responsive cards with Bengali digits.

3. **Category Pages with Smart Sorting** — browse products by category and sort by price (low to high or high to low). Sorting uses the real numeric value, so Bengali numerals are always ordered correctly. Includes skeleton loading and a friendly empty state.

4. **Protected Product Details** — logged-in users can open a product to see its minimum, maximum and average price, plus a market-wise price table across divisions.

5. **Secure Authentication & Profile** — sign up and sign in with email and password using Better-Auth, protected routes through `proxy.ts`, toast messages for every action, and a profile page where users can update their name.

**Also included:** A custom 404 page, loading skeletons and a fully responsive layout for mobile, tablet and desktop.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_long_random_secret
BETTER_AUTH_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 API

Product and category data comes from:

```
https://openapi.programming-hero.com/api/bazardor
```

| Endpoint | Description |
|---|---|
| `/categories` | All categories |
| `/categories/:slug` | A single category |
| `/products` | All products |
| `/products?category=:slug` | Products filtered by category |

---

## 📁 Project Structure
```
bazardor/
├── public/
│   ├── bazar-hero.png                 # Hero Banner Image
│   └── logo-icon.png                  # Site Logo Icon
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Navbar, PriceTicker, Footer & <Toaster />
│   │   ├── page.tsx                   # Home: Hero + risers / fallers / all products
│   │   ├── loading.tsx                # Home Loading Skeleton
│   │   ├── not-found.tsx              # Global 404 Page
│   │   ├── globals.css                # Global Styles (Tailwind)
│   │   │
│   │   ├── category/
│   │   │   └── [slug]/
│   │   │       ├── page.tsx           # Category page with sorting
│   │   │       └── loading.tsx        # Category loading skeleton
│   │   │
│   │   ├── product/
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Protected Product Details Page
│   │   │
│   │   ├── signin/
│   │   │   └── page.tsx               # Sign in page (Renders SignInForm)
│   │   ├── signup/
│   │   │   └── page.tsx               # Sign up page
│   │   ├── profile/
│   │   │   └── page.tsx               # Protected profile page
│   │   ├── profile-update/
│   │   │   └── page.tsx               # Protected name update form
│   │   │
│   │   └── api/
│   │       └── auth/
│   │           └── [...all]/
│   │               └── route.ts       # Better-Auth API handler
│   │
│   ├── components/
│   │   ├── Navbar.tsx                 # Logo, date, category links, auth area (server)
│   │   ├── NavLinks.tsx               # Active category links (client)
│   │   ├── UserMenu.tsx               # Logged-in user dropdown (client)
│   │   ├── SignOutButton.tsx          # Sign out with toast (client)
│   │   ├── PriceTicker.tsx            # Scrolling price marquee
│   │   ├── Hero.tsx                   # Home hero banner
│   │   ├── ProductCard.tsx            # Single product card
│   │   ├── ProductSection.tsx         # Titled grid of product cards
│   │   ├── SortDropdown.tsx           # Price sort dropdown (client)
│   │   ├── MarketTable.tsx            # Market-wise price table
│   │   ├── SignInForm.tsx             # Sign in form (client)
│   │   └── Footer.tsx                 # Site footer
│   │
│   ├── lib/
│   │   ├── auth.ts                    # Better-Auth server configuration
│   │   └── auth-client.ts             # Better-Auth client
│   │
│   └── proxy.ts                       # Protected Route Handling
│
├── .env.local                         # Environment variables (not committed)
└── README.md                          # Project documentation
```
 
---