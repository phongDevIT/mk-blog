import { Button } from "components/button";
import React from "react";
import styled from "styled-components";

const HomeBannerStyles = styled.div`
    min-height: 520px;
    padding: 40px 0;
    background: linear-gradient(107.61deg, #00a7b4 15.59%, #a4d96c 87.25%);

    .banner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-content {
            max-width: 400px;
            color: white;
            padding: 30px;
        }
        &-heading {
            margin-bottom: 40px;
            font-size: 36px;
        }
        &-desc {
            line-height: 1.75;
            margin-bottom: 70px;
        }
        &-button {
            padding: 15px 45px;
            border-radius: 8px;
            color: ${(props) => props.theme.primary};
            border: none;
            cursor: pointer;
        }
    }
`;
const HomeBanner = () => {
    return (
        <HomeBannerStyles className="container">
            <div className="banner">
                <div className="banner-content">
                    <h1 className="banner-heading">Monkey Blogging</h1>
                    <p className="banner-desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi.
                    </p>
                    <Button to="/sign-up">Get Started</Button>
                </div>
                <div className="banner-image">
                    <img src="/img-banner.png" alt="banner" />
                </div>
            </div>
        </HomeBannerStyles>
    );
};

export default HomeBanner;
