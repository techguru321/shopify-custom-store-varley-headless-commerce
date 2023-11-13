import React from 'react';

const underlineIcon = () => <span style={{fontWeight: 'bold'}}>U</span>;
const underlineRender = (props) => (
  <span className="">
    {props.children}
    <hr />
  </span>
);

const italicIcon = () => <span style={{fontWeight: 'bold'}}>I</span>;
const italicRender = (props) => (
  <span className="font-plantinItalic">{props.children}</span>
);

export default {
  title: 'Alert Block Content',
  name: 'alertBlockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Blockquote', value: 'blockquote'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'H5', value: 'h5'},
        {title: 'H6', value: 'h6'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Italic', value: 'italic'},
          {title: 'Code', value: 'code'},
          {
            title: 'Brand Italic',
            value: 'brandItalic',
            blockEditor: {
              icon: italicIcon,
              render: italicRender,
            },
          },
          {
            title: 'Brand Underline',
            value: 'brandUnderline',
            blockEditor: {
              icon: underlineIcon,
              render: underlineRender,
            },
          },
        ],
        annotations: [
          {
            name: 'color',
            title: 'Color',
            type: 'color',
          },
          {
            title: 'Link External',
            type: 'annotationLinkExternal',
          },
          {
            title: 'Link Internal',
            type: 'annotationLinkInternal',
          },
          {
            title: 'Link Email',
            type: 'annotationLinkEmail',
          },
        ],
      },
    },
  ],
  validation: Rule => Rule.custom(blocks => {
    let totalText = '';
    (blocks || []).forEach(block => {
      block.children.forEach(tag => {
        totalText += tag.text;
      });
    });
    return totalText.length < 45 
      ? true 
      : {
        message: 'Less than 46 characters is required.',
        paths: null
      }
  })
};
