import { css } from "styled-components";

export const cssReflection = css`
  content: "";
  position: absolute;
  border-radius: 50%;
  background-color: #fff;
  opacity: ${({ reflectionOpacity }) => reflectionOpacity};
`;
