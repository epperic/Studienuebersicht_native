export const fetchModules = (querySnapshot) => {
    const modules = [];
    querySnapshot.forEach((res) => {
        const { name, professor, ects, note, semester } = res.data();
        modules.push({
            id: res.id,
            name,
            professor,
            ects,
            note,
            semester
        });
    });
    return modules;
};

// top solution by maerics: https://stackoverflow.com/questions/14696326/break-array-of-objects-into-separate-arrays-based-on-a-property
export const splitIntoSemesters = (arr) => {
    return arr.reduce(function (memo, x) {
        if (!memo[x["semester"]]) { memo[x["semester"]] = []; }
        memo[x["semester"]].push(x);
        return memo;
    }, []);
}

export const onlyWithGrades = (modules) => {
    let filteredObjects = [];
    modules.forEach(function (obj) {
        if (obj.note != 0.0) {
            filteredObjects.push(obj);
        }
    });
    filteredObjects.sort((a, b) => a.semester - b.semester);
    return filteredObjects;
}


export const ToDoModules = (objects, currentSemester) => {
    let filteredObjects = [];
    objects.forEach(function (obj) {
        if (obj.note == 0 && obj.semester < currentSemester) {
            filteredObjects.push(obj);
        }
    });
    filteredObjects.sort((a, b) => a.semester - b.semester);
    return filteredObjects;
}

export const calcAllECTS = (objects) => {
    let CollectedECTS = 0;
    objects.forEach(function (modul) {
        if (modul.note != 0.0) {
            CollectedECTS += (modul.ects * 1);
        }
    });
    return CollectedECTS;
}

export const calcAverageGrade = (objects) => {
    let sum = 0;
    let count = 0;
    objects.forEach(function (modul) {
        if (modul.note != 0.0) {
            sum += (modul.note * 1);
            count++;
        }
    });
    return sum / count;
}
