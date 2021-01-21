import { css } from 'styled-components';
import { MEDIA_QUERY } from '@my-app/constants';

const PageSize = css`
  max-width: 1300px;
  padding: 60px 40px;
  ${MEDIA_QUERY.PHONE} {
    padding: 20px 10px;
  }
`;

export default PageSize;
