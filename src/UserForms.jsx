import { useState, useEffect } from "react"
import { backendBaseUrl } from './lib/env'
import { useContext, AppContext } from "./lib/AppContext"
import { Trash2 } from "lucide-react"

function UserForms() {
    const [error, setError] = useState("")
    const [forms, setForms] = useState([])
    const { token, navigate } = useContext(AppContext)

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
                    res.json().then(data => {
                        setError(data.info)
                    })
                }
            })
    }

    useEffect(() => {
        fetchUserForms()
    }, [])

    return (
        <>
            {error && (
                <div key={error} onAnimationEnd={() => setError("")} className="z-[9999] fixed top-6 left-1/2 -translate-x-1/2 bg-red-50 border border-red-200 text-red-800 text-xs px-4 py-2.5 rounded-xl animate-fade-out">
                    {error}
                </div>
            )}
            <div className="min-h-screen flex flex-col items-center px-4 pt-12 bg-stone-200">
                <div className="flex flex-col w-full max-w-xl">
                    <button onClick={() => navigate(-1)} className="text-xs text-stone-400 hover:text-stone-950 mb-6 transition-colors self-start">
                        ← Back
                    </button>
                    <div className="flex flex-col gap-3 w-full">
                        {forms.length === 0 ? (
                            <div className="w-full text-center py-10 bg-white border border-stone-200 rounded-xl">
                                <p className="text-sm text-stone-400">No forms found.</p>
                            </div>
                        ) : (
                            forms.toReversed().map((form) => (
                                <div key={form.id} className="w-full bg-white border border-stone-200 rounded-xl p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-lg">
                                                🐾
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-stone-950">Adoption #{form.adoption_list_id}</p>
                                                <p className="text-xs text-stone-400">List ID: {form.adoption_list_id}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deleteForm(form.id)}
                                            className="bg-stone-100 w-7 h-7 rounded-lg border border-stone-200 flex items-center justify-center text-stone-400 hover:text-red-800 transition-colors"
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                    {form.message && (
                                        <p className="text-xs text-stone-500 mt-3 pt-3 border-t border-stone-200">
                                            {form.message}
                                        </p>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserForms;