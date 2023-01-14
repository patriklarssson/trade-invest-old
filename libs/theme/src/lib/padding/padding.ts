// import { Breakpoint } from '@trade-invest/theme';
// import { spacing, Spacing } from '../spacing/spacing';

// const paddingKeys = ['p', 'pt', 'pr', 'pb', 'pl', 'px', 'py'] as const;

// type ObjectFromList<T extends ReadonlyArray<string>> = {
//   [K in T extends ReadonlyArray<infer U> ? U : never]?:
//     | WithBreakpoint<Spacing>
//     | Spacing;
// };

// type WithBreakpoint<T> = { [breakpoint in keyof Breakpoint]?: T };

// type Padders = ObjectFromList<typeof paddingKeys>;
