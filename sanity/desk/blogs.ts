import S from '@sanity/desk-tool/structure-builder';

// prettier-ignore
export const blogs = S.listItem()
  .title('Blogs')
  .schemaType('blogs')
  .child(
    S.editor()
      .title('Blogs')
      .schemaType('blogs')
      .documentId('blogs'),
  )
