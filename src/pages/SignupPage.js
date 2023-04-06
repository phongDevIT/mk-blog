import React, { useState } from "react";
import styled from "styled-components";
import { Label } from "../components/label/label";
import { useForm } from "react-hook-form";
import { Input } from "../components/input/input";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import Field from "../components/field/Field";
import { Button } from "../components/button";
import { LoadingSpinner } from "../components/loading";

const SignupPageStyles = styled.div`
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
    /* .field {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        row-gap: 20px;
    } */
    /* .label {
        color: ${(props) => props.theme.grayDark};
        font-weight: 600;
        font-size: 20px;
        line-height: 30px;
        cursor: pointer;
    } */
    /* .input {
        border: 1px solid #00b4aa;
        padding: 15px;
        border-radius: 8px;
        width: 100%;
        background-color: ${(props) => props.theme.grayLight};
        transition: all 0.2s linear;
    }
    .input:focus {
        background-color: white;
        border-color: ${(props) => props.theme.primary};
    }
    .input::-webkit-input-placeholder {
        color: ${(props) => props.theme.grayplace};
    }
    .input::-moz-input-placeholder {
        color: ${(props) => props.theme.grayplace};
    } */
    .form {
        max-width: 800px;
        margin: 0 auto;
    }
`;

const SignupPage = () => {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        watch,
    } = useForm({});
    const handleSignUp = (values) => {
        console.log(values);
    };
    const [togglePassWord, setTogglePassWord] = useState(false);
    return (
        <SignupPageStyles>
            <div className="container">
                <img srcSet="/logo.png 3x" alt="monkey-blog" className="logo" />
                <h1 className="heading">Monkey Blogging</h1>
                <form
                    className="form"
                    onSubmit={handleSubmit(handleSignUp)}
                    autoComplete="off"
                >
                    <Field>
                        <Label htmlFor="fullname">Fullname</Label>
                        <Input
                            type="text"
                            name="fullname"
                            placeholder="Please enter your fullname"
                            control={control}
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Please enter your email address"
                            control={control}
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type={togglePassWord ? "text" : "password"}
                            name="password"
                            placeholder="Please enter your password"
                            control={control}
                        >
                            {!togglePassWord ? (
                                <IconEyeClose
                                    onClick={() => setTogglePassWord(true)}
                                ></IconEyeClose>
                            ) : (
                                <IconEyeOpen
                                    onClick={() => setTogglePassWord(false)}
                                ></IconEyeOpen>
                            )}
                        </Input>
                    </Field>
                    <Button type="submit" disable={true} isLoading={true}>
                        {/* <LoadingSpinner></LoadingSpinner> */}
                        Sign Up
                    </Button>
                </form>
            </div>
        </SignupPageStyles>
    );
};

export default SignupPage;
