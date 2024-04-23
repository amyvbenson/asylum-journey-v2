export default {
  name: 'service',
  type: 'document',
  title: 'Service',
  groups: [
    {
      name: 'review',
      title: 'Review information',
    },
  ],
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule: {required: () => any}) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule: {required: () => any}) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    },

    {
      name: 'events',
      title: 'Classes and events',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {
      name: 'stages',
      type: 'array',
      title: 'Stages',
      of: [{type: 'reference', to: {type: 'stage'}}],
    },
    {
      name: 'providers',
      type: 'array',
      title: 'Providers',
      of: [{type: 'reference', to: {type: 'provider'}}],
    },
    {
      name: 'resources',
      type: 'array',
      title: 'Resources',
      of: [{type: 'reference', to: {type: 'resource'}}],
    },
    {
      name: 'lastReviewDate',
      type: 'date',
      title: 'Last review date',
      group: 'review',
    },
    {
      name: 'lastReviewedBy',
      type: 'string',
      title: 'Last reviewed by',
      group: 'review',
    },
    {
      name: 'lastReviewComments',
      type: 'text',
      title: 'Last review comments',
      group: 'review',
      rows: 2,
    },
    {
      name: 'nextReviewDate',
      type: 'date',
      title: 'Next review date',
      group: 'review',
    },
    {
      name: 'nextReviewComments',
      type: 'text',
      title: 'Next review comments',
      group: 'review',
      rows: 2,
    },
    {
      name: 'endDate',
      type: 'date',
      title: 'End date',
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
      group: 'review',
    },
    {
      name: 'dataMaintainer',
      type: 'string',
      title: 'Data maintainer',
      group: 'review',
    },
    {
      name: 'externalReviews',
      type: 'text',
      title: 'External reviews',
      group: 'review',
      rows: 2,
    },
  ],
}
