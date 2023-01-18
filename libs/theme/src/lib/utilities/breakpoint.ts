import { BreakpointKey } from '../breakpoint/mediaQueries';
import { theme } from '../theme';
import { WithBreakpoint } from '../types/cssProperties';
import type * as CSS from 'csstype';

type ExtractGeneric<T> = T extends WithBreakpoint<infer X> ? X : T;

// export const handleBreakpoints = <T>(
//   breakpointProp: WithBreakpoint<T> | T,
//   propValue: (prop: ExtractGeneric<T> | T) => CSS.Properties
// ) => {

//   if (!isWithBreakpoints(breakpointProp)) return propValue(breakpointProp);

//   const { breakpoint } = theme[0];

//   const stylePerBreakpoint = Object.entries(breakpointProp).map(
//     ([bp, value]) => {
//       return {
//         [breakpoint.up(bp as BreakpointKey)]: {
//           ...propValue(value),
//         },
//       };
//     }
//   );

//   return Object.assign({}, ...stylePerBreakpoint);
// };

export const handleBreakpoints = <T>(
  breakpointProp: WithBreakpoint<T> | T,
  propValue: (prop: ExtractGeneric<T> | T) => CSS.Properties
) => {

  console.log("input", breakpointProp);


  if (!isWithBreakpoints(breakpointProp) && typeof breakpointProp !== 'object')
    return propValue(breakpointProp);

  if (!isWithBreakpoints(breakpointProp) && typeof breakpointProp === 'object')
    breakpointProp = Object.entries(breakpointProp)
      .filter(([key, value]) => value !== undefined)
      .reduce((acc, [prop, breakpoints]) => {
        Object.entries(breakpoints).forEach(([breakpoint, value]) => {
          acc[breakpoint] = {
            ...acc[breakpoint],
            [prop]: value,
          };
        });
        return acc;
      }, {});

  console.log('breakpointProp', breakpointProp);

  const { breakpoint } = theme[0];

  if (isWithBreakpoints(breakpointProp)) {
    const { breakpoint } = theme[0];
    const stylePerBreakpoint = Object.entries(breakpointProp).map(
      ([bp, value]) => {
        const obj = propValue(value);

        const filtered = Object.entries(obj).filter(
          ([key, value]) => value !== undefined
        );
        const output = Object.fromEntries(filtered);
        console.log('output', output);

        return {
          [breakpoint.up(bp as BreakpointKey)]: {
            // ...propValue(value),
            ...output,
          },
        };
      }
    );
    console.log('RETURNING', Object.assign({}, ...stylePerBreakpoint));
    console.log(stylePerBreakpoint);

    return Object.assign({}, ...stylePerBreakpoint);
  }

  // if (!isWithBreakpoints(breakpointProp)) {
  //   Object.entries(breakpointProp).forEach(([cssProp, breakpoints]) => {

  //     Object.entries(breakpoints).forEach(([bp, value]) => {

  //       stylePerBreakpoint = {
  //         ...stylePerBreakpoint,
  //         [breakpoint.up(bp as BreakpointKey)]: {
  //           ...propValue({
  //             borderTop: 1,
  //             borderRight: 2,
  //             borderBottom: 3,
  //             borderLeft: 4,
  //           }),
  //         },
  //       };
  //     });
  //   });
  //   // console.log(stylePerBreakpoint);

  //   return stylePerBreakpoint;
  // }

  // const input = {borderBottom: {xs: 1, sm: 2, md: 3, lg: 4, xl: 5}, borderLeft: {xs: 6, sm: 7, md: 8, lg: 9, xl: 10}}

  // const output = {
  //   xs: {
  //     borderBottom: 1,
  //     borderLeft: 6
  //   },
  //   sm: {
  //     borderBottom: 2,
  //     borderLeft: 7
  //   },
  //   md: {
  //     borderBottom: 3,
  //     borderLeft: 8
  //   },
  //   lg: {
  //     borderBottom: 4,
  //     borderLeft: 9
  //   },
  //   xl: {
  //     borderBottom: 5,
  //     borderLeft: 10
  //   },
  // }

  // const input = {
  //   borderBottom: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
  //   borderLeft: { xs: 6, sm: 7, md: 8, lg: 9, xl: 10 },
  // };

  // const output = Object.entries(breakpointProp).reduce((acc, [prop, breakpoints]) => {
  //   Object.entries(breakpoints).forEach(([breakpoint, value]) => {
  //     acc[breakpoint] = {
  //       ...acc[breakpoint],
  //       [prop]: value,
  //     };
  //   });
  //   return acc;
  // }, {});

  // const stylePerBreakpoint2 = Object.entries(output).map(
  //   ([bp, value]) => {
  //     return {
  //       [breakpoint.up(bp as BreakpointKey)]: {
  //         ...propValue(value),
  //       },
  //     };
  //   }
  // );
  // return Object.assign({}, ...stylePerBreakpoint2);
};

function isWithBreakpoints<T>(
  styled: WithBreakpoint<T> | T
): styled is WithBreakpoint<T> {
  const { xs, sm, md, lg, xl } = styled as WithBreakpoint<T>;
  return Boolean(xs || sm || md || lg || xl);
}
