import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LoadingSpinner } from "../../components/Loading"
import {
    createSplitCategory,
    logout,
    verifyUser,
} from "../../redux/userReducer"
import styles from "../../styles/css/Admin-add-product.module.css"

export default function CreateSplitCategory() {
    const dispatch = useDispatch()
    const { admin } = useSelector((state) => state.user)
    const { categories } = useSelector((state) => state.store)
    const router = useRouter()
    const formData = new FormData()
    const selectTag1 = useRef()
    const selectTag2 = useRef()
    const selectTag3 = useRef()
    const selectTag4 = useRef()
    const [file1, setFile1] = useState([])
    const [file2, setFile2] = useState([])
    const [file3, setFile3] = useState([])
    const [file4, setFile4] = useState([])
    const [dropdown, setDropdown] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        dispatch(verifyUser(token))
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    useEffect(() => {
        if (!admin) router.push("/")
    }, [admin])

    function handleDropdown() {
        if (dropdown) setDropdown(false)
        else setDropdown(true)
    }

    const categorySelect = categories?.map((category) => {
        return (
            <option
                key={category._id}
                id={category._id}
                value={category.name.toLowerCase()}
            >
                {category.name}
            </option>
        )
    })

    function addSplitCategoryTab(e) {
        e.preventDefault()
        const token = localStorage.getItem("token")
        dispatch(verifyUser(token))

        if (!admin) return router.push("/")

        if (
            file1.length < 1 ||
            file2.length < 1 ||
            file3.length < 1 ||
            file4.length < 1
        ) {
            return alert("All categories must have an image file selected")
        } else if (
            selectTag1.current.value.length < 1 ||
            selectTag2.current.value.length < 1 ||
            selectTag3.current.value.length < 1 ||
            selectTag4.current.value.length < 1
        ) {
            return alert("Category must be selected")
        }

        for (let i = 0; i < selectTag1.current.childNodes.length; i++) {
            if (selectTag1.current.childNodes[i].selected) {
                selectTag1.current.id = selectTag1.current.childNodes[i].id
            }
        }
        for (let i = 0; i < selectTag2.current.childNodes.length; i++) {
            if (selectTag2.current.childNodes[i].selected) {
                selectTag2.current.id = selectTag2.current.childNodes[i].id
            }
        }
        for (let i = 0; i < selectTag3.current.childNodes.length; i++) {
            if (selectTag3.current.childNodes[i].selected) {
                selectTag3.current.id = selectTag3.current.childNodes[i].id
            }
        }
        for (let i = 0; i < selectTag4.current.childNodes.length; i++) {
            if (selectTag4.current.childNodes[i].selected) {
                selectTag4.current.id = selectTag4.current.childNodes[i].id
            }
        }
        if (
            selectTag1.current.id === selectTag2.current.id ||
            selectTag1.current.id === selectTag3.current.id ||
            selectTag1.current.id === selectTag4.current.id ||
            selectTag2.current.id === selectTag3.current.id ||
            selectTag2.current.id === selectTag4.current.id ||
            selectTag3.current.id === selectTag4.current.id
        ) {
            return alert("Four different categories must be selected")
        }
        let IdList = [
            selectTag1.current.id,
            selectTag2.current.id,
            selectTag3.current.id,
            selectTag4.current.id,
        ]
        let filesArray = [file1[0], file2[0], file3[0], file4[0]]
        IdList.forEach((id) => formData.append("categories", id))
        filesArray.forEach((image) => formData.append("file", image))

        dispatch(createSplitCategory({ formData, token }))
    }

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className={styles["admin-add-online"]}>
                    <div className={styles["add-online-head"]}>
                        <h2>
                            <u>ADD PRODUCTS TO ONLINE STORE</u>
                        </h2>
                        <div className={styles["admin-dropdown"]}>
                            <div
                                className={styles["dropdown-head"]}
                                onClick={handleDropdown}
                            >
                                <div>Menu</div>
                                <FontAwesomeIcon icon={faArrowDown} />
                            </div>
                            {dropdown ? (
                                <div
                                    className={styles["dropdown-options-open"]}
                                >
                                    <Link
                                        href={{
                                            pathname: "/admin/create-product",
                                        }}
                                    >
                                        <div>Create product</div>
                                    </Link>
                                    <Link
                                        href={{ pathname: "/admin/inventory" }}
                                    >
                                        <div>Inventory Control</div>
                                    </Link>
                                    <Link
                                        href={{
                                            pathname: "/admin/add-product",
                                        }}
                                    >
                                        <div>Add product to online store</div>
                                    </Link>
                                    <Link
                                        href={{
                                            pathname: "/admin/create-category",
                                        }}
                                    >
                                        <div>Create Category</div>
                                    </Link>
                                    <div onClick={() => dispatch(logout())}>
                                        Log out
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div
                        encType="multipart/form-data"
                        className={styles["add-split-category"]}
                        id="tab4"
                    >
                        <div className={styles["section-container"]}>
                            <div className={styles["category-cont"]}>
                                <label>Select Category</label>
                                <select ref={selectTag1}>
                                    {categorySelect}
                                </select>
                            </div>
                            <input
                                onChange={(e) => setFile1(e.target.files)}
                                accept=".jpg, .jpeg, .png, .svg, .jfif"
                                type="file"
                            />
                        </div>
                        <div className={styles["section-container"]}>
                            <div className={styles["category-cont"]}>
                                <label>Select Category</label>
                                <select ref={selectTag2}>
                                    {categorySelect}
                                </select>
                            </div>
                            <input
                                onChange={(e) => setFile2(e.target.files)}
                                accept=".jpg, .jpeg, .png, .svg, .jfif"
                                type="file"
                            />
                        </div>
                        <div className={styles["section-container"]}>
                            <div className={styles["category-cont"]}>
                                <label>Select Category</label>
                                <select ref={selectTag3}>
                                    {categorySelect}
                                </select>
                            </div>
                            <input
                                onChange={(e) => setFile3(e.target.files)}
                                accept=".jpg, .jpeg, .png, .svg, .jfif"
                                type="file"
                            />
                        </div>
                        <div className={styles["section-container"]}>
                            <div className={styles["category-cont"]}>
                                <label>Select Category</label>
                                <select ref={selectTag4}>
                                    {categorySelect}
                                </select>
                            </div>
                            <input
                                onChange={(e) => setFile4(e.target.files)}
                                accept=".jpg, .jpeg, .png, .svg, .jfif"
                                type="file"
                            />
                        </div>
                        <div className={styles["back-done"]}>
                            <div
                                onClick={() => router.back()}
                                className={styles["confirm-btn"]}
                            >
                                {"<<"} Back
                            </div>
                            <button
                                type="button"
                                onClick={(e) => addSplitCategoryTab(e)}
                                className={styles["confirm-btn"]}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
