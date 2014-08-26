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
	$("button").click(clear_text);
}
// 入力された内容をローカルストレージに保存する
function saveText() {
	  // 時刻をキーにして入力されたテキストを保存する
	 var t = $("#formText");
	 var l = $("#formLimit");
	 var time = new Date();
	 var data = {
		 text : escapeText(t.val()) ,
		 limit : escapeText(l.val()) 
		 }
		 console.log("t.val "+t.val());
		 console.log("l.val "+l.val());
	 if(l.val().match(/^[0-9][0-9][0-9][0-9]\/[0-1]?[0-9]\/[0-3]?[0-9]$/)){
		 localStorage.setItem(time, JSON.stringify(data));
		 // テキストボックスを空にする
		 t.val("");
		 l.val("");
	 }
	 else{
		 $("#warning").text("yyyy/mm/ddの形式にしたがって入力してください");
	 }
}

// ローカルストレージに保存した値を再描画する
function showText() {
	 // すでにある要素を削除する
	 var list = $("#list");
	 list.children().remove();
	 // ローカルストレージに保存された値すべてを要素に追加する
	 var key, value, html = [];
	 var flag = false;
	 for(var i=0, len=localStorage.length; i<len; i++) {
		 key = localStorage.key(i);
		 value = JSON.parse(localStorage.getItem(key));
		 html.push("<div id=\"list\" class=\"box\">"+
			 "<table>"+
				 "<tr><td colspan=\"2\"><p  class=\"bolder\">"+value.text+"</p></td></tr>"+
				 "<tr><td>期限： </td><td>"+ value.limit +"</td><td rowspan=\"3\"> <input id=\"formButton\" type=\"button\" value=\"未完了\"></td></tr>"+
				 "<tr><td>作成日： </td><td>"+key+"</td></tr>"+
			 "</table>"+
			 "</div>"
			);
		 flag = true;
		}
	 list.append(html.join(''));
	 if(flag == false){
		 $("#ex").text("ToDoはありません。ToDoを追加してください");
		 }
}

function clear_text(){
	 //バルス！
	 localStorage.clear();
	 showText();
	 $("#ex").text("ToDoはありません。ToDoを追加してください");
}

function escapeText(text) {
  return $("<div>").text(text).html();
}