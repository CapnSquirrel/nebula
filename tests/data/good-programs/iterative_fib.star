Origin default "_fib" (0,0,0)
  Argument number "n" <0,0,1>
  Result number <0,0,2>
    Control <0,0,1>

Accessor "a" (1,0,1)
  initialize number 0

Accessor "b" (1,0,2)
  initialize number 1

Accessor "c" (1,0,3)
  initialize number 0

Conditional (2,0,0)
  Parameter "condition" <0,0,1>
  Control true <0,0,2>
  Control false <0,0,3>

Function "p1 <= p2" (2,1,0)
  Parameter "p1" <0,0,1>
    access "c"
  Parameter "p2" <0,0,2>
    access "n"
  Return <0,0,3>
  Control <0,0,4>
  Control <0,0,5>

Function "++" <3,0,0>
  Parameter <0,0,1>
    access "c"
  Control <0,0,2>
  Control <0,0,3>

Function "p1 + p2" (4,0,0)
  Parameter "p1" <0,0,1>
    access "a"
  Parameter "p2" <0,0,2>
    access "b "
  Control <0,0,3>
  Control <0,0,4>
  Return <0,0,5>

Accessor "t" (5,0,0)
  Parameter "set" <0,0,1>
  Control <0,0,2>
  Control <0,0,3>

Accessor "a" (6,0,0)
  Parameter "set" <0,0,1>
    access "b"
  Control <0,0,2>
  Control <0,0,3>

Accessor "b" (7,0,0)
  Parameter "set" <0,0,1>
    access "t"
  Control <0,0,2>
  Control <0,0,3>

Link (2,0,3) (0,0,3) # conditional false <-> result control
Link (2,1,3) (2,0,1) # p1 <= p2 <-> condition
Link (2,0,2) (3,0,2) # conditional true <-> increment c control
Link (3,0,3) (4,0,3) # increment c control <-> p1 + p2
Link (4,0,5) (5,0,1) # p1 + p2 return <-> assign t parameter
Link (4,0,4) (5,0,2) # p1 + p2 control <-> assign t control
Link (5,0,3) (6,0,2) # assign t control <-> assign a control
Link (6,0,3) (7,0,2) # assign a control <-> assign b control
Link (7,0,3) (2,1,5) # assign b control <-> p1 <= p2 control
