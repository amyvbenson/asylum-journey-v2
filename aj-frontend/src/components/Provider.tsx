import {
  Disclosure,
  DisclosureContent,
  useDisclosureContext,
} from "@ariakit/react";
import { Provider as ProviderType } from "../types/dataTypes";

interface Props {
  provider: ProviderType;
}
export default function Provider({ provider }: Props) {
  const store = useDisclosureContext();
  const open = store?.useState().open;
  return (
    <>
      <Disclosure>
        <>
          {provider.name}
          {open ? "Hide" : "Show"}
        </>
      </Disclosure>
      <DisclosureContent>stuff</DisclosureContent>
    </>
  );
}
