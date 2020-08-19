import { default as slugifyExt } from 'slugify';
import { format } from 'd3-format';

/**
 * Serialize some state as a base64 string
 * @param {any} state State to serialize
 */
export const serialize = state => {
  try {
    return btoa(JSON.stringify(state));
  } catch (e) {
    return '';
  }
};

/**
 * Deserialize a string encoded as base64
 * @param {string} string String to deserialize
 * @param {any} defaultState Default state if the deserialization fail
 */
export const deserialize = (string, defaultState = {}) => {
  try {
    return JSON.parse(atob(string));
  } catch (e) {
    return defaultState;
  }
};

/**
 * Return a slug based on a string
 * @param {string} string String to slugify
 */
export const slugify = string => slugifyExt(string).toLowerCase();

export const formatNumber = ({ num, unit }) => {
  if (num === undefined || num === null) {
    return '−';
  }

  // FIXME: this code is completely illegible
  if (unit === '') return format('.2f')(num);
  let p = unit === '%' ? '2' : '3';
  // @ts-ignore
  let numFormat = unit === '%' ? `.${p}r` : `.${p}s`;
  if (unit === 'counts') numFormat = ',.0f';
  const thres = unit === '%' ? 0.1 : 1;
  let formattedNum = num < thres && num > 0 ? `< ${thres}` : format(numFormat)(num);
  if (unit !== '%' && num < thres && num > 0.01) {
    formattedNum = format('.3r')(num);
  } else if (unit === 'ha' && num < 1000) {
    // @ts-ignore
    formattedNum = Math.round(num);
  } else if (num > 0 && num < 0.01 && unit !== '%') {
    formattedNum = '<0.01';
  }
  return `${formattedNum} ${unit && unit !== 'counts' ? unit : ''}`;
};
