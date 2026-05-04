import { Avatar, AvatarImage } from "./components/ui/avatar"
import { CardFooter, CardHeader } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import TextLogo from "./TextLogo"
import { AppContext, useContext } from "./AppContext"
import { backendBaseUrl } from './env'

function Profile() {
    const { profile, token, setProfile, navigate } = useContext(AppContext)
    const [isDisabled, setIsDisabled] = useState(true)
    const [fullname, setName] = useState(profile?.fullname || "")
    const [email, setEmail] = useState(profile?.email || "")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState(profile?.phone || "")
    const [address, setAddress] = useState(profile?.address || "")
    const [error, setError] = useState("")

    function changeProfileInfos() {
        const formData = new FormData()
        if (profile.fullname !== fullname) {
            formData.append("fullname", fullname)
        }
        if (profile.email !== email) {
            formData.append("email", email)
        }
        if (password) {
            formData.append("password", password)
        }
        if (profile.phone !== phone) {
            formData.append("phone", phone)
        }
        if (profile.address !== address) {
            formData.append("address", address)
        }

        const promise = fetch(`${backendBaseUrl}/users/` + profile.id, {
            method: "PUT",
            body: formData,
            headers: { "Authorization": "Bearer " + token }
        })
        promise.then((res) => {
            if (res.status !== 200) {
                res.text().then((text) => {
                    setError(text)
                })
            }
            setError("")
            setIsDisabled(a => !a)
            const promise2 = fetch(`${backendBaseUrl}/users/` + profile.id, {
                headers: { "Authorization": "Bearer " + token }
            })
            promise2.then(function (val) {
                val.json().then(function (a) {
                    console.log(a)
                    setProfile(a)
                })
            })
        })
    }

    return (
        <>
            <div className="flex flex-col items-center min-h-screen p-6 bg-black relative overflow-hidden">
                <div className="flex flex-col w-full max-w-sm">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-xs text-zinc-500 hover:text-white mb-2 transition-colors self-start"
                    >
                        ← Back
                    </button>
                    <Card className="w-full max-w-md shadow-lg rounded-2xl bg-zinc-950 relative z-10 overflow-hidden">
                        <div className="h-10 bg-orange-800" />
                        <CardHeader className="flex flex-col items-center gap-4 pt-4">
                            <TextLogo />
                            <Avatar className="w-20 h-20 border border-primary/20">
                                <AvatarImage src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                            </Avatar>
                            <h3>{profile.fullname}</h3>
                            <div className="w-full space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <Label className="text-gray-400">Full Name</Label>
                                        <Input
                                            disabled={isDisabled}
                                            onChange={(e) => setName(e.target.value)}
                                            value={fullname}
                                            className="text-gray-200 placeholder-gray-500"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-gray-400">Phone</Label>
                                        <Input
                                            disabled={isDisabled}
                                            onChange={(e) => setPhone(e.target.value.replace(/[^\d\s+]/g, ""))}
                                            value={phone}
                                            className="text-gray-200 placeholder-gray-500"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <Label className="text-gray-400">Password</Label>
                                        <Input
                                            disabled={isDisabled}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password"
                                            value={password || ""}
                                            className="text-gray-200 placeholder-gray-500"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-gray-400">Email</Label>
                                        <Input
                                            disabled={isDisabled}
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            className="text-gray-200 placeholder-gray-500"
                                        />

                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-gray-400">Address</Label>
                                    <Input
                                        disabled={isDisabled}
                                        onChange={(e) => setAddress(e.target.value)}
                                        value={address || ""}
                                        className="text-gray-200 placeholder-gray-500"
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardFooter className="bg-zinc-950 justify-center gap-4 mt-6 pb-6">
                            {isDisabled ? (
                                <Button onClick={() => setIsDisabled(false)}
                                    className="px-6 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200">
                                    Edit
                                </Button>
                            ) : (
                                <>
                                    <Button onClick={() => setIsDisabled(true)}
                                        className="px-6 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all duration-200">
                                        Cancel
                                    </Button>
                                    <Button onClick={changeProfileInfos}
                                        className="px-6 rounded-full bg-green-600 text-white hover:bg-green-700 transition-all duration-200">
                                        Save
                                    </Button>
                                </>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Profile;