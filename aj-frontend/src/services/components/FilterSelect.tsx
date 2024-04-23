import "./filterSelect.css";
import {
  Combobox,
  ComboboxItem,
  ComboboxItemCheck,
  ComboboxList,
  ComboboxProvider,
  Select,
  SelectArrow,
  SelectItem,
  SelectItemCheck,
  SelectLabel,
  SelectPopover,
  SelectProvider,
} from "@ariakit/react";
import { startTransition, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Option {
  _id: string;
  name: string;
}

interface Props {
  label: string;
  combobox?: boolean;
  name: string;
  options: Option[];
  selectAllLabel: string;
  onClickView?: (id: string) => void;
}

export default function FilterSelect({
  label,
  combobox = false,
  name,
  options,
  selectAllLabel,
  onClickView,
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialValue = searchParams.get(name);

  const [selectedValues, setSelectedValues] = useState<string[]>(
    initialValue ? initialValue.split(",") : []
  );

  useEffect(() => {
    if (!initialValue && selectedValues.length) {
      setSelectedValues([]);
    }
  }, [initialValue, selectedValues]);

  function handleChange(values: string[]) {
    if (values.length) {
      setSearchParams(() => {
        searchParams.set(name, values.join(","));
        return searchParams;
      });
    } else {
      searchParams.delete(name);
      setSearchParams(searchParams);
    }

    setSelectedValues(values);
  }

  function renderValue(values: string[]) {
    return (
      <>
        <strong>{label}:&nbsp;</strong>
        {values.length === 0 || values.length === options.length ? (
          <>All</>
        ) : (
          <span>
            {options.find((option) => option._id === values[0])?.name}
            {values.length > 1 && (
              <span className="filter__more-count">
                + {values.length - 1} more
              </span>
            )}
          </span>
        )}
      </>
    );
  }

  const [searchValue, setSearchValue] = useState("");

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [options, searchValue]);

  if (combobox) {
    return (
      <>
        <ComboboxProvider
          resetValueOnHide
          setValue={(value) => {
            startTransition(() => {
              setSearchValue(value);
            });
          }}
        >
          <SelectProvider value={selectedValues} setValue={handleChange}>
            <SelectLabel className="sr-only">{label}</SelectLabel>
            <Select
              className={`filter__toggle ${
                selectedValues.length > 1 ? "filter__toggle--many" : ""
              }`}
            >
              {renderValue(selectedValues)}
              <SelectArrow className="filter__toggle-arrow" />
            </Select>
            <SelectPopover
              className="filter-dropdown"
              flip="bottom"
              gutter={4}
              hideOnInteractOutside
              sameWidth
              unmountOnHide
            >
              <div className="combobox-wrapper">
                <Combobox placeholder="Search" focusOnMove={false} />
              </div>
              <ComboboxList>
                {filteredOptions.map((option) => (
                  <SelectItem
                    key={option._id}
                    value={option._id}
                    className="filter-item filter-item--combobox"
                    render={<ComboboxItem />}
                  >
                    <span className="filter-item__inner">
                      <ComboboxItemCheck
                        render={() => <span className="filter-item-check" />}
                      />
                      {option.name}
                    </span>
                    <button
                      className="button-tertiary"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        onClickView?.(option._id);
                      }}
                    >
                      View
                    </button>
                  </SelectItem>
                ))}
                {!filteredOptions.length && (
                  <div className="no-results">No results found</div>
                )}

                <SelectItem
                  className="filter-item filter-item--all"
                  value="all"
                  setValueOnClick={false}
                  render={
                    <ComboboxItem
                      render={(renderProps) => {
                        return (
                          <div
                            {...renderProps}
                            onClick={() => handleChange([])}
                          >
                            {selectAllLabel}
                          </div>
                        );
                      }}
                    />
                  }
                ></SelectItem>
              </ComboboxList>
            </SelectPopover>
          </SelectProvider>
        </ComboboxProvider>
      </>
    );
  }

  return (
    <SelectProvider value={selectedValues} setValue={handleChange}>
      <SelectLabel className="sr-only">{label}</SelectLabel>
      <Select
        className={`filter__toggle ${
          selectedValues.length > 1 ? "filter__toggle--many" : ""
        }`}
      >
        {renderValue(selectedValues)}
        <SelectArrow className="filter__toggle-arrow" />
      </Select>
      <SelectPopover
        className="filter-dropdown"
        gutter={4}
        hideOnInteractOutside
        sameWidth
        unmountOnHide
      >
        <>
          {options.map((option) => (
            <SelectItem
              key={option._id}
              value={option._id}
              className="filter-item"
            >
              <SelectItemCheck
                render={() => <span className="filter-item-check" />}
              />
              {option.name}
            </SelectItem>
          ))}
          <SelectItem
            className="filter-item filter-item--all"
            value="all"
            setValueOnClick={false}
            render={(renderProps) => {
              return (
                <div {...renderProps} onClick={() => handleChange([])}>
                  {selectAllLabel}
                </div>
              );
            }}
          ></SelectItem>
        </>
      </SelectPopover>
    </SelectProvider>
  );
}
