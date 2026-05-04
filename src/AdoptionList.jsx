import { useLocation, useNavigate } from "react-router-dom"
import { AppContext, useContext } from "./AppContext"

function AdoptionList() {
    const { state } = useLocation();
    const { navigate } = useContext(AppContext);
    const list = state?.list;

    if (!list) return <div className="text-white text-center mt-10">Not found.</div>;

    const statusColor = list.status === "Available"
        ? "bg-green-900/30 text-green-400"
        : "bg-red-900/30 text-red-400";

    return (
        <div className="min-h-screen bg-black px-4 py-8">
            <div className="max-w-lg mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="text-xs text-zinc-500 hover:text-white mb-4 transition-colors block"
                >
                    ← Back
                </button>
                <div className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden">
                    <img
                        src={list.photo_url}
                        className="w-full h-64 object-cover"
                        onError={(e) => e.target.style.display = 'none'}
                    />

                    <div className="p-6">
                        <div className="flex items-start justify-between mb-5">
                            <div>
                                <p className="text-xl font-semibold text-white">{list.name}</p>
                                <p className="text-xs text-zinc-500 mt-1">{list.breed} · {list.location}</p>
                            </div>
                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor}`}>
                                {list.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5 mb-5">
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
                        <button
                            onClick={() => navigate(`/apply/${list.id}`)}
                            className="w-full py-2.5 bg-green-800 hover:bg-green-900 text-white text-sm font-medium rounded-xl transition-colors"
                        >
                            Apply for Adoption
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdoptionList;