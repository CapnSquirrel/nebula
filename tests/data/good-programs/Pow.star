# Recursive program for Pow

Origin default (0,0,0)
  Parameter b <0,0,1>
  Parameter p <0,0,2>
  id "_pow"
  Result <0,0,3>

Function ternary (1,0,0)
  Parameter condition <0,0,1>
  Parameter true <0,0,2>
    primitive 1
  Parameter false <0,0,3>
  Return <0,0,4>

Function "p1 == p2" (1,1,0)
  Parameter p1 <0,0,1>
    access p
  Parameter p2 <0,0,2>
    primitive 0
  Return <0,0,3>

Function ternary (2,0,0)
  Parameter condition <0,0,1>
  Parameter true <0,0,2>
    primitive 1
  Parameter false <0,0,3>
  Return <0,0,4>

Function "p1 < p2" (2,1,0)
  Parameter p1 <0,0,1>
    access p
  Parameter p2 <0,0,2>
    primitive 0
  Return <0,0,3>

# handle positive case

Function "p1 * p2" (3,0,0)
  Parameter p1 <0,0,1>
  Parameter p2 <0,0,2>
    access b
  Return <0,0,3>

Function "_fib" (4,0,0)
  Parameter b <0,0,1>
    access b
  Parameter p <0,0,2>
  Return <0,0,3>

Function "p1 - p2" (5,0,0)
  Parameter p1 <0,0,1>
    access p
  Parameter p2 <0,0,2>
    primitive 1
  Return <0,0,3>

# handle negative case

Function "p1 / p2" (6,0,0)
  Parameter p1 <0,0,1>
  Parameter p2 <0,0,2>
    access b
  Return <0,0,3>

Function "_fib" (7,0,0)
  Parameter b <0,0,1>
    access b
  Parameter p <0,0,2>
  Return <0,0,3>

Function "p1 + p2" (8,0,0)
  Parameter p1 <0,0,1>
    access p
  Parameter p2 <0,0,2>
    primitive 1
  Return <0,0,3>

Link (1,0,4) (0,0,3) # ternary1 return <-> Result
Link (1,1,3) (1,0,1) # p = 0 <-> ternary1 condition
Link (2,0,4) (1,0,3) # ternary2 return <-> ternary1 false
Link (2,1,3) (2,0,1) # p < 0 <-> ternary2 condition

Link (3,0,3) (2,0,3) # p1 x p2 <-> ternary2 false
Link (4,0,3) (3,0,1) # _fib result <-> p1
Link (5,0,3) (4,0,2) # p - 1 <-> _fib p

Link (6,0,3) (2,0,2) # p1 / p2 <-> ternary2 true
Link (7,0,3) (6,0,1) # _fib result <-> p1
Link (8,0,3) (7,0,2) # p + 1 <-> _fib p