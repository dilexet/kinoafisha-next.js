import { useAppSelector } from "@/modules/shared/redux/hooks";
import { useState } from "react";
import CountriesComponent from "@/modules/countries/component";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";

export default function CountriesContainer({ values, setFieldValue }) {
  const countryState = useAppSelector((x) => x.countries_reducer);
  const [inputValue, setInputValue] = useState("");
  const [selectedCountries, setSelectedCountries] = useState(values.countries);

  const handleOnSubmit = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const newCountries = [...selectedCountries, inputValue];
      setSelectedCountries(newCountries);
      setFieldValue("countries", newCountries);
      setInputValue("");
    }
  };

  const handleInputChange = (event, value) => {
    setInputValue(value);
  };

  const handleChange = (event, value) => {
    setSelectedCountries(value);
    setFieldValue("countries", value);
  };

  if (countryState?.loadingStatus === LOADING_STATUSES.IDLE) {
    return (
      <CountriesComponent
        values={values}
        selectedCountries={selectedCountries}
        handleChange={handleChange}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleOnSubmit={handleOnSubmit}
        countries={countryState?.countries?.map((item) => item.name)}
      />
    );
  }
}
