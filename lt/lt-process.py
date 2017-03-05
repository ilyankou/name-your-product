MIN = 4         # minimum word length
MAX = 7        # maximum word length

output = open('lt/lt-processed.csv', 'w', encoding='utf-8')

with open('lt/lt.txt', 'r', encoding='utf-8') as f:
    for line in f:

        z = line.split('[')

        left = z[0]
        right = z[-1].split(']')[1].strip()

        en = left.split('\t')[-1].strip()
        lt = right.split(',')[0]

        if (lt.find('(') > -1) or (lt.find(' ') > -1) or (lt.find('/') > -1):
            continue

        if (len(lt) < MIN) or (len(lt) > MAX):
            continue

        nie = ['ą', 'č', 'ę', 'ė', 'į', 'š', 'ų', 'ū', 'ž']
        tak = ['a', 'c', 'e', 'e', 'i', 's', 'u', 'u', 'z']
        lt_ascii = lt;
        for i, j in zip(nie, tak):
            lt_ascii = lt_ascii.replace(i, j)

        output.write(lt + ',' + lt_ascii +  ',"' + en + '"\n')

output.close()
