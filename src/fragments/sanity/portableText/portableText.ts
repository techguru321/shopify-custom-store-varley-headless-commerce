import groq from 'groq';
import {MODULE_ACCORDION} from '../modules/accordion';
import {MODULE_CALLOUT} from '../modules/callout';
import {MODULE_GRID} from '../modules/grid';
import {MODULE_IMAGES} from '../modules/images';
import {MODULE_INSTAGRAM} from '../modules/instagram';
import {MODULE_PRODUCTS} from '../modules/products';
import {MODULE_PEOPLE} from '../modules/people';
import {MODULE_STOCKISTS} from '../modules/stockists';
import {MODULE_FAILSAFE} from '../modules/failsafe';
import {MODULE_SWITCHBOARD} from '../modules/switchboard';
import {MODULE_INVARLEY} from '../modules/invarley';
import {MODULE_TABS} from '../modules/tabs';
import {MODULE_BENEFIT} from '../modules/benefit';
import {MARK_DEFS} from './markDefs';

export const PORTABLE_TEXT = groq`
  ...,
  (_type == 'blockAccordion') => {
    ${MODULE_ACCORDION},
  },
  (_type == 'blockCallout') => {
    ${MODULE_CALLOUT}
  },
  (_type == 'blockGrid') => {
    ${MODULE_GRID},
  },
  (_type == 'blockImages') => {
    ${MODULE_IMAGES}
  },
  (_type == 'blockInstagram') => {
    ${MODULE_INSTAGRAM}
  },
  (_type == 'blockProducts') => {
    ${MODULE_PRODUCTS}
  },
  (_type == 'blockPeople') => {
    ${MODULE_PEOPLE}
  },
  (_type == 'blockStockists') => {
    ${MODULE_STOCKISTS}
  },
  (_type == 'blockFailsafe') => {
    ${MODULE_FAILSAFE}
  },
  (_type == 'blockSwitchboard') => {
    ${MODULE_SWITCHBOARD}
  },
  (_type == "module.#inVarley") => {
    ${MODULE_INVARLEY}
  },
  (_type == "blockInVarley") => {
    ${MODULE_INVARLEY}
  },
  (_type == "module.tabs" || _type == "blockTabs") => {
    ${MODULE_TABS}
  },
  (_type == "module.benefit") => {
    ${MODULE_BENEFIT}
  },
  (_type == "blockShopTheLook") => {
    ...
  },
  (_type == "blockScrollToSection") => {
    ...
  },
  (_type == "blockDualMediaObject") => {
    ...
  },
  (_type == "blockStackedMediaObject") => {
    ...
  },
  (_type == "blockReferAFriend") => {
    ...
  },
  markDefs[] {
    ${MARK_DEFS}
  }
`;
