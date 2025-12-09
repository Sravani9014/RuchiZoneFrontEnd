

// SearchResults.jsx
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function SearchResults() {
  const location = useLocation();

  // URL ?query=
  const urlQuery = new URLSearchParams(location.search).get("query") || "";

  // Text typed in navbar (Redux slice)
  const searchSliceTerm = useSelector((state) => state.search?.term || "");

  // Final searchable text
  const query = (urlQuery || searchSliceTerm || "")
    .toString()
    .trim()
    .toLowerCase();

  // ============================
  // CORRECT REDUX SELECTORS
  // ============================

  const vegCandidates = useSelector(
    (state) => state.veg?.vegItems || []
  );

  const nonvegCandidates = useSelector(
    (state) => state.nonveg?.nonVegItems || []
  );

  const startersCandidates = useSelector(
    (state) => state.starters?.startersItems || []
  );

  const drinksCandidates = useSelector(
    (state) => state.drinks?.drinksItems || []
  );

  const iceCandidates = useSelector(
    (state) => state.icecreams?.iceItems || []
  );

  // ============================
  // MERGE + REMOVE DUPLICATES
  // ============================

  const allItems = useMemo(() => {
    const combined = [
      ...vegCandidates,
      ...nonvegCandidates,
      ...startersCandidates,
      ...drinksCandidates,
      ...iceCandidates,
    ].filter(Boolean);

    const map = new Map();
    combined.forEach((item) => {
      const key = item._id || item.id || item.name;
      if (!map.has(key)) map.set(key, item);
    });

    return Array.from(map.values());
  }, [
    vegCandidates,
    nonvegCandidates,
    startersCandidates,
    drinksCandidates,
    iceCandidates,
  ]);

  // ============================
  // FILTER RESULTS
  // ============================

  const filtered = useMemo(() => {
    if (!query) return [];

    return allItems.filter((item) => {
      const name = (item.name || "").toLowerCase();
      const desc = (item.desc || item.description || "").toLowerCase();

      return name.includes(query) || desc.includes(query);
    });
  }, [allItems, query]);

  // ============================
  // UI
  // ============================

  return (
    <div style={{ padding: 20 }}>
      <h2>
        Search Results{" "}
        {query ? (
          <>
            for <b>{query}</b>
          </>
        ) : null}
      </h2>
      <hr />

      {!query || filtered.length === 0 ? (
        <div style={{ padding: 20 }}>
          {!query ? (
            <h3>Type in the navbar search to find items</h3>
          ) : (
            <h3>
              No items found for <b>{query}</b>
            </h3>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {filtered.map((item) => (
            <div
              key={item._id || item.id || item.name}
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: 8,
                padding: 12,
                background: "#fff",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
              }}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: 140,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />
              ) : null}

              <h4 style={{ marginTop: 8 }}>{item.name}</h4>

              {item.desc ? (
                <p style={{ fontSize: 13, color: "#666" }}>{item.desc}</p>
              ) : null}

              {item.price !== undefined ? (
                <p style={{ fontWeight: 700 }}>₹{item.price}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

