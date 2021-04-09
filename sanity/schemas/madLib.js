const madLib = {
  name: 'madLib',
  title: 'Mad Lib',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'story',
      type: 'array',
      of: [
        {
          type: 'block',
          of: [
            // this defines is in an inline object that can be embedded within
            // each line of text in the story.
            // https://www.sanity.io/docs/block-type#of-d0f97ffa1dd9
            {
              title: 'Placeholder',
              name: 'placeholder',
              type: 'object',
              fields: [
                {
                  title: 'Type',
                  description:
                    'The type of placeholder. E.g. Adjective, Noun, Celebrity, Animal',
                  name: 'type',
                  type: 'string',
                },
              ],
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default madLib;
