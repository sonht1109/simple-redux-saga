import ErrorBound from 'components/ErrorBound';
import { memberReducer } from './store';
import useInjectReducer from 'redux/useInjectReducer';
import { SMember } from './styles';
import Search from './Search';
import Add from './Add';
import List from './List';

interface Props {}

export default function Member(props: Props) {
  useInjectReducer('member', memberReducer);

  return (
    <ErrorBound>
      <SMember>
        <div className="home--container">
          <div className="header">Members</div>
          <div className="content">
            <div className="content__search">
              <Search />
              <Add />
            </div>

            <div className="content__list">
              <List />
            </div>
          </div>
        </div>
      </SMember>
    </ErrorBound>
  );
}

Member.displayName = Member;
