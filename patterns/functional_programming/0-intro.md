# Functional Programming

## Functional functions are side-effect free
> A core tenant of functional programming is that functions should not change state.

Values local to the function may be set but nothing outside of the function may change. This approach is very useful to make code more maintainable. There need no longer be any concern that passing an array into a function might play havoc with its contents. This is especially a concern when using libraries that are not under your control.

> It may not be desirable to put all of the code from your application into functions, but separating as much as possible is desirable.

There is a pattern called command query separation that suggests that methods should fall into two categories. Either a method is a function that reads a value or it is a command that sets a value. Never the twain should meet. Keeping methods categorized like this eases in debugging and in code reuse.

> One of the consequences of "side-effect free" functions is that they can be called any number of times with the same inputs and the result will be the same.

Furthermore, because there are no changes to state, calling the function many times will not cause any ill side effects, other than running slower.

