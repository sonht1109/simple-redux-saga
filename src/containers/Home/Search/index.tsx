import ErrorBound from 'components/ErrorBound';
import _debounce from 'lodash.debounce';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { handleSearch } from '../store/actions';
import { SSearch } from './styles';

interface Props {}

export default function Search({}: Props) {
  const dispatch = useDispatch();

  const debounceChange = useCallback(
    _debounce((val: string) => dispatch(handleSearch(val)), 300),
    [],
  );

  const onChange = (ev: any) => {
    debounceChange(ev.target.value);
  };

  return (
    <ErrorBound>
      <SSearch>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.66667 11.3333C9.24399 11.3333 11.3333 9.24399 11.3333 6.66667C11.3333 4.08934 9.24399 2 6.66667 2C4.08934 2 2 4.08934 2 6.66667C2 9.24399 4.08934 11.3333 6.66667 11.3333Z"
            stroke="#6E7D8B"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 14L10 10"
            stroke="#6E7D8B"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input onChange={onChange} placeholder="Search" />
      </SSearch>
    </ErrorBound>
  );
}

Search.displayName = Search;
