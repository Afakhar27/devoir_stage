type Usage = {
  date: string; // YYYY-MM-DD
  count: number;
};

// Use globalThis to persist across hot reloads in development
const globalForLimit = globalThis as unknown as {
  userUsage: Map<string, Usage>;
};

export const userUsage = globalForLimit.userUsage || new Map<string, Usage>();

if (process.env.NODE_ENV !== 'production') {
  globalForLimit.userUsage = userUsage;
}

export const MAX_DAILY_CONTACTS = 50;

export function checkLimit(userId: string): { allowed: boolean; remaining: number } {
  const today = new Date().toISOString().split('T')[0];
  const usage = userUsage.get(userId);

  if (!usage || usage.date !== today) {
    // Reset or new user
    // We don't set it here, only when incrementing
    return { allowed: true, remaining: MAX_DAILY_CONTACTS };
  }

  if (usage.count >= MAX_DAILY_CONTACTS) {
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: MAX_DAILY_CONTACTS - usage.count };
}

export function incrementLimit(userId: string, amount: number) {
  const today = new Date().toISOString().split('T')[0];
  const usage = userUsage.get(userId);

  if (!usage || usage.date !== today) {
    userUsage.set(userId, { date: today, count: amount });
  } else {
    usage.count += amount;
    userUsage.set(userId, usage);
  }
}
