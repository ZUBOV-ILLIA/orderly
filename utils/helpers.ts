export function formatDate(input: string, locale: string = ""): string {
  const [date] = input.split(" ");
  const [year, month, day] = date.split("-");

  const resultMonth = locale
    ? new Date(input).toLocaleString(locale, { month: "short" })
    : month;

  return `${day} / ${resultMonth.slice(0, 3)} / ${year}`;
}
