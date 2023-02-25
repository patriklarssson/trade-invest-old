import { IntRange } from '../types/range';

const distance = [0, 4, 8, 16, 24, 32, 64] as const;

export type Spacing = IntRange<0, typeof distance.length>;
// export const spacing = (num?: Spacing) => num ? distance[num] : undefined;
export const spacing = (num: Spacing = 0) => distance[num];
