import DashboardHeading from "./DashboardHeading";
import React from "react";
import { Button } from "components/button";

const UserManage = () => {
    return (
        <div>
            <DashboardHeading
                title="Users"
                desc="Manage your user"
            ></DashboardHeading>
            {/* <div className="flex justify-end mb-10">
                <Button to="/manage/add-user">Add new user</Button>
            </div> */}
        </div>
    );
};

export default UserManage;
