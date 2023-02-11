import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import styles from "../../styles/css/Admin-create-product.module.css"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { createProduct, logout, verifyUser } from "../../redux/userReducer"
import { useRouter } from "next/router"
import { LoadingSpinner } from "../../components/Loading"

export default function AdminCreateProduct() {
    const { admin } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const router = useRouter()
    const [dropdown, setDropdown] = useState(false)
    const [filestate, setFileState] = useState([])
    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productTag, setProductTag] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const form = useRef()
    const formData = new FormData()

    useEffect(() => {
        const token = localStorage.getItem("token") || null
        dispatch(verifyUser(token))
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    useEffect(() => {
        if (!admin) router.push("/")
    }, [])

    function handleDropdown() {
        if (dropdown) setDropdown(false)
        else setDropdown(true)
    }

    function CreateProduct(e) {
        e.preventDefault()
        const token = localStorage.getItem("token")
        if (!admin) {
            router.push("/")
            return alert("Admin must be logged in")
        }

        if (
            productName.length < 1 ||
            productPrice.length < 1 ||
            filestate.length < 1
        ) {
            return alert(
                "A product should at least have a valid name, price and image(s)"
            )
        } else if (isNaN(productPrice)) {
            return alert("Price must be valid number")
        } else if (filestate.length > 5) {
            return alert("Only a maximum of 5 images can be added to a product")
        }

        formData.append("name", productName)
        formData.append("price", productPrice)
        let tagsArray = productTag.split(",")
        tagsArray.forEach((tag) => {
            tag = tag.trim()
            formData.append("tags", tag)
        })
        formData.append("description", productDescription)
        for (const file of filestate) {
            formData.append("file", file)
        }

        dispatch(createProduct({ formData, token }))
        form.current?.reset()
    }

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className={styles["admin-create-product"]}>
                    <div className={styles["create-head"]}>
                        <h2>
                            <u>CREATE PRODUCT</u>
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
                    <div className={styles["create-inputs"]}>
                        <form ref={form} encType="multipart/form-data">
                            <div className={styles["create-product-input"]}>
                                <h6>Enter Product Name : </h6>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setProductName(e.target.value)
                                    }
                                />
                            </div>
                            <div className={styles["create-product-input"]}>
                                <h6>Enter Product Price(₦) : </h6>
                                <input
                                    type="number"
                                    onChange={(e) =>
                                        setProductPrice(e.target.value)
                                    }
                                />
                            </div>
                            <div className={styles["create-product-input"]}>
                                <div className={styles["create-product-tags"]}>
                                    <h6>Enter Product Tag(s) : </h6>
                                    <p>
                                        Tags should be seperated by a comma ' ,
                                        '
                                    </p>
                                </div>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setProductTag(e.target.value)
                                    }
                                />
                            </div>
                            <div className={styles["create-product-input"]}>
                                <h6>Enter Product Description : </h6>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setProductDescription(e.target.value)
                                    }
                                />
                            </div>
                            <input
                                onChange={(e) => setFileState(e.target.files)}
                                accept=".jpg, .jpeg, .png, .svg, .jfif"
                                className="image-upload"
                                multiple
                                type="file"
                                name="files"
                            />
                            <button
                                type="button"
                                onClick={(e) => CreateProduct(e)}
                                className={styles["create-submit"]}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
