import styled, { css } from 'styled-components';
import mixins from 'styles/mixins';

interface Props {
  size?: 'lg' | 'sm';
  themeColor?: ButtonTheme;
}

type ButtonTheme = 'red' | 'white' | 'gray';

const buttonTheme: Record<ButtonTheme, any> = {
  red: {
    background: '#ef5350',
    color: 'white',
  },
  gray: {
    background: '#96A1A6',
    color: 'white',
  },
  white: {
    background: '#F5F7F8',
    color: '#455A64',
    border: '1px solid #455a64',
  },
};

const Button = styled.button<Props>`
  border-radius: 4px;
  color: white;
  font-weight: 700;
  outline: none;
  width: auto;

  ${mixins.clickable};
  ${mixins.flexCenter};

  svg {
    margin-right: 10px;
  }

  ${({ size = 'sm' }) => css`
    font-size: ${size === 'lg' ? 16 : 14}px;
    line-height: ${size === 'lg' ? 22 : 20}px;
    padding: ${size === 'lg' ? 14 : 10}px;
  `}
  ${({ themeColor = 'red' }) => css`
    background-color: ${buttonTheme[themeColor].background};
    color: ${buttonTheme[themeColor].color};
    border: ${buttonTheme[themeColor]?.border || 'none'};
  `}
`;

export default Button;
Button.displayName = Button;
