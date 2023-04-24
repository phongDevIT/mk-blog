import DashboardHeading from "../../drafts/DashboardHeading";
import React, { useState } from "react";
import { Table } from "components/table";
import { LabelStatus } from "components/label";
import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { useEffect } from "react";
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { categoryStatus } from "utils/constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { Button } from "components/button";
const CategoryManage = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [categoryCount, setCategoryCount] = useState(0);
    const navigate = useNavigate();
    const [filter, setFilter] = useState("");
    useEffect(() => {
        const colRef = collection(db, "categories");
        const newRef = filter
            ? query(
                  colRef,
                  where("name", ">=", filter),
                  where("name", "<=", filter + "utf8")
              )
            : colRef;
        onSnapshot(newRef, (snapshot) => {
            let results = [];
            setCategoryCount(snapshot.size);

            snapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setCategoryList(results);
        });
    }, [filter]);
    const handleInputFilter = debounce((e) => {
        setFilter(e.target.value);
    }, 500);
    const handleDeleteCategory = async (docId) => {
        const colRef = doc(db, "categories", docId);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteDoc(colRef);
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        });
    };

    return (
        <div>
            <DashboardHeading title="Categories" desc="Manage your category">
                <Button
                    height="60px"
                    to="/manage/add-category"
                    className="mx-auto w-[200px] bg-gradient-to-r from-teal-500 to-green-400 text-white"
                >
                    Create category
                </Button>
            </DashboardHeading>
            <div className="flex justify-end mb-10">
                <input
                    type="text"
                    placeholder="Search category..."
                    className="px-5 py-4 border border-gray-400 rounded-lg"
                    onChange={handleInputFilter}
                />
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryList.length > 0 &&
                        categoryList.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>
                                    <span className="italic text-gray-400">
                                        {category.slug}
                                    </span>
                                </td>
                                <td>
                                    {Number(category.status) ===
                                        categoryStatus.APPROVED && (
                                        <LabelStatus type="success">
                                            Approved
                                        </LabelStatus>
                                    )}
                                    {Number(category.status) ===
                                        categoryStatus.UNAPPROVED && (
                                        <LabelStatus type="warning">
                                            Unapproved
                                        </LabelStatus>
                                    )}
                                </td>
                                <td>
                                    <div className="flex items-end gap-x-3">
                                        <ActionView></ActionView>
                                        <ActionEdit
                                            onClick={() =>
                                                navigate(
                                                    `/manage/update-category?id=${category.id}`
                                                )
                                            }
                                        ></ActionEdit>
                                        <ActionDelete
                                            onClick={() =>
                                                handleDeleteCategory(
                                                    category.id
                                                )
                                            }
                                        ></ActionDelete>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CategoryManage;
