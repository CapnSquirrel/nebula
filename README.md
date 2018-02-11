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
### Symbolic Diagram
![recursive fibonacci](/example-programs/recursive_fib.png)
## Fibonacci Sequence: Iterative
### Nebula Text
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
