# Shoreline Audio Setup

The river effect animation is now complete! You just need to add a shoreline/wave sound file.

## What to do:

1. **Get a shoreline sound file** - You can:
   - Download a free shoreline/ocean waves sound from:
     - Freesound.org
     - Pixabay (Free sounds)
     - Zapsplat.com
   - Or record your own wave/shoreline sound

2. **Add the audio file** to the `assets/` folder with one of these names:
   - `shoreline-sound.mp3` (recommended - better browser support)
   - `shoreline-sound.wav` (alternative format)

3. **File requirements:**
   - Format: MP3 or WAV
   - Should be a loopable shoreline/wave sound (typically 3-10 seconds)
   - Consider reducing file size for web (MP3 works best)

## How it works:

- The audio will attempt to autoplay with 30% volume when the page loads
- If autoplay is blocked by the browser, clicking anywhere on the page will start the sound
- The sound loops continuously in the background
- The river animation shows water waves flowing from the bottom up to about 25% of the footer

## Browser Autoplay Policies:

Modern browsers require user interaction or muting before autoplay. The setup handles this gracefully:
- If autoplay is allowed, the sound plays automatically
- If autoplay is blocked, the sound will start on the user's first click

## Optional: Adjust volume

If you want to change the volume level, edit `js/app.js` and find this line:
```javascript
audio.volume = 0.3; // Set volume to 30%
```

Change `0.3` to any value between `0` (silent) and `1` (maximum)
