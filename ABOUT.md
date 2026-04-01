# Dataset Animation Website

## 📖 About

Premium animated website featuring circular rotating text rings with smooth animations and transitions.

---

## 🎬 Animations

### 1. Loading Animation (Intro)

**Description:** Full-screen loading sequence with countdown from 0 to 100.

**How it works:**
- White circle starts at full page width with huge number (300px font)
- Number shrinks while counting from 0 to 100
- Circle morphs from rectangle to perfect circle as count progresses
- At 100%, circle fades out with smooth opacity transition
- Duration: ~3 seconds

**Technical Details:**
- CSS transition: `width 3s ease, height 3s ease`
- JavaScript interval: 30ms per count increment
- Opacity fade: 0.8s ease transition

---

### 2. Ring Burst Animation (Entry)

**Description:** Rings burst outward from the center with elastic bounce effect.

**How it works:**
- Rings start at scale(0) from center point
- When loading completes, rings scale up with staggered delays
- Inner ring appears first, then middle, then outer
- Uses cubic-bezier for elastic bounce effect
- Duration: 1.2s with 0.15s stagger between rings

**Technical Details:**
- Transform: `scale(0)` to `scale(1)`
- Transition: `transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)`
- Stagger delay: `index * 0.15s`

---

### 3. Continuous Ring Rotation

**Description:** Each ring rotates continuously at different speeds and directions.

**How it works:**
- CSS animation rotates the ring container
- Direction alternates: outer (-1), middle (1), inner (-1)
- Each ring has different rotation speed
- Animation is infinite and linear

**Technical Details:**
- CSS Keyframes: `rot` (clockwise), `mrot` (counter-clockwise)
- Duration: varies per ring (34s, 40s, 48s)
- Timing: linear infinite

---

### 4. Vertical Stretch Effect

**Description:** Rings are stretched vertically to create an oval/elliptical shape.

**How it works:**
- Each ring has a verticalStretch value (1.6, 1.7, 1.8)
- Applied via CSS transform: `scaleY()`
- Creates elongated oval appearance
- Different stretch values for visual hierarchy

**Technical Details:**
- Transform: `scaleY(verticalStretch)`
- Values: Outer (1.8), Middle (1.7), Inner (1.6)

---

### 5. Travel To Animation (Suck into Black Void + Zoom)

**Description:** Immersive transition that zooms into the center and covers the screen with black.

**How it works:**

1. **Zoom Phase (0-800ms)**
   - Camera zooms 80x into the center (ENTER button position)
   - Small black void dot grows
   - Rings scale down

2. **Blackout Phase (800-1300ms)**
   - Void expands massively
   - Black overlay covers everything
   - Complete blackout

3. **Transition (1300ms+)**
   - Next page loads

**Technical Details:**
- Uses requestAnimationFrame for smooth animation
- Transform scale: 1 to 80
- Void expansion: 2px to 400vw
- Z-index layering for proper coverage

---

### 6. Home Page Particle Background

**Description:** Animated 3D particle effect using WebGL (OGL library).

**Features:**
- 500 white particles floating in 3D space
- Particles move on hover
- Continuous rotation and animation
- WebGL shader-based rendering

**Technical Details:**
- Uses OGL (WebGL library)
- Custom vertex and fragment shaders
- GLSL animations for particle movement
- Performance optimized with pixelRatio

---

## 🎯 Ring System

### Ring Configuration

| Ring | Text | Font Size | Direction | Speed | Stretch |
|------|-------|-----------|-----------|-------|---------|
| Outer | START WITH CURIOSITY END WITH INSIGHT | 55px | Counter-clockwise | 48s | 1.8 |
| Middle | BEHIND EVERY GREAT DECISION IS DATA | 55px | Clockwise | 40s | 1.7 |
| Inner | EXPLORE DATA GROW SHARPER | 55px | Counter-clockwise | 34s | 1.6 |

### Spacing
- Center circle radius: 150px
- Gap to first ring: 100px
- Gap between rings: 50px

---

## 🛠️ Technologies Used

- **React** - UI framework
- **CSS Animations** - Ring rotation
- **CSS Transitions** - Smooth hover effects
- **JavaScript** - Countdown logic and state management
- **requestAnimationFrame** - Smooth animation loops
- **OGL (WebGL)** - 3D particle rendering
- **GLSL Shaders** - Custom particle effects

---

## 📁 Project Structure

```
src/
├── App.jsx                           # Main app component
├── index.css                         # Global styles
├── animations/
│   ├── LoadingAnimation.jsx          # Intro loading animation
│   ├── AnimationTemplate.jsx         # Template for new animations
│   └── Travel_To/
│       └── TravelToAnimation.jsx      # Suck into void + zoom effect
├── components/
│   ├── RingSystem.jsx                # Ring configuration and layout
│   ├── CircularText.jsx              # Individual ring component
│   └── EnterButton.jsx               # Center enter button
└── pages/
    ├── HomePage/                     # Home page with particles
    │   ├── HomePage.jsx
    │   ├── Particles.jsx             # WebGL particle component
    │   ├── Particles.css
    │   └── index.js
    └── AboutPage/                    # About page
        ├── AboutPage.jsx
        ├── AboutPage.css
        └── index.js
```

---

## 🎨 Design Features

- **Black background** for contrast
- **White text** with black stroke outline
- **Anton + Space Grotesk** fonts
- **Uppercase** text throughout
- **Smooth transitions** on all interactions
- **Premium feel** with particle effects

---

## 🚀 Future Enhancements

This structure is ready for adding:
- More pages with different animations
- Interactive particle effects
- Custom transitions between pages
- Additional WebGL effects
- GSAP timeline animations

---

## 🔧 How to Run

```bash
npm install
npm run dev
```

---

## 📝 Notes

- Particle background uses OGL WebGL library
- Animation timing can be adjusted in each component
- Ring configuration is centralized in RingSystem.jsx
- Travel animation automatically covers full screen with black
