import { useState } from "react";
import { backendBaseUrl } from "./env";
import { useContext, AppContext } from "./AppContext";

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
        });
    };

    return (
        <>
            {error && (
                <div
                    onAnimationEnd={() => setError("")}
                    className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-red-900/40 border border-red-500/30 text-red-400 text-xs px-4 py-2.5 rounded-xl animate-fade-out"
                >
                    {error}
                </div>
            )}
            <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                <p className="text-sm font-medium text-white">Apply for Adoption</p>
                <p className="text-xs text-zinc-500">Fill in the form to apply for this pet.</p>

                {success ? (
                    <div className="text-center py-6">
                        <p className="text-2xl mb-2">🐾</p>
                        <p className="text-sm font-medium text-white">Application sent!</p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-zinc-500">Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Tell us about yourself..."
                                className="bg-zinc-900 border border-white/10 rounded-xl p-3 text-sm text-white placeholder:text-zinc-600 resize-none h-32 outline-none focus:border-white/20"
                            />
                        </div>
                        {status != "Adopted" && (
                            <button
                                onClick={handleSubmit}
                                className="w-full py-2.5 bg-green-800 hover:bg-green-900 text-white text-sm font-medium rounded-xl transition-colors"
                            >
                                Submit
                            </button>
                        )}
                    </>
                )}
            </div>
        </>);
}

export default Form;