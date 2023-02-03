import { IconButton, InputAdornment, Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/search.module.css";

export default function SearchInput({
                                      searchInputOnFocused, search,
                                      handleSubmitSearch, handleInputChange,
                                      handleSearchInputFocused, handleClearInput,
                                    }) {
  return (
    <Box className={styles.search_input_box} onSubmit={handleSubmitSearch} component="form">
      <InputBase
        className={searchInputOnFocused ? styles.search_input_focus : styles.search_input}
        type="text"
        onFocus={() => handleSearchInputFocused(true)}
        onBlur={() => handleSearchInputFocused(false)}
        value={search}
        onChange={handleInputChange}
        placeholder="Search"
        endAdornment={
          <InputAdornment position="end">
            <IconButton size="small" onClick={handleClearInput}>
              <CloseIcon />
            </IconButton>
            <IconButton size="small" onClick={handleSubmitSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </Box>
  )
    ;
}