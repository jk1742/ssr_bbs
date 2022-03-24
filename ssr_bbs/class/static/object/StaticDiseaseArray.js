import { Disease }  from '/class/Disease';
import Covid19  from '/static/img/disease/Covid19_01.svg';
import Rhino   from '/static/img/disease/Bacteria_01.svg';


/***
 * staic object: StaticDiseaseArray
 * static-object must have a 'return value'.
 * static-object use as a function when it called: ex) staticCovid19()
 ***/
// Describe StaticDiseaseArray Class below
const StaticDiseaseArray = function() {
  // name, damage, antiBodyAdapt, resistRating, immunityEx, img Ro:infection
  const carriage = [
    new Disease('Covid19', 35, -1, 2000, 5, Covid19, 5),
    new Disease('Rhino', 35, 1, 2000, 3, Rhino, 7),
    new Disease('VirusX', 80, -1, 2000, 5, Covid19, 5),
  ];
  return carriage;
}

// Declare Point Class  *** Do not change line sequence *** ////////////////////
export { StaticDiseaseArray };
