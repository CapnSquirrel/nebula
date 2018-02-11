# Nebula
![](/images/logos/Nebula-logo-small.png)

# Programming in a Multidemensional Environment
Nebula is a programming language intended for expression. Its use of multidimensional logical constructs to perform actions between nodes likens it to a Turing Machine. These nodes are powerful; rather than simply holding data and linking to other structures, they can trigger actions on the global environment and ultimately cause the execution of functions whose return values may ripple back to the original node. Inspirations for the project include JavaScript, Python, Go, and Haskell. Many of the constructs in Nebula's standard library as well as its primitive structures and types are derived from these languages. Though it borrows some ideas from some of these well-known programming languages, Nebula also offers a new programming paradigm, "spatial programming", an intuitive and fresh way to work with scoping.

# Features
- _Dynamic_: Dynamically typed by default, but optional static typing can be enforced
- _Asynchronous_: Designed for asynchronous programming; can wait for events while retaining state
- _Functional_: The eager loading of parameters allows for the power of a functional language but also the flexibility of an imperative language
- _Object Oriented_: Editable properties can be attached to every construct in the language, and these objects can be mutable or immutable
- _Spatially Scoped_: Spatial programming is a brand new way of determining the realms within which variables and objects exist

# Hello, World!
Let's take a look at hello-world.star, a basic program written in Nebula. Additional, more complex, examples can be found below.
### Nebula Text
```
Origin default (0,0,0)
    id "hello"
    Result <0,0,1>
        Callback <0,0,1>            #global pos (0,0,2)
Function print (0,1,0)
    Parameter <0,1,0>
        primitive "Hello, world!"
    Callback <0,1,0>                #global pos (0,2,0)
Link (0,0,2) (0,2,0)
```
### Symbolic Diagram
![hello world](/example-programs/hello_world.png)

Unlike most programming languages, Nebula doesn't evaluate anything in order. A Nebula program is essentially a collection of linked nodes whose parameter values rely on the actions of other nodes. In hello-world.star, the action begins at the Result statement. Realizing that it requires a value, the Result statement queries its Control. The Control leads to a simple print function that does what you'd expect... writes to stdout. The print function has its own parameter to satisfy, and as denoted by the diagram, it has been linked to a primitive: the string "Hello, World!". Now, as the data ripples forward, the Result statement's Control query is satisfied. Note that every construct in the program text has an associated coordinate. This is because Nebula is built for programming in virtual reality. The location of every construct in 3D space is important for the spatial scoping and visual layout of the language, so coordinate tracking is necessary.

# Symbol Key

Nebula has both a textual and symbolic representation, and it is important to understand both. Here is a symbol key that should provide a better understanding of any symbolic diagrams of Nebula programs.

![symbol key](/images/symbol-key.png)

# Program Examples

## Fibonacci Sequence: Recursive
### Nebula Text
```
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
```
### Symbolic Diagram
![recursive fibonacci](/example-programs/recursive_fib.png)
## Fibonacci Sequence: Iterative
### Nebula Text
```
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

id "t"
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
```
### Symbolic Diagram
![iterative fibonacci](/example-programs/iterative_fib.png)

# Grammar (Ohm)
```
Nebula {
    Program         =  Object*
    Object          =  (Construct | Trait) newline Block?
    Construct       =  constructLabel Argument* Location+
    Trait           =  traitLabel Argument*
    Block           =  indent Object+ dedent
    constructLabel  =  "Origin" | "Result" | "Link" | "Accessor"
                    |  "Function" | "Conditional" | "Parameter"
                    |  "Control" | "Return" | "Yield" | "Error"
    traitLabel      =  "primitive" | "id" | "access" | "initialize"
    Argument        =  "default" | id | strlit | numlit
    Location        =  "(" Coordinate ")" | "<" Coordinate ">"
    Coordinate      =  numlit "," numlit "," numlit

    keyword         =  ( constructLabel | traitLabel ) ~idrest
    id              =  ~keyword ("_" | letter) idrest*
    idrest          =  "_" | alnum
    numlit          =  digit+ ("." digit+)?
    strlit          =  "\"" (~"\\" ~"\"" ~"\n" any | escape)* "\""
    escape          =  "\\" ( "\'" | "\"" | "r" | "n" | "\\" | "u")      -- simple
                    |  "\\u" hexDigit hexDigit hexDigit hexDigit         -- codepoint
    indent          =  "⇨"
    dedent          =  "⇦"

    newline         =  "\n"+
    space           :=  " " | "\t" | comment
    comment         =  "#" (~"\n" any)*
}
```
