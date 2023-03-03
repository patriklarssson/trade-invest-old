// import { ComponentType } from 'react';

// /**
//  * A higher-order component (HOC) utility function that allows you to compose multiple HOCs together.
//  *
//  * @returns WrappedComponent with utilities from the HOCS
//  *
//  * @example
//  * Export the `Typography` component with padding and margin utilities
//  * ```ts
//  * export default compose(withPadding, withMargin)(Typography);
//  * ```
//  */
// const compose =
//   <T>(...hocs: Array<(component: ComponentType<T>) => ComponentType<T>>) =>
//   (WrappedComponent: ComponentType<T>): ComponentType<T> =>
//     hocs.reduceRight((prevHoc, nextHoc) => nextHoc(prevHoc), WrappedComponent);

// export { compose };
