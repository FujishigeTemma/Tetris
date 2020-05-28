# Tetris
## Classification
- Tetromino Class
  - Deal with falling blocks.
  - Use a 4×4 sequence to deal with the state of tetromino.
- Field Class
  - Manage game field.
  - Treating field regions as arrays and controlling tetrominoes on the field.
- View Class
  - Handle the display process to the browser.
  - Displays the field and tetromino status on the screen.
- Game Class
  - Manipulating the game, dealing with the rules.
  - Processing parts of the rules other than the above class, such as increasing the speed of the automatic fall according to the score, etc.
  
## Design
In order to implement each class object-oriented, the following three points are considered in the design.
- Generic Feature - Generic class features and settings
  - A class-defined abstract behavior that is essentially immutable when inherited.
- Configurable　Feature - Functions and settings that can be configured by arguments, etc
  - Functions and settings that allow internal settings to be changed by specifying values from outside of instances such as constructors and method arguments, and that can be changed flexibly by changing the values.
- Extension - Functions and settings that can be extended at the time of inheritance
  - Functions and settings that can be changed in inheritance, although the actual status of the class is determined.

## Parameters
- Gravity
  - The falling speed of tetromino.
  - From 1 grid in 64 frames to 20 grids (20G) in one frame.
- Lock Delay
  - Time from the time the tetromino lands on the field to the time it is fixed.
  - This delay is reset every when the bottom of the tetromino falls.
- ARE(あれ)
  - The time interval from the time a tetramino is pinned to the field until the next tetramino appears.
  - Another parameter is assigned when the line is erased.
- DAS(Delayed Auto Shift)
  - Time from inputting left and right to the start of auto-repeat.
  - Auto-repeat: By holding down the left and right inputs for a certain amount of time, the inputs are made continuously in the same direction.When the auto-repeat is activated, it moves to the side of the grid for each frame.
- ARR(Auto Repeat Rate)
  - The time interval between auto-repeats.

### Tetromino Class
#### Generic Feature
- Defining the types of Tetromino
- Randomly select a type when creating an instance
- Manage the state of the Tetromino block and allows right and left rotation
#### Configureable Feature
- none
#### Extension
- Region size of Tetromino
- Types and block positions of Tetromino
- Random selection of Tetromino
- Rotational processing of Tetromino

### Field Class
#### Generic Feature
- Manage the state of blocks on the field
- Manage the Tetromino currently on the field
- Manage the Tetrominoes that fall after
- Accept the rotation command of the Tetromino, and rotate it if the Tetromino can rotate.
- Accept Tetromino's left and right movement commands, and move the Tetromino when it can move.
- Receives a move down command for the Tetromino, moves the Tetromino if it can move, and fixes it in the field if it cannot
- When all the rows are filled with blocks, delete the rows and move the blocks at the top down
- Set the next Tetromino in the field and generate the next Tetromino instance to fall
- Game over if there is a block outside the field or if the next Tetromino to fall overlaps with a block in the field
#### Configureable Feature
- Width and height of the field
- The number of subsequent Tetrominoes to be displayed
- Which Tetromino class to use
#### Extension
- Starting position of Tetromino

### View Class
#### Generic Feature
- Displaying the field
- Displaying Tetrominoes falling in the next
- Displaying scores, lines and levels
#### Configureable Feature
- Width and height of the field
- The number of subsequent Tetrominoes to be displayed
- Which Tetromino class to use
#### Extension
- Color for each type of block

### Game Class
#### Generic Feature
- Reception control for each operation
- Automatic fall processing
- Calculating scores and levels
- Control of the Tetromino display from one Tetromino fixation to the next
#### Configureable Feature
- none
#### Extension
- Which Tetromino class to use
- Which field class to use
- Which view class to use
- Width and height of the field
- The number of subsequent Tetrominoes to be displayed
- score setting
- Level Setting
- Automatic fall time
- Time after field fixation of Tetromino