import styled from "styled-components";
import mediaQuery from "@/constants/mediaQuery";
import COLOR from "@/constants/Color";

export const Menu = styled.article`
  max-width: 1300px;
  padding: 40px 60px;

  ${mediaQuery.phone} {
    padding: 24px 16px;
  }
`;

export const Menu__item = styled.section`
  & + & {
    margin: 24px 0 0 0;
  }
`;
