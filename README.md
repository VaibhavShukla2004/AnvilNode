# AnvilNode

AnvilNode is an exercise and workout API centered around workouts, exercises, muscle groups, and equipment.

## Data model

### Workout

A workout is a collection of exercises.

| Field | Description | Constraints / remarks |
|---|---|---|
| `name` | Name of the workout. | |
| `muscleGroups` | Muscle groups targeted by the workout. | References muscle groups. |
| `exerciseList` | Exercises included in the workout, mapped to their set counts. | Example: Push-Ups (3 sets), Shoulder Press (2 sets), Lateral Raise (2 sets). |
| `noOfExercises` | Number of exercises in the workout. | |
| `isPremade` | Indicates whether the workout is a premade workout or belongs to a user. | Boolean. |

### Exercise

An exercise can target multiple muscle groups and may require equipment.

| Field | Description | Constraints / remarks |
|---|---|---|
| `name` | Name of the exercise. | |
| `primaryMuscleGroup` | Main muscle group targeted by the exercise. | References a muscle group. |
| `muscleGroups` | Muscle groups targeted by the exercise and their relative weightings. | Each weighting is between `0` and `1`. Example: Push-Ups — Chest (`0.6`), Shoulders (`0.3`), Triceps (`0.2`). |
| `imageUrl` | URL of an image for the exercise. | |
| `equipment` | Equipment required for the exercise. | References one or more equipment records. |

### Muscle group

| Field | Description | Constraints / remarks |
|---|---|---|
| `name` | Name of the muscle group. | |
| `imageUrl` | URL of an image for the muscle group. | |

### Equipment

| Field | Description | Constraints / remarks |
|---|---|---|
| `name` | Name of the equipment. | |
| `imageUrl` | URL of an image for the equipment. | |


## Algorithm

## Authentication / Authorization Levels