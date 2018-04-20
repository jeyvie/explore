# Mac 里的粘贴版操作

> `提示`: 时间紧可以直接看总结

刚有同事又又又找到要公钥了，之前每次流程是：
	
1. 找到相关文件
2. `open file.pub`  
3. `cmd + A` 、`cmd + c`

然后通过 `IM` 发过他。

这次有点倦了，太繁琐。想到之前用过:

`pbpatse` : 能读取文件内容到粘贴板。如：

```
$ pbpatse > file.ext
```

就可以将粘贴板的内容输出到文件`file.ext` 里。

好像有个相关的 `pbcopy`, 那应该是可以把文件内容重定向到粘贴板:

```
$ pbcopy < ~/.ssh/id_rsa.pub
```

确实如此。

所以，之前三步流程，简化成了一步！

网上再搜索了下，可以这么用：


```
$ pbpaste | sed -e ‘s/foo/bar/g’ | pbcopy
```

很six

还有个 `pbfile`, 没谷歌出来干嘛的。


## 总结

```
// 读取粘贴板内容
$ pbpaste | jq ‘.’

// 往粘贴板贴内容
$ cat file.txt | pbcopy

// 组合使用
$ pbpaste | sed -e ‘s/foo/bar/g’ | pbcopy

```





