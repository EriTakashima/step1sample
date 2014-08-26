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
	 var o = false;
	 var time = new Date();
	 var key = time.getTime();
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
	 if(l.val().match(/^[0-9][0-9][0-9][0-9]\/[0-1]?[0-9]\/[0-3]?[0-9]$/)){
		 console.log("if now");
		 localStorage.setItem(key,JSON.stringify(data));
		 // テキストボックスを空にする
		 t.val("");
		 l.val("");
		}	
	 else{
		 $("#warning").text("yyyy/mm/ddの形式にしたがって入力してください");
		  console.log("else now");
		}
}

// ローカルストレージに保存した値を再描画する
function showText() {
	 // すでにある要素を削除する
	 var list = $("#list");
	 list.children().remove();
	 // ローカルストレージに保存された値すべてを要素に追加する
	 var count = 0;
	 var flag = false;
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
		// value = value.sort(sortNumber); 
		 html.push(
			 '<table id="list">'+
				 '<tr><td colspan="2" id="width"><p  class="bolder">'+value.text+'</p></td><td rowspan="3"> <input  id="' + count+ '"type="button" class="'+value.onoff_classname+'" value="'+value.onoff_val+'"></td></tr>'+
				 '<tr><td><p class="listShow">期限： </p></td><td><p class="listShow">'+ value.limit +'</p></td>'+
				 '<tr><td><p class="listShow">作成日： </p></td><td><p class="listShow">'+value.year+'/'+value.month+'/'+value.day+'</p></td></tr>'+
			 '</table>'
			); 
		 list.append(html.join(''));
		 OnOff(count,value,key);
		 count++;
		 flag = true;
		}
	 if(flag == false){
		 $("#ex").text("ToDoはありません。ToDoを追加してください");
		}
	}

function sortNumber(a,b){
return (a - b);
}
	
	
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

function clear_text(){
	 //バルス！
	 localStorage.clear();
	 showText();
	 count = 0;
	 $("#ex").text("ToDoはありません。ToDoを追加してください");
	}

function escapeText(text) {
	 return $("<div>").text(text).html();
	}


