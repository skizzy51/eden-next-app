import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import styles from "../styles/css/App.module.css"
import { useDispatch, useSelector } from "react-redux"
import { closeCart, updateCart } from "../redux/storeReducer"
import { useRouter } from "next/router"
import { verifyUser } from "../redux/userReducer"

export function CartDropdown() {
    const dispatch = useDispatch()
    const { cart, totalPrice } = useSelector((state) => state.store)
    const { user } = useSelector((state) => state.user)
    let internationalNumberFormat = new Intl.NumberFormat("en-US")
    const router = useRouter()

    function CloseCart() {
        dispatch(closeCart())
    }

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

    function goToCheckoutPage() {
        const token = localStorage.getItem("token")
        dispatch(verifyUser(token))
        if (user) {
            router.push("/checkout")
        } else {
            return alert("User must be logged in")
        }
    }

    let cartItem = cart.map((item) => {
        return (
            <div key={item.id} className={styles["item"]}>
                <div className={styles["name-price"]}>
                    <span className={styles["name"]}>{item.name}</span>
                    <p className={styles["price"]}>
                        ₦{internationalNumberFormat.format(item.price)}
                    </p>
                </div>
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
                <FontAwesomeIcon
                    onClick={() => deleteCart(item.id)}
                    className={styles["delete"]}
                    icon={faTimes}
                />
            </div>
        )
    })

    if (
        router.pathname === "/checkout" ||
        router.pathname === "/sign-in" ||
        router.pathname === "/cart" ||
        router.pathname === "/admin" ||
        router.pathname === "/admin-inventory" ||
        router.pathname === "/admin-create-product" ||
        router.pathname === "/admin-add-product" ||
        router.pathname === "/admin-create-split-category" ||
        router.pathname === "/admin-create-category"
    )
        return null

    return (
        <div style={{ position: "relative" }}>
            <div className={styles["cart-menu"]}>
                <div className={styles["cart-menu-head"]}>
                    <h5>Your Products</h5>
                    <FontAwesomeIcon onClick={CloseCart} icon={faTimes} />
                </div>
                <hr />
                <div className={styles["item-container"]}>{cartItem}</div>
                <div className={styles["total"]}>
                    <h4>TOTAL : </h4>
                    <h4 className={styles["price"]}>
                        ₦{internationalNumberFormat.format(totalPrice)}
                    </h4>
                </div>
                <div className={styles["cart-actions"]}>
                    <button
                        onClick={goToCheckoutPage}
                        className={styles["checkout"]}
                    >
                        Checkout
                    </button>
                    <button
                        onClick={() => router.push("cart")}
                        className={styles["view-cart"]}
                    >
                        View Cart
                    </button>
                </div>
            </div>
        </div>
    )
}
