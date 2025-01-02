export function formatDate(input: string, locale: string = ""): string {
  const dateObj = new Date(input);

  const day = dateObj.getUTCDate().toString().padStart(2, "0");
  const year = dateObj.getUTCFullYear();
  const month = locale
    ? dateObj.toLocaleString(locale, { month: "short" })
    : (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");

  return `${day} / ${month.slice(0, 3)} / ${year}`;
}
