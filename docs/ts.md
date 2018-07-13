# TS

特点： 类型标注

具体体现： 

1. 一般变量声明


    ```
    let user: number[] = [0, 1, 2];
    ```
    
2. 接口

    也是种变量声明的方式
    
    下面函数 `greeter` 的参数 `person` 的类型必须的跟 `Person` 一样。可以理解为:
    
    
    ```
    一样： 是其超级
    ```
    
    
    ```
    let person: Person = {...}
    ```
    
    `函数`
    
    ```
    interface Person {
        firstName: string;
        lastName: string;
    }
    
    function greeter(person: Person) {
        return "Hello, " + person.firstName + " " + person.lastName;
    }
    
    let user = { firstName: "Jane", lastName: "User" };
    
    greeter(user);
    ```


3. Classes
    
    与 `ES6` 不同，有 `public`， 自动生成一个 `类` 属性 `?`
    
    ```
    class Student {
        fullName: string;
        constructor(public firstName: string, public middleInitial: string, public lastName: string) {
            this.fullName = firstName + " " + middleInitial + " " + lastName;
        }
    }
    
    interface Person {
        firstName: string;
        lastName: string;
    }
    
    function greeter(person : Person) {
        return "Hello, " + person.firstName + " " + person.lastName;
    }
    
    let user = new Student("Jane", "M.", "User");
    
    
    greeter(user);
    ```


## 工程

1. 集成： [Migrating from JavaScript](http://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)

## 基本类型

1. `Tuple`: 元组
    
    特殊的数组，元素的个数和类型固定
    
    > Tuple types allow you to express an array where the type of a fixed number of elements is known, but need not be the same.
    
    
    ```
    // Declare a tuple type
    let x: [string, number];
    // Initialize it
    x = ["hello", 10]; // OK
    // Initialize it incorrectly
    x = [10, "hello"]; // Error
    ```
    
2. `Enum`

    
    ```
    enum Color {Red, Green, Blue}
    ```
    
    个人理解，可以 `key` 取值，也可以值取 `key`
    
    ```
    let Color = {
        Red: 0,
        Green: 1, 
        Blue: 2,
        0: 'Red',
        1: 'Green',
        2: 'Blue'
    }
    ```

    `enum` 默认从`0`开始，但也可以手动设置
    
    
    ```
    enum Color {Red = 1, Green = 2, Blue = 4}
    let c: Color = Color.Green;
    ```
    
    以值取 `key`
    
    ```
    enum Color {Red = 1, Green, Blue}
    let colorName: string = Color[2];
    
    alert(colorName); // Displays 'Green' as its value is 2 above
    
    ```
    
3. Any

    不知道类型时用，相当于没用`ts`, 只是为了让代码通过语法检测。
    
    接入第三方代码时用。
    
    
    ```
    let notSure: any = 4;
    ```
    
    声明 `Object` 时也可用它。因为`ts` 检测不到下面的方法
    
    
    ```
    let notSure: any = 4;
    notSure.ifItExists(); // okay, ifItExists might exist at runtime
    notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)
    
    let prettySure: Object = 4;
    prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
    ```
    
4. Void

    没有任何类型。常用在函数里，表示没有返回值。
    
    ```
    function warnUser(): void {
        alert("This is my warning message");
    }
    ``` 
    
   用于声明一般变量时不实用，因为只能是 `null` 或 `undefined`
   
   
    ```
    let unusable: void = undefined;
   ```
   


5. Null 和 Undefined

    
    ```
    // Not much else we can assign to these variables!
    let u: undefined = undefined;
    let n: null = null;
    ```
    
      默认情况下`null`和`undefined`是所有类型的子类型。 就是说你可以把 `null`和`undefined`赋值给`number`类型的变量。
      
      `--strictNullChecks` 标记下，`null`和`undefined`只能赋值给`void`和它们各自。
  
6. never

    `never` 表示不会产生的值。比如，抛出异常或永远不会返回的函数的返回类型。
    
    > For instance, never is the return type for a function expression or an arrow function expression that always throws an exception or one that never returns
    
    当变量被任何类型限制而不会是真值时，它也可以是 `never`
    
    `never` 是任意类型的子集，但 `never` 没有子集
    
    
    
    ```
    // Function returning never must have unreachable end point
    function error(message: string): never {
        throw new Error(message);
    }
    
    // Inferred return type is never
    function fail() {
        return error("Something failed");
    }
    
    // Function returning never must have unreachable end point
    function infiniteLoop(): never {
        while (true) {
        }
    }
    
    ```

7. Object

    表示非基础类型
    
    > 好像没有any好使， 不能去object下的方法
    
    


