/**
 * Annotations are ways of marking up text in the block content editor.
 *
 * Read more: https://www.sanity.io/docs/customization#f924645007e1
 */
 import {ItalicIcon} from '@sanity/icons'
 import React from 'react'
 
 export default {
   title: 'Italic',
   name: 'annotationItalic',
   type: 'object',
   blockEditor: {
     icon: () => <ItalicIcon />,
     render: ({children}) => (
       <span>
         <ItalicIcon
           style={{
             marginLeft: '0.05em',
             marginRight: '0.1em',
             width: '0.75em',
           }}
         />
         {children}
       </span>
     ),
   },
   fields: [
     // Italic
     {
       title: 'Italic',
       name: 'italic',
       type: 'italic',
     },
   ],
 }
 