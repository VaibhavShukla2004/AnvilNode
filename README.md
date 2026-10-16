Workout - Exercise - Muscle Group,Equipment 
(Workout is a collection of exercises, exercises has a list of muscle groups and equipment needed)

Basic Schemas 
Follow the pattern - name, description, constraints/remarks

Workout 
    1.name 
    2.muscle Groups, list of muscle groups targeted by this workout, FK - Muscle Group
    3.exerciseList, list of exercises in the workout mapped to sets 
        Eg: Push : (Push-Ups: 3, Shoulder Press : 2, Lateral Raise: 2)
    4.noOfExercises, no of Exercises
    5.isPremade, a boolean that tells if workout belongs to user or is preMade

Exercise 
    1.Name
    2.Primary Muscle Group, Main Muscle Group, (FK - Muscle Group)
    3.Muscle Groups, A mapping between the muscle groups and the weightage of each muscle group (weightage bw 0,1), Muscle group FK 
      eg: for push Ups - (Chest : 0.6, Shoulders : 0.3, Triceps: 0.2)
    4.ImageUrl, url of the image of the exercise 
    5.Equipment, list of equipment needed, FK - Equipment

MuscleGroup
    1.Name
    2.ImageUrl, url of image of muscle 

Equipment 
    1.Name
    2.ImageUrl, url of Image of Equipment 




