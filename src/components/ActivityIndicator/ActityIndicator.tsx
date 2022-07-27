import styled, { keyframes } from "styled-components";

interface Props {
  size: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}

const indicatorSize = {
  sm: {
    size: 20,
    borderSize: 2
  },
  md: {
    size: 30,
    borderSize: 3,
  },
  lg: {
    size: 40,
    borderSize: 4,
  },
  xl: {
    size: 60,
    borderSize: 6
  }
}

const indicatorAnimation = keyframes`
  from{
    transform: rotate(0);
  }
  to{
    transform: rotate(360deg);
  }
`;


const ActivityIndicator = styled.div<Props>`
  margin: auto;
  width: ${props => indicatorSize[props.size].size + 'px'};
  height: ${props => indicatorSize[props.size].size + 'px'};
  border: ${props => indicatorSize[props.size].borderSize + 'px'} solid ${props => props.color || '#e1e5e9'};
  border-radius: 50%;
  position: relative;
  animation: 1s ${indicatorAnimation} linear infinite;
  border-right-color: transparent;
`;

export default ActivityIndicator
ActivityIndicator.displayName = ActivityIndicator;