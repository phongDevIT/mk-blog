import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const DashboardHeaderStyles = styled.div`
    background-color: white;
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    gap: 20px;
    .header-avatar {
        width: 52px;
        height: 52px;
        cursor: pointer;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100rem;
        }
    }
`;

const DashboardHeader = () => {
    const { userInfo } = useAuth();
    return (
        <DashboardHeaderStyles>
            <Button
                to="/manage/add-post"
                className="header-button"
                height="52px"
                style={{
                    background:
                        "linear-gradient(107.61deg, #00a7b4 15.59%, #a4d96c 87.25%)",
                    color: "white",
                }}
            >
                Write new post
            </Button>
            <Link to="/profile" className="header-avatar">
                <img to="/profile" src={userInfo?.avatar} alt="" />
            </Link>
        </DashboardHeaderStyles>
    );
};

export default DashboardHeader;
