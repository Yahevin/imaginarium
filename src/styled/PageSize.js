import {css} from "styled-components"
import mediaQuery from "@/constants/mediaQuery";

const PageSize = css`
  max-width: 1300px;
  padding: 60px 40px;
  ${mediaQuery.phone} {
    padding: 20px 10px;
  }
`;

export default PageSize;
