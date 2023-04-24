import { Field } from "components/field";
import { Input } from "../components/input/input";
import Label from "../components/label/Label";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import { Button } from "components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
import InputPasswordToggle from "components/input/InputPasswordToggle";

const scheme = yup.object({
    email: yup
        .string()
        .email("Please enter your email")
        .required("Please enter your email address"),
    password: yup
        .string()
        .min(8, "Your must password 8 characters")
        .required("Please enter your password"),
});
const SignInPage = () => {
    const {
        handleSubmit,
        control,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(scheme),
    });
    useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0) {
            toast.error(arrErrors[0]?.message, {
                pauseOnHover: false,
                delay: 0,
            });
        }
    }, [errors]);
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Login Page";
        // if (userInfo.email) navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSignIn = async (values) => {
        if (!isValid) return null;
        await signInWithEmailAndPassword(auth, values.email, values.password);
        navigate("/");
    };
    return (
        <AuthenticationPage>
            <form
                className="form"
                onSubmit={handleSubmit(handleSignIn)}
                autoComplete="off"
            >
                <Field>
                    <Label htmlFor="email">Email address</Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Please enter your email address"
                        control={control}
                    ></Input>
                </Field>
                <Field>
                    <Label htmlFor="password">Password</Label>
                    <InputPasswordToggle
                        control={control}
                    ></InputPasswordToggle>
                </Field>
                <div className="have-account">
                    You have not had an account?
                    <NavLink to={"/sign-up"}>Register account</NavLink>
                </div>
                <Button
                    type="submit"
                    style={{
                        width: "100%",
                        maxWidth: 350,
                        margin: "0 auto",
                        backgroundColor: "#1DC071",
                        color: "white",
                    }}
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                >
                    Sign In
                </Button>
            </form>
        </AuthenticationPage>
    );
};

export default SignInPage;
