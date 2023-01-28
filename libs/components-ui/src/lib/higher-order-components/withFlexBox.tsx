import styled from '@emotion/styled';
import { WithBreakpoint, handleBreakpoints } from '@trade-invest/theme';
import { ComponentType } from 'react';
import type * as CSS from 'csstype';

interface IFlexBoxProps {
  flex: CSS.Property.Flex | WithBreakpoint<CSS.Property.Flex>;
  flexBasis: CSS.Property.FlexBasis | WithBreakpoint<CSS.Property.FlexBasis>;
  flexDirection:
    | CSS.Property.FlexDirection
    | WithBreakpoint<CSS.Property.FlexDirection>;
  flexFlow: CSS.Property.FlexFlow | WithBreakpoint<CSS.Property.FlexFlow>;
  flexGrow: CSS.Property.FlexGrow | WithBreakpoint<CSS.Property.FlexGrow>;
  flexShrink: CSS.Property.FlexShrink | WithBreakpoint<CSS.Property.FlexShrink>;
  flexWrap: CSS.Property.FlexWrap | WithBreakpoint<CSS.Property.FlexWrap>;
  order: CSS.Property.Order | WithBreakpoint<CSS.Property.Order>;
  justifyContent:
    | CSS.Property.JustifyContent
    | WithBreakpoint<CSS.Property.JustifyContent>;
  alignContent:
    | CSS.Property.AlignContent
    | WithBreakpoint<CSS.Property.AlignContent>;
  alignItems: CSS.Property.AlignItems | WithBreakpoint<CSS.Property.AlignItems>;
  alignSelf: CSS.Property.AlignSelf | WithBreakpoint<CSS.Property.AlignSelf>;
  placeContent:
    | CSS.Property.PlaceContent
    | WithBreakpoint<CSS.Property.PlaceContent>;
  placeItems: CSS.Property.PlaceItems | WithBreakpoint<CSS.Property.PlaceItems>;
}

const withFlexBox = <T,>(WrappedComponent: ComponentType<T>) => {
  const FlexBoxHoc = styled(WrappedComponent)<Partial<IFlexBoxProps> & T>(
    ({
      theme,
      flex,
      flexBasis,
      flexDirection,
      flexFlow,
      flexGrow,
      flexShrink,
      flexWrap,
      order,
      justifyContent,
      alignContent,
      alignItems,
      alignSelf,
      placeContent,
      placeItems,
    }) => ({
      ...handleBreakpoints(
        theme,
        {
          flex,
          flexBasis,
          flexDirection,
          flexFlow,
          flexGrow,
          flexShrink,
          flexWrap,
          order,
          justifyContent,
          alignContent,
          alignItems,
          alignSelf,
          placeContent,
          placeItems,
        },
        (flexStyles) => ({ ...flexStyles })
      ),
    })
  );
  return (props: T & Partial<IFlexBoxProps>) => {
    return <FlexBoxHoc {...props} />;
  };
};

export default withFlexBox;
