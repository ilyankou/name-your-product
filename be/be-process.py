MIN = 4         # minimum word length
MAX = 7        # maximum word length

output = open('be/be-processed.csv', 'w', encoding='utf-8')

with open('be/be.txt', 'r', encoding='utf-8') as f:
    for line in f:

        z = line.split('- ')
        if (len(z) < 2):
            continue

        left = z[0]
        right = z[-1]

        for c in ['|', ',', ')', '(']:
            left = left.replace(c, ' ')

        be = left.split()[0].strip()
        en = right.strip()

        if (len(be) < MIN) or (len(be) > MAX):
            continue

        nie = ['č', 'ć', 'ź', 'ž', 'ł', 'ń', 'ŭ', 'ś', 'š']
        tak = ['c', 'c', 'z', 'z', 'l', 'n', 'u', 's', 's']
        be_ascii = be;
        for i, j in zip(nie, tak):
            be_ascii = be_ascii.replace(i, j)

        output.write(be + ',' + be_ascii +  ',"' + en + '"\n')

output.close()
