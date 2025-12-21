
# THIS PROJECT IS STILL UNDER DEVELOP
---

# Movie List App

[![Live Preview](https://img.shields.io/badge/Live_Preview-Open-blue)](https://movie-list-delta-blush.vercel.app/)
![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Integrated-38B2AC)
![MIT License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Build](https://img.shields.io/badge/Build-Passing-success)

A web application for displaying popular movies using data from TMDB.

---

## Features

* Display list of popular movies
* Clean and responsive UI
* Optimized image loading
* Modular MovieCard component
* Environment-based configuration for external API

---

## Live Preview

Link:
**[https://movie-list-delta-blush.vercel.app/](https://movie-list-delta-blush.vercel.app/)**

---

## Tech Stack

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* TMDB API

---

## Installation

Clone repository:

```bash
git clone <repo_url>
cd <repo_folder>
```

Install dependencies:

```bash
npm install
```

---

## Environment Configuration

Make `.env.local`:

```
TMDB_KEY=your_tmdb_api_key
```

picture domain configuration at `next.config.js`:

```js
export default {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
};
```

---

## Development

run development server:

```bash
npm run dev
```

Accses in:

```
http://localhost:3000
```

---

## API Endpoint

The application fetches movie data through:

```
/api/movies
```

output example:

```json
{
  "page": 1,
  "results": [
    {
      "id": 123,
      "title": "Sample Movie",
      "poster_path": "/image.jpg",
      "release_date": "2024-01-01",
      "vote_average": 7.8
    }
  ]
}
```

---

## Build

Build project:

```bash
npm run build
```

---
