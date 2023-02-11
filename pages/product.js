import {
    faFacebook,
    faInstagram,
    faTwitter,
    faWhatsapp,
} from "@fortawesome/free-brands-svg-icons"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LoadingSpinner } from "../components/Loading"
import { updateCart } from "../redux/storeReducer"
import { markFavorites, unmarkFavorites } from "../redux/userReducer"
import styles from "../styles/css/Product.module.css"

export default function Product() {
    const [loading, setLoading] = useState(false)
    const { user, favorites } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const router = useRouter()
    const product = router.query
    const favButton = useRef()
    const internationalNumberFormat = new Intl.NumberFormat("en-US")

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    function addToCart(product) {
        let items = localStorage.getItem("cart") || "{}"
        items = JSON.parse(items)

        const { name, price, quantity } = product
        if (quantity < 1) {
            return alert("Product is out of stock")
        }
        const id = product._id
        const image =
            product.images?.length > 0 ? product.images[0].filePath : ""
        if (items[id]) {
            items[id].productQuantity += 1
        } else {
            const productQuantity = 1
            items[id] = {
                id: id,
                name: name,
                price: price,
                productQuantity: productQuantity,
                image: image,
            }
        }
        dispatch(updateCart(items))
        alert("Your Item has been added to the Cart")
    }

    async function addFavorites(id) {
        const token = localStorage.getItem("token")
        if (!user) {
            return alert("User must be signed in")
        }

        const data = { token, id }

        if (favorites.includes(id)) {
            dispatch(unmarkFavorites(data))
        } else {
            dispatch(markFavorites(data))
        }
    }

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className={styles["product"]}>
                        <div className={styles["product-container"]}>
                            <div className={styles["container-flex"]}>
                                <img
                                    src={product.image}
                                    className={styles["product-img"]}
                                    alt={`${product.name}`}
                                />
                                <div className={styles["product-info"]}>
                                    <h3 className={styles["product-name"]}>
                                        {product.name}
                                    </h3>
                                    <p style={{ opacity: "75%" }}>
                                        Product Code :{" "}
                                        <span>{product._id}</span>
                                    </p>
                                    <p style={{ opacity: "75%" }}>
                                        Brand : <span>No brand specified</span>
                                    </p>
                                    <p className={styles["out-of-stock"]}>
                                        {product.quantity < 1
                                            ? "Out of Stock"
                                            : null}
                                    </p>
                                    <h2 className={styles["product-price"]}>
                                        ₦
                                        {internationalNumberFormat.format(
                                            product.price
                                        )}
                                    </h2>
                                    <div className={styles["fav-cart"]}>
                                        <button
                                            onClick={(e) => addToCart(product)}
                                            className={styles["cart"]}
                                        >
                                            <FontAwesomeIcon
                                                icon={faShoppingCart}
                                            />{" "}
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={(e) =>
                                                addFavorites(product._id)
                                            }
                                            className={
                                                user &&
                                                favorites?.includes(product._id)
                                                    ? styles["marked"]
                                                    : styles["unmarked"]
                                            }
                                            ref={favButton}
                                        >
                                            <FontAwesomeIcon icon={faHeart} />
                                        </button>
                                    </div>
                                    <div className={styles["share"]}>
                                        <h4>Share this product:</h4>
                                        <div>
                                            <FontAwesomeIcon
                                                className={styles["social"]}
                                                icon={faInstagram}
                                            />
                                            <FontAwesomeIcon
                                                className={styles["social"]}
                                                icon={faFacebook}
                                            />
                                            <FontAwesomeIcon
                                                className={styles["social"]}
                                                icon={faTwitter}
                                            />
                                            <FontAwesomeIcon
                                                className={styles["social"]}
                                                icon={faWhatsapp}
                                            />
                                        </div>
                                    </div>
                                    <p className={styles["report"]}>
                                        Report incorrect product information
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles["description"]}>
                            <h4>Product Details</h4>
                            <div>
                                <span style={{ fontWeight: "bold" }}>
                                    About: &nbsp;
                                </span>
                                {product.description !== ""
                                    ? product.description
                                    : "No description available for this product"}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
