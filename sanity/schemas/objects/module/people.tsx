import {UsersIcon} from '@sanity/icons';

export default {
  name: 'module.people',
  title: 'People',
  type: 'object',
  icon: UsersIcon,
  fields: [
    {
      name: 'ref',
      title: 'Reference',
      type: 'string',
      description: 'lowercase only name that is used for scroll to component',
    },
    {
      name: 'sectionHeading',
      type: 'module.heading',
    },
    // Modules (Images)
    {
      name: 'people',
      title: 'People',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [
        {
          type: 'module.personReference',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      people0: 'people.0.person.name', // <- people.0 is a reference to people, and the preview component will automatically resolve the reference and return the name
      people1: 'people.1.person.name',
      people2: 'people.2.person.name',
      people3: 'people.3.person.name',
      people4: 'people.4.person.name',
      people5: 'people.5.person.name',
    },
    prepare: ({
      title,
      people0,
      people1,
      people2,
      people3,
      people4,
      people5,
    }) => {
      const people = [people0, people1, people2, people3, people4].filter(
        Boolean,
      );
      const subtitle = people.length > 0 ? `People: ${people.join(', ')}` : '';
      const hasMorepeople = Boolean(people5);
      return {
        title: hasMorepeople ? `${subtitle}…` : subtitle,
      };
    },
  },
};
