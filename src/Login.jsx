import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import TextLogo from "./TextLogo"

function Login() {

    return (
        <>
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
                <div className="absolute w-96 h-96 bg-green-600 rounded-full blur-3xl opacity-20 -top-20 -left-20" />
                <div className="absolute w-96 h-96 bg-orange-600 rounded-full blur-3xl opacity-20 -bottom-20 -right-20" />
                <Card className="w-full max-w-sm bg-black">
                    <CardHeader>
                        <TextLogo />
                        <CardTitle>Welcome</CardTitle>
                        <CardDescription>Sign in</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <Label>Email</Label>
                            <Input type="email" placeholder="yuvaara@example.com" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label>Password</Label>
                            <Input minLength={6} maxLength={25} type="password" placeholder="••••••••" />
                        </div>
                        <Button className=" w-full bg-green-800">Sign in</Button>
                    </CardContent>
                    <CardFooter className="justify-center text-sm bg-black">
                        Don't have an account?
                        <a href="/register" className="ml-1 text-foreground underline underline-offset-2 hover:opacity-80">
                            Sign up
                        </a>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default Login;