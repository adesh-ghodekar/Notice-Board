import { CATEGORY_OPTIONS, PRIORITY_OPTIONS } from "./constants";

// Basic http(s) URL check. Keeps the image field from being used for
// javascript:/data: URIs or other unexpected schemes.
const HTTP_URL_PATTERN = /^https?:\/\/\S+$/i;

/**
 * Validates a raw notice payload coming from the client.
 * Returns an array of human-readable error strings (empty when valid).
 * This is intentionally re-run on the server for both create and update,
 * since client-side validation can always be bypassed.
 */
export function validateNoticeInput(body) {
  const errors = [];

  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const content = typeof body?.body === "string" ? body.body.trim() : "";
  const { category, priority, publishDate, image } = body || {};

  if (!title) {
    errors.push("Title is required.");
  }

  if (!content) {
    errors.push("Notice body is required.");
  }

  if (!CATEGORY_OPTIONS.includes(category)) {
    errors.push("Category must be one of: " + CATEGORY_OPTIONS.join(", "));
  }

  if (!PRIORITY_OPTIONS.includes(priority)) {
    errors.push("Priority must be one of: " + PRIORITY_OPTIONS.join(", "));
  }

  if (!publishDate || isNaN(Date.parse(publishDate))) {
    errors.push("A valid publish date is required.");
  }

  if (image && !HTTP_URL_PATTERN.test(String(image).trim())) {
    errors.push("Image must be a valid http(s) URL.");
  }

  return errors;
}

/**
 * Normalizes a validated payload into the shape Prisma expects.
 */
export function toNoticeData(body) {
  const image = typeof body.image === "string" ? body.image.trim() : "";

  return {
    title: body.title.trim(),
    body: body.body.trim(),
    category: body.category,
    priority: body.priority,
    publishDate: new Date(body.publishDate),
    image: image || null,
  };
}
