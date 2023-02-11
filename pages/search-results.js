import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Card } from "../components/Card"
import { LoadingSpinner } from "../components/Loading"
import styles from "../styles/css/Search-results.module.css"

export default function SearchResults() {
    const { items } = useSelector((state) => state.store)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const searchResult = router.query.data

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, [])

    const resultList = items.map((item) => {
        let tags = ""
        item.tags.forEach((tag) => (tags += tag))

        if (item.name.toLowerCase().includes(searchResult.toLowerCase())) {
            return <Card key={item._id} item={item} />
        } else if (tags.toLowerCase().includes(searchResult.toLowerCase())) {
            return <Card key={item._id} item={item} />
        }
    })

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className={styles["result-list-cont"]}>
                    <h3>
                        Products that match keyword :{" "}
                        <span>{searchResult}</span>
                    </h3>
                    <div className={styles["result-list"]}>{resultList}</div>
                </div>
            )}
        </>
    )
}
