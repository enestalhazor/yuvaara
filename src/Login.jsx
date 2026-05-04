import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import TextLogo from "./TextLogo"

import { jwtDecode } from 'jwt-decode'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext, useContext } from "./AppContext"
import { backendBaseUrl } from './env'

function Login() {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const { setToken, setProfile, navigate } = useContext(AppContext)

    function loginHandler(val) {
        if (val.status === 200) {

            val.json().then(function (a) {
                setToken(a.token)
                const token = a.token
                const decodedToken = jwtDecode(token)
                const id = decodedToken.id

                const promise2 = fetch(`${backendBaseUrl}/users/` + id, {
                    headers: { "Authorization": "Bearer " + a.token }
                })
                promise2.then(function (val) {
                    val.json().then(function (a) {
                        console.log(a)
                        setProfile(a)
                        navigate("/")
                        setError("")
                        localStorage.setItem("token", "Bearer " + token)
                    })
                })
            })
        }
        else {
            val.text().then((text) => {
                setError(text)
                console.log(text)
            })
        }
    }

    function handleSubmit() {
        const promise = fetch(`${backendBaseUrl}/users/login`, {
            method: "POST",
            body: JSON.stringify({ email: email, password: password }),
            headers: { "Content-Type": "application/json" }
        })

        promise.then(loginHandler)
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
                <div className="absolute w-96 h-96 bg-green-600 rounded-full blur-3xl opacity-20 -top-20 -left-20" />
                <div className="absolute w-96 h-96 bg-orange-600 rounded-full blur-3xl opacity-20 -bottom-20 -right-20" />
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
                            <CardTitle>Welcome</CardTitle>
                            <CardDescription>Sign in</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <Label>Email</Label>
                                <Input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="yuvaara@example.com" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <Label>Password</Label>
                                <Input minLength={6} maxLength={25} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                            </div>
                            <Button onClick={handleSubmit} className=" w-full bg-green-800">Sign in</Button>
                        </CardContent>
                        <CardFooter className="justify-center text-sm bg-black">
                            Don't have an account?
                            <Link to="/register" className="ml-1 text-foreground underline underline-offset-2 hover:opacity-80">
                                Sign up
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Login;