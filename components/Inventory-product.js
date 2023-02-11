import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBan } from "@fortawesome/free-solid-svg-icons"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import styles from "../styles/css/Admin-inventory.module.css"
import { deleteProduct, updateQuantity } from "../redux/storeReducer"

export function InventoryProduct(props) {
    const { admin } = useSelector((state) => state.user)
    const { error } = useSelector((state) => state.store)
    const router = useRouter()
    const dispatch = useDispatch()
    const [inputQuantity, setInputQuantity] = useState(0)
    const inputBoxValue = useRef()
    const quantityTag = useRef()
    let internationalNumberFormat = new Intl.NumberFormat("en-US")

    function UpdateQuanity() {
        const token = localStorage.getItem("token")
        if (!admin) {
            router.push("/")
            return alert("Admin must be logged in")
        }

        if (
            inputQuantity >= 0 &&
            inputQuantity <= 100 &&
            inputQuantity !== ""
        ) {
            let body = {
                id: props.item._id,
                quantity: Number(inputQuantity),
            }
            dispatch(updateQuantity({ token, body }))

            if (!error) {
                inputBoxValue.current.value = ""
                quantityTag.current.innerText = inputQuantity
            }
        } else if (inputQuantity > 100) {
            inputBoxValue.current.value = ""
            alert("A maximum of 100 products can be added to the inventory")
        } else if (inputQuantity < 0) {
            inputBoxValue.current.value = ""
            alert("Negative numbers not allowed")
        } else if (isNaN(inputQuantity)) {
            inputBoxValue.current.value = ""
            alert("Only numbers allowed")
        }
    }

    function DeleteProduct() {
        const token = localStorage.getItem("token")
        if (!admin) {
            router.push("/")
            return alert("Admin must be logged in")
        }

        dispatch(deleteProduct({ token, id: props.item._id }))
    }

    return (
        <div className={styles["inventory-product"]}>
            <div className={styles["inventory-img-name"]}>
                <img
                    src={props.item.images[0].filePath}
                    alt={props.item.name}
                />
                <p>{props.item.name}</p>
            </div>
            <div className={styles["inventory-quantity"]}>
                <span ref={quantityTag}>{props.item.quantity}</span>
                <div className={styles["inventory-quantity-control"]}>
                    <input
                        onChange={(e) => setInputQuantity(e.target.value)}
                        ref={inputBoxValue}
                        type="number"
                        min="0"
                        max="100"
                    />
                    <button onClick={UpdateQuanity}>Update</button>
                </div>
            </div>
            <div className={styles["inventory-price"]}>
                ₦{internationalNumberFormat.format(props.item.price)}
            </div>
            <div className={styles["inventory-action"]}>
                <div
                    className={styles["inventory-delete"]}
                    onClick={DeleteProduct}
                >
                    <FontAwesomeIcon icon={faBan} />
                    <p>Delete</p>
                </div>
            </div>
        </div>
    )
}
