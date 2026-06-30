export const FORMSPREE_URL = 'https://formspree.io/f/xdaawlwd';

export async function submitToFormspree(
  data: Record<string, string>,
): Promise<{ ok: boolean; error?: string }> {
  const response = await fetch(FORMSPREE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) return { ok: true };

  try {
    const errorData = await response.json();
    return { ok: false, error: errorData.error || 'Submission failed. Please try again.' };
  } catch {
    return { ok: false, error: 'Network error. Please check your connection.' };
  }
}
