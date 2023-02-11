import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { Card } from "../components/Card"
import { LoadingSpinner } from "../components/Loading"
import styles from "../styles/css/Categories.module.css"

export default function Categories() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const category = JSON.parse(router.query.data)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    const itemRender = category.items.map((product) => {
        return <Card key={product._id} item={product} />
    })
    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className={styles["category"]}>
                    <h1>{category.name}</h1>
                    <div className={styles["container"]}>
                        <div className={styles["item-container"]}>
                            {itemRender}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
