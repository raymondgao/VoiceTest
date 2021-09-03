import re;
import sqlite3;
sqliteConnection = sqlite3.connect('anhviet.db')
c = sqliteConnection.cursor()

#create table
c.execute('''CREATE TABLE IF NOT EXISTS words
             ( viet text, anh text)''')
with open('vnedict.txt') as f:
    for line in f:
        name,val = line.split(":")
        name = name.strip();
        val = val.strip();
        val = re.findall(r'["](.*?)["]',val);
        name = re.findall(r'["](.*?)["]',name);
        val = ''.join(map(str, val))
        name = ''.join(map(str,name))
        c.execute("insert into words values(?,?)", (name, val));
        #print ( name + " : " +  val ); 
    sqliteConnection.commit()

    query = "SELECT anh FROM words where viet LIKE \'chao\'";

    c.execute(query)

    for row in c.fetchall():
        print(row)
