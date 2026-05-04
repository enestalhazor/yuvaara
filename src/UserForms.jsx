import { useNavigate } from "react-router-dom";
import { AppContext, useContext } from "./AppContext"
import { useState, useEffect } from "react";
import { backendBaseUrl } from './env';
import { Trash2 } from "lucide-react";



function UserForms() {

    const [error, setError] = useState("")
    const [forms, setForms] = useState([])
    const { token } = useContext(AppContext)

    const fetchUserForms = () => {
        fetch(`${backendBaseUrl}/adoptionforms`, {
            headers: { "Authorization": "Bearer " + token }
        })
            .then(res => {
                if (res.status === 200) {
                    setError("")
                    return res.json().then(data => {
                        setForms(data)
                    })
                }
                else {
                    res.text().then((text) => {
                        setError(text)
                        console.log(error)
                    })
                }
            })
    }

    const deleteForm = (id) => {
        fetch(`${backendBaseUrl}/adoptionforms/` + id, {
            headers: { "Authorization": "Bearer " + token },
            method: "DELETE"
        })
            .then(res => {
                if (res.status === 200) {
                    setError("")
                    fetchUserForms()
                    return;
                }
                else {
                    res.text().then((text) => {
                        setError(text)
                        console.log(error)
                    })
                }
            })
    }

    useEffect(() => {
        fetchUserForms()
    }, [forms])

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <div className="flex flex-col items-center gap-3 w-full max-w-xl mx-auto">
                    {forms.length === 0 ? (
                        <div className="w-full text-center py-10 bg-zinc-950 border border-white/10 rounded-xl">
                            <p className="text-sm text-zinc-500">No forms found.</p>
                        </div>
                    ) : (
                        forms.map((form) => (
                            <div key={form.id} className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-lg">
                                            🐾
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">Adoption #{form.adoption_list_id}</p>
                                            <p className="text-xs text-zinc-500">List ID: {form.adoption_list_id} · User ID: {form.user_id}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => deleteForm(form.id)}
                                            className="bg-black w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-zinc-500 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                </div>
                                {form.message && (
                                    <p className="text-xs text-zinc-400 mt-3 pt-3 border-t border-white/8">
                                        {form.message}
                                    </p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default UserForms;