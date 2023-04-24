import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostItemStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .post {
        &-image {
            height: 202px;
            margin-bottom: 20px;
            display: block;
            width: 100%;
            border-radius: 16px;
        }
        &-category {
            margin-bottom: 16px;
        }
        &-title {
            margin-bottom: 12px;
        }
    }
`;

const PostItem = ({ data }) => {
    if (!data) return null;
    const date = data?.createAt?.seconds
        ? new Date(data?.createAt?.seconds * 1000)
        : new Date();
    const formaDate = new Date(date).toLocaleDateString("vi-VI");
    return (
        <PostItemStyles>
            <PostImage url={data.image} alt="" to={data.slug}></PostImage>
            <PostCategory to={data.category?.slug}>
                {data.category?.name}
            </PostCategory>
            <PostTitle to={data?.slug}>{data.title}</PostTitle>
            <PostMeta
                to={slugify(data.user?.fullname || "", { lower: true })}
                authorName={data.user?.fullname}
                date={formaDate}
            ></PostMeta>
        </PostItemStyles>
    );
};

export default PostItem;
