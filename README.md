# Atlas — The Living Network

Standalone, desktop-first Atlas Referral Network team preview. Open `index.html`. This folder contains everything it needs: styles, behavior, fonts, imagery and the optional tour. It has no links or dependencies on any other template.

## Explore

- Six independently floating product cards, with subtle pointer depth. Each opens an in-page panel with larger imagery and three category-specific service areas. Close with the X, “Back to the orbit,” Escape or the backdrop to return to the original position. “Start this type of project” selects that category in SYP without clearing existing input.
- Beneath the form: “Share your idea → Talk with Atlas → Get a tailored path forward.” This generic draft can be revised when the final process wording is approved.
- The approved transparent main logo is used in both the header and footer.
- The logo, Doug introduction and navigation remain fixed at the top. Clicking the logo returns to the beginning.
- “Follow the journey ↓” in the header scrolls to the journey. The matching circled-arrow cue stays inside its pinned introduction area; the monitor/play control opens the tour instead. The scene and five-milestone layout are unchanged.
- Native scrolling controls five chapters: Define, Build, Verify, Move and Deliver. The scene reveals, image movement, copy and orange route advance together. “THE ATLAS JOURNEY” remains visible inside the scene, with an A-to-Z / idea-to-shelf message.
- The five milestone buttons jump to their matching point in the journey.
- The centered monitor preview opens a locally bundled 25-second slideshow, encoded as H.264. The large screen is clearly labeled “VIDEO GOES HERE”: this is a placeholder for the final Atlas film, not live-action footage.
- A light generated global-network panorama opens behind the destination section.
- The header motion button pauses ambient motion. System reduced-motion preference gives a static, button-controlled journey; small screens also use direct chapter selection.
- Project fields and file selection are local previews. The submit handler only opens an explanatory dialog. No details or files are sent, stored or attributed. The agent uses labeled scripted preview responses.

## Asset origins

The Pinterest images and the two supplied screen recordings are reference-only. None are included in this folder or the tour. [MotionSites](https://motionsites.ai/) was reviewed for motion inspiration; its code, media and paid prompts were not copied.

Four new concept scenes were created with the built-in image-generation tool and saved here as optimized WebP files:

| Final asset | Generation direction |
| --- | --- |
| `assets/planning.webp` | Premium photorealistic product-planning meeting in a luminous modern office; three diverse professionals, unbranded product samples, textile swatches and sketches; clean pale space at left, sunlight, subtle orange; no text or logos. |
| `assets/handover.webp` | Natural business handshake in a bright product/warehouse studio, finished unbranded packaging and apparel samples, warm afternoon light, realistic hands, clean left space; no text or logos. |
| `assets/shipping.webp` | Original cinematic dawn port panorama, cargo ship, cranes and warehouses, pale ocean and sky, restrained orange containers, realistic logistics; no text or logos. |
| `assets/world.webp` | Original refined orbital Earth visualization, Europe and Africa, white clouds, pale blue and ivory atmosphere, restrained golden-orange connection arcs; no labels or text. |

The approved main logo is an optimized copy of the supplied `ATLAS REF NET Logo MAIN.png`, with its transparency preserved. The placeholder portrait, remaining product imagery and living-network background are optimized copies of the previously supplied/approved Atlas assets. Company trademarks visible on supplied product images are retained. The portrait and new scenes are illustrative, not photographs of Doug or actual Atlas operations. New generation does not itself establish legal exclusivity or trademark clearance.

The CPG and Luxury orbit cards and their panels now use two new, original product illustrations generated with the built-in image tool. See [Image creation notes](IMAGE-NOTES.md) for the final assets and exact prompts. Category panels describe draft capabilities, not verified case studies or client testimonials.

Instrument Sans was retrieved from Google Fonts and bundled locally with its OFL license (`assets/OFL-InstrumentSans.txt`). There are no external font requests, animation libraries, trackers or form endpoints. The optional video is loaded only when opened.

## Local review status

JavaScript syntax, self-contained asset links, page-top anchors, original-file checksums and video duration/representative frames were checked. The fixed-header journey timing and all five milestone targets were checked at four desktop viewport heights. Category interaction logic was checked with a local test harness: six content payloads, close routing, saved scroll position, focus restoration, category selection and preservation of an existing brief. Browser layout and interaction testing remain to be reviewed in the desktop preview.

## Hosting

This is a static local preview. It has not been published. Share the complete folder (or its ZIP), not just the HTML file. Recipients can extract it and open `index.html`; no installation or connection to another template is needed. It can also be deployed independently to a static host later. Do not connect a live backend or publish client quotations/credentials without the separate content approval step.
