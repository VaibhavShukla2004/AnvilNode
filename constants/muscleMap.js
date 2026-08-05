const { muscleGroups, primaryMuscleGroups } = require("../constants/muscleGroups");

const muscleMap = {
    "Chest" : ["Upper Chest", "Lower Chest", "Middle Chest"],
    "Shoulders" : ["Front Delts", "Side Delts", "Rear Delts"],
    "Forearms" : ["Brachioradialis", "Forearm Flexors", "Forearm Extensors"],
    "Biceps" : ["Biceps"],
    "Triceps" : ["Tricep Long Head", "Tricep Lateral Head", "Tricep Medial Head"],
    "Back" : ["Lats", "Upper Back", "Lower Back", "Traps"],
    "Legs" : ["Quads", "Hamstrings", "Glutes", "Calves"],
    "Core" : ["Upper Abs","Lower abs", "Obliques"]
};

module.exports = muscleMap;


