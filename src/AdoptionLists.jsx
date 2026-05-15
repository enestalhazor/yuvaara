import { AppContext, useContext } from "./lib/AppContext"
import { backendStaticPP } from "./lib/env";


function AdoptionLists() {
  const { lists, navigate, token } = useContext(AppContext)

  return (
    <>
      <div className="grid md:grid-cols-4 xl:grid-cols-5 gap-3">
        {lists.map((list) => (
          <div key={list.id} className="flex flex-col cursor-pointer bg-white border border-stone-200 group rounded-xl overflow-hidden">
            <div onClick={() => {
              if (!token) { navigate("/login"); } else { navigate(`/adoptionlist/${list.id}`, { state: { list } }); }
            }} className="overflow-hidden">
              <img src={`${backendStaticPP}/${list.photo_url}`} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-3 flex flex-col gap-1">
              <p className="text-sm text-stone-950">{list.name}</p>
              <p className="text-xs text-stone-500">{list.breed} · {list.age}</p>
              <p className="text-xs text-stone-400">{list.location}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default AdoptionLists;