import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import styles from "../styles/css/Cart.module.css"
import { LoadingSpinner } from "../components/Loading"
import { updateCart } from "../redux/storeReducer"
import { useDispatch, useSelector } from "react-redux"
import {
    markFavorites,
    unmarkFavorites,
    verifyUser,
} from "../redux/userReducer"
import { useRouter } from "next/router"

export default function Cart() {
    const { user, favorites } = useSelector((state) => state.user)
    const { cart, totalPrice } = useSelector((state) => state.store)
    const dispatch = useDispatch()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    // const [cartState, setCartState] = useState([])
    let internationalNumberFormat = new Intl.NumberFormat("en-US")

    useEffect(() => {
        // setCartState(cart)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    function increaseCart(id) {
        let items = localStorage.getItem("cart") || "{}"
        items = JSON.parse(items)
        if (items[id].productQuantity >= 50) return
        items[id].productQuantity += 1
        dispatch(updateCart(items))
    }

    function decreaseCart(id) {
        let items = localStorage.getItem("cart") || "{}"
        items = JSON.parse(items)
        if (items[id].productQuantity <= 1) return
        items[id].productQuantity -= 1
        dispatch(updateCart(items))
    }

    function deleteCart(id) {
        let items = localStorage.getItem("cart") || "{}"
        items = JSON.parse(items)
        delete items[id]
        dispatch(updateCart(items))
    }

    function addFavorites(id) {
        const token = localStorage.getItem("token")
        dispatch(verifyUser(token))
        if (!user) return alert("User must be logged in")
        const data = { token, id }
        dispatch(markFavorites(data))
    }

    function removeFavorites(id) {
        const token = localStorage.getItem("token")
        dispatch(verifyUser(token))
        if (!user) return alert("User must be logged in")
        const data = { token, id }
        dispatch(unmarkFavorites(data))
    }

    let cartItems = cart?.map((item) => {
        return (
            <div key={item.id} className={styles["items-container"]}>
                <div className={styles["item"]}>
                    <img src={item.image} alt={item.name} />
                    <div className={styles["item-text"]}>
                        <h5>{item.name}</h5>
                        <div className={styles["actions"]}>
                            {user && favorites.includes(item.id) ? (
                                <div
                                    onClick={() => removeFavorites(item.id)}
                                    className={[
                                        styles["marked"],
                                        styles["first"],
                                    ].join(" ")}
                                >
                                    <FontAwesomeIcon icon={faHeart} />
                                    <span>Remove from Favorites</span>
                                </div>
                            ) : (
                                <div
                                    onClick={() => addFavorites(item.id)}
                                    className={[
                                        styles["unmarked"],
                                        styles["first"],
                                    ].join(" ")}
                                >
                                    <FontAwesomeIcon icon={faHeart} />
                                    <span>Add to Favorites</span>
                                </div>
                            )}

                            <div className={styles["unmarked"]}>
                                <FontAwesomeIcon
                                    onClick={() => deleteCart(item.id)}
                                    icon={faTrashAlt}
                                />
                                <span>Remove</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles["price-quantity"]}>
                    <div className={styles["quantity-counter"]}>
                        <div className={styles["quantity"]}>
                            {item.productQuantity}
                        </div>
                        <div className={styles["quantity-control"]}>
                            <FontAwesomeIcon
                                onClick={() => increaseCart(item.id)}
                                className={styles["action"]}
                                icon={faPlus}
                            />
                            <FontAwesomeIcon
                                onClick={() => decreaseCart(item.id)}
                                className={styles["action"]}
                                icon={faMinus}
                            />
                        </div>
                    </div>

                    <p className={styles["price"]}>
                        ₦{internationalNumberFormat.format(item.price)}
                    </p>
                </div>
            </div>
        )
    })

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className={styles["cart-page"]}>
                        <h3 className={styles["head"]}>
                            <u>Cart</u>
                        </h3>
                        <div className={styles["cart-container"]}>
                            {cartItems}
                        </div>
                        <hr className={styles["d-none"]} />
                        <div className={styles["total-cont"]}>
                            <h4>TOTAL :&nbsp;</h4>
                            <h4 className={styles["total-price"]}>
                                {" "}
                                ₦{internationalNumberFormat.format(totalPrice)}
                            </h4>
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            if (user) router.push("/checkout")
                            else alert("User must be logged in")
                        }}
                        className={styles["cart-checkout"]}
                    >
                        Go to Checkout
                    </div>
                </>
            )}
        </>
    )
}
