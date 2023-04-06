import { LoadingSpinner } from "components/loading";
import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ButtonStyles = styled.button`
    cursor: pointer;
    padding: 0 30px;
    background: linear-gradient(107.61deg, #00a7b4 15.59%, #a4d96c 87.25%);
    border-radius: 8px;
    width: 100%;
    line-height: 1;
    color: white;
    font-weight: 600;
    height: ${(props) => props.height || "70px"};
    display: flex;
    justify-content: center;
    align-items: center;
    &:disabled {
        opacity: 0.5;
        pointer-events: none;
    }
`;
const Button = ({
    type = "button",
    onClick = () => {},
    children,
    ...props
}) => {
    const { isLoading } = props;
    const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
    return (
        <ButtonStyles type={type} onClick={onClick} {...props}>
            {child}
        </ButtonStyles>
    );
};

export default Button;
