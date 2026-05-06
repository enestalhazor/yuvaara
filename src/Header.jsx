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
                    res.text().then((text) => {
                        try {
                            const parsed = JSON.parse(text);
                            setError(parsed.info || text);
                        } catch {
                            setError(text);
                            console.log(text)
                        }
                    })
                }
            })
    }

    return (
        <>
            {error && (
                <div
                    onAnimationEnd={() => setError("")}
                    className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-red-900/40 border border-red-500/30 text-red-400 text-xs px-4 py-2.5 rounded-xl animate-fade-out"
                >
                    {error}
                </div>
            )}
            <div className="flex items-center justify-between px-6 py-3 bg-zinc-950 border-b border-zinc-800/60 select-none backdrop-blur-sm">
                <TextLogo />
                <div className="flex items-center w-full max-w-md mx-6 gap-3">
                    {isFiltered && (
                        <button
                            onClick={() => { fetchLists(), setIsFiltered(false) }}
                            className="text-xs text-zinc-500 hover:text-white mb-2 transition-colors self-start"
                        >
                            <FilterX />
                        </button>
                    )}
                    <div className="relative flex items-center w-full">
                        <Input
                            onChange={(e) => setTerm(e.target.value)}
                            type="search"
                            placeholder="Search..."
                            className="h-7 rounded-xl pr-8 bg-zinc-900 border border-zinc-700 text-zinc-200 placeholder:text-zinc-500"
                        />
                        <button onClick={() => doFilterLists()} className="absolute right-2 text-zinc-500 hover:text-amber-400 transition-colors">
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
                        className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-amber-500/40 hover:ring-amber-400 transition-all"
                        onClick={() => setOpen(!isOpen)}
                    />
                    <div className="text-xs sm:text-sm mt-1 max-w-[90px]">{profile?.fullname ?? ""}</div>
                    {isOpen && (
                        <div className="absolute top-12 right-0 bg-zinc-950 rounded-xl py-2 w-40 z-50 border border-zinc-700">
                            {token ? (
                                <>
                                    <div className="px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800/80 hover:text-amber-700 cursor-pointer transition-colors rounded-lg mx-1" onClick={() => navigate("/profile")}>
                                        Profile
                                    </div>
                                    <div className="px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800/80 hover:text-amber-700 cursor-pointer transition-colors rounded-lg mx-1" onClick={() => navigate("/forms")}>
                                        My Forms
                                    </div>
                                    <hr className="border-zinc-800 my-1 mx-2" />
                                    <div className="px-4 py-2.5 text-sm text-red-400 hover:bg-zinc-800/80 hover:text-red-700 cursor-pointer transition-colors rounded-lg mx-1" onClick={logOut}>
                                        Logout
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800/80 hover:text-amber-700 cursor-pointer transition-colors rounded-lg mx-1" onClick={() => navigate("/register")}>
                                        Register
                                    </div>
                                    <div className="px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800/80 hover:text-amber-700 cursor-pointer transition-colors rounded-lg mx-1" onClick={() => navigate("/login")}>
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