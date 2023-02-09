import { ChangeEvent, useState } from "react";
import SearchInput from "@/modules/dashboard/shared/component/search-input";

export default function SearchInputContainer({ loadData }) {
  const [search, setSearch] = useState("");
  const [searchInputOnFocused, setSearchInputOnFocused] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    loadData(value);
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    loadData(search);
  };

  const handleClearInput = () => {
    setSearch("");
    loadData(null);
  };

  const handleSearchInputFocused = (isFocused: boolean) => {
    setSearchInputOnFocused(isFocused);
  };

  return (
    <SearchInput
      search={search}
      searchInputOnFocused={searchInputOnFocused}
      handleSearchInputFocused={handleSearchInputFocused}
      handleClearInput={handleClearInput}
      handleSubmitSearch={handleSubmitSearch}
      handleInputChange={handleInputChange}
    />
  );
}
