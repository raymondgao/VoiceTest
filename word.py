import csv

with open('chinese.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    for row in readCSV:
# "to be willing to": "愿意",
        print(f'      "{row[2]}": "{row[1]}:{row[0]}",')
