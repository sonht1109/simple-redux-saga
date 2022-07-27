import { css } from 'styled-components';

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  absFill: css`
    position: absolute;
    inset: 0;
  `,

  absCenter: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,

  clickable: css`
    cursor: pointer;
    user-select: none;
  `,
};

export default mixins;
