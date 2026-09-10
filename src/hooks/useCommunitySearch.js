import { useState, useMemo } from "react";

export function useCommunitySearch(communities) {
  const [query, setQuery]     = useState("");
  const [isOpen, setIsOpen]   = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return communities;
    return communities.filter(
      (c) =>
        c.nameHebrew.includes(q) ||
        c.region.includes(q) ||
        c.id.toLowerCase().includes(q.toLowerCase())
    );
  }, [communities, query]);

  const handleSelect = (community) => {
    setSelected(community);
    setQuery(community.nameHebrew);
    setIsOpen(false);
  };

  const handleInputChange = (value) => {
    setQuery(value);
    setIsOpen(true);
    if (!value) setSelected(null);
  };

  const handleClear = () => {
    setQuery("");
    setSelected(null);
    setIsOpen(false);
  };

  return { query, isOpen, setIsOpen, selected, filtered, handleSelect, handleInputChange, handleClear };
}
