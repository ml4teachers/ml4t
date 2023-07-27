import Link from "next/link";

<div className="mt-16 flex justify-center">
    <div className="flex justify-center">
        <div className="flex flex-col">
            <div className="flex text-gray-900 text-4xl font-bold">Song Recommender</div>
            <div className="flex mt-8 max-w-lg justify-center">
                <iframe style={{borderRadius: "12px"}} src="https://open.spotify.com/embed/playlist/552YIVHyBuQBh7t2wgOupQ?utm_source=generator" width="500" height="470" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
            </div>
            <div className="flex justify-center">
                <Link href="/song-recommender">
                    <button className="flex hover:shadow-none hover:bg-[#9D6484] mx-4 w-28 h-10 p-2 bg-[#8D5A77] text-white justify-center rounded-lg shadow-lg mt-8">
                        <div className="flex">zurück</div>
                    </button>
                </Link>
                <Link href="/song-recommender/summary">
                    <button className="flex hover:shadow-none  hover:bg-[#9D6484]  mx-4 w-28 h-10 p-2 bg-[#8D5A77] text-white justify-center rounded-lg shadow-lg mt-8">
                        <div className="flex">
                        <div className="flex">Zusammenfassung</div>
                        </div>
                    </button>
                </Link>
            </div>
        </div>
    </div>
</div>