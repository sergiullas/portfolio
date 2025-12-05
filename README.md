# 📁 **sergio-portfolio**

### An experiment to create a modern, accessible, fully responsive UX portfolio built with React + MUI
---

## ✨ Overview

**sergio-portfolio** is a personal UX portfolio designed to be both:

1. **A real-world professional portfolio** for **Sergio Antezana**, Principal Product & UX Designer
2. **A reusable template** for UX designers who want a modern, accessible, low-code template they can learn from or adapt

It demonstrates **design systems thinking, accessibility-first UI**, and modular front-end architecture using **React, Material UI, custom components, and semantic structure**.

Everything in this repo is written to be **readable, documented, and instructive** for designers with limited engineering background.

---

## 🎯 Goals

### ✔ Showcase Sergio’s work

* Clean, modern UX case studies
* Accessible resume dashboard
* Modular layout components
* Smooth UX microinteractions
* Keyboard/screen-reader compliant navigation

### ✔ Act as a self-contained template

* Clone → edit content → publish
* Designer-friendly component structure
* Annotated code explaining **how** and **why** things work
* Ready for portfolio-level hosting (Vercel, Netlify, GitHub Pages, cPanel/PHP hosting)

---

## 🛠️ Tech Stack

* **React 18**
* **Vite** (fast dev + optimized build)
* **Material UI (MUI)** for design system foundations
* **Custom Theme System** (light + dark mode)
* **React Router**
* **ARIA-driven component patterns**
* **Optional PHP backend** for contact form + lightweight auth
* **Deployed on**: your hosting provider (cPanel-based)

---

## 📐 Features

### 🎨 Design System Driven

* Custom theme tokens
* Typography ramp
* Layout grid rules
* Responsive breakpoints
* WCAG-compliant color contrast

### 🧱 Modular React Components

* **Header** with accessible mobile menu
* **Editorial Hero** with scroll invitation indicator
* **Accessible Resume Sections** (collapsible eras, structured data)
* **Contact section** for easy integration with backend email
* **Widgetized structure** — sections behave like modular building blocks

### 🧩 Reusable Components

* ScrollIndicator (v1)
* Section headers
* CTA buttons
* Resume experience items
* Accessible chips & tags
* Grid-based layout blocks

---

## ♿ Accessibility Highlights

* Semantic HTML + proper ARIA roles
* Keyboard focus-visible styling using theme tokens
* Reduced-motion support for animations
* Large touch target sizes
* Color-contrast validated (light/dark mode)
* Screen-reader friendly labels in all interactive elements
* Accessible navigation landmarks

---

## 📁 Project Structure (Human-Friendly)

```
src/
  components/
    common/            # Reusable patterns (ScrollIndicator, buttons, utilities)
    header/            # Header + mobile menu
    resume/            # Resume sections (eras, roles, details)
    sections/          # About, Contact, Hero, etc.
  content/
    resumeData.js      # All resume data in one file
  pages/
    Home.jsx
    MyResume.jsx
  theme/
    theme.js           # MUI theme system (light/dark)
  assets/
    images/
```

This structure allows **designers** to edit content without touching the architecture.

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/sergiullas/sergio-portfolio
cd sergio-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Deploy

* **Vercel** → simplest
* **Netlify** → drag & drop deploy
* **GitHub Pages** → static hosting
* **cPanel/PHP hosting** → upload `dist/` + optional PHP backend

---

## 🧪 Optional: PHP Backend Support

This project includes optional backend patterns for:

* Secure contact form submissions
* Basic session-based authentication
* Protection from spam + injection attacks

You can enable the backend from the `/api` folder (coming in future versions).

---

## 🎁 Using This as a Template

If you're a UX designer looking to build your own portfolio:

1. Fork the repo
2. Replace text + images in `content/*` and `assets/*`
3. Update theme tokens for your brand
4. Remove Sergio-specific pages
5. Deploy

You’ll have a **production-grade portfolio** without deep coding knowledge.

---

## 🤝 Contributing

Contributions are welcome!
If you want to improve templates, accessibility, or documentation, feel free to open a PR.

---

## 📝 License

This project is licensed under the **MIT License** — meaning:

* You're free to copy, modify, and build on it
* You must keep the original license included

---

## 🙌 Final Note

If this project helps you create your own portfolio, **star the repo** ⭐
It helps others discover it — and helps the UX community grow.
