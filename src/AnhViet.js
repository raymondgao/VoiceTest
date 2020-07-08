
let SQLite = require('react-native-sqlite-storage')
  class AntViet{
    errorCB(err) {
        console.log("SQL Error: " + err);
      }
    
      successCB() {
        console.log("SQL executed fine");
      }
    
      openCB() {
        console.log("Database OPENED");
      }
   
   

   async searchWords(words){ 
        
        var newWords =  {};
        var db = SQLite.openDatabase({name : "anhviet.db", createFromLocation : 1}, this.openCB, this.errorCB );
       
        Object.keys(words).map(function(keyName, keyIndex) {
           
            db.transaction(tx => {
                //console.log('SELECT anh FROM words where viet like ' + '\'' + keyName + '\'');
               // tx.executeSql('SELECT anh FROM words where viet LIKE ' + '\'' + keyName.toLowerCase() + '\'' , [], (tx, results) => {
                tx.executeSql('SELECT anh FROM words where viet LIKE ' + '\'' + 'chao' + '\'' , [], (tx, results) => {
                   
                    var find = false;
                    for (let i = 0; i < results.rows.length; ++i) {
                       
                        newWords[keyName] = results.rows.item(i);
                        
                        find = true;
                        console.log(results.rows.item(i));
                    }
                    if(find == false){
                        newWords[keyName] = '';
                       
                    }
                   
                });
                
            });
            
        })
        console.log(newWords + " ffddf");
        return newWords;
    }

}

const antviet = new AntViet();
export default antviet;
