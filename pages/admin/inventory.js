import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { InventoryProduct } from "../../components/Inventory-product"
import { LoadingSpinner } from "../../components/Loading"
import { logout, verifyUser } from "../../redux/userReducer"
import styles from "../../styles/css/Admin-inventory.module.css"

export default function Inventory() {
    const { admin } = useSelector((state) => state.user)
    const { items } = useSelector((state) => state.store)
    const [dropdown, setDropdown] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        dispatch(verifyUser(token))
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, [])

    useEffect(() => {
        if (!admin) {
            router.push("/")
        }
    }, [admin])

    function handleDropdown() {
        if (dropdown) setDropdown(false)
        else setDropdown(true)
    }

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className={styles["admin-inventory"]}>
                    <div className={styles["admin-head"]}>
                        <h2>
                            <u>INVENTORY</u>
                        </h2>
                        <input
                            onChange={(e) => setSearchValue(e.target.value)}
                            className={styles["admin-inventory-search"]}
                            placeholder="Search products in inventory"
                        />
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

                    <div className={styles["admin-inventory-body"]}>
                        <div className={styles["admin-inventory-head"]}>
                            <div className={styles["admin-inventory-item"]}>
                                <h4>ITEM</h4>
                            </div>
                            <div className={styles["admin-inventory-quantity"]}>
                                <h4>QUANTITY</h4>
                            </div>
                            <div className={styles["admin-inventory-price"]}>
                                <h4>PRICE</h4>
                            </div>
                            <div
                                className={styles["admin-inventory-action"]}
                            ></div>
                        </div>
                        <div className={styles["admin-inventory-products"]}>
                            {searchValue.length < 1
                                ? items.map((item) => {
                                      return (
                                          <InventoryProduct
                                              key={item._id}
                                              item={item}
                                          />
                                      )
                                  })
                                : items.map((item) => {
                                      return item.name
                                          .toLowerCase()
                                          .includes(
                                              searchValue.toLowerCase()
                                          ) ? (
                                          <InventoryProduct
                                              key={item._id}
                                              item={item}
                                          />
                                      ) : null
                                  })}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
