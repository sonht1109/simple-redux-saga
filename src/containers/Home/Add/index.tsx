import Button from 'components/Button';
import ErrorBound from 'components/ErrorBound';
import useDisclosure from 'hooks/useDisclosure';
import ItemModal from '../ItemModal';

interface Props {}

export default function Add(props: Props) {
  const [state, handler] = useDisclosure(false);

  return (
    <ErrorBound>
      <Button style={{ flexGrow: 1, marginLeft: 9 }} onClick={handler.open}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 4.16666V15.8333"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.16666 10H15.8333"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Add new
      </Button>
      <ItemModal isOpen={state} toggleModal={handler.toggle} />
    </ErrorBound>
  );
}

Add.displayName = Add;
