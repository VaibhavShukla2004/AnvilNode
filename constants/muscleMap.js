const { muscleGroups, primaryMuscleGroups } = require("./muscleGroups");

const muscleMap = {
  [primaryMuscleGroups.chest]: [
    muscleGroups.upperChest,
    muscleGroups.middleChest,
    muscleGroups.lowerChest,
  ],

  [primaryMuscleGroups.shoulders]: [
    muscleGroups.frontDelts,
    muscleGroups.sideDelts,
    muscleGroups.rearDelts,
  ],

  [primaryMuscleGroups.back]: [
    muscleGroups.upperLats,
    muscleGroups.lowerLats,
    muscleGroups.upperBack,
    muscleGroups.lowerBack,
    muscleGroups.traps,
  ],

  [primaryMuscleGroups.biceps]: [
    muscleGroups.biceps,
  ],

  [primaryMuscleGroups.triceps]: [
    muscleGroups.tricepLongHead,
    muscleGroups.tricepLateralHead,
    muscleGroups.tricepMedialHead,
  ],

  [primaryMuscleGroups.forearms]: [
    muscleGroups.brachioradialis,
    muscleGroups.forearmFlexors,
    muscleGroups.forearmExtensors,
  ],

  [primaryMuscleGroups.core]: [
    muscleGroups.upperAbs,
    muscleGroups.lowerAbs,
    muscleGroups.obliques,
  ],

  [primaryMuscleGroups.legs]: [
    muscleGroups.quads,
    muscleGroups.hamstrings,
    muscleGroups.glutes,
    muscleGroups.calves,
  ],
};

module.exports = muscleMap;