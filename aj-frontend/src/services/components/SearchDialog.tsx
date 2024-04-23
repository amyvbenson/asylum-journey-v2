import Dialog from "../../components/Dialog";
import useFetch from "../../hooks/useFetch";
import { search } from "../../utils/queryBuilder";
import { BlockLike, SearchResult } from "../../types/dataTypes";
import Loader from "../../components/Loader";
import "./searchDialog.css";
import { toPlainText } from "@portabletext/react";
import { useSearchParams } from "react-router-dom";

const descriptionLimit = 200;

interface Props {
  searchTerm: string;
}

export default function SearchDialog({ searchTerm }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { loading, data: results = [] as SearchResult[] } = useFetch(
    search(searchTerm)
  );

  const orderedServices =
    orderSearchResultsByName({
      results: results?.filter((result) => result._type === "service"),
      searchTerm,
    }) ?? [];

  const orderedProviders =
    orderSearchResultsByName({
      results: results?.filter((result) => result._type === "provider"),
      searchTerm,
    }) ?? [];

  const resources =
    results?.filter((result) => result._type === "resource") ?? [];

  return (
    <Dialog
      heading={`Search results for "${searchTerm}"`}
      onClose={() => {
        searchParams.delete("q");
        setSearchParams(searchParams);
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <div className="search-results">
          <div className="search-results__list">
            <h2>Services ({orderedServices?.length} results)</h2>
            {orderedServices.length ? (
              <ul>
                {orderedServices?.map((service) => (
                  <li key={service._id}>
                    <h3>
                      <button
                        className="button-text"
                        type="button"
                        onClick={() => {
                          setSearchParams(() => {
                            searchParams.set("service", service.slug.current);
                            searchParams.delete("q");
                            return searchParams;
                          });
                        }}
                      >
                        {service.name}
                      </button>
                    </h3>
                    <FormattedDescription description={service.description} />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No services found.</p>
            )}
          </div>
          <div className="search-results__list">
            <h2>Providers ({orderedProviders?.length} results)</h2>
            {orderedProviders.length ? (
              <ul>
                {orderedProviders?.map((provider) => (
                  <li key={provider._id}>
                    <h3>
                      <button
                        className="button-text"
                        type="button"
                        onClick={() => {
                          setSearchParams(() => {
                            searchParams.set("provider", provider._id);
                            searchParams.delete("q");
                            return searchParams;
                          });
                        }}
                      >
                        {provider.name}
                      </button>
                    </h3>
                    <FormattedDescription description={provider.description} />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No providers found.</p>
            )}
          </div>
          <div className="search-results__list">
            <h2>Resources ({resources?.length} results)</h2>
            {resources.length ? (
              <ul>
                {resources?.map((resource) => (
                  <li key={resource._id}>
                    <h3>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {resource.name}
                      </a>
                    </h3>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No resources found.</p>
            )}
          </div>
        </div>
      )}
    </Dialog>
  );
}

function orderSearchResultsByName({
  results,
  searchTerm,
}: {
  results?: SearchResult[];
  searchTerm: string;
}) {
  return results?.sort((a, b) => {
    if (
      a.name.toLowerCase().includes(searchTerm) &&
      !b.name.toLowerCase().includes(searchTerm)
    ) {
      return -1;
    }
    return 1;
  });
}

function FormattedDescription({
  description,
}: {
  description?: BlockLike | BlockLike[];
}) {
  if (!description) {
    return null;
  }
  const plainText = toPlainText(description);
  return (
    <p>
      {plainText.slice(0, descriptionLimit)}
      {plainText.length > descriptionLimit && "..."}
    </p>
  );
}
