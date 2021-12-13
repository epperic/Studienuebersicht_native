
import 'react-native';
import React from 'react';
import { splitIntoSemesters, onlyWithGrades, ToDoModules, calcAllECTS, calcAverageGrade } from '../../services/Modulservice';

const dummy1 = { "ects": 3, "id": "DLYrbhApd7NuNORfpXp9", "name": "Personal Skills I", "note": 1.7, "professor": "Greweeeeee", "semester": 1 }
const dummy2 = { "ects": 8, "id": "OjF2NME3lZgkXJSt3cBX", "name": "Grundlagen der Informatik II", "note": 2, "professor": "Stuckenholz", "semester": 2 }
const dummy3 = { "ects": 4, "id": "3zTpeOvgcxfsHovUfeXT", "name": "Technisches Englisch III", "note": 0, "professor": "Strack", "semester": 3 }
const dummy4 = { "ects": 3, "id": "Kb3tP6sBdrwA14te2hB8", "name": "Business Planning", "note": 1.7, "professor": "Harling", "semester": 4 }
const dummy5 = { "ects": 30, "id": "Jf239DbhdGTLKPteCbxU", "name": "Praxissemester", "note": 1.3, "professor": "Grewe", "semester": 5 }
const dummy6 = { "ects": 13, "id": "3cHdhdiVLz3j7pvjevdY", "name": "Projektarbeit ", "note": 0, "professor": "Nunkesser", "semester": 6 }
const dummy7 = { "ects": 14, "id": "4UUxAaKrZipDDiif4WmW", "name": "Bachelorarbeit", "note": 0, "professor": "Krenz-Baath", "semester": 7 }
const dummyArray = [dummy3, dummy7, dummy1, dummy4, dummy5, dummy2, dummy6];

describe('splitIntoSemesters splits an array of objects into seperate arrays based on property `semester`', () => {
  const splitArray = splitIntoSemesters(dummyArray);
  it('will create an additional array for each existing semester --> 8 Arrays', () => {
    expect(splitArray.length).toBe(8);
  });

  it('first array will be empty since all objects where transfered', () => {
    expect(splitArray[0]).toEqual(expect.arrayContaining([]));
  });

  it('second array will only have the first semester module in it', () => {
    expect(splitArray[1]).toEqual(expect.arrayContaining([dummy1]));
    expect(splitArray[1].length).toBe(1);
  });

  it('is sorted ascendingly', () => {
    expect(splitArray[1]).toEqual(expect.arrayContaining([dummy1]));
    expect(splitArray[2]).toEqual(expect.arrayContaining([dummy2]));
    expect(splitArray[3]).toEqual(expect.arrayContaining([dummy3]));
    expect(splitArray[4]).toEqual(expect.arrayContaining([dummy4]));
    expect(splitArray[5]).toEqual(expect.arrayContaining([dummy5]));
    expect(splitArray[6]).toEqual(expect.arrayContaining([dummy6]));
    expect(splitArray[7]).toEqual(expect.arrayContaining([dummy7]));
  });

  it('will return empty array if property semester is not found', () => {
    const arrayWithoutSemesterProperty = splitIntoSemesters([{ justATest: true }]);
    expect(arrayWithoutSemesterProperty).toEqual(expect.arrayContaining([]));
  });

});

describe('onlyWithGrades returns an array containing only modules where the property grade is != 0', () => {
  const onlyGrades = onlyWithGrades(dummyArray);
  it('contains 4 Modules', () => {
    expect(onlyGrades.length).toBe(4);
  });

  it('contains only modules where Grade != 0', () => {
    onlyGrades.forEach(module => {
      expect(module.note).not.toBe(0);
    });
  });

  it('is sorted ascendingly by property semester', () => {
    let semester = 1;
    onlyGrades.forEach(module => {
      expect(module.semester).toBeGreaterThanOrEqual(semester);
      semester = module.semester;
    });
  });
});

describe('toDoModules returns an array containing only modules where the property `note` is == 0 && property semester is below the given parameter', () => {

  //current Semester is 4
  const toDoModulesInSemester4 = ToDoModules(dummyArray, 4);
  it('Array contains 1 Module', () => {
    expect(toDoModulesInSemester4.length).toBe(1);
  });

  it('contains only modules where Grade == 0', () => {
    toDoModulesInSemester4.forEach(module => {
      expect(module.note).toBe(0);
    });
  });

  //current Semester is 8
  const toDoModulesInSemester8 = ToDoModules(dummyArray, 8);
  it('Array contains 3 Modules', () => {
    expect(toDoModulesInSemester8.length).toBe(3);
  });

  it('contains only modules where Grade == 0', () => {
    toDoModulesInSemester8.forEach(module => {
      expect(module.note).toBe(0);
    });
  });

  it('is sorted ascendingly by property semester', () => {
    let semester = 1;
    toDoModulesInSemester8.forEach(module => {
      expect(module.semester).toBeGreaterThanOrEqual(semester);
      semester = module.semester;
    });
  });

});

describe('calcAllECTS calcs the sum of all ects in a given array where property `note` is != 0 and returns a number' , () => {
  const calculatedECTS = calcAllECTS(dummyArray);
  it('is 44', () => {
    expect(calculatedECTS).toBe(44);
  });

  it('returns NaN if poperties do not exist', () => {
    const arrayWithoutProperties = [{test: true}, {test: true}, {test: true}]
    expect(calcAllECTS(arrayWithoutProperties)).toBe(NaN)
  });

});

describe('calcAverageGrade calcs the avg Grade of all Modules in a given array where property `note` is != 0 and returns a number' , () => {
  const calculatedavgGrade = calcAverageGrade(dummyArray);
  it('is 1.675', () => {
    expect(calculatedavgGrade).toBe(1.675);
  });

  it('returns NaN if poperties do not exist', () => {
    const arrayWithoutProperties = [{test: true}, {test: true}, {test: true}]
    expect(calcAverageGrade(arrayWithoutProperties)).toBe(NaN)
  });

});
