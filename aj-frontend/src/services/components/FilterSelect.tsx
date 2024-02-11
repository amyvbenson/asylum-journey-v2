import {
  DialogDismiss,
  DialogHeading,
  Select,
  SelectArrow,
  SelectItem,
  SelectItemCheck,
  SelectLabel,
  SelectPopover,
  SelectProvider,
} from "@ariakit/react";
import "./filterSelect.css";
import { useEffect, useState } from "react";

interface Option {
  _id: string;
  name: string;
}
interface Props {
  label: string;
  modal?: boolean;
  options: Option[];
  reset?: boolean;
  selectAllLabel: string;
  onChange: (values: string[]) => void;
}
export default function FilterSelect({
  label,
  modal = false,
  options,
  reset,
  selectAllLabel,
  onChange,
}: Props) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    onChange(selectedValues);
  }, [selectedValues]);

  useEffect(() => {
    if (reset) {
      setSelectedValues([]);
    }
  }, [reset]);

  function renderValue(values: string[]) {
    return (
      <>
        <strong>{label}:</strong>
        {values.length === 0 || values.length === options.length ? (
          <>&nbsp;All</>
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

  return (
    <SelectProvider value={selectedValues} setValue={setSelectedValues}>
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
        gutter={4}
        hideOnInteractOutside
        sameWidth={!modal}
        unmountOnHide
        modal={modal}
        className={`popover ${modal ? "popover-modal" : ""}`}
      >
        <>
          {modal && (
            <DialogHeading className="dialog__heading">
              {label}
              <DialogDismiss className="dialog__close print-hidden">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  width="24"
                  height="24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                <span className="sr-only">Close</span>
              </DialogDismiss>
            </DialogHeading>
          )}
          {options.map((option) => (
            <SelectItem
              key={option._id}
              value={option._id}
              className="select-item"
            >
              <SelectItemCheck
                render={() => <span className="select-item-check" />}
              />
              {option.name}
            </SelectItem>
          ))}
          <SelectItem
            className="select-item select-item--all"
            value="all"
            setValueOnClick={false}
            render={(renderProps) => {
              return (
                <div {...renderProps} onClick={() => setSelectedValues([])}>
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
