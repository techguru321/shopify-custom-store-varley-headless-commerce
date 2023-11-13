// import type {SanityModuleFailsafe} from '../../../types';
import Heading from '../../global/Heading.server';

// type Props = {
//   module?: SanityModuleFailsafe;
// };

export default function FailsafeBlock({node}) {
  return (
    <div className="text-center">
      <Heading item={node} />
    </div>
  );
}
