import ErrorBound from 'components/ErrorBound';
import useInjectReducer from 'redux/useInjectReducer';
import Add from './Add';
import Handle from './Handle';
import List from './List';
import Search from './Search';
import { homeReducer } from './store';
import { SHome } from './styles';

interface Props {}

export default function Home(props: Props) {
  useInjectReducer('home', homeReducer);

  return (
    <ErrorBound>
      <SHome>
        <div className="home--container">
          <div className="header">Todo List</div>
          <div className="content">
            <div className="content__search">
              <Search />
              <Add />
            </div>

            <div className="content__handle">
              <Handle />
            </div>

            <div className="content__list">
              <List />
            </div>
          </div>
        </div>
      </SHome>
    </ErrorBound>
  );
}

Home.displayName = Home;
