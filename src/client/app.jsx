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
import { useRecoilState, useRecoilValue } from "recoil";
import { itemsState, itemModalState } from "./atoms/atoms";
import ItemIndex from "./pages/board/item_index/item_index";

const App = ({ FileInput, authService, itemRepository }) => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useRecoilState(itemsState);
  const loginUser = localStorage.getItem("_id");

  useEffect(async () => {
    if (!loginUser) return;

    setIsLoading(true);
    const stopSync = await itemRepository.initialItems(loginUser, (items) =>
      setItems(items)
    );
    setIsLoading(false);

    return () => stopSync();
  }, [loginUser]);

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

  return (
    <>
      <Switch location={background || location}>
        <Route exact path={["/", "/home"]}>
          <Home />
        </Route>
        <PrivateRoute exact path="/board" isAuthenticated={loginUser}>
          <Board likeItem={likeItem} isLoading={isLoading} />
        </PrivateRoute>
        {!loginUser ? (
          <Route exact path="/account/login">
            <Login authService={authService} />
          </Route>
        ) : (
          <Redirect to="/board" />
        )}
        {!loginUser ? (
          <Route exact path="/account/signup">
            <Signup authService={authService} />
          </Route>
        ) : (
          <Redirect to="/board" />
        )}
        <Route exact path="/account/complete">
          <Complete />
        </Route>
        <Route>
          <NotFound />
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
