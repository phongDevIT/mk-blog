import HomePage from "pages/HomePage";
import NotFoundPage from "pages/NotFoundPage";
import SignInPage from "pages/SignInPage";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignupPage from "./pages/SignupPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import DashboardLayout from "module/dashboard/DashboardLayout";
import DashboardPage from "pages/DashboardPage";
import PostManage from "module/post/PostManage";
import PostAddNew from "module/post/PostAddNew";
import CategoryAddNew from "drafts/CategoryAddNew";
import UserAddNew from "drafts/UserAddNew";
import UserProfile from "drafts/UserProfile";
import UserManage from "module/user/UserManage";
import CategoryManage from "module/category/CategoryManage";
import CategoryUpdate from "module/category/CategoryUpdate";
import UserUpdate from "module/user/UserUpdate";
import PostUpdate from "module/post/PostUpdate";
import CategoryPage from "pages/CategoryPage";
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
                    <Route
                        path="/:slug"
                        element={<PostDetailsPage></PostDetailsPage>}
                    ></Route>
                    <Route
                        path="/category/:slug"
                        element={<CategoryPage></CategoryPage>}
                    ></Route>
                    <Route element={<DashboardLayout></DashboardLayout>}>
                        <Route
                            path="/dashboard"
                            element={<DashboardPage></DashboardPage>}
                        ></Route>
                        <Route
                            path="/manage/post"
                            element={<PostManage></PostManage>}
                        ></Route>
                        <Route
                            path="/manage/add-post"
                            element={<PostAddNew></PostAddNew>}
                        ></Route>
                        <Route
                            path="/manage/add-category"
                            element={<CategoryAddNew></CategoryAddNew>}
                        ></Route>
                        <Route
                            path="/manage/update-category"
                            element={<CategoryUpdate></CategoryUpdate>}
                        ></Route>
                        <Route
                            path="/manage/add-user"
                            element={<UserAddNew></UserAddNew>}
                        ></Route>
                        <Route
                            path="/manage/user"
                            element={<UserManage></UserManage>}
                        ></Route>
                        <Route
                            path="/manage/update-user"
                            element={<UserUpdate></UserUpdate>}
                        ></Route>
                        <Route
                            path="/manage/update-post"
                            element={<PostUpdate></PostUpdate>}
                        ></Route>
                        <Route
                            path="/manage/category"
                            element={<CategoryManage></CategoryManage>}
                        ></Route>
                        <Route
                            path="/profile"
                            element={<UserProfile></UserProfile>}
                        ></Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
