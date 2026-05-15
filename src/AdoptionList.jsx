import { useLocation } from "react-router-dom"
import { AppContext, useContext } from "./lib/AppContext"
import Form from "./Form";
import { backendStaticPP } from "./lib/env";

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
        <div className="min-h-screen bg-stone-200 px-4 pt-12">
            <div className="max-w-5xl mx-auto">
                <button onClick={() => navigate(-1)} className="text-xs text-stone-400 hover:text-stone-950 mb-6 transition-colors block">
                    ← Back
                </button>
                <div className="flex gap-6">
                    <div className="flex-1 bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col">
                        <div className="flex gap-4 p-6">
                            <div className="w-48 h-48 flex-shrink-0 rounded-xl overflow-hidden">
                                <img src={`${backendStaticPP}/${list.photo_url}`} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <div className="flex items-start justify-between mb-4">
                                    <p className="text-xl font-semibold text-stone-950">{list.name}</p>
                                    <span className={statusColor[list.status] ?? "bg-stone-100 text-stone-400 text-xs px-3 py-1 rounded-full font-medium"}>
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
                                        <div key={label} className="bg-stone-100 rounded-xl p-3">
                                            <p className="text-xs text-stone-400 mb-1">{label}</p>
                                            <p className="text-sm font-medium text-stone-950">{value}</p>
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