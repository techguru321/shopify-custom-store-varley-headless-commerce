import {HeartFilledIcon} from '@sanity/icons';

export default {
  name: 'document.inVarley',
  title: '#inVarley',
  type: 'document',
  icon: HeartFilledIcon,
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
    },
  ],
  preview: {
    select: {
      fileName: 'image.asset.originalFilename',
      image: 'image',
      name: 'caption',
    },
    prepare(selection) {
      const {fileName, image, name} = selection;

      return {
        media: image,
        title: name,
      };
    },
  },
};
