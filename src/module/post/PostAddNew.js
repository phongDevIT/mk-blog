import { Button } from "components/button";
import { Field } from "components/field";
import { Input } from "../../components/input/input";
import { Label } from "../../components/label/label";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
    const { control, watch, setValue } = useForm({
        mode: "onChange",
        defaultValues: {
            status: "",
            category: "",
        },
    });
    const watchStatus = watch("status");
    const watchCategory = watch("category");
    return (
        <PostAddNewStyles>
            <h1 className="dashboard-heading">Add new post</h1>
            <form>
                <div className="grid grid-cols-2 gap-x-10 mb-10">
                    <Field>
                        <Label>Title</Label>
                        <Input
                            control={control}
                            placeholder="Enter your title"
                            name="title"
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
                <div className="grid grid-cols-2 gap-x-10 mb-10">
                    <Field>
                        <Label>Status</Label>
                        <div className="flex items-center gap-x-5">
                            <Radio
                                name="status"
                                control={control}
                                checked={watchStatus === "approved"}
                                onClick={() => setValue("status", "approved")}
                                value="approved"
                            >
                                Approved
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={watchStatus === "pending"}
                                onClick={() => setValue("status", "pending")}
                                value="pending"
                            >
                                Pending
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={watchStatus === "reject"}
                                onClick={() => setValue("status", "reject")}
                                value="reject"
                            >
                                Reject
                            </Radio>
                        </div>
                    </Field>
                    <Field>
                        <Label>Author</Label>
                        <Input
                            control={control}
                            placeholder="Find the author"
                        ></Input>
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-x-10 mb-10">
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
                </div>
                <Button
                    type="submit"
                    className="mx-auto"
                    style={{
                        background:
                            "linear-gradient(107.61deg, #00a7b4 15.59%, #a4d96c 87.25%)",
                        color: "white",
                    }}
                >
                    Add new post
                </Button>
            </form>
        </PostAddNewStyles>
    );
};

export default PostAddNew;
