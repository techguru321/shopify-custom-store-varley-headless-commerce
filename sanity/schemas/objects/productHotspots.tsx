import HotspotArray from 'sanity-plugin-hotspot-array';
import ProductTooltip from '../../components/hotspots/ProductTooltip';

export default {
  name: 'productHotspots',
  title: 'Hotspots',
  type: 'array',
  of: [
    {
      name: 'spot',
      type: 'module.spot',
    },
  ],
  inputComponent: HotspotArray,
  options: {
    hotspotImagePath: 'image',
    hotspotTooltip: ProductTooltip,
    imageHotspotPathRoot: 'parent',
  },
};
