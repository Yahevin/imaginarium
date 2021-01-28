import styled from 'styled-components';

export const Grid = styled.div`
  margin: 0 auto;
  height: 60vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 20px;

  & > img {
    display: block;
    height: 100%;
    width: auto;
    margin: 0 auto;
    object-fit: contain;
    &.active {
      box-shadow: 1px 1px 1px gold;
    }
  }
`;
