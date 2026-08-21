# 📚 Bookmarked!!
<img src="https://socialify.git.ci/thegrindneverstops21/bookmarked/image?language=1&name=1&owner=1&theme=Light" alt="bookmarked" width="640" height="320" />
A modern, single-page bookmark manager: save, tag, categorize, and search your links from one clean dashboard instead of a messy browser bookmarks bar.

<img width="1912" height="914" alt="image" src="https://github.com/user-attachments/assets/8b3258b1-73c0-4b0f-bdd5-b7632402b5d5" />
<img width="1920" height="916" alt="image" src="https://github.com/user-attachments/assets/39acec5c-08d7-4d61-94d6-c76d158b4a0c" />

<img width="1920" height="918" alt="image" src="https://github.com/user-attachments/assets/0569bed2-764c-4cfc-b376-4b5b11f5adcc" />
**Live demo:** (https://bookmarked-alpha.vercel.app/)

Built solo by [Sam Junior Ndlovu](https://github.com/thegrindneverstops21) as part of the CodeTribe 2026–2027 Work-Integrated Learning cohort.

---

## Features

- **Add, edit & delete bookmarks**: full CRUD, with a confirmation modal before anything is deleted
- **Favorites**: star the bookmarks you use most and filter down to just those
- **Categories**: bookmarks auto-group by category, with a dedicated Categories view
- **Powerful search**: filters live across title, URL, category, description, and tags
- **Dark / light theme**: toggle from Settings, saved across visits
- **Persistent storage**: everything survives a refresh via `localStorage`, no backend required
- **Fully responsive**: sidebar collapses to icons on tablet, then to a horizontal tab strip on mobile
- **Single-page layout**: navbar-free by design; navigation, search, and content all live in one scroll-free shell

## Tech Stack

| | |
|---|---|
| **React 19** | Component-driven UI |
| **TypeScript** | Catches bugs before runtime |
| **Vite** | Fast dev server & build |
| **Plain CSS (BEM)** | No UI framework — hand-written, class-based styling |
| **lucide-react** | Icon set |
| **Vercel** | Live deployment |

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/thegrindneverstops21/bookmarked.git
cd bookmarked
npm install
```

Run the dev server:

```bash
npm run dev
```

Other scripts:

```bash
npm run build     # type-check + production build
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

## Project Structure

```
src/
├── App.tsx                 # all app state lives here (bookmarks, theme, active view, search)
├── index.css               # global stylesheet: design tokens + every component's styles
├── components/
│   ├── Layout.tsx           # Sidebar + page content + Footer shell
│   ├── Sidebar.tsx           # navigation: Dashboard, Bookmarks, Favorites, Categories, Settings
│   ├── BookmarkGrid.tsx      # renders the card grid, or an empty state when there's nothing to show
│   ├── BookmarkCard.tsx      # a single bookmark, with favorite/edit/delete actions
│   ├── BookmarkForm.tsx      # add & edit form (shared between both modes)
│   ├── Modal.tsx             # reusable overlay (React Portal): powers Add/Edit and Delete confirm
│   ├── Categories.tsx        # bookmarks grouped and counted by category
│   ├── Settings.tsx          # theme toggle
│   └── Footer.tsx
```

**How state flows:** every component under `Layout` is intentionally "dumb" — it receives data and callbacks as props and has no state of its own. `App.tsx` is the single source of truth, and two `useEffect` hooks keep `bookmarks` and `theme` synced to `localStorage` whenever they change.

## Roadmap

- [ ] Backend + auth (Supabase) for multi-device sync
- [ ] Drag-and-drop reordering within categories
- [ ] Browser extension for one-click saving
