import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateCart } from "../redux/storeReducer"
import {
    markFavorites,
    unmarkFavorites,
    verifyUser,
} from "../redux/userReducer"
import styles from "../styles/css/Home.module.css"
import Link from "next/link"

export function Card(props) {
    const dispatch = useDispatch()
    const { user, favorites } = useSelector((state) => state.user)
    const favButton = useRef()

    let internationalNumberFormat = new Intl.NumberFormat("en-US")
    function addToCart() {
        let items = localStorage.getItem("cart") || "{}"
        items = JSON.parse(items)

        const { name, price, quantity } = props.item
        if (quantity < 1) {
            return alert("Product is out of stock")
        }
        const id = props.item._id
        const image = props.item.images[0].filePath
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

    function addFavorites(id) {
        const token = localStorage.getItem("token")
        dispatch(verifyUser(token))
        if (!user) return alert("User must be logged in")
        const data = { token, id }
        if (favorites.includes(id)) {
            dispatch(unmarkFavorites(data))
        } else {
            dispatch(markFavorites(data))
        }
    }

    const linkProps = {
        _id: props.item._id,
        name: props.item.name,
        price: props.item.price,
        image: props.item.images[0].filePath,
        tags: props.item.tags,
        description: props.item.description,
        quantity: props.item.quantity,
    }

    return (
        <div className={styles["product-card"]}>
            <div className={styles["fav-cart"]}>
                <FontAwesomeIcon
                    onClick={() => addFavorites(props.item._id)}
                    icon={faHeart}
                    className={
                        user && favorites.includes(props.item._id)
                            ? styles["marked"]
                            : styles["unmarked"]
                    }
                    ref={favButton}
                />
                <FontAwesomeIcon
                    onClick={addToCart}
                    icon={faShoppingCart}
                    className={styles["unmarked"]}
                />
            </div>
            <Link href={{ pathname: "/product", query: linkProps }}>
                <img
                    alt={`pic of ${props.item.name}`}
                    src={
                        props.item.images?.length > 0
                            ? props.item.images[0].filePath
                            : ""
                    }
                    className={styles["product-card-img"]}
                ></img>
            </Link>
            <Link
                href={{ pathname: "/product", query: linkProps }}
                style={{ textDecoration: "none" }}
            >
                <div className={styles["product-card-body"]}>
                    <p className={styles["product-card-name"]}>
                        {props.item.name}
                    </p>
                    <p className={styles["product-card-price"]}>
                        ₦{internationalNumberFormat.format(props.item.price)}
                    </p>
                    <p style={{ color: "grey", opacity: "60%" }}>
                        {props.item.quantity < 1 ? "Out of stock" : null}
                    </p>
                </div>
            </Link>
        </div>
    )
}
