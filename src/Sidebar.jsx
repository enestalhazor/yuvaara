function Sidebar() {
    return (
        <>
            <div className="p-4 flex flex-col gap-6 text-white">

                <div className="flex flex-col gap-2">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Species</p>
                    {["Dog", "Cat", "Bird", "Rabbit", "Fish"].map((item) => (
                        <label key={item} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input type="checkbox" className="accent-green-600" />
                            {item}
                        </label>
                    ))}
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Age</p>
                    {["Puppy", "Young", "Adult", "Senior"].map((item) => (
                        <label key={item} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input type="radio" name="age" className="accent-green-600" />
                            {item}
                        </label>
                    ))}
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Gender</p>
                    {["All", "Male", "Female"].map((item) => (
                        <label key={item} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input type="radio" name="gender" className="accent-green-600" />
                            {item}
                        </label>
                    ))}
                </div>

            </div>
        </>
    )
}

export default Sidebar