import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import TextLogo from "./TextLogo"

import { jwtDecode } from 'jwt-decode'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext, useContext } from "./lib/AppContext"
import { backendBaseUrl } from './lib/env'

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

                fetch(`${backendBaseUrl}/users/${id}`, {
                    headers: { "Authorization": "Bearer " + a.token }
                })
                    .then(res => {
                        if (res.status === 200) {
                            setError("")
                            return res.json().then(data => {
                                console.log(data)
                                setProfile(data)
                                navigate("/")
                                localStorage.setItem("token", "Bearer " + token)
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
            })
        }
        else {
            val.json().then(data => {
                setError(data.info)
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
            {error && (
                <div
                    key={error}
                    onAnimationEnd={() => setError("")}
                    className="z-[9999] fixed top-6 left-1/2 -translate-x-1/2 bg-red-50 border border-red-200 text-red-800 text-xs px-4 py-2.5 rounded-xl animate-fade-out"
                >
                    {error}
                </div>
            )}
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-stone-200">
                <div className="flex flex-col w-full max-w-sm">
                    <button onClick={() => navigate(-1)} className="text-xs text-stone-400 hover:text-stone-950 mb-2 transition-colors self-start">
                        ← Back
                    </button>
                    <Card className="w-full max-w-sm bg-white border border-stone-200 shadow-none">
                        <CardHeader>
                            <TextLogo />
                            <CardTitle className="text-stone-950">Welcome</CardTitle>
                            <CardDescription className="text-stone-400">Sign in</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-stone-400">Email</Label>
                                <Input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="yuvaara@example.com" className="bg-stone-100 border-stone-200 text-stone-950 placeholder:text-stone-400" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-stone-400">Password</Label>
                                <Input minLength={6} maxLength={25} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-stone-100 border-stone-200 text-stone-950" />
                            </div>
                            <Button onClick={handleSubmit} className="w-full bg-green-700 text-stone-200 border border-stone-800 hover:bg-green-600">Sign in</Button>
                        </CardContent>
                        <CardFooter className="justify-center text-sm bg-white text-stone-400">
                            Don't have an account?
                            <Link to="/register" className="ml-1 text-amber-900 underline underline-offset-2 hover:opacity-80">Sign up</Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Login;