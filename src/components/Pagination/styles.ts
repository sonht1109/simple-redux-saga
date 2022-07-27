import styled from "styled-components";

export const SPagination = styled.div`
  display: flex;
`;

const SPaginationItemBase = styled.button<{
  disabled?: boolean;
}>``;

export const SPaginationItem = styled(SPaginationItemBase)`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};
  min-width: 30px;
  height: 30px;
  padding: 0 4px;
  text-align: center;
  margin: 0 4px;
  border: none;
  border-radius: 4px;
  &:not(.jump) {
    border: 1px solid #ef5350;
  }
  &:not(.current) {
    color: #7a3f38;
    background-color: white;
  }
  &.current {
    background-color: #ef5350;
    color: white;
  }
  user-select: none;
`;
