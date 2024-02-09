export default {
  name: 'category',
  type: 'document',
  title: 'Category',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule: { required: () => any; }) => Rule.required()
    },
    {
      name: 'position',
      type: 'number',
      title: 'Position',
      validation: (Rule: { required: () => any; }) => Rule.required()
    },
  ]
}