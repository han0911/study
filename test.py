a = []
while True:
    try:
        a = int(input("숫자: "))
    except ValueError:
        print('숫자를 입력하세요')
    else:
        print(a)