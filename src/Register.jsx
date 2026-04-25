import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import TextLogo from "./TextLogo"

function Register() {

    return (
        <>
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
                <div className="absolute w-96 h-96 bg-orange-600 rounded-full blur-3xl opacity-20 -top-20 -left-20" />
                <div className="absolute w-96 h-96 bg-green-600 rounded-full blur-3xl opacity-20 -bottom-20 -right-20" />
                <Card className="w-full max-w-sm bg-black">
                    <CardHeader>
                        <TextLogo />
                        <CardTitle>Register</CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <Label>FullName</Label>
                            <Input
                                type="text"
                                placeholder="John Doe"
                                onKeyDown={(e) => {
                                    if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]$/.test(e.key) && e.key !== "Backspace") {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label>Email</Label>
                            <Input type="email" placeholder="yuvaara@example.com" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label>Phone</Label>
                            <Input type="number" placeholder="+90 (555) 000-0000" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label>Password</Label>
                            <Input minLength={6} maxLength={25} type="password" placeholder="••••••••" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label>Date of Birth</Label>
                            <Input max={new Date().toISOString().split("T")[0]} type="date" placeholder="MM/DD/YYYY" />
                        </div>
                        <Button className="w-full bg-green-800">Sign up</Button>
                    </CardContent>
                    <CardFooter className="justify-center text-sm bg-black">
                        Already have account?
                        <a href="/login" className="ml-1 text-foreground underline underline-offset-2 hover:opacity-80">
                            Sign in
                        </a>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default Register;