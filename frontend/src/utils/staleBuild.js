// Recovers from "stale build" errors.
//
// After a new deploy, page files (chunks) get new hashed names and the old ones
// are deleted. A browser still running the old copy of the app then asks for a
// file that no longer exists, and the failed import surfaces as errors such as
// "'text/html' is not a valid JavaScript MIME type" or
// "Failed to fetch dynamically imported module".

const RELOAD_KEY = "odyssey:stale-build-reload";
const RELOAD_WINDOW_MS = 30 * 1000;

const STALE_PATTERNS = [
  /not a valid JavaScript MIME type/i,
  /Failed to fetch dynamically imported module/i,
  /error loading dynamically imported module/i,
  /Importing a module script failed/i,
  /Loading chunk [\w-]+ failed/i,
  /Unable to preload CSS/i,
];

export function isStaleBuildError(error) {
  const message = String(error?.message ?? error ?? "");
  return STALE_PATTERNS.some((pattern) => pattern.test(message));
}

// Drops the service worker and its caches so the next load fetches the
// current build from the server.
export async function clearAppCaches() {
  try {
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((r) => r.unregister()));
    }
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
  } catch (err) {
    console.error("Clearing app caches failed:", err);
  }
}

export async function hardReload() {
  await clearAppCaches();
  window.location.reload();
}

// Reloads once with fresh files. Returns false if a reload already happened
// moments ago, so a genuinely broken deploy cannot cause a reload loop.
export function reloadOnceForStaleBuild() {
  let last = 0;
  try {
    last = Number(sessionStorage.getItem(RELOAD_KEY)) || 0;
  } catch {
    // sessionStorage unavailable (private mode); fall through and reload once.
  }
  if (Date.now() - last < RELOAD_WINDOW_MS) return false;

  try {
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    // ignore
  }
  hardReload();
  return true;
}
