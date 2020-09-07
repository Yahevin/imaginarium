import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "@/global-styles/reset.css";
import "@/global-styles/base.css";
import IndexPage from "@/pages/IndexPage";

ReactDOM.render(
    <Router basename={''}>
        <IndexPage/>
    </Router>,
    document.getElementById('app')
);
