# TechNova Solutions - Corporate Website Portfolio
## Technical Documentation & Submission Guide (Week 2)

This documentation provides a comprehensive, production-ready guide to the architecture, features, and source code of the **TechNova Solutions** corporate website. It is designed to fulfill your Week 2 submission requirements and prepare you to ace the live code walkthrough.

---

## 📂 Project Architecture & File Hierarchy

The project is built entirely on vanilla front-end technologies to maximize performance, search engine optimization (SEO), and cross-browser stability.

```text
Responsive Company Website/
├── index.html          # Home page (Hero, metrics, core features, infographic, and testimonials)
├── about.html          # About page (Company mission, core values, and team card grid)
├── services.html       # Services page (6 core service offerings, structured processes)
├── contact.html        # Contact page (Interactive form, address panel, interactive map layout)
├── style.css           # Global typography, HSL design tokens, responsive layouts, dark mode
├── script.js           # Core JS (Theming, navigation, scroll reveals, stats, and form validation)
└── assets/             # Generated visual assets (Infographics, mockups, and illustrations)
```

---

## 🎨 Design System & CSS Variables

The website features an **Organic Modern Green & Coral** color palette. Styling relies on custom CSS variables (`:root`) to allow instant theme switches and maintain consistency.

### Core Color Tokens:
*   **Primary Green**: `#2D6A4F` (Forest green used for primary brand accents)
*   **Secondary Green**: `#40916C` (Sage green for secondary badges and cards)
*   **Accent Color**: `#FF7F50` (Vibrant coral for call-to-actions, hovers, and indicators)
*   **Background Colors**:
    *   *Light Mode*: `#FAFAF7` (Organic warm white)
    *   *Dark Mode*: `#0D1310` (Deep charcoal-green)

### Key Styling Features:
1.  **Glassmorphism**: The header utilizes `backdrop-filter: blur(12px)` and a translucent background to create a premium frosted glass effect on scroll.
2.  **CSS Transition Framework**: Layout transitions utilize cubic-bezier parameters (`cubic-bezier(0.25, 0.8, 0.25, 1)`) for smooth, high-fidelity micro-interactions.
3.  **Typography**: Configured with the **Poppins** typeface loaded dynamically from Google Fonts for a clean, modern SaaS appearance.

---

## ⚙️ Feature Implementation Details

### 1. Light / Dark Mode Engine
*   **Mechanism**: Implements toggling via a global body class `.dark` which overrides color design tokens.
*   **Persistence**: Uses `localStorage` to save the user's theme selection.
*   **System Syncing**: If no preference is saved, the engine uses the CSS media query `window.matchMedia('(prefers-color-scheme: dark)')` to detect and match the user's operating system setting.
*   **Code Reference**: `initThemeToggle()` in `script.js`.

### 2. Scroll Reveal & Fades
*   **Mechanism**: Uses the modern `IntersectionObserver` API instead of legacy `window.addEventListener('scroll')` to avoid performance degradation.
*   **Logic**:
    *   Finds all elements with the `.reveal` class.
    *   Observes them with a threshold of `0.12` (fires when 12% of the element is visible on screen).
    *   Toggles the `.active` class to trigger CSS keyframes.
    *   Calls `observer.unobserve(entry.target)` immediately after reveal to prevent repetitive calculations.
*   **Code Reference**: `initScrollReveal()` in `script.js`.

### 3. Dynamic Stats Counter
*   **Mechanism**: An observer watches the `.stats` section.
*   **Logic**: Once the section enters the viewport, a `setInterval` loop runs at a step rate of `20ms` over a `2000ms` duration. It dynamically increments numbers from `0` to the specific target values defined in HTML `data-target` attributes, appending any custom suffixes (e.g., `+`, `%`).
*   **Code Reference**: `initStatsCounter()` in `script.js`.

### 4. Interactive Form Validation & Feedback
*   **Fields Validated**:
    *   `Name`: Required, minimum 2 characters.
    *   `Email`: Matches standard RFC email regular expression (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
    *   `Phone`: Trims formatting and validates a 10-digit numeric pattern.
    *   `Subject`: Required, minimum 5 characters.
    *   `Message`: Required, minimum 15 characters.
*   **Interaction UX**:
    *   *Real-Time Checks*: Inputs are validated instantly on `blur` (focus out) and `input` events.
    *   *Error Scrolling*: When submission is blocked, the window smoothly scrolls the first invalid field into the center of the viewport using `firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })`.
    *   *Feedback*: Displays a temporary, custom success toast at the bottom-right of the viewport on successful validation.
*   **Code Reference**: `initFormValidation()` and `showToast()` in `script.js`.

---

## 📸 Screenshots Blueprint

To fulfill the submission requirements, capture the following screenshots:

1.  **`01_home_hero_light.png`**: The Home page hero section in Light Mode (showing the clean layout, primary green buttons, and floating badges).
2.  **`02_home_hero_dark.png`**: The Home page hero section in Dark Mode (capturing the neon coral highlights and the deep background).
3.  **`03_stats_counter_active.png`**: The statistics section after numbers have animated to their target values.
4.  **`04_mobile_navigation.png`**: Mobile view emulation (using Chrome DevTools) showing the drawer menu and the backdrop overlay active.
5.  **`05_services_grid.png`**: The Services page layout showcasing the grid cards and custom icons.
6.  **`06_validation_errors.png`**: The Contact form showing active validation errors (red borders and error labels).
7.  **`07_success_toast.png`**: The Contact form showing the green success toast notification banner.

---

## 📹 Demo Video Recording Script

### Technical Setup:
*   **Resolution**: 1080p, 16:9 aspect ratio.
*   **Duration**: ~90 to 120 seconds.
*   **Microphone**: High-quality audio, free of background noise.

### Narration Storyboard:

| Timestamp | Visual Action | Narration Script |
| :--- | :--- | :--- |
| **0:00 - 0:15** | Start on `index.html` (Light Mode). Hover over links. Scroll down slightly. | *"Hello, in this video I will walk you through the TechNova Solutions corporate website. The site features a fully responsive multi-page layout built using semantic HTML5, custom CSS variables, and vanilla JS."* |
| **0:15 - 0:35** | Click the theme toggler in the header. Toggle it back and forth. | *"Here we have an integrated theme engine. It toggles custom CSS color tokens instantly, switches the moon and sun icons, and persists the setting using localStorage so the preference is remembered upon refresh."* |
| **0:35 - 0:50** | Scroll down to the stats counters and the choosing panel. | *"As we scroll down, you'll see scroll-reveal animations. They are powered by the Intersection Observer API. The stats counter also triggers dynamically, counting up from 0 to the target metrics once it enters the viewport."* |
| **0:50 - 1:10** | Resize the browser window to mobile view. Open the drawer menu. Close it by clicking the overlay. | *"The site is fully responsive. Shrinking the viewport reveals our mobile navigation drawer menu. Clicking the menu icon slides out the panel, activates a backdrop overlay, and locks background scrolling for optimal mobile UX."* |
| **1:10 - 1:40** | Navigate to the Contact page. Click "Submit" immediately. Type an invalid email, then correct it. Submit and display the toast. | *"On the Contact page, we have a real-time form validation engine. If I attempt to submit the form empty, it scrolls the user to the first invalid field. As I enter inputs, it checks formatting like email structures and phone digit lengths. On valid submission, a custom success toast pops up."* |
| **1:40 - 1:50** | Click on 'About' and 'Services' briefly, then return to home. | *"This project demonstrates clean code practices, semantic structure, responsive grid layouts, and optimization for SEO and performance. Thank you for watching!"* |
