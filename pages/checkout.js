import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LoadingSpinner } from "../components/Loading"
import { verifyUser } from "../redux/userReducer"
import { PaystackButton } from "react-paystack"
import styles from "../styles/css/Checkout.module.css"

export default function Checkout() {
    const [cartItems, setCartItems] = useState([])
    const { cart, totalPrice } = useSelector((state) => state.store)
    const { user, loading, username } = useSelector((state) => state.user)
    const router = useRouter()
    const internationalNumberFormat = new Intl.NumberFormat("en-US")
    const dispatch = useDispatch()

    const publicKey = "pk_test_3c3583c8828234ac6d37ac46ac17bcbca3f672bd"

    const componentProps = {
        email: "example@gmail.com",
        amount: totalPrice * 100,
        metadata: {
            name: username,
        },
        publicKey,
        text: "Checkout",
        // onSuccess: () => pay()
    }

    useEffect(() => {
        console.log(totalPrice)
        const token = localStorage.getItem("token")
        dispatch(verifyUser(token))
        setCartItems(cart) // to bypass next js hydration error
    }, [])

    useEffect(() => {
        if (!user) {
            router.push("/")
        }
    }, [user])

    const checkoutItems = cartItems.map((item) => {
        let priceNumber = item.price.toString()
        priceNumber = priceNumber.replaceAll(",", "")
        priceNumber = Number(priceNumber)
        let productTotal = priceNumber * item.productQuantity
        return (
            <div className={styles["checkout-product"]} key={item.id}>
                <div className={styles["product-container"]}>
                    <img src={item.image} alt={item.name} />
                    <div className={styles["checkout-product-body"]}>
                        <div className={styles["checkout-product-name"]}>
                            {item.name}
                        </div>
                        <div className={styles["checkout-quantity-price"]}>
                            <p>Qty : {item.productQuantity}</p>
                            <p className={styles["price"]}>
                                Price : ₦
                                {internationalNumberFormat.format(item.price)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles["product-total"]}>
                    ₦{internationalNumberFormat.format(productTotal)}
                </div>
            </div>
        )
    })

    if (cartItems.length < 1) {
        return <h1 style={{ marginTop: "20vh" }}>No items in Cart</h1>
    }
    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className={styles["checkout-page"]}>
                    <h1>Checkout</h1>
                    <div className={styles["checkout-container"]}>
                        <div className={styles["item-total"]}>
                            <div className={styles["item"]}>ITEM</div>
                            <div className={styles["total"]}>TOTAL</div>
                        </div>
                        <div className={styles["checkout-item-container"]}>
                            {checkoutItems}
                        </div>
                        <div className={styles["subtotal"]}>
                            <h2>
                                Subtotal :{" "}
                                <span className={styles["price"]}>
                                    ₦
                                    {internationalNumberFormat.format(
                                        totalPrice
                                    )}
                                </span>
                            </h2>
                            <PaystackButton
                                className={styles["checkout-btn"]}
                                {...componentProps}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
