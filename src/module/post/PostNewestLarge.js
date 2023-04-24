import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestLargeStyles = styled.div`
    .post {
        &-image {
            display: block;
            margin-bottom: 16px;
            height: 433px;
            border-radius: 16px;
        }
        &-category {
            margin-bottom: 10px;
        }

        &-title {
            margin-bottom: 12px;
        }
    }
`;

const PostNewestLarge = ({ data }) => {
    const date = data?.createAt?.seconds
        ? new Date(data?.createAt?.seconds * 1000)
        : new Date();
    const formaDate = new Date(date).toLocaleDateString("vi-VI");
    if (!data.id) return null;
    return (
        <PostNewestLargeStyles>
            <PostImage url={data?.image} alt="" to={data?.slug}></PostImage>
            <PostCategory to={data?.category?.slug}>
                {data?.category?.name}
            </PostCategory>
            <PostTitle to={data?.slug} size="big">
                {data?.title}
            </PostTitle>
            <PostMeta
                to={slugify(data.user?.fullname || "", { lower: true })}
                authorName={data.user?.fullname}
                date={formaDate}
            ></PostMeta>
        </PostNewestLargeStyles>
    );
};

export default PostNewestLarge;
