export default {
  name: 'stage',
  type: 'document',
  title: 'Stage',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule: { required: () => any; }) => Rule.required()
    },
  ]
}