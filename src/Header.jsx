import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Search } from "lucide-react"
import TextLogo from "./TextLogo"

function Header() {

    const [isOpen, setOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-between px-6 py-3 bg-orange-700 border-b border-white-900/50 select-none">
            <TextLogo />
            <div className="relative flex items-center w-full max-w-md mx-6">
                <Input
                    type="search"
                    placeholder="Search..."
                    className="h-7 rounded-xl pr-8"
                    style={{ backgroundColor: "black" }}
                />
                <button className="absolute right-2 text-gray-400 hover:text-white">
                    <Search size={14} />
                </button>
            </div>
            <div className="relative text-center flex flex-col items-center">
                <img
                    src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={() => setOpen(!isOpen)}
                />
                <div className="text-xs text-gray-200 sm:text-sm mt-1 truncate max-w-[90px]">yuvaara</div>
                {isOpen && (
                    //logout a func eklenecek.
                    <div className="absolute top-12 right-0 bg-black rounded-xl shadow-2xl py-2 w-40 z-50 border border-zinc-800">
                        <div className="px-4 py-2.5 text-sm text-gray-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors rounded-lg mx-1" onClick={() => navigate("/profile")}>
                            Profile
                        </div>
                        <div className="px-4 py-2.5 text-sm text-gray-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors rounded-lg mx-1" onClick={() => navigate("/register")}>
                            Register
                        </div>
                        <div className="px-4 py-2.5 text-sm text-gray-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors rounded-lg mx-1" onClick={() => navigate("/login")}>
                            Login
                        </div>
                        <hr className="border-zinc-700 my-1 mx-2" />
                        <div className="px-4 py-2.5 text-sm text-red-400 hover:bg-zinc-800 hover:text-red-300 cursor-pointer transition-colors rounded-lg mx-1">
                            Logout
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header;