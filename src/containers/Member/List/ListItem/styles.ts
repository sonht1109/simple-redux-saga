import styled from 'styled-components';
import mixins from 'styles/mixins';

export const SListItem = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 0px 0px 0px 4px;
  padding: 15px;
  padding-right: 18px;
  margin: 25px 0;
  ${mixins.clickable};

  display: flex;

  &.over-deadline {
    border-color: #ef5350;
    .item__label {
      color: #ef5350;
    }
  }

  &.inactived {
    opacity: 0.6;
  }

  .item {
    &__label {
      flex-grow: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &.completed {
        text-decoration: line-through;
      }
    }

    &__deadline {
      font-size: 12px;
    }

    &__handle--container {
      display: flex;
      margin: 0 -12px;
    }

    &__handle {
      width: 16px;
      height: 16px;
      position: relative;
      ${mixins.flexCenter};
      ${mixins.clickable};
      padding: 0 12px;
      &:after {
        content: '';
        width: 30px;
        height: 30px;
        ${mixins.absCenter};
        opacity: 0;
        background-color: #eaeaea;
        border-radius: 4px;
        z-index: -1;
        transition: 0.2s;
      }
      &:hover {
        &:after {
          opacity: 1;
        }
      }
    }
  }
`;
