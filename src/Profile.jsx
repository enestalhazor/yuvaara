import { Avatar, AvatarImage } from "./components/ui/avatar";
import { CardFooter, CardHeader } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import TextLogo from "./TextLogo";

function Profile() {

    const [isDisabled, setIsDisabled] = useState(true)
    const navigate = useNavigate()

    return (
        <>
            <div className="flex flex-col items-center min-h-screen p-6 bg-black relative overflow-hidden">
                <div className="absolute w-96 h-96 bg-green-600 rounded-full blur-[120px] opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3" />
                <div className="absolute w-72 h-72 bg-green-500 rounded-full blur-[100px] opacity-15 top-1/3 left-1/2 -translate-x-1/2" />
                <div className="absolute w-80 h-80 bg-orange-600 rounded-full blur-[110px] opacity-15 top-2/3 left-1/2 -translate-x-1/2" />
                <Card className="w-full max-w-md shadow-lg rounded-2xl bg-black border-zinc-800 relative z-10">
                    <CardHeader className="flex flex-col items-center gap-4 pt-6">
                        <TextLogo />
                        {isDisabled ? (
                            <Button className="top-4 right-4" onClick={() => setIsDisabled(false)} variant="default">
                                Edit
                            </Button>
                        ) : (
                            <Button className="top-4 right-4" onClick={() => setIsDisabled(true)} variant="default">
                                Save
                            </Button>
                        )}
                        <Avatar className="w-20 h-20 border border-primary/20">
                            <AvatarImage src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`} />
                        </Avatar>
                        <h3>{"yuvaara"}</h3>
                        <div className="w-full space-y-4">
                            <div className="space-y-1">
                                <Label className="text-gray-400">Full Name</Label>
                                <Input
                                    disabled={isDisabled}
                                    className="text-lg font-semibold text-gray-200 placeholder-gray-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-400">Email</Label>
                                <Input
                                    disabled={isDisabled}
                                    className="text-gray-200 placeholder-gray-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-400">Phone</Label>
                                <Input
                                    disabled={isDisabled}
                                    className="text-gray-200 placeholder-gray-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-400">Password</Label>
                                <Input
                                    disabled={isDisabled}
                                    type="password"
                                    className="text-gray-200 placeholder-gray-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-400">Address</Label>
                                <Input
                                    disabled={isDisabled}
                                    className="text-gray-200 placeholder-gray-500"
                                />
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </>
    )
}

export default Profile;