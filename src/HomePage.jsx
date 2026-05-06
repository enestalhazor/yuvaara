import Header from "./Header"
import AdoptionLists from "./AdoptionLists"
import { useContext, useEffect } from "react"
import { AppContext } from "./AppContext"

function HomePage() {
    const { fetchLists } = useContext(AppContext)

    useEffect(() => {
        fetchLists()
    }, [])

    return (
        <>
            <div className="flex flex-col min-h-screen bg-black">
                <div className="sticky top-0 z-50">
                    <Header />
                </div>
                <div className="flex justify-center flex-1">
                    <div className="w-4/5 min-w-[180px] m-2">
                        <AdoptionLists />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;