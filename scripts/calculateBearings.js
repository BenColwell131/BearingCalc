// Imports
const fs = require('fs');
const path = require('path');

// Globals
const marks = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../', 'data', 'sampleMarks.json'))
);

// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * (180 / Math.PI);
};

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * (Math.PI / 180);
};

// Convert to decimal degrees (DD) from degrees and decimal minutes (DDM)
let latDD;
let longDD;
Object.keys(marks).forEach(markname => {
  const mark = marks[markname];
  latDD = mark.lattitude.deg + mark.lattitude.min / 60;
  longDD = mark.longitude.deg + mark.longitude.min / 60;
  marks[markname].latDD = latDD;
  marks[markname].longDD = -longDD; // TODO: this negative indicates W
});

// For each mark, compare against every other mark
Object.keys(marks).forEach(originMarkname => {
  const originMark = marks[originMarkname];
  Object.keys(marks).forEach(destMarkname => {
    if (originMarkname !== destMarkname) {
      const destMark = marks[destMarkname];
      // Calculate bearing
      const y =
        Math.sin(
          Math.radians(destMark.longDD) - Math.radians(originMark.longDD)
        ) * Math.cos(Math.radians(destMark.latDD));
      const x =
        Math.cos(Math.radians(originMark.latDD)) *
          Math.sin(Math.radians(destMark.latDD)) -
        Math.sin(Math.radians(originMark.latDD)) *
          Math.cos(Math.radians(destMark.latDD)) *
          Math.cos(
            Math.radians(destMark.longDD) - Math.radians(originMark.longDD)
          );
      let brng = Math.degrees(Math.atan2(y, x));
      brng = (brng + 360) % 360; //
      brng += 5; // Account for 5deg west variation of magnetic North.
      brng = Math.round(brng);
      marks[originMarkname].bearings[destMarkname] = brng;
    }
  });
});

// console.log(marks);
