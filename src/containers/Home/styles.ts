import styled from 'styled-components';

export const SHome = styled.div`
  .home--container {
    max-width: 360px;
    margin: auto;
    .header {
      font-weight: 400;
      font-size: 24px;
      line-height: 33px;
      color: #263238;
      text-align: center;
      border-bottom: 1px solid #eaeaea;
      padding: 15px 10px 10px;
    }
    .content {
      margin-top: 27px;

      .content__search {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 32px;
      }
    }
  }

  .pagination {
    justify-content: center;
  }
`;
