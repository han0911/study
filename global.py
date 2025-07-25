def f(n):
    a = n+100
    return a
def f1(n):
    global a
    a = n+100
    return a
a = 10
print(f(a))
print(a)
print(f1(a))
print(a)
print(f1(a))