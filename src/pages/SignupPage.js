import React, { useEffect } from "react";
import Label from "../components/label/Label";
import { useForm } from "react-hook-form";
import { Input } from "../components/input/input";
import Field from "../components/field/Field";
import { Button } from "../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import slugify from "slugify";
import { userRole, userStatus } from "utils/constants";
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
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(scheme),
    });
    const handleSignUp = async (values) => {
        if (!isValid) return;
        await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
        );
        await updateProfile(auth.currentUser, {
            displayName: values.fullname,
            photoURL:
                "https://plus.unsplash.com/premium_photo-1681248156475-be7454b5d54b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
        });

        await setDoc(doc(db, "users", auth.currentUser.uid), {
            fullname: values.fullname,
            email: values.email,
            password: values.password,
            username: slugify(values.fullname, { lower: true }),
            avatar: "https://plus.unsplash.com/premium_photo-1681248156475-be7454b5d54b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
            status: userStatus.ACTIVE,
            role: userRole.USER,
            createdAt: serverTimestamp(),
        });
        // await addDoc(colRef, {
        //     fullname: values.fullname,
        //     email: values.email,
        //     password: values.password,
        // });
        toast.success("Bạn đã tạo tài khoản thành công");
        navigate("/sign-in");

        // return new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve();
        //     }, 5000);
        // });
    };
    useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0) {
            toast.error(arrErrors[0]?.message, {
                pauseOnHover: false,
                delay: 0,
            });
        }
    }, [errors]);
    // const { userInfo } = useAuth();
    useEffect(() => {
        document.title = "Register Page";
        // if (userInfo.email) navigate("/");
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
                    <InputPasswordToggle
                        control={control}
                    ></InputPasswordToggle>
                </Field>
                <div className="have-account">
                    You already have an account?
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
