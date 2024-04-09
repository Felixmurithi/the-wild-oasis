import styled, { css } from "styled-components";

// css prefix here is to allow for the style high;lighting fetaure from the styled components extension- this styles bellow can be included in a styled compinent directly-  ${test}
// const test = css`
//   text-align: center;
//   ${10 > 5 && "background-color: yellow"};
// `;

const H1 = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 3rem;
      font-weight: 500;
    `}
  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}
`;

export default H1;
