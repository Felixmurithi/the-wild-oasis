import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1. load the authenticated user

  const { isAuthenticated, isLoading } = useUser();

  //3. if there is no authenticated user- redirect to login
  useEffect(
    // useffect needs to return a pure function- no inputs allowed
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
      // navigate can only be called at the top level
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 2, while loading dispaly a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  //4 if there isauthenticated user, ender app

  return children;
}

export default ProtectedRoute;
