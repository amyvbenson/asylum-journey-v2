export default {
  name: 'resource',
  type: 'document',
  title: 'Resource',
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
      validation: (Rule: { required: () => any; }) => Rule.required()
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL',
      validation: (Rule: { required: () => any; }) => Rule.required()
    },
    {
      name: 'expiryDate',
      type: 'date',
      title: 'Expiry date',
      options: {
        dateFormat: 'DD/MM/YYYY'
      }
    },
    {
      name: 'comments',
      type: 'text',
      title: 'Comments',
    },
    {
      name: 'lastReviewDate',
      type: 'date',
      title: 'Last review date',
      group: 'review',
      options: {
        dateFormat: 'DD/MM/YYYY'
      }
    },
    {
      name: 'lastReviewedBy',
      type: 'string',
      title: 'Last reviewed by',
      group: 'review'
    },
    {
      name: 'lastReviewComments',
      type: 'text',
      title: 'Last review comments',
      group: 'review',
      rows: 2
    },
    {
      name: 'nextReviewDate',
      type: 'date',
      title: 'Next review date',
      group: 'review',
      options: {
        dateFormat: 'DD/MM/YYYY'
      }
    },
    {
      name: 'nextReviewComments',
      type: 'text',
      title: 'Next review comments',
      group: 'review',
      rows: 2
    },
  ]
}