export function getServiceSummariesQuery() {
  const query = encodeURIComponent(
    '*[_type == "service"]{ _id, slug, name, categories, description, providers[]->{_id}, resources[]->{_id}, stages } | order(name asc)'
  );
  return query;
}

export function getServiceQuery(slug: string) {
  const query = encodeURIComponent(
    `*[slug.current == "${slug}"]{_id, slug, name, description, events, categories[]->, providers[]->, resources[]->, stages[]-> }`
  );
  return query;
}

export function getCategoriesQuery() {
  const query = encodeURIComponent(
    '*[_type == "category"] | order(position asc)'
  );
  return query;
}

export function getProvidersQuery() {
  const query = encodeURIComponent(
    '*[_type == "provider"]{_id, name, description,postcode, website, address, contactName, twitter, phone, email, facebook}  | order(name asc)'
  );
  return query;
}

export function getResourcesQuery() {
  const query = encodeURIComponent('*[_type == "resource"]  | order(name asc)');
  return query;
}

export function getStagesQuery() {
  const query = encodeURIComponent('*[_type == "stage"]');
  return query;
}

export function search(searchTerm: string) {
  const query = encodeURIComponent(
    `*[_type in ["service", "provider", "resource"]][name match "${searchTerm}" || description[].children[].text match "${searchTerm}" || events[].children[].text match "${searchTerm}"]{_id, _type, slug, name, description, url} | order(name asc)`
  );
  return query;
}
