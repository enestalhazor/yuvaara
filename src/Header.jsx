import { Input } from "@/components/ui/input"
import { useContext, useState } from "react"
import { Search } from "lucide-react"
import TextLogo from "./TextLogo"
import { AppContext } from "./lib/AppContext"
import { backendBaseUrl, backendStaticUP } from "./lib/env"
import { FilterX } from "lucide-react"

function Header() {
    const [isOpen, setOpen] = useState(false)
    const [isFiltered, setIsFiltered] = useState(false)
    const [term, setTerm] = useState("")
    const [error, setError] = useState("")

    const { profile, logOut, token, navigate, setLists, fetchLists } = useContext(AppContext)

    const doFilterLists = () => {

        if (term == null || term == "") {
            return;
        }

        fetch(`${backendBaseUrl}/adoptionlists/${term}`)
            .then(res => {
                if (res.status === 200) {
                    setError("")
                    return res.json().then(data => {
                        console.log(data)
                        setLists(data)
                        setIsFiltered(true)
                    })
                }
                else {
                    res.json().then(data => {
                        setError(data.info)
                    })
                }
            })
    }

    return (
        <>
            {error && (
                <div
                    key={error}
                    onAnimationEnd={() => setError("")}
                    className="z-[9999] fixed top-6 left-1/2 -translate-x-1/2 bg-red-50 border border-red-200 text-red-800 text-xs px-4 py-2.5 rounded-xl animate-fade-out"
                >
                    {error}
                </div>
            )}
            <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-stone-200 select-none">
                <TextLogo />
                <div className="flex items-center w-full max-w-md mx-6 gap-3">
                    {isFiltered && (
                        <button
                            onClick={() => { fetchLists(); setIsFiltered(false); }}
                            className="text-xs text-stone-400 hover:text-stone-950 mb-2 transition-colors self-start"
                        >
                            <FilterX />
                        </button>
                    )}
                    <div className="relative flex items-center w-full">
                        <Input
                            onChange={(e) => setTerm(e.target.value)}
                            type="search"
                            placeholder="Search..."
                            className="h-7 rounded-xl pr-8 bg-stone-100 border border-stone-200 text-stone-950 placeholder:text-stone-400"
                        />
                        <button onClick={() => doFilterLists()} className="absolute right-2 text-stone-400 hover:text-amber-600 transition-colors">
                            <Search size={14} />
                        </button>
                    </div>
                </div>
                <div className="relative text-center flex flex-col items-center">
                    <img
                        src={profile?.profile_picture_url
                            ? `${backendStaticUP}/${profile.profile_picture_url}`
                            : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
                        }
                        className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-amber-600/30 hover:ring-amber-600 transition-all"
                        onClick={() => setOpen(!isOpen)}
                    />
                    <div className="text-xs sm:text-sm mt-1 max-w-[90px] text-stone-950">{profile?.fullname ?? ""}</div>
                    {isOpen && (
                        <div className="absolute top-12 right-0 bg-white rounded-xl py-2 w-40 z-50 border border-stone-200">
                            {token ? (
                                <>
                                    <div className="px-4 py-2.5 text-sm text-stone-500 hover:bg-stone-100 hover:text-amber-900 cursor-pointer transition-colors rounded-lg mx-1" onClick={() => navigate("/profile")}>
                                        Profile
                                    </div>
                                    <div className="px-4 py-2.5 text-sm text-stone-500 hover:bg-stone-100 hover:text-amber-900 cursor-pointer transition-colors rounded-lg mx-1" onClick={() => navigate("/forms")}>
                                        My Applications
                                    </div>
                                    <hr className="border-stone-200 my-1 mx-2" />
                                    <div className="px-4 py-2.5 text-sm text-red-800 hover:bg-stone-100 hover:text-red-800 cursor-pointer transition-colors rounded-lg mx-1" onClick={logOut}>
                                        Logout
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="px-4 py-2.5 text-sm text-stone-500 hover:bg-stone-100 hover:text-amber-900 cursor-pointer transition-colors rounded-lg mx-1" onClick={() => navigate("/register")}>
                                        Register
                                    </div>
                                    <div className="px-4 py-2.5 text-sm text-stone-500 hover:bg-stone-100 hover:text-amber-900 cursor-pointer transition-colors rounded-lg mx-1" onClick={() => navigate("/login")}>
                                        Login
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>)

}

export default Header;