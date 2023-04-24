import styled from "styled-components";
import React from "react";
import PostRelated from "module/post/PostRelated";
import PostMeta from "module/post/PostMeta";
import PostImage from "module/post/PostImage";
import PostCategory from "module/post/PostCategory";
import parse from "html-react-parser";
import NotFoundPage from "./NotFoundPage";
import Layout from "components/layout/Layout";
import Authorbox from "components/author/Authorbox";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
const PostDetailsPageStyles = styled.div`
    padding-bottom: 100px;
    .post {
        &-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 40px;
            margin: 40px 0;
        }
        &-feature {
            width: 100%;
            max-width: 640px;
            height: 466px;
            border-radius: 20px;
        }
        &-heading {
            font-weight: bold;
            font-size: 36px;
            margin-bottom: 16px;
        }
        &-info {
            flex: 1;
        }
        &-content {
            max-width: 700px;
            margin: 80px auto;
        }
    }
    .author {
        margin-top: 40px;
        display: flex;
        border-radius: 20px;
        background-color: ${(props) => props.theme.grayF3};
        &-image {
            width: 200px;
            height: 200px;
            flex-shrink: 0;
            border-radius: inherit;
        }
        &-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: inherit;
        }
        &-content {
            flex: 1;
            padding: 20px;
        }
        &-name {
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 20px;
        }
        &-desc {
            font-size: 14px;
            line-height: 2;
        }
    }
`;

const PostDetailsPage = ({ data }) => {
    const { slug } = useParams();
    const [postInfo, setPostInfo] = useState();
    useEffect(() => {
        async function fetData() {
            if (!slug) return;
            const colRef = query(
                collection(db, "posts"),
                where("slug", "==", slug)
            );
            onSnapshot(colRef, (snapshot) => {
                snapshot.forEach((doc) => {
                    doc.data() && setPostInfo(doc.data());
                });
            });
        }
        fetData();
    }, [slug]);
    useEffect(() => {
        document.body.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [slug]);

    if (!slug) return <NotFoundPage></NotFoundPage>;
    if (!postInfo || !postInfo.title) return null;

    // const { user } = postInfo;
    const user = postInfo?.user;
    return (
        <PostDetailsPageStyles>
            <Layout>
                <div className="container">
                    <div className="post-header">
                        <PostImage
                            url={postInfo.image}
                            className="post-feature"
                        ></PostImage>
                        <div className="post-info">
                            <PostCategory
                                className="mb-6"
                                to={postInfo.category?.slug}
                            >
                                {postInfo.category?.name}
                            </PostCategory>
                            <h1 className="post-heading">{postInfo.title}</h1>
                            <PostMeta
                                authorName={postInfo?.user?.fullname}
                                date={new Date(
                                    postInfo.createAt?.seconds * 1000
                                ).toLocaleDateString("vi-VI")}
                            ></PostMeta>
                        </div>
                    </div>
                    <div className="post-content">
                        <div className="entry-content">
                            {parse(postInfo.content || "")}
                        </div>
                        <Authorbox userId={user.id}></Authorbox>
                    </div>
                    <PostRelated
                        categoryId={postInfo?.categoryId}
                    ></PostRelated>
                </div>
            </Layout>
        </PostDetailsPageStyles>
    );
};

export default PostDetailsPage;
