Origin default "_prime" (0,0,0)
  Argument number "n" <0,0,1>
  Result boolean <0,0,2>
    Control <0,1,0>

Accessor "i" (1,0,0)
  initialize number 2

Accessor "prime" (2,0,0)
  Control <0,0,1>
  Control <0,0,2> # false condition
  Control <0,0,3> # true condition

# Condition_1
Conditional (3,0,0)
  Parameter "condition" <0,0,1>
  Control "true" <0,0,2>
  Control "false" <0,0,3>

Function "p1 % p2 != 0" (4,0,0)
  Parameter "p1" <0,0,1>
    access "n"
  Parameter "p2" <0,0,2>
    access "i"
  Return <0,0,3>
  Control <0,0,4>

Function "++" (5,0,0)
  Parameter <0,0,1>
    access "i"
  Control <0,0,2>
  Control <0,0,3>

# Condition_2
Conditional (6,0,0)
  Parameter "condition" <0,0,1>
  Control "true" <0,0,2>
  Control "false" <0,0,3>

Function "p1 > (p2 / 2)" (7,0,0)
  Parameter "p1" <0,0,1>
    access "i"
  Parameter "p2" <0,0,2>
    access "n"
  Return <0,0,4>
  Control <0,0,5>

Link (0,1,2) (2,0,1) # value of prime <-> program result
Link (2,0,2) (3,0,3) # value of prime <-> Condition_1 false e.g. number is not prime
Link (2,0,3) (6,0,2) # value of prime <-> Condition_2 true e.g. number is prime
Link (3,0,1) (4,0,3) # return value of n % i != 0 <-> Condition_1 parameter
Link (4,0,4) (5,0,2) # n % i != 0 function control <-> i++ function control
Link (6,0,3) (5,0,3) # Condition_2 false <-> i++ function control
Link (6,0,1) (7,0,4) # return value of i > (n / 2) <-> Condition_2 parameter
Link (3,0,2) (7,0,5) # Condition_1 true <-> i > (n / 2) function control
