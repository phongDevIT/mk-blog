import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";

const InputStyles = styled.div`
    position: relative;
    width: 100%;
    textarea {
        width: 100%;
        padding: ${(props) =>
            props.hasIcon ? "16px 60px 16px 20px" : "16px 20px"};
        border: 1px solid #00b4aa;
        border-radius: 8px;
        transition: all 0.2s linear;
        /* color: ${(props) => props.theme.black}; */
        font-size: 14px;
        resize: none;
        min-height: 200px;
    }
    .textarea:focus {
        background-color: white;
        border-color: ${(props) => props.theme.primary};
    }
    textarea::-webkit-input-placeholder {
        color: ${(props) => props.theme.grayplace};
    }
    textarea::-moz-input-placeholder {
        color: ${(props) => props.theme.grayplace};
    }
`;
/**
 *
 * @param {*} placeholder(optional) - Placeholder of Textarea
 * @param {*} name(optional) - name of Textarea
 * @param {*} control - control from react hook form
 * @returns Textarea
 */
const Textarea = ({
    name = "",
    type = "text",
    hasIcon = false,
    children,
    control,
    ...props
}) => {
    const { field } = useController({
        control,
        name,
        defaultValue: "",
    });
    return (
        <InputStyles>
            <textarea id={name} type={type} {...field} {...props} />
        </InputStyles>
    );
};
Textarea.propTypes = {
    // value: PropTypes.string
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    children: PropTypes.any,
    control: PropTypes.any.isRequired,
};
// export { Textarea };
export default Textarea;
