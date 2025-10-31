# Custom Icons Guide

This directory should contain custom SVG or PNG icons for the BearAware website.

## Required Icons

Create the following icon files (SVG format recommended, 100x100px):

### System Architecture Icons
- `fixed-system.svg` - Icon representing the fixed ultrasound/infrasound system (e.g., tower/pole with sensors)
- `drone-system.svg` - Icon representing the drone (e.g., quadcopter silhouette)
- `mobile-app.svg` - Icon representing the mobile app (e.g., smartphone with map)

### Scientific Foundation Icons
- `bioacoustics.svg` - Icon for sound waves/acoustics (e.g., waveform or speaker)
- `chemistry.svg` - Icon for chemistry (e.g., molecule structure or flask)
- `ai-neural.svg` - Icon for AI (e.g., neural network or brain)
- `research.svg` - Icon for research (e.g., microscope or document with magnifying glass)

### Objectives Icons
- `target.svg` - Icon for main objectives (e.g., target or bullseye)
- `roadmap.svg` - Icon for future roadmap (e.g., road/path or calendar)

### Impact Icons
- `bear.svg` - Icon representing bears (e.g., bear silhouette or paw print)
- `community.svg` - Icon for communities (e.g., group of people or houses)
- `ecosystem.svg` - Icon for ecosystem (e.g., tree or mountain landscape)

### Education Icons
- `chatbot.svg` - Icon for AI chatbot (e.g., chat bubble with bot symbol)
- `education.svg` - Icon for education (e.g., graduation cap or book)

### Judge Criteria Icons
- `innovation.svg` - Icon for innovation (e.g., lightbulb or star)
- `science.svg` - Icon for science (e.g., atom or laboratory)
- `impact.svg` - Icon for impact (e.g., ripple effect or handshake)
- `implementation.svg` - Icon for implementation (e.g., gear or rocket)

## Icon Specifications

- **Format**: SVG (preferred) or PNG
- **Size**: 100x100px minimum
- **Color**: Use colors that match the BearAware theme:
  - Primary green: #2e7d32
  - Secondary green: #66bb6a
  - Dark text: #0c2b1e
- **Style**: Simple, clean, modern flat design
- **Background**: Transparent

## Quick Placeholder Solution

Until you create custom icons, you can:
1. Use free icon libraries like [Heroicons](https://heroicons.com/), [Feather Icons](https://feathericons.com/), or [Font Awesome](https://fontawesome.com/)
2. Use online SVG icon generators like [Flaticon](https://www.flaticon.com/) or [Iconfinder](https://www.iconfinder.com/)
3. Create simple colored circles with text as placeholders

## How Icons Are Used

The icons are loaded with error handling - if an icon is missing, it will simply not display (thanks to `onerror="this.style.display='none';"`), so the page will still work without them.

Example usage in HTML:
```html
<img src="assets/icons/fixed-system.svg" alt="Sistem Fix" class="system-icon-img" onerror="this.style.display='none';" />
```
