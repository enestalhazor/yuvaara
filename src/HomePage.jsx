import Header from "./Header";
import Sidebar from "./Sidebar";
import AdoptionLists from "./AdoptionLists";

function HomePage() {

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <div className="sticky top-0 z-50">
                    <Header />
                </div>
                <div className="flex flex-1">
                    <div className="w-1/5 min-w-[180px] border rounded-xl m-2 sticky top-24 h-fit self-start">
                        <Sidebar />
                    </div>
                    <div className="w-4/5 min-w-[180px] border rounded-xl m-2 overflow-hidden">
                        <AdoptionLists />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;