import { Button } from "components/button";
import DashboardHeading from "../../pages/DashboardHeading";
import React from "react";
import UserTable from "./UserTable";
import { useState } from "react";

const UserManage = () => {
    const [userList, setUserList] = useState();
    // const { userInfo } = useAuth();
    // if (userInfo.role !== userRole.ADMIN) return null;
    return (
        <div>
            <DashboardHeading
                title="Users"
                desc="Manage your user"
            ></DashboardHeading>
            <div className="flex justify-end mb-10">
                <Button
                    to="/manage/add-user"
                    className="text-white bg-gradient-to-r from-teal-500 to-green-400"
                >
                    Add new user
                </Button>
            </div>
            <UserTable></UserTable>
        </div>
    );
};

export default UserManage;
