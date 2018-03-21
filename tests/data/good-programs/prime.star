Origin default (0,0,0)
  Parameter n <0,0,1>
  id "_prime"
  Result <0,0,2>
    Control <0,1,0>

Accessor i (1,0,1)
  initialize
    primitive 2

Function "++" (1,0,0)
  Parameter <0,0,1>
    access i
  Control <0,0,2>

Function "p1 <= p2/2" (2,0,0)
  Parameter p1 <0,0,1>
    access i
  Parameter p2 <0,0,2>
    access n
  Return <0,0,3>
  Control <0,0,4>
  Control <0,0,5>

Function "p1 % p2" (3,0,0)
  Parameter p1 <0,0,1>
  Parameter p2 <0,0,2>

Conditional (4,0,0)
  Parameter condition <0,0,1>
  Control true <0,0,2>
  Control false <0,0,3>

Conditional (5,0,0)
  Parameter condition <0,0,1>
  Control true <0,0,2>
  Control false <0,0,3>

Link (4,0,2) (0,1,2) # conditional true <-> result control
Link (4,0,3) (0,1,2) # conditional false <-> result control
Link (1,0,2) (2,0,3) # i++ <-> i <= n/2
