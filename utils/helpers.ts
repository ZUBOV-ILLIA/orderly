export function formatDate(input: string, locale: string = ""): string {
  const dateObj = new Date(input);

  const day = dateObj.getUTCDate().toString().padStart(2, "0");
  const year = dateObj.getUTCFullYear();
  const month = locale
    ? dateObj.toLocaleString(locale, { month: "short" })
    : (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");

  return `${day} / ${month.slice(0, 3)} / ${year}`;
}

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) return "emailValidErr1";

  if (!emailRegex.test(email)) return "emailValidErr2";

  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return "passValidErr1";

  if (password.length < 8) return "passValidErr2";

  if (!/[A-Z]/.test(password)) return "passValidErr3";

  if (!/[a-z]/.test(password)) return "passValidErr4";

  if (!/[0-9]/.test(password)) return "passValidErr5";

  return null;
};
