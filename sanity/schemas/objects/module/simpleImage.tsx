import {ImageIcon} from '@sanity/icons';

export default {
  name: 'module.simpleImage',
  title: 'Simple Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    // Image
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    },
    // Caption
    {
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
      hidden: ({parent}) => parent.variant !== 'caption',
    },
  ],
  preview: {
    select: {
      fileName: 'image.asset.originalFilename',
      image: 'image',
    },
    prepare(selection) {
      const {fileName, image} = selection;

      return {
        media: image,
        title: fileName,
      };
    },
  },
};
