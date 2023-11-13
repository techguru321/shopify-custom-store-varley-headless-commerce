import React from 'react';
import {FaAlignCenter} from 'react-icons/fa';

const underlineIcon = () => <span style={{fontWeight: 'bold'}}>U</span>;
const underlineRender = (props) => (
  <span className="">
    {props.children}
    <hr />
  </span>
);

const textCenterRender = (props) => (
  <span className="text-center">{props.children}</span>
);

export default {
  name: 'body',
  title: 'Body',
  type: 'array',
  of: [
    {
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        annotations: [
          // Product
          {
            name: 'annotationProduct',
            type: 'annotationProduct',
          },
          // Email
          {
            name: 'annotationLinkEmail',
            type: 'annotationLinkEmail',
          },
          // Internal link
          {
            name: 'annotationLinkInternal',
            type: 'annotationLinkInternal',
          },
          // URL
          {
            name: 'annotationLinkExternal',
            type: 'annotationLinkExternal',
          },
        ],
        decorators: [
          {
            title: 'Italic',
            value: 'em',
          },
          {
            title: 'Strong',
            value: 'strong',
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
      },
      // Regular styles
      styles: [
        {
          blockEditor: {
            render: ({children}) => (
              <div style={{fontSize: '1.25rem', lineHeight: 1.25}}>
                {children}
              </div>
            ),
          },
          title: 'Heading',
          value: 'h2',
        },
      ],
      // Paragraphs
      type: 'block',
    },
    // Custom blocks
    {
      name: 'blockAccordion',
      type: 'module.accordion',
    },
    {
      name: 'blockCallout',
      type: 'module.callout',
    },
    {
      name: 'blockGrid',
      type: 'module.grid',
    },
    {
      name: 'blockImages',
      type: 'module.images',
    },
    {
      name: 'blockProducts',
      type: 'module.products',
    },
    {
      name: 'blockPeople',
      type: 'module.people',
    },
    {
      name: 'blockStockists',
      type: 'module.stockists',
    },
    {
      name: 'blockFailsafe',
      type: 'module.failsafe',
    },
    {
      name: 'blockSwitchboard',
      type: 'module.switchboard',
    },
    {
      name: 'blockBenefits',
      type: 'module.benefit',
    },
    {
      name: 'blockInVarley',
      type: 'module.#inVarley',
    },
    {
      name: 'blockTabs',
      type: 'module.tabs',
    },
    {
      name: 'blockShopTheLook',
      type: 'module.shopTheLook',
    },
    {
      name: 'blockScrollToSection',
      type: 'module.scrollToSection',
    },
    {
      name: 'blockDualMediaObject',
      type: 'module.dualMediaObject',
    },
    {
      name: 'blockStackedMediaObject',
      type: 'module.stackedMediaObject',
    },
    {
      name: 'blockReferAFriend',
      type: 'module.referAFriend',
    },
  ],
};
