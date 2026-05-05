import { AppContext, useContext } from "./AppContext"
import { backendStaticPP } from "./env";


function AdoptionLists() {
  const { lists, navigate } = useContext(AppContext)

  return (
    <>
      <div className="grid md:grid-cols-4 xl:grid-cols-5 gap-3">
        {lists.map((list) => (
          <div key={list.id} className="flex flex-col cursor-pointer bg-zinc-950 group rounded-xl overflow-hidden">
            <div onClick={() => navigate(`/adoptionlist/${list.id}`, { state: { list } })} className="overflow-hidden">
              <img src={`${backendStaticPP}/${list.photo_url}`} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-3 flex flex-col gap-1">
              <p className="text-sm text-white">{list.name}</p>
              <p className="text-xs text-gray-300">{list.breed} · {list.age}</p>
              <p className="text-xs text-gray-500">{list.location}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default AdoptionLists;