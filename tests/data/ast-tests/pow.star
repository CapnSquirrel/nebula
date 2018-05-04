# Recursive program for Pow

Origin default "_pow" (0,0,0)
  Argument number "b" <0,0,1>
  Argument number "p" <0,0,2>
  Result number <0,0,3>

Function "ternary" (1,0,0)
  Parameter "condition" <0,0,1>
  Parameter "true" <0,0,2>
    initialize number 1
  Parameter "false" <0,0,3>
  Return <0,0,4>

Function "equals" (1,1,0)
  Parameter "p1" <0,0,1>
    access number "p"
  Parameter "p2" <0,0,2>
    initialize number 0
  Return <0,0,3>

Function "ternary" (2,0,0)
  Parameter "condition" <0,0,1>
  Parameter "true" <0,0,2>
    initialize number 1
  Parameter "false" <0,0,3>
  Return <0,0,4>

Function "lessThan" (2,1,0)
  Parameter "p1" <0,0,1>
    access number "p"
  Parameter "p2" <0,0,2>
    initialize number 0
  Return <0,0,3>

# handle positive case

Function "multiply" (3,0,0)
  Parameter "p1" <0,0,1>
  Parameter "p2" <0,0,2>
    access number "b"
  Return <0,0,3>

Function "_pow" (4,0,0)
  Parameter "b" <0,0,1>
    access number "b"
  Parameter "p" <0,0,2>
  Return <0,0,3>

Function "subtract" (5,0,0)
  Parameter "p1" <0,0,1>
    access number "p"
  Parameter "p2" <0,0,2>
    initialize number 1
  Return <0,0,3>

# handle negative case

Function "divide" (6,0,0)
  Parameter "p1" <0,0,1>
  Parameter "p2" <0,0,2>
    access number "b"
  Return <0,0,3>

Function "_pow" (7,0,0)
  Parameter "b" <0,0,1>
    access number "b"
  Parameter "p" <0,0,2>
  Return <0,0,3>

Function "add" (8,0,0)
  Parameter "p1" <0,0,1>
    access number "p"
  Parameter "p2" <0,0,2>
    initialize number 1
  Return <0,0,3>

Link (1,0,4) (0,0,3)
Link (1,1,3) (1,0,1)
Link (2,0,4) (1,0,3)
Link (2,1,3) (2,0,1)

Link (3,0,3) (2,0,3)
Link (4,0,3) (3,0,1)
Link (5,0,3) (4,0,2)

Link (6,0,3) (2,0,2)
Link (7,0,3) (6,0,1)
Link (8,0,3) (7,0,2)
