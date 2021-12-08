import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import { useRecoilState } from "recoil";
import { itemsState } from "./atoms/atoms";

const Complete = lazy(() => import("./pages/accounts/complete/complete"));
const Login = lazy(() => import("./pages/accounts/login/login"));
const Signup = lazy(() => import("./pages/accounts/signup/signup"));
const Board = lazy(() => import("./pages/board/board"));
const Home = lazy(() => import("./pages/home/home"));
const NotFound = lazy(() => import("./pages/not_found/not_found"));
const ItemIndex = lazy(() => import("./pages/board/item_index/item_index"));
const Search = lazy(() => import("./pages/search/search"));
const Favorites = lazy(() => import("./pages/favorites/favorites"));
const PrivateRoute = lazy(() => import("./components/routes/private_route"));

const App = ({ FileInput, authService, itemRepository }) => {
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useRecoilState(itemsState);
  const loginUser = localStorage.getItem("_id");
  const background = location.state && location.state.background;

  const onLogout = useCallback(() => {
    authService.logout();
    history.push("/");
  }, [authService]);

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

  useEffect(async () => {
    if (!loginUser || location.pathname === "/") return;

    setIsLoading(true);
    const stopSync = await itemRepository.initialItems(loginUser, (items) =>
      setItems(items)
    );
    setIsLoading(false);

    if (stopSync.data && stopSync.data.success === false) {
      onLogout();
    }

    return () => stopSync();
  }, [loginUser, location.pathname, itemRepository]);

  return (
    <>
      <Suspense fallback={<div></div>}>
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
          <Route path={["*", "/not-found"]}>
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
      </Suspense>
    </>
  );
};

export default App;
