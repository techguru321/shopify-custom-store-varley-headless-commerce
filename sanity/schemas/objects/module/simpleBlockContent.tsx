import React from 'react';
import {FaAlignCenter} from 'react-icons/fa';

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

const textCenterRender = (props) => (
  <span className="text-center">{props.children}</span>
);
export default {
  title: 'Simple Block Content',
  name: 'simpleBlockContent',
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
          {
            title: 'Text centre',
            value: 'brandTextCentre',
            blockEditor: {
              icon: FaAlignCenter,
              render: textCenterRender,
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
};
