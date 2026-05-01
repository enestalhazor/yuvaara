import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { Search } from "lucide-react"
import TextLogo from "./TextLogo"
import { AppContext } from "./AppContext"

function Header() {

    const [isOpen, setOpen] = useState(false)
    const navigate = useNavigate()
    const { profile, logOut, token } = useContext(AppContext)

    return (
        <div className="flex items-center justify-between px-6 py-3 bg-zinc-950 border-b border-zinc-800/60 select-none backdrop-blur-sm">
            <TextLogo />
            <div className="flex items-center w-full max-w-md mx-6 gap-3">
                <div className="relative flex items-center w-full">
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="h-7 rounded-xl pr-8 bg-zinc-900 border border-zinc-700 text-zinc-200 placeholder:text-zinc-500"
                    />
                    <button className="absolute right-2 text-zinc-500 hover:text-amber-400 transition-colors">
                        <Search size={14} />
                    </button>
                </div>
                <Button onClick={() => { navigate("/list") }} className="bg-orange-700 whitespace-nowrap">
                    Create Listing
                </Button>
            </div>
            <div className="relative text-center flex flex-col items-center">
                <img
                    src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`}
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
                                <div className="px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800/80 hover:text-amber-700 cursor-pointer transition-colors rounded-lg mx-1" onClick={() => navigate("/lists")}>
                                    My Lists
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
        </div>)
}

export default Header;