import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import TextLogo from "./TextLogo"
import { backendBaseUrl } from './lib/env'
import { Link } from 'react-router-dom'
import { useRef, useState } from "react"
import { AppContext, useContext } from "./lib/AppContext"

function Register() {
    const inputFileRef = useRef(null)
    const [error, setError] = useState("")
    const [fullname, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")

    const [profilePictureUrl, setProfilePictureUrl] = useState(null)
    const { navigate } = useContext(AppContext)

    function handleRegister() {

        const formData = new FormData();
        formData.append("fullname", fullname)
        formData.append("email", email)
        formData.append("phone", phone)
        formData.append("password", password)
        formData.append("address", address)
        formData.append("dateOfBirth", dateOfBirth)
        if (profilePictureUrl !== null) {
            formData.append("profilePictureUrl", profilePictureUrl)
        }

        console.log("profilePicture:", profilePictureUrl)

        fetch(`${backendBaseUrl}/users`, {
            method: "POST",
            body: formData,
        })
            .then(res => {
                if (res.status === 200) {
                    setError("")
                    setName("")
                    setEmail("")
                    setPassword("")
                    setProfilePictureUrl(null)
                    setDateOfBirth("")
                    inputFileRef.current.value = null
                    navigate("/login")
                }
                else {
                    res.text().then((text) => {
                        try {
                            const parsed = JSON.parse(text);
                            setError(parsed.info || parsed.message || "Something went wrong");
                        } catch {
                            setError("Something went wrong");
                        }
                    })
                }
                console.log(res)
            })
    }

    return (
        <>
            {error && (
                <div
                    className="z-[9999] fixed top-6 left-1/2 -translate-x-1/2 bg-red-50 border border-red-200 text-red-800 text-xs px-4 py-2.5 rounded-xl"
                >
                    {error}
                </div>
            )}
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-stone-200">
                <div className="flex flex-col w-full max-w-sm">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-xs text-stone-400 hover:text-stone-950 mb-2 transition-colors self-start"
                    >
                        ← Back
                    </button>
                    <Card className="w-full max-w-sm bg-white border border-stone-200 shadow-none">
                        <CardHeader>
                            <TextLogo />
                            <CardTitle className="text-stone-950">Register</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1.5">
                                    <Label className="text-stone-400">Full Name</Label>
                                    <Input
                                        onChange={(e) => setName(e.target.value)}
                                        type="text"
                                        placeholder="Yuvaara"
                                        className="bg-stone-100 border-stone-200 text-stone-950 placeholder:text-stone-400"
                                        onKeyDown={(e) => {
                                            if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]$/.test(e.key) && e.key !== "Backspace") {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <Label className="text-stone-400">Phone</Label>
                                    <Input
                                        value={phone}
                                        type="text"
                                        placeholder="+905XXXXXXXXX"
                                        className="bg-stone-100 border-stone-200 text-stone-950 placeholder:text-stone-400"
                                        onChange={(e) => setPhone(e.target.value.replace(/[^\d+]/g, ""))}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-stone-400">Email</Label>
                                <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="yuvaara@example.com" className="bg-stone-100 border-stone-200 text-stone-950 placeholder:text-stone-400" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1.5">
                                    <Label className="text-stone-400">Password</Label>
                                    <Input onChange={(e) => setPassword(e.target.value)} minLength={6} maxLength={25} type="password" placeholder="••••••••" className="bg-stone-100 border-stone-200 text-stone-950" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <Label className="text-stone-400">Date of Birth</Label>
                                    <Input
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        max={new Date().toISOString().split("T")[0]}
                                        type="date"
                                        className="bg-stone-100 border-stone-200 text-stone-950"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-stone-400">Address</Label>
                                <Input onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Türkiye/Ankara" className="bg-stone-100 border-stone-200 text-stone-950 placeholder:text-stone-400" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-stone-400">Profile Picture</Label>
                                <Input id="picture" type="file" ref={inputFileRef}
                                    onChange={(event) => { setProfilePictureUrl(event.target.files[0]); }}
                                    className="bg-stone-100 border-stone-200 text-stone-950" />
                            </div>
                            <Button onClick={handleRegister} className="w-full bg-green-700 text-stone-200 border border-stone-200 hover:bg-green-600">Sign up</Button>
                        </CardContent>
                        <CardFooter className="justify-center text-sm bg-white text-stone-400">
                            Already have an account?
                            <Link to="/login" className="ml-1 text-amber-900 underline underline-offset-2 hover:opacity-80">
                                Sign in
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Register;