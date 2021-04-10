import { useCallback, useEffect, useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import styles from "./app.module.css";
import Complete from "./pages/accounts/complete/complete";
import Login from "./pages/accounts/login/login";
import Signup from "./pages/accounts/signup/signup";
import Board from "./pages/board/board";
import Home from "./pages/home/home";
import NotFound from "./pages/not_found/not_found";
import PrivateRoute from "./components/routes/private_route";
import { useRecoilState } from "recoil";
import { itemsState } from "./atoms/atoms";
import ItemIndex from "./pages/board/item_index/item_index";
import Search from "./pages/search/search";
import Favorites from "./pages/favorites/favorites";

const App = ({ FileInput, authService, itemRepository }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useRecoilState(itemsState);
  const loginUser = localStorage.getItem("_id");
  const background = location.state && location.state.background;

  useEffect(async () => {
    if (!loginUser || location.pathname === "/") return;

    setIsLoading(true);
    const stopSync = await itemRepository.initialItems(loginUser, (items) =>
      setItems(items)
    );
    setIsLoading(false);

    return () => stopSync();
  }, [loginUser, itemRepository]);

  const likeItem = useCallback(
    async (id) => {
      const response = await itemRepository.likeItem(id);
      if (response.data.status === "success") {
        const isLiked = response.data.items;
        setItems((items) => {
          const updated = items.map((item) =>
            item._id === id ? { ...item, isLiked } : item
          );

          return updated;
        });
      } else {
        const errorCode = response.data.code;
        /*  
      ERROR CODES:
            0: SERVER ERROR
            1: INVALID ID
            2: NO RESOURCE
      */

        const errorMessage = [
          "There is a problem with the server. Please try again later.",
          "Not a valid ID.",
          "No resource",
        ];

        alert(errorMessage[errorCode]);
      }
    },
    [itemRepository]
  );

  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

  return (
    <>
      <Switch location={background || location}>
        <Route exact path={["/", "/home"]}>
          <Home />
        </Route>
        <PrivateRoute exact path="/search" isAuthenticated={loginUser}>
          <Search
            likeItem={likeItem}
            isLoading={isLoading}
            logoutHandler={onLogout}
          />
        </PrivateRoute>
        <PrivateRoute exact path="/favorites" isAuthenticated={loginUser}>
          <Favorites
            likeItem={likeItem}
            isLoading={isLoading}
            logoutHandler={onLogout}
          />
        </PrivateRoute>
        <PrivateRoute exact path="/board" isAuthenticated={loginUser}>
          <Board
            likeItem={likeItem}
            isLoading={isLoading}
            logoutHandler={onLogout}
          />
        </PrivateRoute>
        <Route exact path="/account/login">
          {!loginUser ? (
            <Login authService={authService} />
          ) : (
            <Redirect to="/board" />
          )}
        </Route>
        <Route exact path="/account/signup">
          {!loginUser ? (
            <Signup authService={authService} />
          ) : (
            <Redirect to="/board" />
          )}
        </Route>
        <Route exact path="/account/complete">
          <Complete />
        </Route>
        <Route path={["*", "not-found"]}>
          <NotFound logoutHandler={onLogout} />
        </Route>
      </Switch>

      {background && (
        <PrivateRoute
          exact
          path={["/board/item/:id", "/board/item"]}
          isAuthenticated={loginUser}
        >
          <ItemIndex
            itemRepository={itemRepository}
            likeItem={likeItem}
            FileInput={FileInput}
          />
        </PrivateRoute>
      )}
    </>
  );
};

export default App;
