import S from '@sanity/desk-tool/structure-builder';
import EyeIcon from 'part:@sanity/base/eye-icon';
import EditIcon from 'part:@sanity/base/edit-icon';
import IframePreview from '../components/previews/iframe/IframePreview';
import {DocumentsIcon} from '@sanity/icons';

// prettier-ignore
export const pages = S.listItem()
  .title('Pages')
  .icon(DocumentsIcon)
  .schemaType('page')
  .child(
    S.documentTypeList('page')
    .child(
    S.editor()
      .views([
        S.view.form().icon(EditIcon),
        S.view
          .component(IframePreview)
          .icon(EyeIcon)
          .title('Web Preview')
      ])
    )
  )
