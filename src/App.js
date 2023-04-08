import HomePage from "pages/HomePage";
import NotFoundPage from "pages/NotFoundPage";
import SignInPage from "pages/SignInPage";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignupPage from "./pages/SignupPage";

function App() {
    return (
        <div>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<HomePage></HomePage>}></Route>
                    <Route
                        path="/sign-up"
                        element={<SignupPage></SignupPage>}
                    ></Route>
                    <Route
                        path="/sign-in"
                        element={<SignInPage></SignInPage>}
                    ></Route>

                    <Route
                        path="/*"
                        element={<NotFoundPage></NotFoundPage>}
                    ></Route>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
