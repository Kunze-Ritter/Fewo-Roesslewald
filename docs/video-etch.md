# Video — Video.js v10 + lokales MP4

## Pakete (Beta)

```bash
npm install @videojs/html@10.0.0-beta.23 @videojs/core@10.0.0-beta.23
```

v10 nutzt **Web Components** (nicht `videojs()` aus v8). Vanilla: `@videojs/html`.

## Prototyp

| Datei | Rolle |
|--------|--------|
| `public/media/Sequenz-02_3.mp4` | Lokale Datei (nicht in Git, siehe `public/media/README.md`) |
| `src/data/site.js` | `SITE.video` (src, poster, Texte) |
| `src/media/video.js` | `import "@videojs/html/video/skin"` |
| `src/pages/home.js` | Sektion `#video` nach Hero |
| `src/styles/video.css` | Layout / Aspect Ratio |

## Markup (Etch 1:1)

```html
<video-player class="fewo-video-player">
  <video-skin>
    <img slot="poster" src="…" alt="" width="1200" height="675" />
    <video src="/wp-content/uploads/…/Sequenz-02_3.mp4" title="…" playsinline preload="metadata"></video>
  </video-skin>
</video-player>
```

Custom Script in WP: gebündeltes `video.js` (Skin-Import einmalig).

## Performance

- MP4 **nicht** autoplay auf der neuen Startseite (Nutzer startet per Player).
- Re-Encode empfohlen (720p, &lt; 8 MB) — Original ~29 MB.
- Poster = Hero-Bild, `preload="metadata"`.

## Docs

https://v10.videojs.org/ · https://videojs.org/blog/videojs-v10-beta-hello-world-again
