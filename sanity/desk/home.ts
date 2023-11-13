import S from '@sanity/desk-tool/structure-builder';
import EyeIcon from 'part:@sanity/base/eye-icon';
import EditIcon from 'part:@sanity/base/edit-icon';
import IframePreviewHome from '../components/previews/iframe/IframePreviewHome';

// prettier-ignore
export const home = S.listItem()
  .title('Home')
  .schemaType('home')
  .child(
    S.editor()
      .title('Home')
      .schemaType('home')
      .documentId('home')
      .views([
        S.view.form().icon(EditIcon),
        S.view
          .component(IframePreviewHome)
          .icon(EyeIcon)
          .title('Web Preview')
      ])
  )
