import useFetch from "../hooks/useFetch";
import { getServiceQuery } from "../utils/queryBuilder";
import { Service as ServiceType } from "../types/dataTypes";
import Provider from "./components/Provider";
import Dialog from "../components/Dialog";
import "./service.css";
import { DisclosureProvider } from "@ariakit/react/disclosure";
import { PortableText } from "@portabletext/react";
import { useSearchParams } from "react-router-dom";

interface Props {
  slug: string;
}

export default function ServiceDialog({ slug }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, data: serviceArray = [] as ServiceType[] } = useFetch(
    getServiceQuery(slug)
  );

  const service = serviceArray?.[0];

  return (
    <>
      <Dialog
        heading={getHeading({ loading, service })}
        loading={loading}
        onClose={() => {
          searchParams.delete("service");
          setSearchParams(searchParams);
        }}
      >
        {service ? (
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
                href={`mailto:admin@sheffield.cityofsanctuary.org?subject=Asylum Journey Service Feedback: ${service.name}`}
              >
                Send us feedback
              </a>
            </div>
            <div className="service">
              <div className="service__block">
                <PortableText value={service.description} />
                <div className="service__section">
                  {service.events && service.events?.length > 0 && (
                    <>
                      <h3>Classes and events</h3>
                      <PortableText value={service.events} />
                    </>
                  )}
                </div>
              </div>
              <div className="service__block">
                {service.resources && service.resources.length > 0 && (
                  <div className="service__section">
                    <h2 className="service__sub-heading">
                      Printable resources
                    </h2>
                    <ul>
                      {service.resources.map((resource) => (
                        <li key={resource._id}>
                          <a href={resource.url}>{resource.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {service.providers && service.providers.length > 0 && (
                  <div className="service__section">
                    <h2 className="service__sub-heading">Providers</h2>

                    {service.providers.map((provider) => {
                      return (
                        <DisclosureProvider key={provider._id}>
                          <Provider provider={provider} />
                        </DisclosureProvider>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="dialog-footer">
              <ul className="tag-list">
                {service.stages?.map((stage) => (
                  <li
                    className={`tag-list__tag bg-${stage._id}`}
                    key={stage._id}
                  >
                    {stage.name}
                  </li>
                ))}
                {service.categories?.map((category) => (
                  <li className="tag-list__tag" key={category._id}>
                    {category.name}
                  </li>
                ))}
              </ul>
              <div className="dialog-footer__link">
                <label htmlFor="provider-link">Permanent link:</label>
                <input
                  type="text"
                  readOnly
                  value={`${import.meta.env.VITE_PUBLIC_URL}services?service=${
                    service.slug.current
                  }`}
                />
              </div>
            </div>
          </>
        ) : (
          <p>Not found</p>
        )}
      </Dialog>
    </>
  );
}

function getHeading({
  loading,
  service,
}: {
  loading: boolean;
  service?: ServiceType;
}) {
  if (loading) {
    return "";
  }
  return service ? service.name : "Not found";
}
