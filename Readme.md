# Image Slider Library (Vanilla JavaScript)

**Author:** Aarohi Bhattarai

A responsive, reusable image slider built from scratch with HTML, CSS and an ES6 class. It uses no third-party libraries.

## Features
- Previous / Next arrow buttons on the left and right of the slider
- Navigation dots generated automatically from the number of slides
- Clickable dots that slide directly to the matching image
- Horizontal sliding animation using `transform: translateX()` and CSS `transition`
- Seamless infinite loop: going past the last or first slide continues in the same direction
- Fluid, responsive layout using `aspect-ratio` and `object-fit: cover`
- Supports multiple sliders on one page (each `.slider` gets its own instance)

## Files
| File | Purpose |
|------|---------|
| `index.html` | Slider markup and five sample images |
| `style.css` | Overflow mask, flex track, transitions, controls, breakpoints |
| `slider.js` | `Slider` class: layout math, events, active index, looping |

## How it works
1. **Layout:** `.slider` has `overflow: hidden` and acts as the visible window. `.slider-track` is a flex row, and each slide is `100%` wide.
2. **Movement:** the track moves by `translateX(-index * 100%)`. Using `transform` keeps the animation GPU-accelerated and smooth.
3. **Looping:** the first and last slides are cloned onto opposite ends of the track. After the animation lands on a clone, the slider jumps without animation to the matching real slide, so the loop looks continuous.
4. **Dots:** the active dot is calculated with `(index - 1 + count) % count`, which converts the track position into a real slide number.

## How to run
Open `index.html` in any modern browser. An internet connection is needed to load the sample images from Picsum.