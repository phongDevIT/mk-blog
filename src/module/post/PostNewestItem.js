import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestItemStyles = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 28px;
    padding-bottom: 28px;
    border-bottom: 1px solid #ccc;
    &:last-child {
        padding-bottom: 0;
        margin-bottom: 0;
        border-bottom: 0;
    }
    .post {
        &-image {
            display: block;
            flex-shrink: 0;
            width: 180px;
            height: 130px;
            border-radius: 12px;
        }
        &-category {
            margin-bottom: 10px;
        }
        &-title {
            margin-bottom: 8px;
        }
    }
`;
const PostNewestItem = ({ data }) => {
    const date = data?.createAt?.seconds
        ? new Date(data?.createAt?.seconds * 1000)
        : new Date();
    const formaDate = new Date(date).toLocaleDateString("vi-VI");
    if (!data.id) return null;
    return (
        <PostNewestItemStyles>
            <PostImage url={data.image} alt="" to="/"></PostImage>
            <div className="post-content">
                <PostCategory type="secondary">
                    {data.category?.name}
                </PostCategory>
                <PostTitle size="normal">{data.title}</PostTitle>
                <PostMeta
                    to={slugify(data.user?.fullname || "", { lower: true })}
                    authorName={data.user?.fullname}
                    date={formaDate}
                ></PostMeta>
            </div>
        </PostNewestItemStyles>
    );
};

export default PostNewestItem;
