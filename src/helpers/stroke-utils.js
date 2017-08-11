import { isPropEmpty } from '../helpers/utils';

const xml2js = require('xml2js');

const builder = new xml2js.Builder();
const xmlParser = xml2js.parseString;
const htmlWhiteSpaceRegex = /\r?\n|\r|\s{2,}/g;

export function convertXMLToObject(xmlString) {
  let returnObject = null;

  // This is NOT Async
  xmlParser(xmlString, (error, result) => {
    if (error) throw error;
      returnObject = result;
  });

  return returnObject;
}

export function findAllKanjiComponents(startingElement, findAll = false) {
  const components = [];

  function findComponent(xmlElement, isMajor) {
    let flag = true;
    // If theres kvg:element, done
    if (xmlElement.$['kvg:element'] !== undefined) {
      if (isMajor === true || findAll) {
        components.push(xmlElement.$['kvg:element']);
        flag = false;
      }
    }

    // Otherwise find underneath
    continueMilling(xmlElement, flag);
  }

  function millElement(xmlElements, isMajor = true) {
    for (let i = 0; i < xmlElements.length; i += 1) {
      findComponent(xmlElements[i], isMajor);
    }
  }

  function continueMilling(xmlElement, isMajor = true) {
    if (xmlElement.g !== undefined) {
      millElement(xmlElement.g, isMajor);
    }
  }

  // Include the first character
  components.push(startingElement.$['kvg:element']);

  // Begin the search
  continueMilling(startingElement);
  return components;
}

export function findAllKanjiPaths(startingElement) {
  let paths = [];

  function findPaths(xmlElement) {
    continueMilling(xmlElement);
    addToPaths(xmlElement);
  }

  function millElement(xmlElements) {
    for (let i = 0; i < xmlElements.length; i += 1) {
      findPaths(xmlElements[i]);
    }
  }

  function addToPaths(xmlElement) {
    if (xmlElement.path !== undefined) {
      paths = paths.concat(xmlElement.path);
    }
  }

  function continueMilling(xmlElement) {
    if (xmlElement.g !== undefined) {
      millElement(xmlElement.g);
    }
  }

  findPaths(startingElement);

  return paths;
}

// Parse - stringify to deep copy, takes in a kanjiVG formatted XML
export function makeKanjiStrokeOrder(xmlElement, paths) {
  let svgs = [];
  // Initialize xmlElement path
  xmlElement.svg.g[0].path = [];

  for (let i = 0; i < paths.length; i += 1) {
    xmlElement.svg.g[0].path.push(paths[i]);
    svgs.push(builder.buildObject(xmlElement).replace(htmlWhiteSpaceRegex, ''));
  }

  return svgs;
}
