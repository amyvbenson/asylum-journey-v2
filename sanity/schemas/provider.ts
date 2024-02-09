export default {
  name: 'provider',
  type: 'document',
  title: 'Provider',
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
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'phone',
      type: 'string',
      title: 'Phone',
    },
    {
      name: 'email',
      type: 'string', // TO DO validation?
      title: 'Email',
    },
    {
      name: 'website',
      type: 'url',
      title: 'Website',
    },
    {
      name: 'facebook',
      type: 'url',
      title: 'Facebook',
    },
    {
      name: 'twitter',
      type: 'url',
      title: 'Twitter',
    },
    {
      name: 'contactName',
      type: 'string',
      title: 'Contact name',
    },
    {
      name: 'address',
      type: 'text',
      title: 'Address',
      rows: 3
    },
    {
      name: 'postcode',
      type: 'string',
      title: 'Postcode',
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
    {
      name: 'providerContact',
      type: 'text',
      title: 'Provider contact',
      group: 'review',
      rows: 2
    },
  ]
}



