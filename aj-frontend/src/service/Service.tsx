import useFetch from "../hooks/useFetch";
import { getServiceQuery } from "../utils/queryBuilder";
import { Service as ServiceType } from "../types/dataTypes";

import { PortableText } from "@portabletext/react";

import Provider from "./components/Provider";
import Dialog from "../components/Dialog";
import "./service.css";
import { DisclosureProvider } from "@ariakit/react/disclosure";
import { useState } from "react";

interface Props {
  id: string;
  onClose: () => void;
}

export default function Service({ id, onClose }: Props) {
  const { loading, data: serviceArray = [] as ServiceType[] } = useFetch(
    getServiceQuery(id)
  );

  const service = serviceArray?.[0];

  return (
    <>
      <Dialog
        heading={getHeading({ loading, service })}
        loading={loading}
        onClose={onClose}
      >
        {service ? (
          <>
            <div className="print-hidden">
              <button
                className="button service__print-button"
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
                className="button service__feedback-link"
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

            <div className="service__bottom">
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
