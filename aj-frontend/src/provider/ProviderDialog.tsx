import { useSearchParams } from "react-router-dom";
import Dialog from "../components/Dialog";
import { DataContext, DataContextType } from "../contexts/dataContext";
import ProviderContent from "../provider/ProviderContent";
import { useContext } from "react";

interface Props {
  id: string;
}

export default function ProviderDialog({ id }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { providers } = useContext(DataContext) as DataContextType;
  const provider = providers.find((provider) => provider._id === id);

  return (
    <Dialog
      heading={provider ? provider.name : "Provider not found"}
      onClose={() => {
        searchParams.delete("provider");
        setSearchParams(searchParams);
      }}
    >
      {provider ? (
        <>
          <div className="dialog-actions print-hidden">
            <button
              className="button-tertiary"
              type="button"
              onClick={() => {
                if (window) {
                  window.print();
                }
              }}
            >
              Print
            </button>
            <a
              className="button-secondary"
              href={`mailto:admin@sheffield.cityofsanctuary.org?subject=Asylum Journey Provider Feedback: ${provider.name}`}
            >
              Send us feedback
            </a>
          </div>

          <ProviderContent provider={provider} />

          <div className="dialog-footer dialog-footer__link">
            <label htmlFor="provider-link">Permanent link:</label>
            <input
              type="text"
              readOnly
              value={`https://asylumjourney.org.uk/services?provider=${provider._id}`}
            />
          </div>
        </>
      ) : (
        <p>Not found.</p>
      )}
    </Dialog>
  );
}
