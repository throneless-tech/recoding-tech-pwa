const signup = {
  name: 'subscriber',
  title: 'Subscriber',
  type: 'document',
  fields: [
    {
      title: 'Email',
      name: 'email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Background or field',
      name: 'background',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Countries or geographies of interest',
      name: 'location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Tech policy areas of interest',
      name: 'policy',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'How could a resource like recoding.tech be most useful to you and your work?',
      name: 'uses',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default signup;
