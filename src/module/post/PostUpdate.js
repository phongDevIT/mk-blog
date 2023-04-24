import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input/input";
import { Label } from "components/label";
import Toggle from "components/toggle/Toggle";
import { db } from "firebase-app/firebase-config";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import DashboardHeading from "pages/DashboardHeading";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { postStatus } from "utils/constants";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import { useMemo } from "react";

Quill.register("modules/imageUploader", ImageUploader);

const PostUpdate = () => {
    const [params] = useSearchParams();
    const postId = params.get("id");
    const [content, setContent] = useState("");
    const {
        handleSubmit,
        control,
        setValue,
        watch,
        reset,
        getValues,
        formState: { isValid, isSubmitting },
    } = useForm({
        mode: "onChange",
    });
    const imageURL = getValues("image");
    const imageName = getValues("image_name");

    const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
        useFirebaseImage(setValue, getValues, imageName, deletePostImage);
    async function deletePostImage() {
        const colRef = doc(db, "users", postId);
        await updateDoc(colRef, {
            avatar: "",
        });
    }
    useEffect(() => {
        setImage(imageURL);
    }, [imageURL, setImage]);
    const watchHot = watch("hot");
    const watchStatus = watch("status");
    useEffect(() => {
        async function fetchData() {
            if (!postId) return;
            const docRef = doc(db, "posts", postId);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.data()) {
                reset(docSnapshot.data());
                setSelectCategory(docSnapshot.data()?.category || "");
                setContent(docSnapshot.data()?.content || "");
            }
            // console.log("docSnapshot: ", docSnapshot.data());
        }
        fetchData();
    }, [postId, reset]);
    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState("");
    useEffect(() => {
        async function getCategoriesData() {
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
        getCategoriesData();
    }, []);
    const handleClickOption = async (item) => {
        const colRef = doc(db, "categories", item.id);
        const docData = await getDoc(colRef);
        setValue("category", {
            id: docData.id,
            ...docData.data(),
        });
        setSelectCategory(item);
    };
    const updatePostHandler = async (values) => {
        console.log("values: ", values);
        if (!isValid) return;
        const docRef = doc(db, "posts", postId);
        values.status = Number(values.status);
        await updateDoc(docRef, {
            ...values,
            content,
        });
        toast.success("Update posts content successfully");
    };
    const modules = useMemo(
        () => ({
            toolbar: [
                ["bold", "italic", "underline", "strike"],
                ["blockquote"],
                [{ header: 1 }, { header: 2 }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["link", "image"],
            ],
            // imageUploader: {
            //     upload: (file) => {
            //         return new Promise((resolve, reject) => {
            //             resolve("https://api.imgbb.com/1/upload");
            //         });
            //     },
            // },
        }),
        []
    );

    if (!postId) return null;

    return (
        <>
            <DashboardHeading
                title="Update post "
                desc="Update post content"
            ></DashboardHeading>
            <form onSubmit={handleSubmit(updatePostHandler)}>
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
                        {/* <Field>
                            <Label>Author</Label>
                            <Input
                                control={control}
                                placeholder="Find the author"
                            ></Input>
                        </Field> */}
                    </div>
                </div>
                <div className="mb-10">
                    <Field>
                        <Label>Content</Label>
                        <div className="w-full entry-content">
                            <ReactQuill
                                modules={modules}
                                theme="snow"
                                value={content}
                                onChange={setContent}
                            />
                        </div>
                    </Field>
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
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                >
                    Update post
                </Button>
            </form>
        </>
    );
};

export default PostUpdate;
