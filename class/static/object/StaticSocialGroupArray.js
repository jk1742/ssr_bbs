import { SocialGroup }  from '/class/SocialGroup';
import PortraitBusinessMan  from '/static/img/portrait/avatar_06_business.svg';
import PortraitServiceMan   from '/static/img/portrait/avatar_07_service.svg';
import PortraitStudent      from '/static/img/portrait/avatar_08_student.svg';
import PortraitOldman       from '/static/img/portrait/avatar_09_matureman.svg';

/***
 * staic object: StaticSocialGroupArray
 * static-object must have a 'return value'.
 * static-object use as a function when it called: ex) staticCovid19()
 ***/
// Describe StatPoint Class below
const StaticSocialGroupArray = function() {
  // name, speed, health, recovery, img
  const carriage = [
    new SocialGroup('Student', 0.8, 0.9, 1, PortraitStudent),
    new SocialGroup('Pensioner', 0.8, 0.7, 1, PortraitOldman),
    new SocialGroup('business', 1, 1, 1, PortraitBusinessMan),
    new SocialGroup('service', 1.1, 1, 1, PortraitServiceMan)
  ];
  return carriage;
}

// Declare Point Class  *** Do not change line sequence *** ////////////////////
export { StaticSocialGroupArray };
