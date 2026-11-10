---
name: video-review
description: Deliver every video draft/edit/cut to the user through a timestamped review page (with Instagram / TikTok / Facebook phone-mockup previews and 9:16 safe zones), then act on the feedback they leave. Use EVERY time you finish or export a video edit for the user (first draft, revision, variant batch, re-cut, "here's v2"), when they say they've left feedback, finished reviewing, or ask to review a video, and when placing text in a 9:16 video or asked "is this in the safe zone?", "will this get covered?", "tiktok safe area", "where do I put text on reels". Never deliver a video draft as just a file path.
---

# Video review

Every video draft goes to the user through a local review page. They can play the edit, pause anywhere, and leave notes pinned to a timestamp or a time range, while seeing the video inside a phone mockup of Instagram, TikTok or Facebook. Their notes autosave to a file next to the video, and when they press **Send feedback to Claude** you are notified and pick up from there.

Files in this skill folder (the folder this SKILL.md is in; written `<skill>` below):
- `server.mjs`: the review server (Node 18+, no dependencies; uses `ffprobe` for frame rate if available)
- `review.html`: the review page it serves
- `mockups.js`: draws the phone mockups around the video, from the measurements in `safe-zones.md`
- `config.json`: the user's own social account for the mockups (handle, verified tick, profile photo)
- `safe-zones.md`: exact 9:16 safe zones for IG Reels, Stories and Feed, TikTok, FB Feed and Reels

Needs: Node.js 18 or later. `ffmpeg`/`ffprobe` are optional but recommended (frame rate, frame grabs, making playable proxies).

## First run: set up the user's account

If `config.json` has an empty `handle`, ask the user once, before the first review:
1. Their Instagram (or main social) handle, without the @.
2. Whether the account is verified (blue tick).
3. Optionally, a profile photo: a square JPG/PNG they give you. Copy it into `<skill>` (e.g. `<skill>/avatar.jpg`). Only download it from their profile if they ask you to and approve the download.

Write the answers to `config.json`:

```json
{ "handle": "theirhandle", "verified": true, "avatar": "avatar.jpg" }
```

`avatar` is a file name inside `<skill>` (or an absolute path); leave it `""` for an initial-letter avatar. If they'd rather skip setup, leave it: the mockups show "yourname".

## 0. Safe-zone check (9:16 drafts, before delivering)

Read `safe-zones.md` once per session when working on vertical video. Before handing over a 9:16 draft:
1. Pull the frames that matter: the hook, each on-screen headline or graphic card, a caption frame from each section, the end card. `ffmpeg -v error -ss <t> -i draft.mp4 -frames:v 1 -y frame_<t>.png`, then Read each.
2. Check every text block, logo, face and product against the zones. **Default placement is Instagram Feed, organic** (4:5-style crop: anything above y 91 or below y 1829 on a 1080x1920 frame is cut off; nothing is covered). If the user named another placement (e.g. TikTok ad), check against that one's numbers instead. If it's running everywhere, use the box that's safe on every placement: **x 100 to 880, y 290 to 1340**.
3. Fix anything that's covered or cropped. If something deliberately sits outside (e.g. subtitles low in frame), leave it but say so in the "what changed" note with the placement it clashes with, e.g. `Subtitles sit at y≈1500: under the Reels name/caption block, clear on TikTok organic.`

## 1. Deliver a draft

1. **Name drafts by version and never overwrite one.** e.g. `summer-ad-hook-a_v1.mp4`, then `summer-ad-hook-a_v2.mp4`. Feedback is stored per file, so a new version gets a clean review and the old feedback stays as a record.
2. **Write a short "what changed" note** to a markdown file beside the video (e.g. `summer-ad-hook-a_v2.notes.md`). For v1, two or three lines on the approach. For v2 and later, go through the previous round's notes one by one and say what you did for each (`- 0:03.2 "cut is late" → trimmed 6 frames`). If you skipped one, say why. This shows in the review page under "What changed in this draft".
3. **Start the server in the background** (Bash with `run_in_background: true`), one call for all videos in the batch:

   ```bash
   node "<skill>/server.mjs" "/abs/path/summer-ad-hook-a_v2.mp4" "/abs/path/summer-ad-hook-b_v2.mp4" --notes "/abs/path/v2.notes.md" --title "Summer ad · Hooks · Draft 2" --caption "The post caption"
   ```

   Several videos (hook variants, aspect ratios) show as tabs in one review. It picks port 4747, or the next free port.

   The page shows the draft **inside a phone mockup of the app**: status bar, buttons, name, caption, ad button and nav bar, all placed from the measurements in `safe-zones.md`. It opens on **Instagram Feed (organic)** by default. If it'll run somewhere else, add `--placement <id>`: `igReels`, `igReelsAd`, `igStory`, `igStoryAd`, `igFeed`, `tiktok`, `tiktokAd`, `fbFeed`, `fbFeedAd`, `fbReels`, `fbReelsAd`.

   The mockups use the account in `config.json`. Add `--caption "<post caption>"` so it reads like the real post, and for ads `--cta "<button text>"` (default "Shop now"). For a post from a different account (e.g. a client's), pass `--handle <their handle>`. That drops the tick and photo unless you also give `--verified` and/or `--avatar <image file>`.

   In the page, the user can turn the mockup on or off (**Preview on/off**, or **P**), pick another platform from the menu next to it, and press **Zones** (**S**) to outline exactly what that placement covers, plus the box that's safe everywhere. Mockups only show on 9:16 videos; anything else plays normally.
4. **Read the first output line** (`REVIEW_URL http://localhost:<port>`) from the background task's output and open it for the user: in a built-in browser pane if your environment has one, otherwise give them the URL to open.
5. **Hand over and stop.** Tell them the draft is up, in one or two lines (what it is and anything you want them to look at in particular), and end your turn. Do not poll, sleep or wait: the server exits when they send feedback, and that wakes you.

## 2. When the feedback arrives

The background task finishes with output like:

```
REVIEW_SUBMITTED
FEEDBACK changes 7 notes -> /abs/path/summer-ad-hook-a_v2.feedback.md
```

Then:
1. **Read every `.feedback.md`** listed. Read the matching `.feedback.json` too if you need exact times (`start`/`end` in seconds; `end` is null for a single-moment note) or categories.
   A note made while a placement preview was on says so (`viewed as TikTok ad`), which usually means it's about something being covered or cropped on that platform. Check it against `safe-zones.md`.
2. **Look at the frames.** Each note has a `frame:` JPG showing exactly what they were looking at. Open it whenever the note is visual or vague ("this", "move that", "too small") so you understand which element they mean.
3. **Verdict `approved` and no open notes**: the draft is done. Confirm, and ask whether they want exports or other sizes. Don't make another draft unprompted.
4. **Otherwise make the next version.** Treat each note as a checklist item. Notes they marked resolved need no action. Ask in chat only when a note truly can't be acted on without them; otherwise make your best call and say so in the next "what changed" file.
5. **Deliver the new version through this skill again** (section 1). Every round goes back through the review page.

## If something goes off-script

- **They say "done" / "left my notes" in chat without pressing Send**: notes autosave, so read `<video>.feedback.json` directly and carry on as in section 2. Stop the server task if it's still running.
- **The server stopped before they sent anything** (task ended without `REVIEW_SUBMITTED`): restart it with the same command. Existing notes reload from the feedback file.
- **The video won't play in the page** (HEVC, ProRes, odd `.mov`): make a review proxy and review that instead:
  `ffmpeg -i in.mov -c:v libx264 -crf 20 -preset fast -c:a aac -movflags +faststart in_review.mp4`
- **They want to review an existing file you didn't make**: same flow, skip the "what changed" note.
- **They want to change the account in the mockups**: update `config.json`.
