import groq from 'groq';
import {MODULE_ACCORDION} from './modules/accordion';
import {MODULE_CALLOUT} from './modules/callout';
import {MODULE_CALL_TO_ACTION} from './modules/callToAction';
import {MODULE_COLLECTION} from './modules/collection';
import {MODULE_MEDIAOBJECT} from './modules/mediaObject';
import {MODULE_IMAGE} from './modules/image';
import {MODULE_INSTAGRAM} from './modules/instagram';
import {MODULE_PRODUCT} from './modules/product';
import {MODULE_STOCKISTS} from './modules/stockists';
import {MODULE_PEOPLE} from './modules/people';
import {MODULE_SWITCHBOARD} from './modules/switchboard';
import {MODULE_INVARLEY} from './modules/invarley';
import {MODULE_TABS} from './modules/tabs';
import {MODULE_BENEFIT} from './modules/benefit';
import {MODULE_VARIANTSORDER} from './modules/variantsOrder';

export const MODULES = groq`
  _key,
  _type,
  (_type == "module.accordion") => {
    ${MODULE_ACCORDION}
  },
  (_type == "module.callout") => {
    ${MODULE_CALLOUT}
  },
  (_type == 'module.callToAction') => {
    ${MODULE_CALL_TO_ACTION}
  },
  (_type == "module.collection") => {
    ${MODULE_COLLECTION}
  },
  (_type == "module.mediaObject") => {
    ${MODULE_MEDIAOBJECT}
  },
  (_type == "module.collectionCarousel") => {
    ${MODULE_COLLECTION}
  },
  (_type == "module.collectionListingCarousel") => {
    ${MODULE_COLLECTION}
  },
  (_type == "module.image") => {
    ${MODULE_IMAGE}
  },
  (_type == "module.instagram") => {
    ${MODULE_INSTAGRAM}
  },
  (_type == "module.product") => {
    ${MODULE_PRODUCT}
  },
  (_type == "module.stockists") => {
    ${MODULE_STOCKISTS}
  },
  (_type == "module.people") => {
    ref,
    ${MODULE_PEOPLE}
  },
  (_type == "module.switchboard") => {
    ${MODULE_SWITCHBOARD}
  },
  (_type == "module.#inVarley") => {
    ${MODULE_INVARLEY}
  },
  (_type == "module.tabs") => {
    ${MODULE_TABS}
  },
  (_type == "module.benefit") => {
    ${MODULE_BENEFIT}
  },
  (_type == "module.variantsOrder") => {
    ${MODULE_VARIANTSORDER}
  },
  (_type == "module.scrollToSection") => {
    ...
  },
`;
