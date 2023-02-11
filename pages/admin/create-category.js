import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LoadingSpinner } from "../../components/Loading"
import { createCategory, logout, verifyUser } from "../../redux/userReducer"
import styles from "../../styles/css/Admin-create-category.module.css"

export default function CreateCategory() {
    const internationalNumberFormat = new Intl.NumberFormat("en-US")
    const { admin } = useSelector((state) => state.user)
    const { items } = useSelector((state) => state.store)
    const dispatch = useDispatch()
    const router = useRouter()
    const [categoryName, setCategoryName] = useState("")
    const [dropdown, setDropdown] = useState(false)
    const [selectedArray, setSelectedArray] = useState([])
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
        if (e.target.checked === true) {
            setSelectedArray((prevArray) => [
                ...prevArray,
                { id: item._id, name: item.name },
            ])
        } else if (e.target.checked === false) {
            selectedArray.forEach((element) => {
                if (element.id === item._id) {
                    let filteredArray = selectedArray.filter(function (value) {
                        return value !== element
                    })
                    setSelectedArray(filteredArray)
                }
            })
        }
    }

    const selectedItems = selectedArray.map((item) => {
        return (
            <li key={item.id} id={item.id}>
                {item.name}
            </li>
        )
    })

    function CreateCategory() {
        const token = localStorage.getItem("token")
        dispatch(verifyUser(token))

        if (!admin) {
            router.push("/")
            return alert("Admin must be logged in")
        }
        if (categoryName.length < 1) {
            return alert("A category name must be added")
        } else if (selectedArray.length < 1) {
            return alert("A product must be selected")
        }
        let itemsArray = []
        selectedArray.forEach((item) => {
            itemsArray.push(item.id)
        })
        const data = {
            name: categoryName,
            items: itemsArray,
        }
        dispatch(createCategory({ data, token }))
    }

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className={styles["admin-category"]}>
                    <div className={styles["create-head"]}>
                        <h2>
                            <u>CREATE PRODUCT CATEGORIES</u>
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
                                    <div onClick={Logout}>Log out</div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className={styles["admin-create-category"]}>
                        <div className={styles["category-name"]}>
                            <h4>Enter Category Name : </h4>
                            <input
                                type="text"
                                onChange={(e) =>
                                    setCategoryName(e.target.value)
                                }
                            />
                        </div>
                        <div className={styles["category-products"]}>
                            <div className={styles["product-cont"]}>
                                {items?.map((item) => {
                                    return (
                                        <div
                                            key={item._id}
                                            id={item._id}
                                            className={
                                                styles["category-product"]
                                            }
                                        >
                                            <img
                                                src={item.images[0].filePath}
                                                alt={item.name}
                                            />
                                            <p>{item.name}</p>
                                            <span>
                                                ₦
                                                {internationalNumberFormat.format(
                                                    item.price
                                                )}
                                            </span>
                                            <input
                                                type="checkbox"
                                                defaultChecked={
                                                    selectedArray.includes({
                                                        id: item._id,
                                                        name: item.name,
                                                    })
                                                        ? true
                                                        : false
                                                }
                                                onClick={(e) => {
                                                    selectItem(e, item)
                                                }}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                            <ol className={styles["selected-cont"]}>
                                {selectedItems}
                            </ol>
                        </div>
                        <button onClick={CreateCategory}>Submit</button>
                    </div>
                </div>
            )}
        </>
    )
}
