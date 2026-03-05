import { notFound } from "next/navigation";

// Catch-all route for unmatched paths under [locale]
// This triggers the [locale]/not-found.tsx component
export default function CatchAll() {
  notFound();
}
