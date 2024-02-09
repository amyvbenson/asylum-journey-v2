import { Schema } from '@sanity/schema'
import { htmlToBlocks } from '@sanity/block-tools'
import providers from './providers'
import resources from './resources'
import services from './services'

interface Service {
  _id: string;
  _type: string;
  name: string;
  categories?: any[] | null,
  dataMaintainer?: string | null,
  description?: any[] | null,
  endDate?: string | null,
  events?: any[] | null,
  externalReviews?: string | null,
  lastReviewComments?: string | null,
  lastReviewDate?: string | null,
  lastReviewedBy?: string | null,
  nextReviewDate?: string | null,
  nextReviewComments?: string | null,
  providers?: any[] | null,
  resources?: any[] | null,
  stages?: any[] | null
}

// Convert old json into correct format to import into Sanity
export default function convert() {
  const defaultSchema = Schema.compile({
    name: 'myBlog',
    types: [
      {
        type: 'object',
        name: 'blogPost',
        fields: [
          {
            title: 'Body',
            name: 'body',
            type: 'array',
            of: [{ type: 'block' }],
          },
        ],
      },
    ],
  })

  // The compiled schema type for the content type that holds the block array
  const blockContentType = defaultSchema
    .get('blogPost')
    .fields.find((field: any) => field.name === 'body').type


  const transformStages = (stages: any[]) => {
    return stages.map(stage => {
      return {
        "_ref": `stage-${stage.id}`,
        "_type": "reference"
      }
    })
  }
  const transformCategories = (categories: any[]) => {
    return categories.map(category => {
      return {
        "_ref": `category-${category.id}`,
        "_type": "reference"
      }
    })
  }
  const transformProviders = (providers: any[]) => {
    return providers.map(provider => {
      return {
        "_ref": `${provider.id}`,
        "_type": "reference"
      }
    })
  }
  const transformResources = (resources: any[]) => {
    return resources.map(resource => {
      return {
        "_ref": `resource-${resource.id}`,
        "_type": "reference"
      }
    })
  }


  const transformedProviders = providers.map(provider => {
    return {
      ...provider,
      description: provider.description ? htmlToBlocks(provider.description, blockContentType) : [],
      lastReviewDate: provider.lastReviewDate ? provider.lastReviewDate.split('T')[0] : null,
      nextReviewDate: provider.nextReviewDate ? (provider.nextReviewDate as string).split('T')[0] : null,
    }
  })

  // console.log('transformedProviders', transformedProviders)

  const transformedResources = resources.map(resource => {
    return {
      ...resource,
      expiryDate: resource.expiryDate ? resource.expiryDate.split('T')[0] : null,
      lastReviewDate: resource.lastReviewDate ? resource.lastReviewDate.split('T')[0] : null,
      nextReviewDate: resource.nextReviewDate ? (resource.nextReviewDate as string).split('T')[0] : null,
    }
  })

  // console.log('transformedResources', transformedResources)


  const transformedServices = services.map(service => {
    const formatted: Service = {
      _id: `service-${service.id}`,
      _type: "service",
      name: service.name,
      description: service.description ? htmlToBlocks(service.description, blockContentType) : [],
      endDate: service.endDate,
      dataMaintainer: service.dataMaintainer,
      events: service.events ? htmlToBlocks(service.events, blockContentType) : [],
      // categories: transformCategories(service._embedded.categories),
      // stages: transformStages(service._embedded.stages),
      // providers: service._embedded.providers && service._embedded.providers.length ? transformProviders(service._embedded.providers) : null,
      // resources: service._embedded.resources && service._embedded.resources.length ? transformResources(service._embedded.resources) : null,
      lastReviewDate: service.lastReviewDate ? (service.lastReviewDate as string).split('T')[0] : null,
      lastReviewedBy: service.lastReviewedBy,
      lastReviewComments: service.lastReviewComments,
      nextReviewDate: service.nextReviewDate ? (service.nextReviewDate as string).split('T')[0] : null,
      nextReviewComments: service.nextReviewComments,
      externalReviews: service.externalReviews
    }
    if (service._embedded.categories && service._embedded.categories.length) {
      formatted.categories = transformCategories(service._embedded.categories)
    }
    if (service._embedded.stages && service._embedded.stages.length) {
      formatted.stages = transformStages(service._embedded.stages)
    }
    if (service._embedded.providers && service._embedded.providers.length) {
      formatted.providers = transformProviders(service._embedded.providers)
    }
    if (service._embedded.resources && service._embedded.resources.length) {
      formatted.resources = transformResources(service._embedded.resources)
    }
    return formatted
  })

  console.log('transformedServices', transformedServices)
}