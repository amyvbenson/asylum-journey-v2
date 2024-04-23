import "./dialog.css";
import {
  Dialog as DialogComponent,
  DialogDismiss,
  DialogHeading,
} from "@ariakit/react/dialog";
import { ReactNode } from "react";
import Loader from "./Loader";

interface Props {
  children: ReactNode;
  heading?: string;
  loading?: boolean;
  onClose: () => void;
}

export default function Dialog({
  children,
  heading,
  loading = false,
  onClose,
}: Props) {
  return (
    <DialogComponent open onClose={onClose} className="dialog">
      {loading ? (
        <Loader />
      ) : (
        <>
          {heading && (
            <DialogHeading className="dialog__heading">
              {heading}
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

          {children}
        </>
      )}
    </DialogComponent>
  );
}
