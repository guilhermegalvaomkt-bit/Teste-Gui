# Video Review: a Claude Code skill

Get timestamped feedback on every video edit Claude makes for you, and see how it'll look on Instagram, TikTok and Facebook before you post.

When Claude finishes a draft, it opens a review page instead of handing you a file path. You:

- **Leave notes at exact moments.** Pause anywhere and type, or press **C**. Mark a whole section with **I** and **O**. Tag notes (Timing, Audio, Music, Text, Visual, Hook). Every note saves a still of the frame you were looking at.
- **See it in a phone.** The video plays inside a phone mockup of IG Reels, Stories or Feed, TikTok, or Facebook Feed or Reels, organic or ad, with the real buttons, captions and crops placed from measured screenshots. Press **Zones** to outline exactly what each app covers.
- **Send it back in one click.** Press **Send feedback to Claude**, and Claude reads every note and frame, makes the next version and sends that back through the same page, with a list of what it changed for each note.

## Install

1. Unzip this folder into your Claude Code skills folder so you end up with:
   ```
   ~/.claude/skills/video-review/SKILL.md
   ```
2. Make sure you have **Node.js 18+** (`node --version`). **ffmpeg** is optional but recommended (`brew install ffmpeg` on a Mac).
3. Start a new Claude Code session. The first time you get a draft, Claude asks for your Instagram handle (and optionally a profile photo) so the phone previews look like your real account.

**Optional, recommended:** to make sure every video draft comes through the review page, add this line to your `~/.claude/CLAUDE.md`:

```
Every video draft you make for me goes through the `video-review` skill, never as a bare file path.
```

## Using it

Ask Claude for a video edit as you normally would. When the draft is ready, the review page opens (in the Claude desktop app's browser pane, or as a localhost link). Say where it's going ("this is a TikTok ad") and the preview opens on that platform.

Your notes save as you type, so nothing's lost if you close the tab. Feedback files sit next to each video (`name.feedback.md`, `name.feedback.json` and a folder of frames).

| Key | Does |
|---|---|
| Space | Play / pause |
| C | New note at this moment |
| I / O | Start / end a range |
| , / . | Back / forward one frame |
| ← / → | 1 second (Shift: 5) |
| P | Phone preview on / off |
| S | Zones on / off |
| L | Loop the range |

## Credits

Created by **Fraser Cottrell** ([@frasercottrell](https://www.instagram.com/frasercottrell/)).

The 9:16 safe-zone measurements (`safe-zones.md`) are from **Post Preview** by [@alysha.md](https://www.alyshadotmd.com/post-preview), measured from real iPhone screenshots, October 2026. The phone mockups are drawn from those numbers. App layouts change, so treat them as a close guide, not pixel-perfect.
