import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AuthenticationPageStyles = styled.div`
    min-height: 100vh;
    padding: 40px;
    .logo {
        margin: 0 auto 20px;
    }
    .heading {
        text-align: center;
        color: ${(props) => props.theme.primary};
        font-weight: bold;
        font-size: 40px;
        margin-bottom: 40px;
    }

    .form {
        max-width: 800px;
        margin: 0 auto;
    }
    .have-account {
        margin-bottom: 20px;
        a {
            display: inline-blog;
            color: ${(props) => props.theme.primary};
            flex-wrap: 500;
        }
    }
`;

const AuthenticationPage = ({ children }) => {
    return (
        <AuthenticationPageStyles>
            <div className="container">
                <NavLink to="/">
                    <img
                        srcSet="/logo.png 3x"
                        alt="monkey-blog"
                        className="logo"
                    />
                </NavLink>
                <h1 className="heading">Monkey Blogging</h1>
                {children}
            </div>
        </AuthenticationPageStyles>
    );
};

export default AuthenticationPage;
