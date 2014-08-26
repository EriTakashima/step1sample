$(loaded);

function loaded(){
	 showText();
     // todoの追加ボタンを押された時の挙動
     $("#formButton").click(
		 // コールバックとしてメソッドを引数にわたす
		 function() {
			 $("#ex").text("");
			 $("#warning").text("");
			 saveText();
			 showText();
		}
	);
	 // clearボタンを押された時の挙動
	$("#clearButton").click(clear_text);
}
// 入力された内容をローカルストレージに保存する
function saveText() {
	  // 時刻をキーにして入力されたテキストを保存する
	 var t = $("#formText");
	 var l = $("#formLimit");
	 //何もToDo名や期限に入力されなかった時エラー文を出力
	 if(t.val() == "" || l.val()== ""){;
		 if (l.val() !="") $("#warning").text("ToDo名を入力してください");
		 else if(t.val() !="") $("#warning").text("期限を入力してください");
		 else $("#warning").text("ToDo名と期限を入力してください");
		}
	 else{
		 var o = false;
		 var time = new Date();
		 var key = time.getTime();
		 //リストを管理するオブジェクト
		 var data = {
			 text : escapeText(t.val()) ,
			 limit : escapeText(l.val()) ,
			 onoff : o,
			 year: time.getFullYear(),
			 month: time.getMonth()+1,
			 day: time.getDate(),
			 onoff_val: "未定義",
			 onoff_classname: "finishButton unfinish"
			}
		 //期限が正しく入力されているかチェック
		 if(l.val().match(/^[0-9][0-9][0-9][0-9]\/[0-1]?[0-9]\/[0-3]?[0-9]$/)){
			 localStorage.setItem(key,JSON.stringify(data));
			 // テキストボックスを空にする
			 t.val("");
			 l.val("");
			}	
		 else{
			 $("#warning").text("yyyy/mm/ddの形式にしたがって入力してください");
			}
		}
	}

// ローカルストレージに保存した値を再描画する
function showText() {
	 // すでにある要素を削除する
	 var list = $("#list");
	 list.children().remove();
	 var count = 0;
	 var flag = false;
	 //リストを入力された順番に並べ替える
	 for(var i=0, len=localStorage.length; i<len; i++) {
		 var key, value, html = [],line=[localStorage.length];
		 for(k=0;k<len;k++){
			 line[k]= localStorage.key(k);
			}
		 for(j=0;j<len;j++){
			 var box;
			 if(line[j] < line[j+1]){
				 box=line[j];
				 line[j]=line[j+1];
				 line[j+1]=box;
				}
			}
		for(var l=0;l<len;l++){
			 key = localStorage.key(l);
			 if(key == line[i]){
					 break;
				}
			}
		 value = JSON.parse(localStorage.getItem(key));
		 var clear_count = "clear"+count;
		// htmlに表示する
		 html.push(
			 '<table id="list">'+
				 '<tr><td colspan="2" id="width"><p  class="bolder">'+value.text+'</p></td><td rowspan="2"> <input  id="' + count+ '"type="button" class="'+value.onoff_classname+'" value="'+value.onoff_val+'"></td></tr>'+
				 '<tr><td><p class="listShow">期限： </p></td><td><p class="listShow">'+ value.limit +'</p></td>'+
				 '<tr><td><p class="listShow">作成日： </p></td><td><p class="listShow">'+value.year+'/'+value.month+'/'+value.day+'</p></td><td><input  id="' + clear_count+ '"type="button" class="clear" value="消去"></td></tr>'+
			 '</table>'
			); 
		 list.append(html.join(''));
		 //完了未完了切り替え
		 OnOff(count,value,key);
		 clear_list(clear_count,key);
		 count++;
		 flag = true;
		}
	 //リストに何も入っていない時にエラー文を表示
	 if(flag == false){
		 $("#ex").text("ToDoはありません。ToDoを追加してください");
		}
	}
	
//完了未完了切り替えするための関数
function OnOff(count,value,key){
	 var onoff=document.getElementById(count);
	 onoff.onclick=function(){
		 if(onoff.className == "finishButton finish"){
			 value.onoff_classname = "finishButton unfinish";
			 value.onoff_val = "未完了";
			 change_data(value,value.onoff_val,value.onoff_classname,key);
			 showText();
			}
		 else{
			 value.onoff_classname = "finishButton finish";
			 value.onoff_val = "完了";
			 change_data(value,value.onoff_val,value.onoff_classname,key);			 
			 showText();
			}
		}
	}
function clear_list(clear_count,key){
	 var onoff=document.getElementById(clear_count);
	 onoff.onclick=function(){
		 localStorage.removeItem(key);	
		 showText();
		}
	}
	
//リストの中を並べ替えるための関数
function change_data(value,val,classname,key){
	 var k=key;
	 var t = value.text;
	 var l = value.limit;
	 var o = value.onoff;
	 var y = value.year;
	 var m = value.month;
	 var d = value.day;
	 localStorage.removeItem(key);
	 var data = {
		 text : t,
		 limit : l ,
		 onoff : o,
		 year: y,
		 month: m,
		 day: d,
		 onoff_val: val,
		 onoff_classname: classname
		}
	 localStorage.setItem(k,JSON.stringify(data));
	}

//リストを全部バルス！
function clear_text(){
	 localStorage.clear();
	 showText();
	 count = 0;
	 $("#ex").text("ToDoはありません。ToDoを追加してください");
	}
	
//html入力されたらエスケープ
function escapeText(text) {
	 return $("<div>").text(text).html();
	}


