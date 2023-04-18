import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "../../components/input/input";
import { Label } from "components/label";
import DashboardHeading from "pages/DashboardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { categoryStatus } from "utils/constants";
import slugify from "slugify";
import { toast } from "react-toastify";

const CategoryUpdate = () => {
    const {
        control,
        reset,
        watch,
        formState: { isSubmitting },
        handleSubmit,
    } = useForm({
        mode: "onChange",
        defaultValue: {},
    });
    const [params] = useSearchParams();
    const categoryId = params.get("id");
    const navigate = useNavigate();
    const handleSubmitUpdate = async (values) => {
        const colRef = doc(db, "categories", categoryId);
        await updateDoc(colRef, {
            name: values.name,
            slug: slugify(values.slug || values.name, { lower: true }),
            status: Number(values.status),
        });
        toast.success("Updated category successfully");
        navigate("/manage/category");
    };
    useEffect(() => {
        async function fetchData() {
            const colRef = doc(db, "categories", categoryId);
            const singeDoc = await getDoc(colRef);
            reset(singeDoc.data());
        }
        fetchData();
    }, [categoryId, reset]);
    if (!categoryId) return null;
    const watchStatus = watch("status");
    return (
        <div>
            <DashboardHeading
                title="Update category"
                desc={`Update your category id : ${categoryId}`}
            ></DashboardHeading>
            <form
                onSubmit={handleSubmit(handleSubmitUpdate)}
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
                    Update category
                </Button>
            </form>
        </div>
    );
};

export default CategoryUpdate;
