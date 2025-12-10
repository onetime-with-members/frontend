import { vi } from 'vitest';

vi.mock(import('next/navigation'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    })),
  };
});
