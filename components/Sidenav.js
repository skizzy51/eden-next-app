import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faPlus, faAngleDown } from "@fortawesome/free-solid-svg-icons"
import Accordion from "react-bootstrap/Accordion"
import "bootstrap/dist/css/bootstrap.min.css"
import styles from "../styles/css/App.module.css"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import { useRouter } from "next/router"
import { logout } from "../redux/userReducer"

export default function SideNav() {
    const { categories } = useSelector((state) => state.store)
    const { user, username } = useSelector((state) => state.user)
    const router = useRouter()
    const dispatch = useDispatch()

    function closeNavbar() {
        document.getElementById("sidenav").style.transform = "translateX(-100%)"
        document.getElementById("body-2").style.opacity = "100%"
        document.getElementById("body-2").style.pointerEvents = "all"
    }

    function Logout() {
        dispatch(logout())
    }

    const categoriesData = categories.map((data) => {
        return (
            <Link
                href={{
                    pathname: "/categories",
                    query: { data: JSON.stringify(data) },
                }}
                key={data._id}
                className={styles["acc-button"]}
                onClick={closeNavbar}
            >
                {data.name}
            </Link>
        )
    })

    if (
        router.pathname === "/sign-in" ||
        router.pathname === "/admin" ||
        router.pathname === "/admin/inventory" ||
        router.pathname === "/admin/create-product" ||
        router.pathname === "/admin/add-product" ||
        router.pathname === "/admin/create-category" ||
        router.pathname === "/admin/create-split-category"
    )
        return null

    return (
        <div id="sidenav" className={styles["sidenav"]}>
            <div className={styles["sidenav-top"]}>
                <img src="/eden super white.png" alt="logo" />
                <FontAwesomeIcon
                    onClick={closeNavbar}
                    className={styles["closeIcon"]}
                    icon={faTimes}
                />
            </div>
            <hr />
            <div style={{ textAlign: "center" }}>
                {user ? (
                    <>
                        <div className={styles["sidenav-signUp"]}>
                            <h2>Welcome {username}</h2>
                        </div>
                        <hr />
                    </>
                ) : (
                    <>
                        <div className={styles["sidenav-signUp"]}>
                            <h5>Sign in to get the best out of your account</h5>
                            <a href="/sign-in">Sign in</a>
                        </div>
                        <hr />
                    </>
                )}
                <div style={{ textAlign: "left" }}>
                    <div className={styles["sidenav-button"]}>Deals</div>
                    <Accordion>
                        <Accordion.Item
                            eventKey="0"
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                            }}
                        >
                            <Accordion.Header
                                className={styles["accordion-modified"]}
                            >
                                <div>Categories</div>
                                <FontAwesomeIcon icon={faPlus} />
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className={styles["f-none"]}
                                />
                            </Accordion.Header>
                            <Accordion.Body className={styles["body"]}>
                                {categoriesData}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <div className={styles["sidenav-button"]}>Coupons</div>
                </div>
            </div>
            {user ? (
                <button onClick={Logout} className={styles["logout"]}>
                    Log out
                </button>
            ) : null}
        </div>
    )
}
