import { Spacing } from '../spacing';
const distance = [0, 4, 8, 16, 24, 32, 64] as const;
export const spacing = (num?: Spacing) => (num ? distance[num] : undefined);
