import styles from "../styles/css/Home.module.css"
import { HomeCarousel } from "../components/Carousel"
import { Card } from "../components/Card"
import Link from "next/link"

export default function Home({
    normalProductTab,
    splitProductTab,
    normalCategoryTab,
    splitCategoryTab,
}) {
    const normalProductRender = normalProductTab.data?.map((data) => {
        const products = data.items.map((product) => {
            return <Card key={product._id} item={product} />
        })
        return (
            <div key={data._id} className={styles["normal-tab-container"]}>
                <h3
                    className={[styles["tab-head"], styles["bor-top"]].join(
                        " "
                    )}
                >
                    {data.tabName}
                </h3>
                <div
                    className={[
                        styles["tab-item-container"],
                        styles["bor-bottom"],
                    ].join(" ")}
                >
                    <div className={styles["product-tab"]}>{products}</div>
                </div>
            </div>
        )
    })
    const splitCategoryRender = splitCategoryTab.data?.map((data) => {
        let categoryArray = []
        let imageArray = []
        data.categories.forEach((category) => {
            categoryArray.push(category)
        })
        data.images.forEach((image) => {
            imageArray.push(image)
        })
        return (
            <div
                key={data._id}
                className={[
                    styles["split-category"],
                    styles["bor-top"],
                    styles["bor-bottom"],
                ].join(" ")}
            >
                <h3>Shop By Categories</h3>
                <div className={styles["category-section"]}>
                    <Link
                        href={{
                            pathname: "/categories",
                            query: { data: JSON.stringify(categoryArray[0]) },
                        }}
                        className={styles["category"]}
                        style={{
                            backgroundImage: `url(${imageArray[0].filePath})`,
                        }}
                    >
                        <h4>{categoryArray[0].name}</h4>
                    </Link>

                    <Link
                        href={{
                            pathname: "/categories",
                            query: { data: JSON.stringify(categoryArray[1]) },
                        }}
                        className={styles["category"]}
                        style={{
                            backgroundImage: `url(${imageArray[1].filePath})`,
                        }}
                    >
                        <h4>{categoryArray[1].name}</h4>
                    </Link>
                </div>
                <div className={styles["category-section"]}>
                    <Link
                        href={{
                            pathname: "/categories",
                            query: { data: JSON.stringify(categoryArray[2]) },
                        }}
                        className={styles["category"]}
                        style={{
                            backgroundImage: `url(${imageArray[2].filePath})`,
                        }}
                    >
                        <h4>{categoryArray[2].name}</h4>
                    </Link>
                    <Link
                        href={{
                            pathname: "/categories",
                            query: { data: JSON.stringify(categoryArray[3]) },
                        }}
                        className={styles["category"]}
                        style={{
                            backgroundImage: `url(${imageArray[3].filePath})`,
                        }}
                    >
                        <h4>{categoryArray[3].name}</h4>
                    </Link>
                </div>
            </div>
        )
    })

    const splitProductRender = splitProductTab.data?.map((data) => {
        const firstTabProducts = data.tab1.items.map((product) => {
            return <Card key={product._id} item={product} />
        })
        const secondTabProducts = data.tab2.items.map((product) => {
            return <Card key={product._id} item={product} />
        })
        return (
            <div key={data._id} className={styles["split-product"]}>
                <div
                    className={[
                        styles["tab"],
                        styles["bor-top"],
                        styles["bor-bottom"],
                    ].join(" ")}
                >
                    <h5>{data.tab1.tabName}</h5>
                    <div className={styles["item-cont"]}>
                        {firstTabProducts}
                    </div>
                </div>
                <div
                    className={[
                        styles["tab"],
                        styles["bor-top"],
                        styles["bor-bottom"],
                    ].join(" ")}
                >
                    <h5>{data.tab2.tabName}</h5>
                    <div className={styles["item-cont"]}>
                        {secondTabProducts}
                    </div>
                </div>
            </div>
        )
    })

    const normalCategoryRender = normalCategoryTab.data?.map((data) => {
        const products = data.category.items.map((product) => {
            return <Card key={product._id} item={product} />
        })
        return (
            <div key={data._id} className={styles["normal-tab-container"]}>
                <h3
                    className={[styles["tab-head"], styles["bor-top"]].join(
                        " "
                    )}
                >
                    {data.category.name}
                </h3>
                <div
                    className={[
                        styles["tab-item-container"],
                        styles["bor-bottom"],
                    ].join(" ")}
                >
                    <div className={styles["product-tab"]}>{products}</div>
                </div>
            </div>
        )
    })

    return (
        <div>
            <HomeCarousel />
            {normalProductRender}
            {splitCategoryRender}
            {splitProductRender}
            {normalCategoryRender}
        </div>
    )
}

export async function getStaticProps() {
    const normalProductResponse = await fetch(
        "https://react-eden-backend-production.up.railway.app/shop/normal-product-tab",
        { method: "get" }
    )
    const normalProductTab = await normalProductResponse.json()

    const splitProductResponse = await fetch(
        "https://react-eden-backend-production.up.railway.app/shop/split-product-tab",
        { method: "get" }
    )
    const splitProductTab = await splitProductResponse.json()

    const normalCategoryResponse = await fetch(
        "https://react-eden-backend-production.up.railway.app/shop/normal-category-tab",
        { method: "get" }
    )
    const normalCategoryTab = await normalCategoryResponse.json()

    const splitCategoryResponse = await fetch(
        "https://react-eden-backend-production.up.railway.app/shop/split-category-tab",
        { method: "get" }
    )
    const splitCategoryTab = await splitCategoryResponse.json()

    return {
        props: {
            normalProductTab,
            splitProductTab,
            normalCategoryTab,
            splitCategoryTab,
        },
    }
}
