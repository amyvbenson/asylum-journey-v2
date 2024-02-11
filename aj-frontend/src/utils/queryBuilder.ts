export function getServiceSummariesQuery() {
  const query = encodeURIComponent(
    '*[_type == "service"]{ _id, name, categories, providers[]->{_id}, resources[]->{_id}, stages }' // TO DO need refs here?
  );
  return query;
}

export function getServiceQuery(id: string) {
  const query = encodeURIComponent(
    `*[_id == "${id}"]{..., categories[]->, providers[]->, resources[]->, stages[]-> }`
  );
  return query;
}

export function getCategoriesQuery() {
  const query = encodeURIComponent('*[_type == "category"]');
  return query;
}

export function getProvidersQuery() {
  const query = encodeURIComponent('*[_type == "provider"]');
  return query;
}

export function getResourcesQuery() {
  const query = encodeURIComponent('*[_type == "resource"]');
  return query;
}

export function getStagesQuery() {
  const query = encodeURIComponent('*[_type == "stage"]');
  return query;
}
