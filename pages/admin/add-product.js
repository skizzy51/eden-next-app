import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LoadingSpinner } from "../../components/Loading"
import {
    addNormalCategoryTab,
    addNormalProductTab,
    addSplitProductTab,
    logout,
    verifyUser,
} from "../../redux/userReducer"
import styles from "../../styles/css/Admin-add-product.module.css"

export default function AddProduct() {
    const internationalNumberFormat = new Intl.NumberFormat("en-US")
    const { admin } = useSelector((state) => state.user)
    const { items, categories } = useSelector((state) => state.store)
    const dispatch = useDispatch()
    const router = useRouter()
    const [dropdown, setDropdown] = useState(false)
    const dropdownOptions = useRef()
    const addProductHome = useRef()
    const addNormalProduct = useRef()
    const addSplitProduct = useRef()
    const addNormalCategory = useRef()
    const radio1 = useRef()
    const radio2 = useRef()
    const radio3 = useRef()
    const radio4 = useRef()
    const selectTag = useRef()
    const inputCheckbox = useRef()
    const [selectedArray, setSelectedArray] = useState([])
    const [selectedArray1, setSelectedArray1] = useState([])
    const [selectedArray2, setSelectedArray2] = useState([])
    const [normalProductTabName, setNormalProductTabName] = useState("")
    const [splitProductTabName1, setSplitProductTabName1] = useState("")
    const [splitProductTabName2, setSplitProductTabName2] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        dispatch(verifyUser(token))
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, [])

    useEffect(() => {
        if (!admin) router.push("/")
    }, [admin])

    function Logout() {
        dispatch(logout())
    }

    function handleDropdown() {
        if (dropdown) setDropdown(false)
        else setDropdown(true)
    }

    function selectItem(e, item) {
        if (e.target.parentElement.parentElement.id === "one") {
            if (e.target.checked === true) {
                setSelectedArray((prevArray) => [
                    ...prevArray,
                    { id: item._id, name: item.name },
                ])
            } else if (e.target.checked === false) {
                selectedArray.forEach((element) => {
                    if (element.id === item._id) {
                        let filteredArray = selectedArray.filter(function (
                            value
                        ) {
                            return value !== element
                        })
                        setSelectedArray((prevArray) => filteredArray)
                    }
                })
            }
        } else if (e.target.parentElement.parentElement.id === "two") {
            if (e.target.checked === true) {
                setSelectedArray1((prevArray) => [
                    ...prevArray,
                    { id: item._id, name: item.name },
                ])
            } else if (e.target.checked === false) {
                selectedArray1.forEach((element) => {
                    if (element.id === item._id) {
                        let filteredArray = selectedArray1.filter(function (
                            value
                        ) {
                            return value !== element
                        })
                        setSelectedArray1((prevArray) => filteredArray)
                    }
                })
            }
        } else if (e.target.parentElement.parentElement.id === "three") {
            if (e.target.checked === true) {
                setSelectedArray2((prevArray) => [
                    ...prevArray,
                    { id: item._id, name: item.name },
                ])
            } else if (e.target.checked === false) {
                selectedArray2.forEach((element) => {
                    if (element.id === item._id) {
                        let filteredArray = selectedArray2.filter(function (
                            value
                        ) {
                            return value !== element
                        })
                        setSelectedArray2((prevArray) => filteredArray)
                    }
                })
            }
        }
    }

    const inventory = items?.map((item) => {
        return (
            <div
                key={item._id}
                id={item._id}
                className={styles["add-online-product"]}
            >
                <img src={item.images[0].filePath} alt={item.name} />
                <p>{item.name}</p>
                <span>₦{internationalNumberFormat.format(item.price)}</span>
                <input
                    type="checkbox"
                    onClick={(e) => {
                        selectItem(e, item)
                    }}
                    ref={inputCheckbox}
                />
            </div>
        )
    })

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

    const selectedItems = selectedArray?.map((item) => {
        return <li key={item.id}>{item.name}</li>
    })
    const selectedItems1 = selectedArray1?.map((item) => {
        return <li key={item.id}>{item.name}</li>
    })
    const selectedItems2 = selectedArray2?.map((item) => {
        return <li key={item.id}>{item.name}</li>
    })

    function next() {
        if (radio1.current.checked) {
            addProductHome.current.style.display = "none"
            addProductHome.current.style.right = "100%"
            addNormalProduct.current.style.display = "block"
            addNormalProduct.current.style.left = "0"
        } else if (radio2.current.checked) {
            addProductHome.current.style.display = "none"
            addProductHome.current.style.right = "100%"
            addSplitProduct.current.style.display = "block"
            addSplitProduct.current.style.left = "0"
        } else if (radio3.current.checked) {
            addProductHome.current.style.display = "none"
            addProductHome.current.style.right = "100%"
            addNormalCategory.current.style.display = "block"
            addNormalCategory.current.style.left = "0"
        } else if (radio4.current.checked) {
            router.push("/admin/create-split-category")
        }
    }

    function back(e) {
        if (e.target.parentElement.parentElement.id === "tab1") {
            addProductHome.current.style.display = "block"
            addProductHome.current.style.right = "0"
            addNormalProduct.current.style.display = "none"
            addNormalProduct.current.style.left = "100%"
            document
                .querySelectorAll('input[type="checkbox"]:checked')
                .forEach((input) => {
                    input.checked = false
                })
            setSelectedArray([])
        } else if (e.target.parentElement.parentElement.id === "tab2") {
            addProductHome.current.style.display = "block"
            addProductHome.current.style.right = "0"
            addSplitProduct.current.style.display = "none"
            addSplitProduct.current.style.left = "100%"
            document
                .querySelectorAll('input[type="checkbox"]:checked')
                .forEach((input) => {
                    input.checked = false
                })
            setSelectedArray1([])
            setSelectedArray2([])
        } else if (e.target.parentElement.parentElement.id === "tab3") {
            addProductHome.current.style.display = "block"
            addProductHome.current.style.right = "0"
            addNormalCategory.current.style.display = "none"
            addNormalCategory.current.style.left = "100%"
        }
    }

    function AddNormalProductTab() {
        const token = localStorage.getItem("token")
        if (normalProductTabName.length < 1) {
            return alert("Tab must have a header/name")
        }
        if (selectedArray.length < 1) {
            return alert("A product must be selected")
        }
        let tabItems = []
        selectedArray.forEach((item) => {
            tabItems.push(item.id)
        })
        let data = {
            tabName: normalProductTabName,
            items: tabItems,
        }

        dispatch(addNormalProductTab({ data, token }))
    }

    function AddSplitProductTab() {
        const token = localStorage.getItem("token")
        if (
            splitProductTabName1.length < 1 ||
            splitProductTabName2.length < 1
        ) {
            return alert("Both tabs must have a tabName")
        } else if (selectedArray1.length < 4 || selectedArray2.length < 4) {
            return alert("At least 4 products must be selected on each tab")
        } else if (selectedArray1.length > 12 || selectedArray2.length > 12) {
            return alert(
                "A maximum of 12 products must be selected on each tab"
            )
        }
        let tabItems1 = []
        let tabItems2 = []
        selectedArray1.forEach((item) => {
            tabItems1.push(item.id)
        })
        selectedArray2.forEach((item) => {
            tabItems2.push(item.id)
        })
        let data = {
            tab1: {
                tabName: splitProductTabName1,
                items: tabItems1,
            },
            tab2: {
                tabName: splitProductTabName2,
                items: tabItems2,
            },
        }

        dispatch(addSplitProductTab({ data, token }))
    }

    function AddNormalCategoryTab() {
        const token = localStorage.getItem("token")
        for (let i = 0; i < selectTag.current.childNodes.length; i++) {
            if (selectTag.current.childNodes[i].selected === true) {
                selectTag.current.id = selectTag.current.childNodes[i].id
            }
        }
        if (selectTag.current.value.length > 0) {
            dispatch(addNormalCategoryTab({ id: selectTag.current.id, token }))
        } else {
            return alert("Category must be selected")
        }
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
                                    ref={dropdownOptions}
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
                                    <div onClick={Logout}>Log out</div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div
                        className={styles["add-online-cont"]}
                        ref={addProductHome}
                    >
                        <h1>Select A Tab Type</h1>
                        <div className={styles["tab-container"]}>
                            <label
                                htmlFor="normal-product"
                                className={styles["add-product-tab"]}
                            >
                                <input
                                    type="radio"
                                    id="normal-product"
                                    name="radio-btn"
                                    ref={radio1}
                                />
                                <h4>Normal Product Tab</h4>
                                <img src="/normal product tab.svg" alt="tab" />
                                <span>
                                    Basic Tab showing group of products in
                                    horizontal order from left to right with a
                                    tab header
                                </span>
                            </label>
                            <label
                                htmlFor="split-product"
                                className={styles["add-product-tab1"]}
                            >
                                <input
                                    type="radio"
                                    id="split-product"
                                    name="radio-btn"
                                    ref={radio2}
                                />
                                <h4>Split Product Tab</h4>
                                <img
                                    src="/split product tab.svg"
                                    alt="tab"
                                    className={styles["bigger-img"]}
                                />
                                <span>
                                    Multi-purpose tabs showing a variety of
                                    products which could also be used for
                                    showing products in a category. Can be used
                                    a maximum of two times
                                </span>
                            </label>
                            <label
                                htmlFor="normal-category"
                                className={styles["add-product-tab"]}
                            >
                                <input
                                    type="radio"
                                    id="normal-category"
                                    name="radio-btn"
                                    ref={radio3}
                                />
                                <h4>Normal Category Tab</h4>
                                <img src="/category tab.svg" alt="tab" />
                                <span>
                                    Tab showing group of categories with a
                                    category name as the Tab Name
                                </span>
                            </label>
                            <label
                                htmlFor="split-category"
                                className={styles["add-product-tab1"]}
                            >
                                <input
                                    type="radio"
                                    id="split-category"
                                    name="radio-btn"
                                    ref={radio4}
                                />
                                <h4>Split Category Tab</h4>
                                <img
                                    src="/split category tab.svg"
                                    alt="tab"
                                    className={styles["smaller-img"]}
                                />
                                <span>
                                    Category Tab. Can only be used once in a
                                    page
                                </span>
                            </label>
                        </div>
                        <div className={styles["tab-next"]} onClick={next}>
                            Next {">>"}
                        </div>
                    </div>

                    <div
                        className={styles["add-normal-product"]}
                        ref={addNormalProduct}
                        id="tab1"
                    >
                        <div className={styles["tab-header"]}>
                            <h4>Enter Tab Name / Header : </h4>
                            <input
                                type="text"
                                onChange={(e) =>
                                    setNormalProductTabName(e.target.value)
                                }
                            />
                        </div>
                        <div className={styles["tab-container"]}>
                            <div className={styles["inventory-products"]}>
                                <div
                                    className={styles["product-cont"]}
                                    id="one"
                                >
                                    {inventory}
                                </div>
                            </div>
                            <ol className={styles["selected-products"]}>
                                {selectedItems}
                            </ol>
                        </div>
                        <div className={styles["back-done"]}>
                            <div
                                onClick={(e) => {
                                    back(e)
                                }}
                                className={styles["confirm-btn"]}
                            >
                                {"<<"} Back
                            </div>
                            <div
                                onClick={AddNormalProductTab}
                                className={styles["confirm-btn"]}
                            >
                                Done
                            </div>
                        </div>
                    </div>

                    <div
                        className={styles["add-split-product"]}
                        ref={addSplitProduct}
                        id="tab2"
                    >
                        <div className={styles["tab-container"]}>
                            <div className={styles["tab"]}>
                                <div className={styles["tab-header"]}>
                                    <h5>Enter Tab Name / Header : </h5>
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setSplitProductTabName1(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className={styles["inventory-products"]}>
                                    <div
                                        className={styles["product-cont"]}
                                        id="two"
                                    >
                                        {inventory}
                                    </div>
                                    <div
                                        className={styles["selected-products"]}
                                    >
                                        {selectedItems1}
                                    </div>
                                </div>
                            </div>
                            <div className={styles["tab"]}>
                                <div className={styles["tab-header"]}>
                                    <h5>Enter Tab Name / Header : </h5>
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setSplitProductTabName2(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className={styles["inventory-products"]}>
                                    <div
                                        className={styles["product-cont"]}
                                        id="three"
                                    >
                                        {inventory}
                                    </div>
                                    <div
                                        className={styles["selected-products"]}
                                    >
                                        {selectedItems2}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles["back-done"]}>
                            <div
                                onClick={(e) => {
                                    back(e)
                                }}
                                className={styles["confirm-btn"]}
                            >
                                {"<<"} Back
                            </div>
                            <div
                                onClick={AddSplitProductTab}
                                className={styles["confirm-btn"]}
                            >
                                Done
                            </div>
                        </div>
                    </div>

                    <div
                        className={styles["add-normal-category"]}
                        ref={addNormalCategory}
                        id="tab3"
                    >
                        <h4>
                            Enter Tab Name by selecting one of the existing
                            categories. The rest will be handled for you.
                        </h4>
                        <select ref={selectTag}>{categorySelect}</select>
                        <div className={styles["back-done"]}>
                            <div
                                onClick={(e) => {
                                    back(e)
                                }}
                                className={styles["confirm-btn"]}
                            >
                                {"<<"} Back
                            </div>
                            <div
                                onClick={AddNormalCategoryTab}
                                className={styles["confirm-btn"]}
                            >
                                Done
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
