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
  Parameter condition <0,0,1>
  Control true <0,0,2>
  Control false <0,0,3>

Function "p1 <= p2" (2,1,0)
  Parameter "p1" <0,0,1>
    access number "c"
  Parameter "p2" <0,0,2>
    access number "n"
  Return <0,0,3>

Function "++" <3,0,0>
  Parameter "p1" <0,0,1>
    access number "c"
  Return <0,0,2>
    Control <0,0,1>

Function "p1 + p2" (4,0,0)
  Parameter "p1" <0,0,1>
    access number "a"
  Parameter "p2" <0,0,2>
    access number "b"
  Return <0,0,3>
    Control <0,0,1>

Accessor "t" (5,0,0)
  Parameter "set" number <0,0,1>
  Control <0,0,2>

Accessor "a" (6,0,0)
  access number "b"
  Control <0,0,2>

Accessor "b" (7,0,0)
  access number "t"
  Control <0,0,2>

Link (2,0,3) (0,0,3) # conditional false -> result control
Link (2,1,3) (2,0,1) # p1 <= p2 return   -> condition
Link (2,0,2) (3,0,0) # conditional true  -> ++ c control
Link (3,0,3) (4,0,0) # ++ c control      -> p1 + p2
Link (4,0,3) (5,0,1) # p1 + p2 return    -> assign t parameter
Link (4,0,4) (5,0,0) # p1 + p2 control   -> assign t
Link (5,0,2) (6,0,0) # assign t control  -> assign a
Link (6,0,2) (7,0,0) # assign a control  -> assign b
Link (7,0,2) (2,1,0) # assign b control  -> p1 <= p2
