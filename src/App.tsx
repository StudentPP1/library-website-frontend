import "./App.css"
import {Navbar} from "./layouts/NavbarAndFooter/Navbar.tsx";
import {Footer} from "./layouts/NavbarAndFooter/Footer.tsx";
import {HomePage} from "./layouts/HomePage/HomePage.tsx";
import {SearchBooksPage} from "./layouts/SearchBooksPage/SearchBooksPage.tsx";
import {Redirect, Route, Switch} from "react-router-dom";
import {BookCheckoutPage} from "./layouts/BookCheckoutPage/BookCheckoutPage.tsx";
import {LoginWidget} from "./auth/LoginWidget.tsx";
import {useEffect, useState} from "react";
import {Auth} from "./context/context.ts";
import {ReviewListPage} from "./layouts/BookCheckoutPage/ReviewListPage/ReviewListPage.tsx";
import {CartPage} from "./layouts/CartPage/CartPage.tsx";
import {MessagesPage} from "./layouts/MessagesPage/MessagesPage.tsx";
import {ManageLibraryPage} from "./layouts/ManageLibraryPage/ManageLibraryPage.tsx";
import { PaymentPage } from "./layouts/PaymentPage/PaymentPage.tsx";
import { ShelfPage } from "./layouts/ShelfPage/ShelfPage.tsx";

export const App = () => {
    const [isAuth, setIsAuth] = useState<boolean | null>(false);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsAuth(true);
        }
        else {
            setIsAuth(false);
        }
        if (localStorage.getItem("role")) {
            setRole(localStorage.getItem("role"));
        }
        else {
           setRole(null)
        }
    }, [isAuth]);

    console.log(isAuth)
    console.log(role)

    return (
        <Auth.Provider value={{isAuth, setIsAuth, role, setRole}}>
            <Switch>
                <div className="d-flex flex-column min-vh-100">
                    <Navbar/>
                    {/* Switch - allow render only one route */}
                    {/* exact - render page only if "/" in url */}
                    <div className="flex-grow-1">

                        <Route path="https://library-website-production.up.railway.app//login" render={() => <LoginWidget/>}/>

                        <Route path="https://library-website-production.up.railway.app/" exact>
                            <Redirect to="/home"/>
                        </Route>

                        <Route path="https://library-website-production.up.railway.app/home" exact>
                            <HomePage/>
                        </Route>

                        <Route path="https://library-website-production.up.railway.app/search">
                            <SearchBooksPage/>
                        </Route>

                        <Route path="https://library-website-production.up.railway.app/checkout/:bookId" exact>
                            <BookCheckoutPage/>
                        </Route>

                        <Route path="https://library-website-production.up.railway.app/reviewlist/:bookId" exact>
                            <ReviewListPage/>
                        </Route>

                        <Route path="https://library-website-production.up.railway.app/cart">
                            {isAuth
                                ?  <CartPage/>
                                : <LoginWidget/>
                            }
                        </Route>

                        <Route path="https://library-website-production.up.railway.app/shelf">
                            {isAuth
                                ?  <ShelfPage/>
                                : <LoginWidget/>
                            }
                        </Route>

                        <Route path="https://library-website-production.up.railway.app/messages">
                            {isAuth
                                ?  <MessagesPage/>
                                : <LoginWidget/>
                            }
                        </Route>

                        <Route path="https://library-website-production.up.railway.app/admin">
                            {isAuth && role == "ADMIN"
                                ?  <ManageLibraryPage/>
                                : <HomePage/>
                            }
                        </Route>

                        <Route path="https://library-website-production.up.railway.app/buy/:bookId">
                            {isAuth
                                ?  <PaymentPage/>
                                : <LoginWidget/>
                            }
                        </Route>
                    </div>
                    <Footer/>
                </div>

            </Switch>
        </Auth.Provider>
    );
}
