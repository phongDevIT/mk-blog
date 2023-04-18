import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field } from "components/field";
import { Input } from "../../components/input/input";
import { Label } from "../../components/label/Label";
import DashboardHeading from "../../drafts/DashboardHeading";
import React from "react";
import { useForm } from "react-hook-form";

const CategoryAddNew = () => {
    const {
        control,
        setValue,
        formState: { errors, isSubmitting, isValid },
    } = useForm({
        mode: "onChange",
    });
    return (
        <div>
            <DashboardHeading
                title="New category"
                desc="Add new category"
            ></DashboardHeading>
            <form>
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
                        <div className="flex flex-wrap gap-x-5">
                            <Radio
                                name="status"
                                control={control}
                                checked={true}
                            >
                                Approved
                            </Radio>
                            <Radio name="status" control={control}>
                                Unapproved
                            </Radio>
                        </div>
                    </Field>
                </div>
                <Button
                    type="submit"
                    className="mx-auto w-[200px]"
                    style={{
                        background:
                            "linear-gradient(107.61deg, #00a7b4 15.59%, #a4d96c 87.25%)",
                        color: "white",
                    }}
                >
                    Add new category
                </Button>
            </form>
        </div>
    );
};

export default CategoryAddNew;
