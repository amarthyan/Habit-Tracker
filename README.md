# Habit Tracker — Free Online Habit Tracker & Habit Building App

[![Live App](https://img.shields.io/badge/Live%20App-nalla--sheelam.vercel.app-2ea44f?style=for-the-badge&logo=vercel)](https://nalla-sheelam.vercel.app)
[![Habit Tracker](https://img.shields.io/badge/Habit%20Tracker-Free%20%26%20Open%20Source-blue?style=for-the-badge)](https://nalla-sheelam.vercel.app)
[![No Login Required](https://img.shields.io/badge/Privacy-100%25%20Local%20Storage-orange?style=for-the-badge)](https://nalla-sheelam.vercel.app)

> **The ultimate free online habit tracker.** Build positive routines, achieve daily goals, and stay consistent with a clean, spreadsheet-style habit dashboard, interactive analytics, and one-click PDF/Excel export.

🌐 **Try the Live Habit Tracker:** [https://nalla-sheelam.vercel.app](https://nalla-sheelam.vercel.app)

---

## 📌 Table of Contents
- [What is This Habit Tracker?](#-what-is-this-habit-tracker)
- [Why Track Your Habits?](#-why-track-your-habits)
- [Key Features](#-key-features)
  - [Interactive Monthly Habit Tracker Grid](#1-interactive-monthly-habit-tracker-grid)
  - [Custom Daily & Monthly Habit Goals](#2-custom-daily--monthly-habit-goals)
  - [Visual Analytics & Habit Statistics](#3-visual-analytics--habit-statistics)
  - [Habit Tracker PDF & Excel Export](#4-habit-tracker-pdf--excel-export)
  - [Dark & Light Theme](#5-dark--light-theme)
  - [100% Private — No Account Needed](#6-100-private--no-account-needed)
- [Popular Habits to Track](#-popular-habits-to-track)
- [How to Use the Habit Tracker](#-how-to-use-the-habit-tracker)
- [Tech Stack](#-tech-stack)
- [Run Locally](#-run-locally)
- [Frequently Asked Questions (FAQ)](#-frequently-asked-questions-faq)
- [Author & License](#-author--license)

---

## 🌟 What is This Habit Tracker?

This **Habit Tracker** is a lightweight, responsive, and distraction-free web app designed to help you organize daily routines, track monthly goals, and maintain long-term consistency.

Whether you want to build a fitness routine, read more books, drink more water, or boost productivity, this **habit tracker** gives you the clarity of an Excel habit spreadsheet combined with the speed and smoothness of a modern web application.

- **No login or sign-up:** Start tracking habits immediately.
- **Works on mobile & desktop:** Fully responsive layout.
- **Fast and offline-ready:** Saves your habits locally in your browser.

🔗 **Access it anytime:** [https://nalla-sheelam.vercel.app](https://nalla-sheelam.vercel.app)

---

## 💡 Why Track Your Habits?

Tracking habits is proven by behavioral psychology (*Atomic Habits*) to be one of the most effective ways to transform your life:
1. **Visual Proof of Progress:** Seeing your streak grow gives immediate dopamine and reinforces the habit loop.
2. **Accountability:** An honest daily habit log highlights patterns, missed days, and accomplishments.
3. **Consistency Over Perfection:** Setting realistic monthly goals (e.g., 20 days/month instead of 30) prevents burnout.

---

## 🚀 Key Features

### 1. Interactive Monthly Habit Tracker Grid
- **Spreadsheet-style Matrix:** Quick one-click habit check-offs for every single day of the month.
- **Automatic Calendar Alignment:** Dynamically adjusts to leap years, days in month (28–31), and weekday headers (Sun–Sat).
- **Multi-Year Navigation:** Easily review past habit history or plan future months and years ahead.

### 2. Custom Daily & Monthly Habit Goals
- Add, rename, or delete any habit in seconds.
- Assign custom target goals per habit (e.g., exercise 12 times a month, drink water 28 days a month).
- Live progress bars show how close you are to reaching each habit milestone.

### 3. Visual Analytics & Habit Statistics
- **Monthly Overview:** Instant completion percentages, active streaks, and total successful check-ins.
- **SVG Completion Charts:** Clean, dynamic line charts illustrating consistency throughout the month.
- **Weekly Breakdown:** See performance week by week to identify busy periods.
- **Yearly Heatmap:** High-level 12-month summary to see your long-term transformation.

### 4. Habit Tracker PDF & Excel Export
- **PDF Report Export:** Download formatted, print-ready PDF habit reports with structured tables.
- **Excel Spreadsheet (.xlsx) Export:** One-click backup and analysis in Microsoft Excel, Google Sheets, or Apple Numbers.

### 5. Dark & Light Theme
- Sleek modern interface powered by harmonious `oklch()` color tokens.
- Instant toggle between light and dark mode with persistent user preference and zero screen flickering.

### 6. 100% Private — No Account Needed
- Your habit data never leaves your device.
- Check-ins, streaks, and custom habits are stored directly in your browser's `localStorage`.

---

## 📋 Popular Habits to Track

Need inspiration? Here are popular habits you can track using this tool:

| Category | Example Habits | Target Goal |
| :--- | :--- | :--- |
| 🏃 **Health & Fitness** | 30-minute workout, 10,000 steps, morning stretch, drink 2L water | 20–25 days |
| 🧠 **Mindfulness & Mental Health** | Meditation, gratitude journaling, digital detox before bed | 15–20 days |
| 📚 **Learning & Productivity** | Read 20 pages, study code/languages, deep work session | 20–28 days |
| 🏡 **Lifestyle & Organization** | Clean desk, cook at home, sleep by 11 PM, budget review | 10–20 days |

---

## 📖 How to Use the Habit Tracker

1. **Open the App:** Visit [https://nalla-sheelam.vercel.app](https://nalla-sheelam.vercel.app).
2. **Set Your Habits:** Use the default habits or click to add and customize your own habit names and target goals.
3. **Log Daily Progress:** Click on any date cell to mark a habit completed for the day.
4. **Monitor Your Stats:** Scroll down to view your monthly completion rate, weekly progress, and yearly overview.
5. **Export Anytime:** Click **PDF** or **Excel** in the top navigation bar to download your habit report.

---

## 🛠️ Tech Stack

- **HTML5:** Semantic markup, SEO-ready structure, and accessibility.
- **Vanilla CSS3:** Clean UI, CSS Grid, Flexbox, smooth animations, and `oklch()` color variables.
- **Vanilla JavaScript (ES6+):** Ultra-fast reactivity, zero build step, client-side state handling.
- **jsPDF & AutoTable:** Client-side vector PDF document generation.
- **SheetJS (xlsx):** Client-side `.xlsx` spreadsheet generator.

---

## 💻 Run Locally

You can run this habit tracker on your computer without installing Node.js, npm, or any build tools:

```bash
# 1. Clone the repository
git clone https://github.com/amarthyan/Habit-Tracker.git

# 2. Enter directory
cd Habit-Tracker

# 3. Open index.html in your favorite web browser
# Or start a simple local server:
python -m http.server 8000
```

Open `http://localhost:8000` in your browser.

---

## ❓ Frequently Asked Questions (FAQ)

### What is a habit tracker?
A habit tracker is a tool (digital or paper) used to record whether you completed a specific habit each day. It provides visual feedback, reinforces consistency, and motivates you to build long-term positive routines.

### Is this habit tracker free to use?
Yes, this habit tracker is **100% free and open-source**. There are no subscriptions, paywalls, or advertisements.

### Do I need to create an account?
No account or registration is required. All habit records are securely stored locally inside your browser's `localStorage`.

### Can I print my habit tracker?
Yes. Click the **PDF** button at the top of the dashboard to generate and print a clean habit tracking sheet.

### Can I track habits across different months and years?
Yes. Use the month tabs and year selector arrows to browse past, present, or future months.

---

## 🔗 Live Application

Start building better habits today:
👉 **[https://nalla-sheelam.vercel.app](https://nalla-sheelam.vercel.app)**

---

## 👤 Author & Contributing

- **Author:** [Amarthyan](https://github.com/amarthyan)
- **Repository:** [https://github.com/amarthyan/Habit-Tracker](https://github.com/amarthyan/Habit-Tracker)

Feel free to star ⭐ the repository if you found this habit tracker helpful! Pull requests and feature suggestions are always welcome.
