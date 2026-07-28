# Japanese Hiragana & Katakana Flashcards 🇯🇵

An interactive, modern web application designed for practicing Japanese Kana (**Hiragana** & **Katakana**) characters with real-time romaji feedback and progress history tracking.

---

## ✨ Features

- ⛩️ **Hiragana & Katakana Sets**: Full support for basic characters (Go-jūon) as well as Dakuten (濁点), Handakuten (半濁点), and special characters.
- 🎛️ **Customizable Practice Columns**: Toggle specific character groups (`A`, `K`, `S`, `T`, `N`, `H`, `M`, `Y`, `R`, `W`, `N`, `G`, `Z`, `D`, `B`, `P`) to focus on your weak areas.
- ⚡ **Real-time Romaji Validation**: Instant visual cues (green for correct, red for incorrect) as you type, allowing for rapid flashcard practice.
- 📊 **Detailed Session Results**: Comprehensive end-of-session reports displaying your overall accuracy percentage, total answered cards, and a breakdown of frequently missed characters.
- 📈 **Learning Progress Tracking**: Stores past practice history in `localStorage` so you can monitor your accuracy trends over time.
- 🎨 **Responsive Dark Theme UI**: Built with a modern, eyes-friendly dark theme optimized for mobile and desktop screens.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/hiragana-flashcard.git
   cd hiragana-flashcard
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

---

## 💻 Usage & Scripts

- **Start Development Server**:
  ```bash
  npm run dev
  ```
  Open your browser and navigate to `http://localhost:5173`.

- **Build for Production**:
  ```bash
  npm run build
  ```
  Compiles TypeScript types and builds static assets into the `dist/` folder.

- **Preview Production Build**:
  ```bash
  npm run preview
  ```

- **Lint Code**:
  ```bash
  npm run lint
  ```

---

## 📁 Project Structure

```text
hiragana-flashcard/
├── public/              # Static public assets & favicons
├── src/
│   ├── App.tsx          # Core Flashcard Application & State Logic
│   ├── main.tsx         # React DOM Root Entrypoint
│   └── index.css        # Global CSS & Tailwind Directives
├── eslint.config.js     # ESLint Linting Configuration
├── index.html           # Main HTML Template
├── package.json         # Project Dependencies & Scripts
├── tsconfig.json        # TypeScript Base Configuration
├── vite.config.ts       # Vite Configuration
└── LICENSE              # MIT License
```

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for full details.
