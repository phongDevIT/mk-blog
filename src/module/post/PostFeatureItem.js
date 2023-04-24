import { db } from "firebase-app/firebase-config";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostFeatureItemStyles = styled.div`
    width: 100%;
    border-radius: 16px;
    position: relative;
    height: 169px;
    .post {
        &-image {
            /* width: 100%;
            height: 100%; */
            width: 374px;
            height: 300px;
            border-radius: 16px;
            object-fit: cover;
        }
        &-overlay {
            position: absolute;
            inset: 0;
            border-radius: 16px;
            background: linear-gradient(
                179.77deg,
                #6b6b6b 36.45%,
                rgba(163, 163, 163, 0.622265) 63.98%,
                rgba(255, 255, 255, 0) 99.8%
            );
            mix-blend-mode: multiply;
            opacity: 0.6;
        }
        &-content {
            position: absolute;
            inset: 0;
            z-index: 10;
            padding: 20px;
            color: white;
        }
        &-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }
    }
    @media screen and (min-width: 1024px) {
        height: 272px;
    }
`;
const PostFeatureItem = ({ data }) => {
    const [category, setCategory] = useState("");
    const [user, setUser] = useState("");
    useEffect(() => {
        async function fetch() {
            const colRef = collection(db, "categories");
            const q = query(colRef, where("status", "==", 1));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setCategory(doc.data());
            });
        }

        fetch();
    }, []);
    useEffect(() => {
        async function fetchUser() {
            const colRef = collection(db, "users");
            const userDoc = doc(colRef, data.userId);
            const userSnapshot = await getDoc(userDoc);
            if (userSnapshot.exists()) {
                setUser(userSnapshot.data());
            } else {
                console.log("User not found with ID", data.userId);
            }
        }

        fetchUser();
    }, []);
    if (!data || !data.id) return null;
    const date = data?.createAt?.seconds
        ? new Date(data?.createAt?.seconds * 1000)
        : new Date();
    const formaDate = new Date(date).toLocaleDateString("vi-VI");
    return (
        <PostFeatureItemStyles>
            <PostImage url={data.image} alt="unsplash" to="/"></PostImage>
            <div className="post-overlay"></div>
            <div className="post-content">
                <div className="post-top">
                    {category?.name && (
                        <PostCategory to={category.slug}>
                            {category.name}
                        </PostCategory>
                    )}
                    <PostMeta
                        to={slugify(user?.fullname || "", { lower: true })}
                        authorName={user?.fullname}
                        date={formaDate}
                    ></PostMeta>
                </div>
                <PostTitle to={data.slug} size="big">
                    {data.title}
                </PostTitle>
            </div>
        </PostFeatureItemStyles>
    );
};

export default PostFeatureItem;
