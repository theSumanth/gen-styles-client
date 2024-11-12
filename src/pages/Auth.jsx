import { useSearchParams } from "react-router-dom";

const Auth = () => {
  const [searchParams] = useSearchParams();

  const authMode = searchParams.get("mode");

  return <div>Auth</div>;
};

export default Auth;
