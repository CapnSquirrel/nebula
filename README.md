# Nebula
![](/logos/Nebula-logo-small.png)
# Programming in a Multidemensional Environment
Nebula is a programming language intended for expression.  Its use of multidimensional logical constructs to perform actions between nodes likens it to a Turing Machine.  These nodes are powerful; rather than simply holding data and linking to other structures, they can trigger actions on the global environment and ultimately cause the execution of functions whose return values may in fact ripple back to the original node.  Inspirations for the project include Javascript, Python, Go, and Haskell.  Many of the constructs in Nebula's standard library as well as its primitive structures and types are derived from these languages.  Though it borrows some ideas from some  of these well-known programming languages, Nebula also offers a new programming paradigm, "spatial programming", an intuitive and fresh way to work with scoping.

# Features
- _Dynamic_: Dynamically typed by default, but optional static typing can be enforced
- _Asynchronous_: Designed for asynchronous programming; can wait for events while retaining state
- _Functional_: The eager loading of parameters allows for the power of a functional language but also the flexibility of an imperative language
- _Object Oriented_: Editable properties can be attached to every construct in the language, and these objects can be mutable or immutable
- _Efficent_: Closures and anonymous functions are supported
- _Spatially Scoped_: Spatial programmingn is a brand new way of determining the realms within which variables and objects exist

Symbol | Text
-------|-------
![can i put an image here](/logos/Nebula-logo-small.png) | columns

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
