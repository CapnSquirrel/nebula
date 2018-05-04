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
Origin default "hello" (0,0,0)
  Result void <0,0,1>

Function "print" (0,1,0)
  Parameter "message" <0,1,0>
    initialize string "Hello, world!"
  Return <0,2,0>

Link (0,3,0) (0,0,1)
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
Origin default "_fib" (0,0,0)
  Argument number "n" <0,0,1>
  Result number <0,0,2>

Function "ternary" (1,0,0)
  Parameter "true" <0,0,1>
    access number "n"
  Parameter "false" <0,0,2>
  Parameter "condition" <0,0,3>
  Return <0,0,4>

Function "lessThanOrEqual" (1,1,0)
  Parameter "p1" <0,0,1>
    access number "n"
  Parameter "p2" <0,0,2>
    initialize number 1
  Return <0,0,3>

Function "add" (2,0,0)
  Parameter "p1" <0,0,1>
  Parameter "p2" <0,0,2>
  Return <0,0,3>

Function "_fib" (3,0,0)
  Parameter "n" <0,0,1>
  Return <0,0,2>

Function "subtract" (3,1,0)
  Parameter "p1" <0,0,1>
    access number "n"
  Parameter "p2" <0,0,2>
    initialize number 1
  Return <0,0,3>

Function "_fib" (4,0,0)
  Parameter "n" <0,0,1>
  Return <0,0,2>

Function "subtract" (4,1,0)
  Parameter "p1" <0,0,1>
    access number "n"
  Parameter "p2" <0,0,2>
    initialize number 2
  Return <0,0,3>


Link (1,0,4) (0,0,2) # ternary return <-> result
Link (1,1,3) (1,0,3) # p1 <= p2 <-> ternary condition
Link (2,0,3) (1,0,2) # p1 + p2 <-> ternary false
Link (3,0,2) (2,0,1) # _fib result <-> p1
Link (3,1,3) (3,0,1) # p1 - p2 <-> _fib n
Link (4,0,2) (2,0,2) # _fib result <-> p2
Link (4,1,3) (4,0,1) # p1 - p2 <-> _fib n
```
### Symbolic Diagram
![recursive fibonacci](/example-programs/recursive_fib.png)

# Grammar (Ohm)
```
Nebula {
    Program         =  newline* (Object newline*)* newline*
    Object          =  Origin | Function | Link | Accessor | Conditional

    Origin          =  "Origin" "default"? strlit Location newline OriginBlock
    OriginBlock     =  indent Argument* Result dedent
    Argument        =  "Argument" type strlit Location newline
    Result          =  "Result" type Location newline (indent (Access | Initialize | Evaluate)? Control dedent)?

    Function        =  "Function" strlit Location newline FunctionBlock
    FunctionBlock   =  indent Parameter* Return dedent
    Parameter       =  "Parameter" strlit Location newline (indent (Access | Initialize) dedent)?
    Return          =  "Return" Location newline (indent Control dedent)?

    Initialize      =  "initialize" ("string" strlit | "boolean" boollit | "number" numlit) newline
    Access          =  "access" type strlit newline
    Evaluate        =  "evaluate" strlit newline

    Conditional     =  "Conditional" Location newline indent Condition TrueControl FalseControl dedent
    Condition       =  "Parameter" "condition" Location newline (indent ( Access | Evaluate ) dedent)?
    TrueControl     =  "Control" "true" Location newline
    FalseControl    =  "Control" "false" Location newline

    Accessor        =  "Accessor" strlit Location newline AccessorBlock
    AccessorBlock   =  indent (Access | Initialize | SetParameter | Evaluate) Control? dedent
    SetParameter    =  "Parameter" "\"set\"" type Location newline

    traitLabel      =  "evaluate"

    Link            =  "Link" Location Location
    Location        =  "(" Coordinate ")" | "<" Coordinate ">"
    Control         =  "Control" Location newline
    Coordinate      =  NonemptyListOf<numlit, ",">

    type            =  "number" | "string" | "boolean" | "void"
    numlit          =  "-"? digit+ ("." digit+)?
    strlit          =  "\"" (~"\\" ~"\"" ~"\n" any | escape)* "\""
    boollit         =  "true" | "false"
    escape          =  "\\" ( "\'" | "\"" | "r" | "n" | "\\" | "u")      -- simple
                    |  "\\u" hexDigit hexDigit hexDigit hexDigit         -- codepoint
    indent          =  "⇨"
    dedent          =  "⇦"

    newline         =  "\n"+
    space           :=  " " | "\t" | comment
    comment         =  "#" (~"\n" any)*
}
```
