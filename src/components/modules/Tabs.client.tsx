// @ts-expect-error incompatibility with node16 resolution
// import type {PortableTextBlock} from '@portabletext/types';
import clsx from 'clsx';
import type {SanityModuleTabs} from '../../types';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import PortableText from '../portableText/PortableText.client';

// type Props = {
//   node: PortableTextBlock & SanityModuleTabs;
// };

export default function TabsModule({module}) {
  const tabs = module?.groups;
  return (
    <div className="">
      <Tabs>
        <TabList>
          {tabs.map((tab, i) => (
            <Tab key={i}>{tab.title}</Tab>
          ))}
        </TabList>
        {tabs.map((tab, i) => (
          <TabPanel key={i}>
            <PortableText blocks={tab.body} />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
