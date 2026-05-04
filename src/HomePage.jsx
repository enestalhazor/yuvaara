import Header from "./Header"
import AdoptionLists from "./AdoptionLists"
import { useContext, useEffect } from "react"
import { AppContext } from "./AppContext"
import { Sidebar } from "lucide-react"

function HomePage() {
    const { error, fetchLists } = useContext(AppContext)

    useEffect(() => {
        fetchLists()
    }, [])

    return (
        <>
            <div className="flex flex-col min-h-screen bg-black">
                <div className="sticky top-0 z-50">
                    <Header />
                </div>
                <div className="flex flex-1">
                    <div className="w-1/5 min-w-[180px] m-2 sticky top-24 h-fit self-start">
                    </div>
                    <div className="w-4/5 min-w-[180px] m-2 overflow-hidden">
                        <AdoptionLists />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;