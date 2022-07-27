import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface Props {}

const Layout: FC<Props> = props => {

  return (
    <SLayout>
      <nav className="nav">
        <NavLink
          to="/"
          exact
        >
          Todo
        </NavLink>
        <NavLink to="/member">Members</NavLink>
      </nav>
      {props.children}
    </SLayout>
  );
};

export default Layout;

export const SLayout = styled.div`
  padding-bottom: 80px;
  padding-top: 20px;
  .nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 10px 0;
    a {
      padding: 6px 10px;
      margin: 0 6px;
      border-radius: 4px;
      text-decoration: none;
      color: #6c7d85;
      &.active {
        background-color: #ef5350;
        color: white;
      }
    }
  }
`;
