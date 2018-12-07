Origin default "hello" (0,0,0)
  Result string <0,0,1>

Function "writeVal"(10,0,0)
  Parameter "obj" <0,1,0>
    initialize object "{\"x\":\"help\"}"
  Parameter "key" <0,2,0>
    initialize string "x"
  Parameter "val" <0,3,0>
    initialize string "potato"
  Return <1,0,0>

Function "getVal" (0,1,0)
  Parameter "obj" <0,1,0>
  Parameter "key" <1,0,0>
    initialize string "x"
  Return <0,2,0>

Link (11,0,0) (0,2,0)
Link (0,3,0) (0,0,1)
