import { BrowserRouter, Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { notification } from "antd";
import { useCallback } from "react";
import {
  NotificationsContext,
  NotificationType,
} from "./services/notificationsContext";
import Header from "./components/Header";
import { useAppSelector } from "./store/hooks/useAppSelector";
import { isAuthenticatedSelector } from "./store/selectors/authSelectors";
import { MainPage } from "./pages/MainPage";
import { OrderAdd } from "./pages/OrderAdd";
import { routes } from "./configs/routes";
import { OrderEdit } from "./pages/OrderEdit";

function App() {
  const [api, contextHolder] = notification.useNotification();
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);

  const openNotification = useCallback(
    (message: string, description: string, type: NotificationType) => {
      api[type]({
        message,
        description,
        placement: "top",
      });
    },
    [api]
  );

  return (
    <BrowserRouter>
      {contextHolder}
      <NotificationsContext.Provider value={{ openNotification }}>
        <Header />
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path={routes.home} element={<MainPage />} />
              <Route path={routes.ordersAdd} element={<OrderAdd />} />
              <Route path={`${routes.ordersEdit}/:id`} element={<OrderEdit />} />
              <Route path="*" element={<Navigate to={routes.home} />} />
            </>
          ) : (
            <>
              <Route path={routes.signup} element={<SignUp />} />
              <Route path={routes.login} element={<Login />} />
              <Route path="*" element={<Navigate to={routes.login} />} />
            </>
          )}
        </Routes>
      </NotificationsContext.Provider>
    </BrowserRouter>
  );
}

export default App;
