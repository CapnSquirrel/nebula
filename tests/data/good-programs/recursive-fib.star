Origin default (0,0,0)
  Parameter n <0,0,1>
  id "_fib"
  Result <0,0,2>
    Control <0,0,1>

Function ternary (0,1,0)
  Parameter T <0,0,1>
  Parameter F <0,0,2>
  Parameter cond <0,0,3>
  Return <0,0,4>
    Control <0,0,1>

Function p1 leq p2 (0,2,0)
  Parameter p1 <0,0,1>
    access n
  Parameter p2 <0,0,2>
    primitive 1
  Return <0,0,3>

Function p1 plus p2 (0,3,0)
  Parameter p1 <0,0,1>
  Parameter p2 <0,0,2>
  Return <0,0,3>

Function p1 minus p2 (0,4,0)
  Parameter p1 <0,0,1>
    access n
  Parameter p2 <0,0,2>
    primitive 1
  Return <0,0,3>

Function p1 minus p2 (0,5,0)
  Parameter p1 <0,0,1>
    access n
  Parameter p2 <0,0,2>
    primitive 2
  Return <0,0,3>


Link (0,0,2) (0,4,1) # Program result <-> ternary return
Link (0,1,3) (0,2,3) # Ternary condition <-> p1 <= p2 evaluation
Link (0,1,2) (0,3,3) # Ternary false param <-> p1 + p2
Link (0,3,1) (0,0,2) # p1 <-> return of recursive call of _fib
Link (0,3,2) (0,0,2) # p2 <-> return of recursive call of _fib
Link (0,4,3) (0,0,1) # p1 - p2 <-> parameter for recursive call of _fib
Link (0,5,3) (0,0,1) # p1 - p2 <-> parameter for recursive call of _fib
