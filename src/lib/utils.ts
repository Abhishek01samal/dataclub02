/**
 * Custom cn utility that doesn't rely on external dependencies like clsx or tailwind-merge.
 * This ensures the project remains buildable even if npm install hasn't been run yet.
 */
export function cn(...inputs: any[]) {
  return inputs
    .flat(Infinity)
    .filter(Boolean)
    .join(" ");
}
