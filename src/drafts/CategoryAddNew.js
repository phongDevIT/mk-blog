import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "../components/input/input";
import Label from "../components/label/Label";
import DashboardHeading from "./DashboardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { categoryStatus } from "utils/constants";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { toast } from "react-toastify";

const CategoryAddNew = () => {
    const {
        control,
        watch,
        reset,
        formState: { isSubmitting, isValid },
        handleSubmit,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            slug: "",
            status: 1,
            createAt: new Date(),
        },
    });
    const handleAddNewCategory = async (values) => {
        if (!isValid) return;
        const newValues = { ...values };
        newValues.slug = slugify(newValues.name || newValues.slug, {
            lower: true,
        });
        newValues.status = Number(newValues.status);
        const colRef = collection(db, "categories");
        try {
            await addDoc(colRef, {
                ...newValues,
                createAt: serverTimestamp(),
            });
            toast.success("Create new category successfully");
        } catch (error) {
            toast.error("Error message");
        } finally {
            reset({
                name: "",
                slug: "",
                status: 1,
                createAt: new Date(),
            });
        }
        // console.log("newValues: ", newValues);
    };
    const watchStatus = watch("status");
    return (
        <div>
            <DashboardHeading
                title="New category"
                desc="Add new category"
            ></DashboardHeading>
            <form
                onSubmit={handleSubmit(handleAddNewCategory)}
                autoComplete="off"
            >
                <div className="form-layout">
                    <Field>
                        <Label>Name</Label>
                        <Input
                            control={control}
                            name="name"
                            placeholder="Enter your category name"
                        ></Input>
                    </Field>
                    <Field>
                        <Label>Slug</Label>
                        <Input
                            control={control}
                            name="slug"
                            placeholder="Enter your slug"
                        ></Input>
                    </Field>
                </div>
                <div className="form-layout">
                    <Field>
                        <Label>Status</Label>
                        <FieldCheckboxes>
                            <Radio
                                name="status"
                                control={control}
                                checked={Number(watchStatus) === 1}
                                value={categoryStatus.APPROVED}
                            >
                                Approved
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={Number(watchStatus) === 2}
                                value={categoryStatus.UNAPPROVED}
                            >
                                Unapproved
                            </Radio>
                        </FieldCheckboxes>
                    </Field>
                </div>
                <Button
                    type="submit"
                    className=" mx-auto w-[300px] text-center text-white bg-gradient-to-r from-teal-500 to-green-400"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                >
                    Add new category
                </Button>
            </form>
        </div>
    );
};

export default CategoryAddNew;
