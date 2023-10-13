import { expect, Locator } from '@playwright/test';

export const fillAndCheckInput = async (elem: Locator, value: string) => {
  await elem.clear();
  await elem.fill(value);
  await expect(elem).toHaveValue(value);
};
