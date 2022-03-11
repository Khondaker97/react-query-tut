import React, { useState } from "react";
import { useQuery } from "react-query";
import CharacterCard from "./CharacterCard";

export default function Characters() {
  const [page, setPage] = useState(1);
  const fetchCharacters = async () => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    return response.json();
  };
  const { data, isPreviousData, isLoading, isError } = useQuery(
    ["characters", page],
    fetchCharacters,
    {
      keepPreviousData: true,
    }
  ); // useQuery take two para (key, callback function) adn returns two things - data and status
  if (isLoading) {
    return (
      <div className="loading">
        <h3>Loading...</h3>
      </div>
    );
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="characters">
        {data.results.map((character) => (
          <CharacterCard character={character} />
        ))}
      </div>
      <div className="btn">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button
          disabled={isPreviousData && !data.info.next}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}
