import UserIcon from '@sanity/icons';

export default {
  name: 'document.person',
  title: 'People',
  type: 'document',
  icon: UserIcon,
  fields: [
    // Image
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        'Some frontends will require a slug to be set to be able to show the person',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
    {
      name: 'bio',
      type: 'bioPortableText',
      title: 'Biography',
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
    },
  ],
  preview: {
    select: {
      fileName: 'image.asset.originalFilename',
      image: 'image',
      variant: 'variant',
      name: 'name',
      role: 'role',
    },
    prepare(selection) {
      const {fileName, image, variant, name, role} = selection;

      return {
        media: image,
        title: name,
        subtitle: role,
      };
    },
  },
};
