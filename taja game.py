import random
import time
w = ['cat','dog','fpx','monkey','mouse','panda','frog','snake','wolf']
s = time.time()
cnt = 0
val = 1
while True:
    print(f'[문제{val}]')
    val += 1
    a = random.choice(w)
    print(a)
    n = input()
    if a == n:
        cnt += 1
        print(f'정답! 현재 점수:{cnt}')
    else:
        print('틀렸습니다')
    if cnt == 5:
        e = time.time()
        break
print(e-s)

