import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LoadingSpinner } from "../../components/Loading"
import { logout, verifyUser } from "../../redux/userReducer"
import styles from "../../styles/css/Admin-page.module.css"

export default function Admin() {
    const { admin, loading } = useSelector((state) => state.user)
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!admin) {
            router.push("/")
        }
    }, [admin])

    useEffect(() => {
        const token = localStorage.getItem("token")
        dispatch(verifyUser(token))
    }, [])

    function Logout() {
        dispatch(logout())
    }

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className={styles["welcome-admin"]}>
                        <h1>
                            <u>Welcome Admin</u>
                        </h1>
                        <button
                            onClick={Logout}
                            className={styles["logout-show"]}
                        >
                            Log Out
                        </button>
                    </div>
                    <div className={styles["admin-dashboard"]}>
                        <h2>Choose your course of action</h2>
                        <div className={styles["dashboard-actions"]}>
                            <Link
                                href={{ pathname: "/admin/create-product" }}
                                className={styles["action-body"]}
                                style={{
                                    backgroundImage: "url(createProduct.png)",
                                }}
                            >
                                <h5>Create a Product</h5>
                            </Link>
                            <Link
                                href={{ pathname: "/admin/inventory" }}
                                className={styles["action-body"]}
                                style={{
                                    backgroundImage: "url(inventory.png)",
                                }}
                            >
                                <h5>Inventory</h5>
                            </Link>
                            <Link
                                href={{ pathname: "/admin/create-category" }}
                                className={styles["action-body"]}
                                style={{
                                    backgroundImage: "url(categories.png)",
                                }}
                            >
                                <h5>Create a Category</h5>
                            </Link>
                            <Link
                                href={{ pathname: "/admin/add-product" }}
                                className={styles["action-body"]}
                                style={{
                                    backgroundImage:
                                        "url(addToOnlineStore.png)",
                                }}
                            >
                                <h5>Add to online store home page</h5>
                            </Link>
                        </div>
                        <button
                            onClick={logout}
                            className={styles["logout-hide"]}
                        >
                            Log Out
                        </button>
                    </div>
                </>
            )}
        </>
    )
}
