Origin default "hello" (0,0,0)
  Result void <0,0,1>
    Control <0,0,1>            #global pos (0,0,2)

Function "print" (0,1,0)
  Parameter <0,1,0>
    initialize string "Hello, world!"
  Return <0,2,0>
    Control <0,1,0>                #global pos (0,4,0)

Link (0,4,0) (0,2,0)
