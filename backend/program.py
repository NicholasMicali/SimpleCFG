def main():
    i = 0
    k = 0
    result = 0
    while i < 10:
        while k < 5:
            result += 1
            k += 1
            if result == 10:
                result = 0
        i += 1
    print(result)
    return