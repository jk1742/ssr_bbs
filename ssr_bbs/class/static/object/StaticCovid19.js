import { Disease }  from '/class/Disease';
/***
 * staic object: staticCovid19
 * static-object must have a 'return value'.
 * static-object use as a function when it called: ex) staticCovid19()
 ***/
// Describe StatPoint Class below
const StaticCovid19 = function() {
  const disease = [new Disease('Covid19', 35, -1, 2000, 8)];
  // End of Structure //////////////////////////////////////////////////////////
  Object.seal(disease);
  return disease;
}

// Declare Point Class  *** Do not change line sequence *** ////////////////////
export { StaticCovid19 };
