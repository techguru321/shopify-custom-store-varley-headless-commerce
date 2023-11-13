// `MyOuterServerComponent` can instantiate both the client and server
// components. You can pass in `<MyServerComponent/>` as
// the `children` prop to `MyClientComponent`.
import TabsComponent from './Tabs.client';
import PortableText from '../PortableText.server';
export default function TabsOuterBlock(node) {
  return (
    <>
      <TabsComponent>
        <PortableText blocks={node} />
      </TabsComponent>
    </>
  );
}
