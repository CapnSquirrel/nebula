Origin default (0,0,0)
  Parameter n <0,0,1>
  id "_fib"
  Result <0,0,2>
    Control <0,0,1>

id "a"
  primitive 0
id "b"
  primitive 1
id "c"
  primitive 0

Conditional (0,1,0)
  Parameter T <0,0,1>
    Control <0,0,1>
  Parameter F <0,0,3>
    Control <0,0,1>
  Parameter cond <0,0,5>

Function p1 leq p2 (0,2,0)
  Parameter p1 <0,0,1>
    access c
  Parameter p2 <0,0,2>
    access n
  Return <0,0,3>
  Control <0,0,4>

Function p1 plusplus (0,3,0)
  Parameter p1 <0,0,1>
    access c

Function p1 e p2 (0,4,0)
  Parameter p1 <0,0,1>
    access b
  Parameter p2 <0,0,2>
    access t
  Control <0,0,3>
  Control <0,0,4>

Function p1 plus p2 (0,5,0)
  Parameter p1 <0,0,1>
  Parameter p2 <0,0,2>
  Control <0,0,3>
  Control <0,0,4>
  Return <0,0,5>

id "t" (0,6,0)
  Control <0,0,1>
  Control <0,0,2>

Link (0,0,3) (0,1,2) # Result <-> Conditional true
Link (0,1,5) (0,2,3) # cond <-> p1<=p2 return
Link (0,2,4) (0,4,3) # p1<=p2 callback <-> b=t callback
Link (0,4,4) (0,6,1) # b=t callback <-> variable t callback
Link (0,1,3) (0,3,1) # conditional false <-> p1++ callback
Link (0,3,2) (0,5,3) # p1++ callback <-> p1+p2 callback
Link (0,5,4) (0,6,2) # p1+p2 callback <-> t callback
Link (0,5,5) (0,0,6) # p1+p2 return <-> variable t
