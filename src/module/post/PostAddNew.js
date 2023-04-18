import { Button } from "components/button";
import { Field } from "components/field";
import { Input } from "../../components/input/input";
import Label from "../../components/label/Label";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import slugify from "slugify";
import { postStatus } from "utils/constants";
import ImageUpload from "components/image/ImageUpload";
import useFirebaseImage from "hooks/useFirebaseImage";
import Toggle from "components/toggle/Toggle";
import { useEffect } from "react";
import {
    addDoc,
    collection,
    getDocs,
    query,
    serverTimestamp,
    where,
} from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { useAuth } from "contexts/auth-context";
import { toast } from "react-toastify";

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
    const { userInfo } = useAuth();
    const { control, watch, setValue, handleSubmit, getValues, reset } =
        useForm({
            mode: "onChange",
            defaultValues: {
                title: "",
                slug: "",
                status: 2,
                categoryId: "",
                hot: false,
            },
        });
    const {
        image,
        handleResetUpload,
        progress,
        handleSelectImage,
        handleDeleteImage,
    } = useFirebaseImage(setValue, getValues);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectCategory, setSelectCategory] = useState("");
    const addPostHandler = async (values) => {
        try {
            setLoading(true);
            const cloneValues = { ...values };
            cloneValues.slug = slugify(values.slug || values.title, {
                lower: true,
            });
            cloneValues.status = Number(values.status);
            const colRef = collection(db, "posts");
            await addDoc(colRef, {
                ...cloneValues,
                image,
                userId: userInfo.uid,
                createAt: serverTimestamp(),
            });
            toast.success("Create new post successfully");
            reset({
                title: "",
                slug: "",
                status: 2,
                categoryId: "",
                hot: false,
                image: "",
            });
            handleResetUpload();
            setSelectCategory({});
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        document.title = "Monkey Blog - add new posts";
    }, []);
    useEffect(() => {
        async function getData() {
            const colRef = collection(db, "categories");
            const q = query(colRef, where("status", "==", 1));
            const querySnapshot = await getDocs(q);
            let result = [];
            querySnapshot.forEach((doc) => {
                result.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setCategories(result);
        }
        getData();
    }, []);

    const watchStatus = watch("status");
    const watchHot = watch("hot");
    // const watchCategory = watch("category");
    const handleClickOption = (item) => {
        setValue("category", item.id);
        setSelectCategory(item);
    };
    return (
        <PostAddNewStyles>
            <h1 className="dashboard-heading">Add new post</h1>
            <form onSubmit={handleSubmit(addPostHandler)}>
                <div className="grid grid-cols-2 mb-10 gap-x-10">
                    <Field>
                        <Label>Title</Label>
                        <Input
                            control={control}
                            placeholder="Enter your title"
                            name="title"
                            required
                        ></Input>
                    </Field>
                    <Field>
                        <Label>Slug</Label>
                        <Input
                            control={control}
                            placeholder="Enter your slug"
                            name="slug"
                        ></Input>
                    </Field>
                </div>
                <div className="grid grid-cols-2 mb-10 gap-x-10">
                    <Field>
                        <Label>Image</Label>
                        <ImageUpload
                            onChange={handleSelectImage}
                            handleDeleteImage={handleDeleteImage}
                            progress={progress}
                            image={image}
                        ></ImageUpload>
                    </Field>
                    <Field>
                        <Label>Status</Label>
                        <div className="flex items-center gap-x-5 mb-7">
                            <Radio
                                name="status"
                                control={control}
                                onClick={() => setValue("status", "approved")}
                                checked={
                                    Number(watchStatus) === postStatus.APPROVED
                                }
                                value={postStatus.APPROVED}
                            >
                                Approved
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={
                                    Number(watchStatus) === postStatus.PENDING
                                }
                                onClick={() => setValue("status", "pending")}
                                value={postStatus.PENDING}
                            >
                                Pending
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={
                                    Number(watchStatus) === postStatus.REJECTED
                                }
                                onClick={() => setValue("status", "reject")}
                                value={postStatus.REJECTED}
                            >
                                Reject
                            </Radio>
                        </div>
                        <Label>Feature post</Label>
                        <Toggle
                            on={watchHot === true}
                            onClick={() => setValue("hot", !watchHot)}
                        ></Toggle>
                        <div className="grid w-full grid-cols-2 mt-10 gap-x-10">
                            <Field>
                                <Label>Category</Label>
                                <Dropdown>
                                    <Dropdown.Select placeholder="Select the Category"></Dropdown.Select>
                                    <Dropdown.List>
                                        {categories.length > 0 &&
                                            categories.map((item) => (
                                                <Dropdown.Option
                                                    key={item.id}
                                                    onClick={() =>
                                                        handleClickOption(item)
                                                    }
                                                >
                                                    {item.name}
                                                </Dropdown.Option>
                                            ))}
                                    </Dropdown.List>
                                    {/* <Dropdown.Option>
                                        Blockchain
                                    </Dropdown.Option>
                                    <Dropdown.Option>Setup</Dropdown.Option>
                                    <Dropdown.Option>Nature</Dropdown.Option>
                                    <Dropdown.Option>Developer</Dropdown.Option> */}
                                </Dropdown>
                                {selectCategory?.name && (
                                    <span className="inline-block p-3 text-sm font-medium text-green-600 bg-green-100 rounded-lg ">
                                        {selectCategory.name}
                                    </span>
                                )}
                            </Field>

                            <Field></Field>
                        </div>
                    </Field>
                    <div className="grid grid-cols-2 gap-x-10 mt-[-80px]">
                        <Field>
                            <Label>Author</Label>
                            <Input
                                control={control}
                                placeholder="Find the author"
                            ></Input>
                        </Field>
                    </div>
                </div>
                {/* <div className="grid grid-cols-2 mb-10 gap-x-10">
                    <Field>
                        <Label>Category</Label>
                        <Dropdown>
                            <Dropdown.Option>Knowledge</Dropdown.Option>
                            <Dropdown.Option>Blockchain</Dropdown.Option>
                            <Dropdown.Option>Setup</Dropdown.Option>
                            <Dropdown.Option>Nature</Dropdown.Option>
                            <Dropdown.Option>Developer</Dropdown.Option>
                        </Dropdown>
                    </Field>

                    <Field></Field>
                </div> */}
                <Button
                    type="submit"
                    className="mx-auto w-[200px]"
                    style={{
                        background:
                            "linear-gradient(107.61deg, #00a7b4 15.59%, #a4d96c 87.25%)",
                        color: "white",
                    }}
                    isLoading={loading}
                    disabled={loading}
                >
                    Add new post
                </Button>
            </form>
        </PostAddNewStyles>
    );
};

export default PostAddNew;
