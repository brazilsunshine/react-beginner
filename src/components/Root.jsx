import React from 'react';
import App from "./App";
import About from "./pages/About";
import NavigationBar from "./NavigationBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NoMatch from "./pages/NoMatch";


export default function Root () {
    // const routes = [
    //     { path: '/', name:'Home', Component: App, exact: true },
    //     { path: '/about', name:'About', Component: About, exact: false },
    //     { path: '/contact', name:'Contact', Component: Contact, exact: false },
    //     { path: '/blog', name:'Blog', Component: Blog, exact: true },
    //     { path: '/blog/:id', name:'Post', Component: BlogPost, exact: false },
    //     { path: '*', name:'NotMatch', Component: NoMatch, exact: false },
    // ];


    return (
        <Router>
            <div className="task-app-container">
                <NavigationBar />

                <div className="content">
                    {/*the Switch component is responsible for making sure that only one route is loaded at the time*/}
                    <Switch>
                        {/*{routes.map(({ path, Component, exact }) => (*/}
                        {/*    <Route key={path} path={path} exact={exact}>*/}
                        {/*        <Component />*/}
                        {/*    </Route>*/}
                        {/*))}*/}

                        <Route exact path="/">
                            <App />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                        <Route exact path="/blog">
                            <Blog />
                        </Route>
                        <Route path="/blog/:id">
                            <BlogPost />
                        </Route>
                        <Route path="*">
                            <NoMatch />
                        </Route>

                    </Switch>
                </div>

            </div>
        </Router>
    );
}