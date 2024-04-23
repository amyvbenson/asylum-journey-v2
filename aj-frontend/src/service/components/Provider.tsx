import { Provider as ProviderType } from "../../types/dataTypes";
import "./provider.css";
import ProviderContent from "../../provider/ProviderContent";
import {
  Disclosure,
  DisclosureContent,
  useDisclosureContext,
} from "@ariakit/react";

interface Props {
  provider: ProviderType;
}
export default function Provider({ provider }: Props) {
  const store = useDisclosureContext();
  const open = store?.useState().open;

  return (
    <div className="provider">
      <h4>
        <Disclosure className="provider__heading">
          <>
            <span>{provider.name}</span>
            <span className="provider__toggle">{open ? "Hide" : "Show"}</span>
          </>
        </Disclosure>
      </h4>
      <DisclosureContent className="provider__content">
        <ProviderContent provider={provider} />
      </DisclosureContent>
    </div>
  );
}
