import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import TextLogo from "./TextLogo"
import { backendBaseUrl } from './env'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from "react"
import { AppContext, useContext } from "./AppContext"

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

        const promise = fetch(`${backendBaseUrl}/users`, {
            method: "POST",
            body: formData,
        })

        promise.then((res) => {
            if (res.status === 200) {
                setName("")
                setEmail("")
                setPassword("")
                setProfilePictureUrl(null)
                setError("")
                setDateOfBirth("")
                inputFileRef.current.value = null
                navigate("/login")
            }
            else {
                res.text().then((text) => {
                    console.log(text)
                    setError(text)
                })
            }
            console.log(res)
        })
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
                <div className="absolute w-96 h-96 bg-orange-600 rounded-full blur-3xl opacity-20 -top-20 -left-20" />
                <div className="absolute w-96 h-96 bg-green-600 rounded-full blur-3xl opacity-20 -bottom-20 -right-20" />
                <div className="flex flex-col w-full max-w-sm">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-xs text-zinc-500 hover:text-white mb-2 transition-colors self-start"
                    >
                        ← Back
                    </button>
                    <Card className="w-full max-w-sm bg-black">
                        <CardHeader>
                            <TextLogo />
                            <CardTitle>Register</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1.5">
                                    <Label>Full Name</Label>
                                    <Input
                                        onChange={(e) => setName(e.target.value)}
                                        type="text"
                                        placeholder="Yuvaara"
                                        onKeyDown={(e) => {
                                            if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]$/.test(e.key) && e.key !== "Backspace") {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <Label>Phone</Label>
                                    <Input
                                        value={phone}
                                        type="text"
                                        placeholder="+90 (555) 000-0000"
                                        onChange={(e) => setPhone(e.target.value.replace(/[^\d\s+]/g, ""))}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <Label>Email</Label>
                                <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="yuvaara@example.com" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1.5">
                                    <Label>Password</Label>
                                    <Input onChange={(e) => setPassword(e.target.value)} minLength={6} maxLength={25} type="password" placeholder="••••••••" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <Label>Date of Birth</Label>
                                    <Input
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        max={new Date().toISOString().split("T")[0]}
                                        type="date"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <Label>Address</Label>
                                <Input onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Türkiye/Ankara" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <Label>Profile Picture</Label>
                                <Input id="picture" type="file" ref={inputFileRef}
                                    onChange={(event) => { setProfilePictureUrl(event.target.files[0]); }} />
                            </div>
                            <Button onClick={handleRegister} className="w-full bg-green-800">Sign up</Button>
                        </CardContent>
                        <CardFooter className="justify-center text-sm bg-black">
                            Already have account?
                            <Link to="/login" className="ml-1 text-foreground underline underline-offset-2 hover:opacity-80">
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