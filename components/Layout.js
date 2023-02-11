import dynamic from "next/dynamic"
import Head from "next/head"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCategories, getAllItems } from "../redux/storeReducer"
import { CartDropdown } from "./CartDropdown"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { Footer } from "./Footer"

const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false })

const SideNav = dynamic(() => import("../components/Sidenav"), { ssr: false })

export default function Layout({ children }) {
    const dispatch = useDispatch()
    const { cartOpen } = useSelector((state) => state.store)

    useEffect(() => {
        dispatch(getAllItems())
        dispatch(getAllCategories())
    }, [])

    return (
        <>
            <Head>
                <title>Eden Supermarket</title>
                <meta name="description" content="Eden supermarket home page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SideNav />
            <div id="body-2">
                <Navbar />
                {cartOpen && <CartDropdown />}
                <main>{children}</main>
                <Footer />
            </div>
        </>
    )
}
