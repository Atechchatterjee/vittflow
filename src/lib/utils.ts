import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseDateTime(datetime: string): [string, string] {
  let date: string = datetime.substring(0, 10);
  const [yy, mm, dd] = date.split("-");
  date = [dd, mm, yy].join("/");
  const time: string = datetime.substring(11, 19);
  return [date, time];
}

// returns errors as values
export async function safeAwait<T, E = Error>(
  promise: Promise<T>,
): Promise<[E, null] | [null, T]> {
  try {
    const res = await promise;
    return [null, res];
  } catch (err) {
    console.error(err);
    return [err as E, null];
  }
}
