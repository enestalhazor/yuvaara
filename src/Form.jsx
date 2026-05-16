import { useState } from "react";
import { backendBaseUrl } from "./lib/env";
import { useContext, AppContext } from "./lib/AppContext";

function Form({ listId, status }) {
    const { token } = useContext(AppContext);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("message", message);
        formData.append("adoptionListId", listId);

        fetch(`${backendBaseUrl}/adoptionforms`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token
            },
            body: formData
        }).then(res => {
            if (res.status === 200) {
                setSuccess(true);
                setError("");
            } else {
                res.json().then(data => {
                    setError(data.info)
                })
            }
        });
    };

    return (
        <>
            {error && (
                <div key={error} onAnimationEnd={() => setError("")} className="z-[9999] fixed top-6 left-1/2 -translate-x-1/2 bg-red-50 border border-red-200 text-red-800 text-xs px-4 py-2.5 rounded-xl animate-fade-out">
                    {error}
                </div>
            )}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col gap-4">
                <p className="text-sm font-medium text-stone-950">Apply for Adoption</p>
                <p className="text-xs text-stone-400">Fill in the form to apply for this pet.</p>
                {success ? (
                    <div className="text-center py-6">
                        <p className="text-2xl mb-2">🐾</p>
                        <p className="text-sm font-medium text-stone-950">Application sent!</p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-stone-400">Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Tell us about yourself..."
                                className="bg-stone-100 border border-stone-200 rounded-xl p-3 text-sm text-stone-950 placeholder:text-stone-400 resize-none h-32 outline-none focus:border-stone-300"
                            />
                        </div>
                        {status !== "Adopted" && (
                            <button onClick={handleSubmit} className="w-full py-2.5 bg-green-700 hover:bg-green-600 text-stone-200 text-sm font-medium rounded-xl border border-stone-200 transition-colors">
                                Submit
                            </button>
                        )}
                    </>
                )}
            </div>
        </>);
}

export default Form;