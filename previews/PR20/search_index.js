var documenterSearchIndex = {"docs":
[{"location":"#Folds.jl","page":"Folds.jl","title":"Folds.jl","text":"","category":"section"},{"location":"","page":"Folds.jl","title":"Folds.jl","text":"Pages = [\"index.md\"]","category":"page"},{"location":"","page":"Folds.jl","title":"Folds.jl","text":"Modules = [Folds]","category":"page"},{"location":"#Folds.Folds","page":"Folds.jl","title":"Folds.Folds","text":"Folds: sequential, threaded, and distributed fold interface for Julia\n\n(Image: Stable) (Image: Dev) (Image: GitHub Actions)\n\nFolds.jl provides a unified interface for sequential, threaded, and distributed folds.\n\njulia> using Folds\n\njulia> Folds.sum(1:10)\n55\n\njulia> Folds.sum(1:10, ThreadedEx())  # equivalent to above\n55\n\njulia> Folds.sum(1:10, DistributedEx())\n55\n\nMost of the functions can be used with iterator comprehensions:\n\njulia> Folds.sum(y for x in 1:10 if isodd(x) for y in 1:x^2)\n4917\n\nand Transducers.jl:\n\njulia> using Transducers\n\njulia> 1:10 |> Filter(isodd) |> MapCat(x -> 1:x^2) |> Folds.sum\n4917\n\nFolds.jl decouples the implementation and the execution mechanism (\"executor\"). Additional executors can be installed from FoldsThreads.jl, FoldsCUDA.jl (rather WIP), and FoldsDagger.jl (very WIP).\n\n\n\n\n\n","category":"module"},{"location":"#Folds.all","page":"Folds.jl","title":"Folds.all","text":"Folds.all([f,] collection; [executor_options...])\nFolds.all([f,] collection, executor)\n\nCheck if all the elements in collection, optionally evaluated by f, are true. Parallel by default.\n\nSee Extended help in Folds.reduce for more information.\n\nExamples\n\njulia> using Folds\n\njulia> Folds.all([true, true, true])\ntrue\n\njulia> Folds.all([true, true, false])\nfalse\n\njulia> Folds.all(n -> (ℯ * (n/ℯ)^n ≤ factorial(n)), (big(n) for n in 1:100))\ntrue\n\n\n\n\n\n","category":"function"},{"location":"#Folds.any","page":"Folds.jl","title":"Folds.any","text":"Folds.any([f,] collection; [executor_options...])\nFolds.any([f,] collection, executor)\n\nCheck if any of the elements in collection, optionally evaluated by f, is true. Parallel by default.\n\nSee Extended help in Folds.reduce for more information.\n\nExamples\n\njulia> using Folds\n\njulia> Folds.any([true, false, false])\ntrue\n\njulia> Folds.any([false, false, false])\nfalse\n\njulia> Folds.any(a/(b+c) + b/(a+c) + c/(a+b) < 3/2 for a in 1:100, b in 1:100, c in 1:100)\nfalse\n\n\n\n\n\n","category":"function"},{"location":"#Folds.collect","page":"Folds.jl","title":"Folds.collect","text":"Folds.collect(collection; [executor_options...]) :: AbstractArray\nFolds.collect(collection, executor) :: AbstractArray\n\nMaterialize collection as an array. Parallel by default.\n\nIterator transformations such as (f(x) for x in xs if p(x)) wrapping parallelizable container(s) xs are executed in parallel. See Extended help in Folds.reduce for more information.\n\nUnlike Base.collect, the output can be an array of type other than Array.\n\nExamples\n\njulia> using Folds\n\njulia> Folds.collect(x^2 for x in 1:4 if isodd(x))\n2-element Array{Int64,1}:\n 1\n 9\n\njulia> Folds.collect(i for i in 1:10_000_000 if sin(i) > 1 - 1e-12)\n4-element Array{Int64,1}:\n  573204\n 4846147\n 7138963\n 9119090\n\n\n\n\n\n","category":"function"},{"location":"#Folds.copy","page":"Folds.jl","title":"Folds.copy","text":"Folds.copy(T::Type, collection; [executor_options...]) :: T\nFolds.copy(T::Type, collection, executor) :: T\n\nMaterialize collection as a collection of type T. Parallel by default.\n\nSee Extended help in Folds.reduce for more information.\n\nExamples\n\njulia> using Folds, StructArrays\n\njulia> Folds.copy(StructVector, ((x = x, y = x^2) for x in 1:3))\n3-element StructArray(::Array{Int64,1}, ::Array{Int64,1}) with eltype NamedTuple{(:x, :y),Tuple{Int64,Int64}}:\n (x = 1, y = 1)\n (x = 2, y = 4)\n (x = 3, y = 9)\n\n\n\n\n\n","category":"function"},{"location":"#Folds.count","page":"Folds.jl","title":"Folds.count","text":"Folds.count([f,] collection; [executor_options...])\nFolds.count([f,] collection, executor)\n\nCount the number of true items in collection or items that evaluates to true by f. Parallel by default.\n\nSee Extended help in Folds.reduce for more information.\n\nExamples\n\njulia> using Folds\n\njulia> Folds.count([true, true, false])\n2\n\njulia> Folds.count(gcd(x, 857142) == 1 for x in 1:10_000_000)\n2721603\n\n\n\n\n\n","category":"function"},{"location":"#Folds.extrema","page":"Folds.jl","title":"Folds.extrema","text":"Folds.extrema([f,] collection; [executor_options...])\nFolds.extrema([f,] collection, executor)\n\nCompute the minimum and the maximum of the items in collection, optionally evaluated by f. Parallel by default.\n\nSee Extended help in Folds.reduce for more information.\n\nExamples\n\njulia> using Folds\n\njulia> Folds.extrema([4, 8, 3, 5, 5])\n(3, 8)\n\njulia> Folds.extrema(xor(i, (i + one(i))^i) for i in UInt32(1):UInt32(10_000_000))\n(0x00000003, 0xfffffa3d)\n\n\n\n\n\n","category":"function"},{"location":"#Folds.findall","page":"Folds.jl","title":"Folds.findall","text":"Folds.findall([f,] collection; [executor_options...])\nFolds.findall([f,] collection, executor)\n\nFind all indices for which the item is true or evaluates to true by f. Parallel by default.\n\nSee Extended help in Folds.reduce for more information.\n\nExamples\n\njulia> using Folds\n\njulia> let pidigits = string(BigFloat(π; precision = 2^20))[3:end]\n           Folds.findall(1:length(pidigits)) do i\n               startswith(SubString(pidigits, i), string(i))\n           end\n       end\n3-element Array{Int64,1}:\n     1\n 16470\n 44899\n\n\n\n\n\n","category":"function"},{"location":"#Folds.findfirst","page":"Folds.jl","title":"Folds.findfirst","text":"Folds.findfirst([f,] collection; [executor_options...])\nFolds.findfirst([f,] collection, executor)\n\nFind the first index containing true or, if f is given, an item that evaluates to true by f. Parallel by default.\n\nSee Extended help in Folds.reduce for more information.\n\nExamples\n\njulia> using Folds\n\njulia> let s1 = string(BigFloat(π; precision = 2^20))[3:end],\n           s2 = string(BigFloat(ℯ; precision = 2^20))[3:end],\n           w = 4\n           Folds.findfirst(1:length(s1)-w; basesize = 10000) do i\n               SubString(s1, i, i + w) == SubString(s2, i, i + w)\n           end\n       end\n26548\n\n\n\n\n\n","category":"function"},{"location":"#Folds.findlast","page":"Folds.jl","title":"Folds.findlast","text":"Folds.findlast([f,] collection; [executor_options...])\nFolds.findlast([f,] collection, executor)\n\nFind the last index containing true or, if f is given, an item that evaluates to true by f. Parallel by default.\n\nSee Extended help in Folds.reduce for more information.\n\nExamples\n\njulia> using Folds\n\njulia> let s1 = string(BigFloat(π; precision = 2^20))[3:end],\n           s2 = string(BigFloat(ℯ; precision = 2^20))[3:end],\n           w = 4\n           Folds.findlast(1:length(s1)-w; basesize = 10000) do i\n               SubString(s1, i, i + w) == SubString(s2, i, i + w)\n           end\n       end\n303001\n\n\n\n\n\n","category":"function"},{"location":"#Folds.issorted","page":"Folds.jl","title":"Folds.issorted","text":"Folds.issorted(collection; [lt,] [by,] [rev,] [order,] [executor_options...])\nFolds.issorted(collection, executor; [lt,] [by,] [rev,] [order,])\n\nCheck if collection is sorted. Parallel by default.\n\nSee Extended help in Folds.reduce for more information.\n\nExamples\n\njulia> using Folds\n\njulia> Folds.issorted(0:9)\ntrue\n\njulia> Folds.issorted([0:1000_0000; [0]])\nfalse\n\n\n\n\n\n","category":"function"},{"location":"#Folds.map","page":"Folds.jl","title":"Folds.map","text":"Folds.map(f, collections...; [executor_options...])\nFolds.map(f, collections..., executor)\n\nEquivalent to Folds.collect(f(x...) for x in zip(collections...)). Parallel by default.\n\nSee Extended help in Folds.reduce for more information.\n\nExamples\n\njulia> using Folds\n\njulia> Folds.map(+, 1:3, 2:2:6)\n3-element Array{Int64,1}:\n 3\n 6\n 9\n\njulia> Folds.map(i -> floor(Int, i / π), (i for i in 1:10_000_000 if sin(i) > 1 - 1e-12))\n4-element Array{Int64,1}:\n  182456\n 1542576\n 2272402\n 2902696\n\n\n\n\n\n","category":"function"},{"location":"#Folds.mapreduce","page":"Folds.jl","title":"Folds.mapreduce","text":"Folds.mapreduce(f, op, collections...; [init] [executor_options...])\nFolds.mapreduce(f, op, collections..., executor; [init])\n\nEquivalent to Folds.reduce(op, (f(x...) for x in zip(collections...))).\n\nSee Folds.reduce for more information.\n\n\n\n\n\n","category":"function"},{"location":"#Folds.maximum","page":"Folds.jl","title":"Folds.maximum","text":"Folds.maximum([f,] collection; [executor_options...])\nFolds.maximum([f,] collection, executor)\n\nCompute the minimum of the items in collection, optionally evaluated by f. Parallel by default.\n\nSee Extended help in Folds.reduce for more information.\n\nExamples\n\njulia> using Folds\n\njulia> Folds.maximum([4, 8, 3, 5, 5])\n8\n\njulia> Folds.maximum(xor(i, (i + one(i))^i) for i in UInt32(1):UInt32(10_000_000))\n0xfffffa3d\n\n\n\n\n\n","category":"function"},{"location":"#Folds.minimum","page":"Folds.jl","title":"Folds.minimum","text":"Folds.maximum([f,] collection; [executor_options...])\nFolds.maximum([f,] collection, executor)\n\nCompute the maximum of the items in collection, optionally evaluated by f. Parallel by default.\n\nSee Extended help in Folds.reduce for more information.\n\nExamples\n\njulia> using Folds\n\njulia> Folds.minimum([4, 8, 3, 5, 5])\n3\n\njulia> Folds.minimum(xor(i, (i + one(i))^i) for i in UInt32(1):UInt32(10_000_000))\n0x00000003\n\n\n\n\n\n","category":"function"},{"location":"#Folds.prod","page":"Folds.jl","title":"Folds.prod","text":"Folds.prod([f,] collection; [init,] [executor_options...])\nFolds.prod([f,] collection, executor; [init])\n\nCompute f(x₁) * f(x₂) * f(x₃) * ... * f(xₙ) for the elements xᵢ in collection with f defaults to identity. Parallel by default.\n\ninit should be an object that behaves like the identity of *.\n\nSee Extended help in Folds.reduce for more information.\n\nExamples\n\njulia> using Folds\n\njulia> Folds.prod(1:5)\n120\n\njulia> floor(Folds.prod(1 + (sin(n) + 1)/10_000_000 for n in 1:10_000_000); digits = 3)\n2.718\n\n\n\n\n\n","category":"function"},{"location":"#Folds.reduce","page":"Folds.jl","title":"Folds.reduce","text":"Folds.reduce(op, collection; [init] [executor_options...])\nFolds.reduce(op, collection, executor; [init])\n\nReduce a collection with an associative operator. Parallel by default.\n\nGiven a collection with elements x₁, x₂, ..., xₙ, and an associative operator ⊗, Folds.reduce(⊗, collection) computes\n\nx₁ ⊗ x₂ ⊗ x₃ ⊗ x₄ ⊗ ... ⊗ xₙ\n\nIf no executor is specified, executor_options are passed to the default executor for collection.\n\nExtended help\n\nIf no executor is specified, an appropriate executor is chosen automatically based on collection (e.g., CUDAEx for CuArrays if FoldsCUDA.jl is loaded) assuming that the reduction can be parallelized; i.e.,:\n\niteration over collection and evaluation ofop are data race-free,\nbinary function op is (at least approximately) associative and init behaves as the identity of op.\n\nFor example, consider\n\nFolds.reduce(op, (f(x) for x in xs if p(x))\n\nThe first assumption indicates that Folds.reduce requires that op, f, p, and iterate on xs do not have any data races. For example, a stateless function is safe to use. If these functions need to access shared state that can be mutated while invoking Folds.reduce, it must be protected using, e.g., lock or atomic. Note that, for a good performance, it is recommended to restructure the code to avoid requiring locks in these functions.\n\nThe second point indicates that Folds.reduce requires op to be associative on the set of all values that f can produce. The default executor and many other executors do not require exact associativity for deterministic result, provided that scheduling parameters (e.g., basesize) are configured. For example, Folds.reduce(+, floats, ThreadedEx(); init = 0.0) may produce slightly different result when julia is started wih different number of threads. For a deterministic result independent of the number of threads in julia, use ThreadedEx(basesize = ...) where ... is a large enough number. Different executor may require different properties of op (e.g., exact associativity, commutativity); check the documentation of the executor for more information.\n\nThe default executor is chosen based on collection. If collection is an iterator transformed from another iterator, the innermost iterator is used for determining the executor. Consider the following values for collection:\n\nxs\n(f(x) for x in xs)\n(f(x) for x in xs if p(x))\n\nIn all cases, xs determines the executor to be used. Thus, the reduction\n\nxs :: CuArray\nFolds.reduce(+, (f(x) for x in xs if p(x)))\n\nuses CUDAEx executor if FoldsCUDA.jl is loaded. If collection is a zip or Iterators.product, Folds.reduce tries to find an appropriate executor using a promotion mechanism.\n\nIt is safe for the operator op to mutate of the first argument if Transducers.OnInit is used for init. It can be used to create mutable accumulators (the object passed to the first argument to op) that can be mutated without a data race. Since the second argument to op can be originated from collection or another output of op, mutating it can lead to unpredictable side-effects although it may not be a problem in some cases (e.g., collection would be thrown away after this computation).\n\n\n\n\n\n","category":"function"},{"location":"#Folds.set","page":"Folds.jl","title":"Folds.set","text":"Folds.set(collection; [executor_options...]) :: AbstractSet\nFolds.set(collection, executor) :: AbstractSet\n\nMaterialize collection as a set. Parallel by default.\n\nSee Extended help in Folds.reduce for more information.\n\nExamples\n\njulia> using Folds\n\njulia> pidigits = deleteat!([x - '0' for x in string(BigFloat(π; precision = 2^20))], 2);\n\njulia> @show pidigits[1:5];\npidigits[1:5] = [3, 1, 4, 1, 5]\n\njulia> sort!(collect(Folds.set(x for x in Iterators.partition(pidigits, 8) if issorted(x))))\n8-element Array{SubArray{Int64,1,Array{Int64,1},Tuple{UnitRange{Int64}},true},1}:\n [0, 0, 1, 1, 4, 4, 4, 6]\n [0, 0, 1, 2, 2, 3, 7, 8]\n [0, 1, 1, 1, 3, 7, 8, 8]\n [0, 1, 3, 4, 5, 6, 6, 8]\n [1, 1, 5, 5, 8, 8, 8, 8]\n [3, 4, 9, 9, 9, 9, 9, 9]\n [4, 4, 5, 5, 6, 8, 8, 9]\n [5, 5, 5, 5, 8, 9, 9, 9]\n\n\n\n\n\n","category":"function"},{"location":"#Folds.sum","page":"Folds.jl","title":"Folds.sum","text":"Folds.sum([f,] collection; [init,] [executor_options...])\nFolds.sum([f,] collection, executor; [init])\n\nCompute f(x₁) + f(x₂) + f(x₃) + ... + f(xₙ) for the elements xᵢ in collection with f defaults to identity. Parallel by default.\n\ninit should be an object that behaves like the identity of +.\n\nSee Extended help in Folds.reduce for more information.\n\nExample\n\njulia> using Folds\n\njulia> f(x) = gcd(x, 42);\n\njulia> Folds.sum(f, 1:1000_000)\n4642844\n\njulia> Folds.sum(f, 1:1000_000, SequentialEx())\n4642844\n\n\n\n\n\n","category":"function"},{"location":"#Folds.unique","page":"Folds.jl","title":"Folds.unique","text":"Folds.unique([f,] collection; [executor_options...])\nFolds.unique([f,] collection, executor)\n\nList the unique elements from collection in the order that appears in collection. If f given, the uniqueness is determined by comparing its output. Parallel by default.\n\nSee Extended help in Folds.reduce for more information.\n\nExamples\n\njulia> using Folds\n\njulia> Folds.unique([2, 4, 3, 0, 0, 4, 3, 4, 3, 1, 0, 0, 4, 1, 4, 1, 3, 3, 4, 0])\n5-element Array{Int64,1}:\n 2\n 4\n 3\n 0\n 1\n\njulia> pidigits = deleteat!([x - '0' for x in string(BigFloat(π; precision = 2^20))], 2);\n\njulia> @show pidigits[1:5];\npidigits[1:5] = [3, 1, 4, 1, 5]\n\njulia> Folds.unique(x for x in pidigits if isodd(x))\n5-element Array{Int64,1}:\n 3\n 1\n 5\n 9\n 7\n\n\n\n\n\n","category":"function"}]
}
