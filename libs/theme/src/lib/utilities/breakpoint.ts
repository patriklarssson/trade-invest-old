import { BreakpointKey } from '../breakpoint/mediaQueries';
import { theme } from '../theme';
import { WithBreakpoint } from '../types/cssProperties';
import type * as CSS from 'csstype';

type ExtractGeneric<Type> = Type extends WithBreakpoint<infer X> ? X : Type;

const getRegularStyles = (breakpointProp: any) => {
  return Object.entries(breakpointProp).reduce((acc, [key, value]) => {
    if (typeof value !== 'object') {
      acc[key] = value;
    }
    return acc;
  }, {});
};

const getStylesWithBreakpoints = <T>(styleProps: WithBreakpoint<T>) => {
    return (styleProps = Object.entries(styleProps)
      .reduce((acc, [prop, breakpoints]) => {
        Object.entries(breakpoints).forEach(([breakpoint, value]) => {
          acc[breakpoint] = {
            ...acc[breakpoint],
            [prop]: value,
          };
        });
        return acc;
      }, {}));
};

export const handleBreakpoints = <T>(
  styleProps: WithBreakpoint<T> | T,
  callbackStyleValue: (prop: ExtractGeneric<T> | T) => CSS.Properties
) => {
  const { breakpoint } = theme[0];

  const regularStyles = getRegularStyles(styleProps);
  const breakpointStyles = getStylesWithBreakpoints(styleProps);

  const breakpointCSS = Object.entries(breakpointStyles).reduce(
    (acc, [bp, value]) => {
      acc[breakpoint.up(bp as BreakpointKey)] = callbackStyleValue(value);
      return acc;
    },
    {}
  );

  const css = Object.fromEntries(
    Object.entries(callbackStyleValue(regularStyles)).filter(
      ([_, value]) => value != null
    )
  );

  return Object.assign({}, css, breakpointCSS);
};

function isWithBreakpoints<T>(
  styled: WithBreakpoint<T> | T
): styled is WithBreakpoint<T> {
  const { xs, sm, md, lg, xl } = styled as WithBreakpoint<T>;
  return Boolean(xs || sm || md || lg || xl);
}

// import { BreakpointKey } from '../breakpoint/mediaQueries';
// import { theme } from '../theme';
// import { WithBreakpoint } from '../types/cssProperties';
// import type * as CSS from 'csstype';

// type ExtractGeneric<T> = T extends WithBreakpoint<infer X> ? X : T;

// // export const handleBreakpoints = <T>(
// //   breakpointProp: WithBreakpoint<T> | T,
// //   propValue: (prop: ExtractGeneric<T> | T) => CSS.Properties
// // ) => {

// //   if (!isWithBreakpoints(breakpointProp)) return propValue(breakpointProp);

// //   const { breakpoint } = theme[0];

// //   const stylePerBreakpoint = Object.entries(breakpointProp).map(
// //     ([bp, value]) => {
// //       return {
// //         [breakpoint.up(bp as BreakpointKey)]: {
// //           ...propValue(value),
// //         },
// //       };
// //     }
// //   );

// //   return Object.assign({}, ...stylePerBreakpoint);
// // };

// const getRegularStyles = (breakpointProp: any) => {
//   return Object.entries(breakpointProp).reduce((acc, [key, value]) => {
//     if (typeof value !== 'object') {
//       acc[key] = value;
//     }
//     return acc;
//   }, {});
// };

// const getStylesWithBreakpoints = (breakpointProp: any) => {
//   if (!isWithBreakpoints(breakpointProp) && typeof breakpointProp === 'object')
//     return (breakpointProp = Object.entries(breakpointProp)
//       .filter(([key, value]) => value !== undefined)
//       .reduce((acc, [prop, breakpoints]) => {
//         Object.entries(breakpoints).forEach(([breakpoint, value]) => {
//           acc[breakpoint] = {
//             ...acc[breakpoint],
//             [prop]: value,
//           };
//         });
//         return acc;
//       }, {}));
// };

// export const handleBreakpoints = <T>(
//   breakpointProp: WithBreakpoint<T> | T,
//   propValue: (prop: ExtractGeneric<T> | T) => CSS.Properties
// ) => {
//   console.log('input', breakpointProp);

//   const regularStyles = getRegularStyles(breakpointProp);
//   const breakpointStyles = getStylesWithBreakpoints(breakpointProp)

//   console.log('regularStyles', regularStyles);
//   console.log('breakpointStyles', breakpointStyles);

//   const { breakpoint } = theme[0];

//   if (isWithBreakpoints(breakpointStyles)) {
//     const { breakpoint } = theme[0];
//     const stylePerBreakpoint = Object.entries(output).map(
//       ([bp, value]) => {
//         return {
//           [breakpoint.up(bp as BreakpointKey)]: {
//             ...propValue(value),
//           },
//         };
//       }
//     );

//     return Object.assign({}, ...stylePerBreakpoint)
//   }

// };

// function isWithBreakpoints<T>(
//   styled: WithBreakpoint<T> | T
// ): styled is WithBreakpoint<T> {
//   const { xs, sm, md, lg, xl } = styled as WithBreakpoint<T>;
//   return Boolean(xs || sm || md || lg || xl);
// }
