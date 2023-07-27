import Link from "next/link";


<div className="mt-16 flex justify-center">
    <div className="flex flex-col">
        <div className="flex text-gray-900 text-4xl font-bold">Song Recommender</div>
        <div className="flex my-8">Klicke auf dein Geschlecht und erhalte personalisierte Musikvorschläge.</div>
        <div className="flex justify-center">
            <Link href="/song-recommender/recommender-w">
                <button className="flex hover:shadow-none hover:bg-pink-400 mx-4 w-16 h-8 text-xl bg-pink-300 text-white justify-center rounded-lg shadow-lg mt-8">
                    <div className="flex">w</div>
                </button>
            </Link>
            <Link href="/song-recommender/recommender-m">
                <button className="flex hover:shadow-none hover:bg-blue-400 mx-4 w-16 h-8 text-xl bg-blue-300 text-white justify-center rounded-lg shadow-lg mt-8">
                    <div className="flex">
                    <div className="flex">m</div>
                    </div>
                </button>
            </Link>
        </div>
    </div>
</div>