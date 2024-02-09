import useFetch from './hooks/useFetch';


function App() {


  const QUERY = encodeURIComponent('*[_type == "service"]');



  const { VITE_PROJECT_ID, VITE_API_VERSION, VITE_DATASET } = import.meta.env

  // Compose the URL for your project's endpoint and add the query
  const URL = `https://${VITE_PROJECT_ID}.api.sanity.io/${VITE_API_VERSION}/data/query/${VITE_DATASET}?query=${QUERY}`;


  // TO DO extend sanity data type?
  interface Service {
    _id: string;
    _type: string;
    name: string;
    categories?: [],
    dataMaintainer?: string;
    description?: [],
    endDate?: string,
    events?: [],
    externalReviews?: string,
    lastReviewComments?: string,
    lastReviewDate?: string,
    lastReviewedBy?: string,
    providers?: [],
    resources?: [],
    stages?: []
  }

  const { loading, data: services = [] as Service[] } = useFetch(URL)
  console.log('data', services)



  return (
    <>
      <h1>Asylum Journey</h1>
      {loading ? <p>Loading</p> :
        <>
          {services && services.length > 0 &&
            <ul>
              {services.map(service => (<li key={service._id}>{service.name}</li>))}
            </ul>
          }
        </>
      }
    </>
  )
}

export default App
