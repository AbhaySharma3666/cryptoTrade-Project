**Project Structure**

- **src/components/ui**: small UI primitives (Button, Input, Avatar...). Use the UI barrel at `src/components/ui/index.ts` to import components.
- **src/components/index.ts**: root barrel exposing grouped exports (e.g., `ui`).
- **src/config/api.js**: centralized API client and exported base URLs. Uses Vite env variables `VITE_API_BASE_URL` and `VITE_FRONTEND_URL`.
- **.env.example**: example env vars — copy to `.env`/`.env.local` and edit.

Import patterns

- Import individual UI controls: `import { Button, Input } from '@/components/ui'`
- Import grouped components: `import { ui } from '@/components'` then `ui.Button`

Secrets and links

- Keep secret keys out of repo. Place them in environment variables or a secrets manager. For local development, add them to `.env.local` and do NOT commit that file.

Next steps

- Optionally refactor other pages to use the new barrels and centralized config.
