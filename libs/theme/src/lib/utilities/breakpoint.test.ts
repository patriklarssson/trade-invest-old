import { BreakpointKey, handleBreakpoints, theme } from '@trade-invest/theme';

const { breakpoint } = theme[0];

const breakPoint = (key: BreakpointKey, value: object) => {
  return {
    [breakpoint.up(key)]: {
      ...value,
    },
  };
};

describe('Breakpoint style generation', () => {
  it('should accept single value', () => {
    const brekpointStyle = handleBreakpoints(5, (propValue) => ({
      fontSize: `${propValue}px`,
    }));
    expect(brekpointStyle).toStrictEqual({ fontSize: '5px' });
  });

  it('should accept object', () => {
    const brekpointStyle = handleBreakpoints(
      { size: 5, color: 'black' },
      (propValue) => ({
        fontSize: `${propValue.size}px`,
        color: propValue.color,
      })
    );
    expect(brekpointStyle).toStrictEqual({ fontSize: '5px', color: 'black' });
  });
  it('should accept array', () => {
    const brekpointStyle = handleBreakpoints([16, 5], (propValue) => ({
      fontSize: `${propValue[0]}px`,
      padding: `${propValue[1]}px`,
    }));
    expect(brekpointStyle).toStrictEqual({ fontSize: '16px', padding: '5px' });
  });

  it('should accept single breakpoint', () => {
    const brekpointStyle = handleBreakpoints(
      { md: { fontSize: '5px' } },
      (propValue) => ({ ...propValue })
    );
    expect(brekpointStyle).toStrictEqual(breakPoint('md', { fontSize: '5px' }));
  });

  it('should accept multiple breakpoints', () => {
    const brekpointStyle = handleBreakpoints(
      { md: { fontSize: '5px' }, lg: { fontSize: '10px' } },
      (propValue) => ({ ...propValue })
    );
    expect(brekpointStyle).toStrictEqual({
      ...breakPoint('md', { fontSize: '5px' }),
      ...breakPoint('lg', { fontSize: '10px' }),
    });
  });

});
