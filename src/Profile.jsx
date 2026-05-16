import { Avatar, AvatarImage } from "./components/ui/avatar"
import { CardFooter, CardHeader } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import TextLogo from "./TextLogo"
import { AppContext, useContext } from "./lib/AppContext"
import { backendBaseUrl, backendStaticUP } from './lib/env'

function Profile() {
    const { profile, token, setProfile, navigate } = useContext(AppContext)
    const [isDisabled, setIsDisabled] = useState(true)
    const [fullname, setName] = useState(profile?.fullname || "")
    const [email, setEmail] = useState(profile?.email || "")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState(profile?.phone || "")
    const [address, setAddress] = useState(profile?.address || "")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

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

        fetch(`${backendBaseUrl}/users/${profile.id}`, {
            method: "PUT",
            body: formData,
            headers: { "Authorization": "Bearer " + token }
        })
            .then(res => {
                if (res.status === 200) {
                    setError("")
                    setIsDisabled(a => !a)
                    setSuccess("Profile updated successfully")
                    return fetch(`${backendBaseUrl}/users/${profile.id}`, {
                        headers: { "Authorization": "Bearer " + token }
                    })
                        .then(res => {
                            if (res.status === 200) {
                                setError("")
                                return res.json().then(data => {
                                    console.log(data)
                                    setProfile(data)
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
                else {
                    res.json().then(data => {
                        setError(data.info)
                    })
                }
                console.log(res)
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
            {success && (
                <div
                    key={success}
                    onAnimationEnd={() => setSuccess("")}
                    className="z-[9999] fixed top-6 left-1/2 -translate-x-1/2 bg-green-50 border border-green-200 text-green-800 text-xs px-4 py-2.5 rounded-xl animate-fade-out"
                >
                    {success}
                </div>
            )}
            <div className="flex flex-col items-center min-h-screen p-6 bg-stone-200 relative overflow-hidden">
                <div className="flex flex-col w-full max-w-sm">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-xs text-stone-400 hover:text-stone-950 mb-2 transition-colors self-start"
                    >
                        ← Back
                    </button>
                    <Card className="w-full max-w-md shadow-none rounded-2xl bg-white border border-stone-200 relative z-10 overflow-hidden">
                        <div className="h-10 bg-orange-700" />
                        <CardHeader className="flex flex-col items-center gap-4 pt-4">
                            <TextLogo />
                            <Avatar className="w-20 h-20 border border-stone-200">
                                <AvatarImage src={profile?.profile_picture_url
                                    ? `${backendStaticUP}/${profile.profile_picture_url}`
                                    : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
                                } />
                            </Avatar>
                            <h3 className="text-stone-950">{profile.fullname}</h3>
                            <div className="w-full space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <Label className="text-stone-400">Full Name</Label>
                                        <Input
                                            disabled={isDisabled}
                                            onChange={(e) => setName(e.target.value)}
                                            value={fullname}
                                            className="text-stone-950 bg-stone-100 border-stone-200 placeholder-stone-400"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-stone-400">Phone</Label>
                                        <Input
                                            disabled={isDisabled}
                                            onChange={(e) => setPhone(e.target.value.replace(/[^\d+]/g, ""))}
                                            value={phone}
                                            className="text-stone-950 bg-stone-100 border-stone-200 placeholder-stone-400"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <Label className="text-stone-400">Password</Label>
                                        <Input
                                            disabled={isDisabled}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password"
                                            value={password || ""}
                                            className="text-stone-950 bg-stone-100 border-stone-200 placeholder-stone-400"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-stone-400">Email</Label>
                                        <Input
                                            disabled={isDisabled}
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            className="text-stone-950 bg-stone-100 border-stone-200 placeholder-stone-400"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-stone-400">Address</Label>
                                    <Input
                                        disabled={isDisabled}
                                        onChange={(e) => setAddress(e.target.value)}
                                        value={address || ""}
                                        className="text-stone-950 bg-stone-100 border-stone-200 placeholder-stone-400"
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardFooter className="bg-white justify-center gap-4 mt-6 pb-6">
                            {isDisabled ? (
                                <Button onClick={() => setIsDisabled(false)}
                                    className="px-6 rounded-full bg-blue-700 text-stone-200 border border-stone-200 hover:bg-blue-500 transition-all duration-200">
                                    Edit
                                </Button>
                            ) : (
                                <>
                                    <Button onClick={() => setIsDisabled(true)}
                                        className="px-6 rounded-full bg-stone-100 text-stone-500 border border-stone-200 hover:bg-stone-200 transition-all duration-200">
                                        Cancel
                                    </Button>
                                    <Button onClick={changeProfileInfos}
                                        className="px-6 rounded-full bg-green-700 text-stone-200 border border-stone-200 hover:bg-green-500 transition-all duration-200">
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