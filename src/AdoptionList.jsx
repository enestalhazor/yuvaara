import { useLocation } from "react-router-dom"
import { AppContext, useContext } from "./AppContext"
import Form from "./Form";
import { backendStaticPP } from "./env";

function AdoptionList() {
    const { state } = useLocation();
    const { navigate } = useContext(AppContext);
    const list = state?.list;

    if (!list) {
        return <div className="text-white text-center mt-10">Not found.</div>
    }

    const statusColor = {
        Available: "bg-green-900/30 text-green-400 rounded-lg",
        Adopted: "bg-red-900/30 text-red-400 rounded-lg",
    };

    return (
        <div className="min-h-screen bg-black px-4 pt-12">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="text-xs text-zinc-500 hover:text-white mb-6 transition-colors block"
                >
                    ← Back
                </button>
                <div className="flex gap-6">
                    <div className="flex-1 bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
                        <div className="flex gap-4 p-6">
                            <div className="w-48 h-48 flex-shrink-0 rounded-xl overflow-hidden">
                                <img
                                    src={`${backendStaticPP}/${list.photo_url}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <p className="text-xl font-semibold text-white">{list.name}</p>
                                    </div>
                                    <span className={statusColor[list.status] ?? "bg-gray-900/30 text-gray-400"}>
                                        {list.status}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-2.5">
                                    {[
                                        { label: "Species", value: list.species },
                                        { label: "Breed", value: list.breed },
                                        { label: "Age", value: `${list.age} years` },
                                        { label: "Gender", value: list.gender },
                                        { label: "Color", value: list.color },
                                        { label: "Location", value: list.location },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="bg-zinc-900 rounded-xl p-3">
                                            <p className="text-xs text-zinc-500 mb-1">{label}</p>
                                            <p className="text-sm font-medium text-white">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-80 flex-shrink-0">
                        <Form listId={list.id} status={list.status} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdoptionList;