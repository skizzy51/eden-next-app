import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faBars,
    faShoppingCart,
    faUser,
} from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import styles from "../styles/css/App.module.css"
import { useDispatch, useSelector } from "react-redux"
import { openCart } from "../redux/storeReducer"
import Link from "next/link"
import { useRouter } from "next/router"

function Navbar() {
    const [searchData, setData] = useState([])
    const { items, cartNumber } = useSelector((state) => state.store)
    const { user } = useSelector((state) => state.user)
    const router = useRouter()
    const dispatch = useDispatch()

    function OpenCart() {
        dispatch(openCart())
    }
    function openNavbar() {
        document.getElementById("sidenav").style.transform = "translateX(0%)"
        document.getElementById("body-2").style.opacity = "55%"
        document.getElementById("body-2").style.pointerEvents = "none"
    }

    function goToAccountPage() {
        if (user) {
            router.push("/account")
        } else {
            return alert("User must be logged in")
        }
    }

    let searchBar = document.getElementById("search-bar")

    document.getElementById("__next").addEventListener("click", (e) => {
        if (e.target.id === "search-bar") {
            return
        } else if (e.target.parentElement.id === "search-result") {
            e.target.click()
        } else {
            if (document.getElementById("search-result")) {
                document.getElementById("search-result").style.display = "none"
            }
        }
    })

    function searchRender(e) {
        let results = []
        let keyword = e.target.value
        items.forEach((element) => {
            if (keyword.length < 1) {
                setData("")
            } else if (
                element.name.toLowerCase().includes(keyword.toLowerCase())
            ) {
                results.push(element)
                document.getElementById("search-result").style.display = "flex"
            }
        })
        setData(results)
    }
    function search() {
        const searchParameter = searchBar.value
        if (searchParameter.length > 2) {
            router.push({
                pathname: "/search-results",
                query: { data: searchParameter },
            })
        }
        setData("")
    }

    const searchResults =
        searchData.length > 0
            ? searchData.map((result) => {
                  const linkProps = {
                      _id: result._id,
                      name: result.name,
                      price: result.price,
                      image: result.images[0].filePath,
                      tags: result.tags,
                      description: result.description,
                      quantity: result.quantity,
                  }
                  return (
                      <Link
                          href={{ pathname: "/product", query: linkProps }}
                          key={result._id}
                          id={result._id}
                          className={styles["result-item"]}
                          onClick={() =>
                              (document.getElementById(
                                  "search-result"
                              ).style.display = "none")
                          }
                      >
                          {result.name}
                      </Link>
                  )
              })
            : null

    if (
        router.pathname === "/checkout" ||
        router.pathname === "/account" ||
        router.pathname === "/favorites"
    ) {
        return (
            <div className={styles["search-cont"]}>
                <div className={styles["logo"]}>
                    <FontAwesomeIcon
                        onClick={openNavbar}
                        className={styles["open-nav"]}
                        icon={faBars}
                    />
                    <a href="/">
                        <img src="/eden supermarket logo.png" alt="logo" />
                    </a>
                </div>
                <div className={styles["account-cart"]}>
                    <div
                        className={styles["account"]}
                        onClick={goToAccountPage}
                    >
                        <FontAwesomeIcon
                            style={{ marginRight: ".5rem" }}
                            icon={faUser}
                        />
                        <span>ACCOUNT</span>
                    </div>
                </div>
            </div>
        )
    } else if (router.pathname === "/sign-in") {
        return (
            <div className={styles["eden"]}>
                <a href="/">
                    <img src="/eden supermarket logo.png" alt="logo"></img>
                </a>
            </div>
        )
    } else if (
        router.pathname === "/admin" ||
        router.pathname === "/admin/inventory" ||
        router.pathname === "/admin/create-product" ||
        router.pathname === "/admin/add-product" ||
        router.pathname === "/admin/create-category" ||
        router.pathname === "/admin/create-split-category"
    ) {
        return (
            <div className={styles["eden"]}>
                <a href="/admin">
                    <img src="/eden supermarket logo.png" alt="logo"></img>
                </a>
            </div>
        )
    }

    return (
        <div style={{ position: "relative" }}>
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    width: "100%",
                    zIndex: "12",
                }}
            >
                <div className={styles["search-cont"]}>
                    <div className={styles["logo"]}>
                        <FontAwesomeIcon
                            onClick={openNavbar}
                            className={styles["open-nav"]}
                            icon={faBars}
                        />
                        <a href="/">
                            <img
                                src="/eden supermarket logo.png"
                                alt="logo"
                            ></img>
                        </a>
                    </div>
                    <div className={styles["search-bar"]}>
                        <input
                            type="text"
                            placeholder="Search products, brands and categories"
                            id="search-bar"
                            className={styles["s-bar"]}
                            onInput={searchRender}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") search()
                            }}
                        />
                        <span className={styles["search"]} onClick={search}>
                            SEARCH
                        </span>
                    </div>
                    <div className={styles["account-cart"]}>
                        <div
                            onClick={goToAccountPage}
                            className={styles["account"]}
                            style={
                                router.pathname === "/cart" &&
                                window.screen.width <= 768
                                    ? { fontSize: ".9rem", marginTop: ".5rem" }
                                    : {}
                            }
                        >
                            <FontAwesomeIcon
                                style={{ marginRight: ".5rem" }}
                                icon={faUser}
                            />
                            <span>ACCOUNT</span>
                        </div>
                        {router.pathname !== "/cart" ? (
                            <div
                                id="cart"
                                className={styles["cart"]}
                                onClick={OpenCart}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} />
                                <span>
                                    CART
                                    <span
                                        className={styles["cart-counter"]}
                                        id="cart-counter"
                                    >
                                        {cartNumber}
                                    </span>
                                </span>
                            </div>
                        ) : null}
                    </div>
                </div>
                {/* search body */}
                <div className={styles["search-result"]} id="search-result">
                    {searchResults}
                </div>
            </div>
        </div>
    )
}

export default Navbar
