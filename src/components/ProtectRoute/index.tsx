import { Redirect, Route, RouteProps } from 'react-router-dom';

const CheckRoute = ({ children }: { children: any }) => {
  if (!localStorage.getItem('token')) {
    return <Redirect to="/login" />;
  }
  return children;
};

function ProtectRoute(props: RouteProps) {
  return (
    <CheckRoute>
      <Route {...props} />
    </CheckRoute>
  );
}

export default ProtectRoute
