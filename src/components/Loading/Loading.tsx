import ActityIndicator from 'components/ActivityIndicator';
import styled from 'styled-components';
import mixins from 'styles/mixins';

interface Props {}

const Loading = (props: Props) => {
  return <SLoading>
    <ActityIndicator size="md" />
  </SLoading>;
};

export default Loading;
Loading.displayName = Loading;

const SLoading = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 999;
  ${mixins.flexCenter};
`;
