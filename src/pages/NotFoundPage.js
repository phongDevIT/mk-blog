import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NotFoundPageStyles = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .logo {
        display: inline-blog;
        margin-bottom: 40px;
    }
    .heading {
        font-size: 60px;
        font-weight: bold;
        margin-bottom: 40px;
    }
    .back {
        color: #fff;
        background-color: ${(props) => props.theme.primary};
        border-radius: 8px;
        padding: 15px 30px;
    }
`;

const NotFoundPage = () => {
    return (
        <NotFoundPageStyles>
            <NavLink to="/" className={"logo"}>
                <img srcSet="/logo.png 3x" alt="monkey-blog" />
            </NavLink>
            <h1 className="heading">Opps! Page not found</h1>
            <NavLink to="/" className={"back"}>
                Back to home
            </NavLink>
        </NotFoundPageStyles>
    );
};

export default NotFoundPage;
