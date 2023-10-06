// components/Recommender/SearchBar.tsx
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const SearchBar = ({ setSearchedMovies, setView }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    const { data, error } = await supabase.from('movies').select('*').ilike('title', `%${searchTerm}%`);
    if (!error && data) {
        setSearchedMovies(data);
        setView('grid');  // Wechseln Sie zurück zur Grid-Ansicht
    }
};

const handleRandom = async () => {
    const { data, error } = await supabase.from('random_movies').select('*').limit(20);
    if (!error && data) {
        setSearchedMovies(data);
        setView('grid');  // Wechseln Sie zurück zur Grid-Ansicht
    }
};

  return (
    <div className="my-4 flex items-center">
      <input
        type="text"
        placeholder="Film suchen..."
        className="p-2 border rounded w-auto"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button className="ml-4 border rounded p-2 bg-gray-100 hover:shadow-md hover:bg-gray-200" onClick={handleSearch}>Suche</button>
      <button className="ml-4 border rounded p-2 bg-gray-100 hover:shadow-md hover:bg-gray-200" onClick={handleRandom}>Random</button>
      <button className="ml-4 border rounded p-2 bg-gray-100 hover:shadow-md hover:bg-gray-200" onClick={() => setView('rated')}>Bewertungen</button>
    </div>
  );
};

export default SearchBar;
