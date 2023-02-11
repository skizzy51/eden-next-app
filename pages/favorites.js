import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LoadingSpinner } from "../components/Loading"
import { getFavorites, unmarkFavorites, verifyUser } from "../redux/userReducer"
import styles from "../styles/css/Favorite.module.css"

export default function Favorites() {
    const { user, loading, favoritesList } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        dispatch(verifyUser(token))
        dispatch(getFavorites(token))
    }, [])

    useEffect(() => {
        if (!user) {
            router.push("/")
        }
    }, [user])

    function removeFromFavorites(id) {
        const token = localStorage.getItem("token")
        dispatch(verifyUser(token))
        if (user) {
            dispatch(unmarkFavorites({ id, token }))
        } else {
            router.push("/")
            alert("User must be logged in")
        }
    }

    const favorites = favoritesList?.map((item) => {
        const linkProps = {
            _id: item._id,
            name: item.name,
            price: item.price,
            image: item.images[0].filePath,
            tags: item.tags,
            description: item.description,
            quantity: item.quantity,
        }
        return (
            <div key={item._id} className={styles["fav-item-cont"]}>
                <Link href={{ pathname: "/product", query: linkProps }}>
                    <img
                        src={
                            item.images?.length > 0
                                ? item.images[0].filePath
                                : ""
                        }
                        alt={item.name}
                    />
                    <p>{item.name}</p>
                </Link>
                <button onClick={(e) => removeFromFavorites(item._id)}>
                    Remove Item
                </button>
            </div>
        )
    })
    return (
        <div style={{ backgroundColor: "rgb(216, 216, 216)" }}>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className={styles["account"]}>
                    <div className={styles["favorites"]}>
                        {favoritesList.length < 1 ? (
                            <h2>You have no favorite items</h2>
                        ) : (
                            favorites
                        )}
                    </div>
                    <div className={styles["account-menu"]}>
                        <Link href={{ pathname: "/account" }}>
                            <button>account information</button>
                        </Link>
                        <Link href={{ pathname: "/favorites" }}>
                            <button>favorites</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
