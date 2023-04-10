import { LoadingSpinner } from "components/loading";
import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ButtonStyles = styled.button`
    cursor: pointer;
    padding: 0 30px;
    /* background: linear-gradient(107.61deg, #00a7b4 15.59%, #a4d96c 87.25%); */
    background: ${(props) =>
        props.kind === "primary"
            ? "linear-gradient(107.61deg, #00a7b4 15.59%, #a4d96c 87.25%)"
            : props.theme[props.kind]};
    color: ${(props) => (props.kind === "primary" ? "white" : "black")};
    border-radius: 8px;
    /* width: 100%; */
    line-height: 1;
    border: none;
    font-weight: 600;
    height: ${(props) => props.height || "70px"};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: ${(props) => props.theme.primary};
    &:disabled {
        opacity: 0.5;
        pointer-events: none;
    }
`;

/**
 * @param {*} onClick Handler onClick
 * @requires
 * @param {string} type
 * @returns
 */
const Button = ({
    type = "button",
    onClick = () => {},
    children,
    ...props
}) => {
    const { isLoading, to } = props;
    const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
    if (to !== "" && typeof to === "string") {
        return (
            <NavLink to={to}>
                <ButtonStyles type={type} onClick={onClick} {...props}>
                    {child}
                </ButtonStyles>
            </NavLink>
        );
    }
    return (
        <ButtonStyles type={type} onClick={onClick} {...props}>
            {child}
        </ButtonStyles>
    );
};
Button.prototype = {
    type: PropTypes.oneOf(["button", "submit"]),
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
    kind: PropTypes.string,
};

export default Button;
