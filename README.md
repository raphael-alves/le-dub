# 🦁 ON DIT LE DUB.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Stop saying "La Dub". Seriously.**

This project is a public service announcement wrapped in a React application. It restores the truth about the grammatical gender of the word "Dub", while providing a Sound System experience directly in your browser.

👉 **Live Demo:** [le-dub.fr](https://le-dub.fr)

---

## 🎨 Features

* **Interactive Dub Siren:** A fully synthesized synth using the **Web Audio API** (Oscillators, LFOs, Gain Nodes). No samples, pure code.
* **Background Sound System:** Clever integration of YouTube iFrames to bypass autoplay policies and stream heavy Dub Stepper tracks.
* **Reactive Visuals:** CSS animations and "Shake" effects synced with the user interaction.
* **Rasta Mode:** A carefully curated color palette (Red, Gold, Green) honoring the Dub.
* **Type-Safe:** Built with strict TypeScript because we don't joke with runtime errors.

---

## 🛠️ Tech Stack

Built with the best modern tools:

* **[Biome](https://biomejs.dev/):** For lightning-fast formatting and linting.
* **[React](https://react.dev/):** The library for web and native user interfaces.
* **[React YouTube](https://github.com/tjallingt/react-youtube):** To handle the background vibes.
* **[TypeScript](https://www.typescriptlang.org/):** For strict typing and developer sanity.
* **[Vercel](https://vercel.com/):** For hosting and continuous deployment.
* **[Vite](https://vitejs.dev/):** Next Generation Frontend Tooling.

---

## 🚀 Getting Started

Want to run the Sound System locally? Pull up!

### 1. Clone the repo
```bash
git clone https://github.com/raphael-alves/le-dub.git
cd le-dub
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Run the vibes
```bash
pnpm run dev
```
Open `http://localhost:5173` and turn up the volume. 🔊

---

## 🧩 Project Structure

Everything is organized to keep the codebase scalable and readable.

```text
src/
├── BackgroundSoundSystem.tsx  # The hidden YouTube player component
├── AudioPlayer.tsx            # Audio logic handler
├── useDubSiren.ts             # Custom Hook: The synth engine (Web Audio API)
├── App.tsx                    # Main logic
├── App.css                    # Styles & Animations
└── main.tsx                   # Entry point
```

---

## 🎛️ The Dub Siren Engine (`useDubSiren.ts`)

The core of the project is a custom hook that creates a vintage Dub Siren from scratch.

```typescript
// It uses a main oscillator (Square/Sawtooth) modulated by an LFO (Triangle)
// creating that signature "Woi-woi-woi" sound.

const mainOsc = ctx.createOscillator();
const lfo = ctx.createOscillator();

// LFO controls the frequency of the main oscillator
lfo.connect(lfoGain);
lfoGain.connect(mainOsc.frequency);
```

---

## 🧼 Code Quality

We use **Biome** to keep the code pristine.

* `pnpm run check` : Lint the code.
* `pnpm run format` : Prettify everything.

---

## 🦁 Credits

* **Concept & Code:** Raphaël ALVES (aka Phenyx)
* **Inspiration:** The Jamaican Sound System Culture.

**Made with ❤️ and 🔊 in Paris.**
**Gemini AI used to generate this README.md and images (logo.svg & social-preview.png), and also to improve the dub siren settings and index.html metadata.**
