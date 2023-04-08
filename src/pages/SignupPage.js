import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Label } from "../components/label/label";
import { useForm } from "react-hook-form";
import { Input } from "../components/input/input";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import Field from "../components/field/Field";
import { Button } from "../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
// const SignupPageStyles = styled.div`
//     min-height: 100vh;
//     padding: 40px;
//     .logo {
//         margin: 0 auto 20px;
//     }
//     .heading {
//         text-align: center;
//         color: ${(props) => props.theme.primary};
//         font-weight: bold;
//         font-size: 40px;
//         margin-bottom: 40px;
//     }
//     /* .field {
//         display: flex;
//         flex-direction: column;
//         align-items: flex-start;
//         row-gap: 20px;
//     } */
//     /* .label {
//         color: ${(props) => props.theme.grayDark};
//         font-weight: 600;
//         font-size: 20px;
//         line-height: 30px;
//         cursor: pointer;
//     } */
//     /* .input {
//         border: 1px solid #00b4aa;
//         padding: 15px;
//         border-radius: 8px;
//         width: 100%;
//         background-color: ${(props) => props.theme.grayLight};
//         transition: all 0.2s linear;
//     }
//     .input:focus {
//         background-color: white;
//         border-color: ${(props) => props.theme.primary};
//     }
//     .input::-webkit-input-placeholder {
//         color: ${(props) => props.theme.grayplace};
//     }
//     .input::-moz-input-placeholder {
//         color: ${(props) => props.theme.grayplace};
//     } */
//     .form {
//         max-width: 800px;
//         margin: 0 auto;
//     }
// `;
const scheme = yup.object({
    fullname: yup.string().required("Please enter your name"),
    email: yup
        .string()
        .email("Please enter your email")
        .required("Please enter your email address"),
    password: yup
        .string()
        .min(8, "Your must password 8 characters")
        .required("Please enter your password"),
});

const SignupPage = () => {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        watch,
        reset,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(scheme),
    });
    const handleSignUp = async (values) => {
        if (!isValid) return;
        const user = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
        );
        await updateProfile(auth.currentUser, {
            displayName: values.fullname,
        });
        const colRef = collection(db, "users");
        await addDoc(colRef, {
            fullname: values.fullname,
            email: values.email,
            password: values.password,
        });
        toast.success("Bạn đã tạo tài khoản thành công");
        navigate("/");
        // return new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve();
        //     }, 5000);
        // });
    };
    const [togglePassWord, setTogglePassWord] = useState(false);
    useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0) {
            toast.error(arrErrors[0]?.message, {
                pauseOnHover: false,
                delay: 0,
            });
        }
    }, [errors]);
    useEffect(() => {
        document.title = "Register Page";
    }, []);
    return (
        <AuthenticationPage>
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
                <div className="have-account">
                    You already have an account?{" "}
                    <NavLink to={"/sign-in"}>Login</NavLink>
                </div>
                <Button
                    type="submit"
                    kind="primary"
                    style={{
                        width: "100%",
                        maxWidth: 350,
                        margin: "0 auto",
                        backgroundColor: "#1DC071",
                        color: "white",
                    }}
                    isLoading={isSubmitting}
                    disable={isSubmitting}
                >
                    Sign Up
                </Button>
            </form>
        </AuthenticationPage>
    );
};

export default SignupPage;
