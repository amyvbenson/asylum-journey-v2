import useFetch from "../hooks/useFetch";
import { getServiceQuery } from "../utils/queryBuilder";
import { Service as ServiceType } from "../types/dataTypes";
import {
  Dialog,
  DialogDismiss,
  DialogHeading,
  Disclosure,
  DisclosureContent,
  DisclosureProvider,
} from "@ariakit/react";
import { PortableText } from "@portabletext/react";
import "./service.css";
import Provider from "./Provider";

interface Props {
  id: string;
  onClose: () => void;
}

export default function Service({ id, onClose }: Props) {
  const { loading, data: serviceArray = [] as ServiceType[] } = useFetch(
    getServiceQuery(id)
  );

  const service = serviceArray?.[0];

  if (loading) {
    return <p>Loading</p>;
  }

  if (!service) {
    return <p>Can't find service</p>;
  }

  return (
    <Dialog open onClose={onClose} className="dialog">
      <DialogHeading className="details__heading ">
        {service.name}
        <DialogDismiss className="button">Close</DialogDismiss>
      </DialogHeading>

      <div className="details__inner">
        <div className="details__block">
          <PortableText value={service.description} />
        </div>
        <div className="details__block">
          {service.resources && service.resources.length > 0 && (
            <div className="details__section">
              <h2 className="details__sub-heading">Printable resources</h2>
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
            <div className="details__section">
              <h2 className="details__sub-heading">Providers</h2>

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

      <div className="details__bottom">
        <ul className="tag-list">
          {service.stages?.map((stage) => (
            <li className={`tag-list__tag bg-${stage._id}`} key={stage._id}>
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
    </Dialog>
  );
}
