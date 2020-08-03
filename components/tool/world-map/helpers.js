import { traseOptions } from 'modules/tool/world-map/trase-options';

/**
 * Return name of the origin country corresponding to an ISO string
 * @param {string} iso ISO of the country
 */
export const getOriginCountryName = iso => {
  if (!iso || iso === '') {
    return null;
  }

  return traseOptions.countries.find(country => country.value === iso)?.label ?? null;
};

/**
 * Return name of the destination country corresponding to an ISO string
 * @param {string} iso ISO of the country
 * @param {Array<{ name: string, geo_id: string }>} topNodes Top nodes
 */
export const getDestinationCountryName = (iso, topNodes) => {
  if (!iso || iso === '') {
    return null;
  }

  return topNodes.find(node => node.geo_id === iso)?.name ?? null;
};

/**
 * Return the passed string with a title case (first letter uppercase, rest lowercase)
 * @param {string} str String to get a different case
 */
export const getTitleCase = str => str.toLowerCase().replace(/^\w/, c => c.toUpperCase());
