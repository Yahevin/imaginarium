import styled from "styled-components";
import mediaQuery from "@/constants/mediaQuery";

const PageSize = styled.css`
  max-width: 1300px;
  padding: 20px 40px;
  ${mediaQuery.phone} {
    padding: 20px 10px;
  }
`;

export default PageSize;
