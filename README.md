# Nebula
![](/images/logos/Nebula-logo-small.png)

# Programming in a Multidemensional Environment
Nebula is a programming language intended for expression.  Its use of multidimensional logical constructs to perform actions between nodes likens it to a Turing Machine.  These nodes are powerful; rather than simply holding data and linking to other structures, they can trigger actions on the global environment and ultimately cause the execution of functions whose return values may in fact ripple back to the original node.  Inspirations for the project include Javascript, Python, Go, and Haskell.  Many of the constructs in Nebula's standard library as well as its primitive structures and types are derived from these languages.  Though it borrows some ideas from some  of these well-known programming languages, Nebula also offers a new programming paradigm, "spatial programming", an intuitive and fresh way to work with scoping.

# Features
- _Dynamic_: Dynamically typed by default, but optional static typing can be enforced
- _Asynchronous_: Designed for asynchronous programming; can wait for events while retaining state
- _Functional_: The eager loading of parameters allows for the power of a functional language but also the flexibility of an imperative language
- _Object Oriented_: Editable properties can be attached to every construct in the language, and these objects can be mutable or immutable
- _Efficent_: Closures and anonymous functions are supported
- _Spatially Scoped_: Spatial programmingn is a brand new way of determining the realms within which variables and objects exist

# Hello, World!
Let's take a look at hello_world.star, a basic program written in Nebula.  Additional, more complex, examples can be found below.
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

Unlike most programming languages, Nebula doesn't evaluate anything in order.  A Nebula program is essentially a collection of linked nodes whose parameter values rely on the actions of other nodes.  In hello_world.star, the action begins at the return statement.  Realizing that it needs a value, the return statement queries its callback.  The callback leads to a simple print function that does what you'd expect... Sends data to stdout.  The print function has its own parameter to satisfy, and luckily, it's been linked to a primitive variable: the string "Hello, World!".  Now, as the data ripples forward, we can finally satisfy the return statement.  You'll also notice that pretty much everything in the program text has an associated coordinate.  This is because Nebula is built for programming in virtual reality.  Imagine dragging around variable objects with your hands.  Their location in 3D space is important for the spatial scoping of the language, so coordinate tracking is necessary.

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
    Program     =  Construct*
    Construct   =  Header Argument? Location+ newline+ Things?
    Header      =  "Origin" | "Result" | "Link" | "Accessor"
                |  "Function" | "Conditional" | "Parameter"
                |  "Control" | "Return" | "Yield" | "Error"
    Argument    =  "default" | id | strlit
    Things      =  indent Traits+ newline+                             -- things
                | Construct
    Traits      =  Header | "primitive" (numlit | boollit | strlit)    -- traits

    Location    =  "(" Coordinate ")" | "<" Coordinate ">"
    Coordinate  =  numlit "," numlit "," numlit

    keyword     =  ( "default" | "print" | "and" | "or"
                |  "not" | "true" | "false" ) ~idrest
    id          =  ~keyword ("_" | letter) idrest*
    idrest      =  "_" | alnum
    numlit      =  digit+ ("." digit+)?
    boollit     =  "true" | "false"
    strlit      =  "\"" (~"\\" ~"\"" ~"\n" any | escape)* "\""
    escape      =  "\\" ("\\" | "\"" | "n")                          -- simple
                |  "\\u" hexDigit+                                   -- codepoint
    indent      =  "⇨"
    dedent      =  "⇦"

    newline     =  "\n"+
    space      :=  " " | "\t" | comment
    comment     =  "#" (~"\n" any)*
}
```
