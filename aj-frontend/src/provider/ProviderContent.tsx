import { PortableText } from "@portabletext/react";
import { Provider } from "../types/dataTypes";

export default function ProviderContent({ provider }: { provider: Provider }) {
  return (
    <>
      <PortableText value={provider.description} />

      {provider.phone && (
        <p>
          <strong>Tel:</strong> {provider.phone}
        </p>
      )}
      {provider.email && (
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${provider.email} `}>{provider.email}</a>
        </p>
      )}
      {provider.website && (
        <p>
          <strong>Website:</strong>{" "}
          <a href={provider.website} rel="noopener" target="_blank">
            {provider.website}
          </a>
        </p>
      )}
      {provider.facebook && (
        <p>
          <strong>Facebook:</strong>{" "}
          <a href={provider.facebook} rel="noopener" target="_blank">
            {provider.facebook}
          </a>
        </p>
      )}
      {provider.twitter && (
        <p>
          <strong>Twitter:</strong>{" "}
          <a href={provider.twitter} rel="noopener" target="_blank">
            {provider.twitter}
          </a>
        </p>
      )}
      {provider.address && (
        <p>
          <strong>Address:</strong>{" "}
          <a href={getMapLink(provider)} rel="noopener" target="_blank">
            {provider.address}, {provider.postcode}
          </a>
        </p>
      )}
    </>
  );
}

// TO DO make this work
function getMapLink(provider: Provider) {
  const googleMapsUrl = "https://www.google.co.uk/maps/place/";
  return (
    googleMapsUrl +
    [provider.address, provider.postcode].join(" ").replace(/\s/g, "+")
  );
}
