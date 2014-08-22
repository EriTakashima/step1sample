$(loaded);
function loaded(){
// console.log(now);
   showText();
  // ボタンをクリックしたときに実行するイベントを設定する
  $("#formButton").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
	  $("#ex").children.remove();
      saveText();
      showText();
    });
	$("button").click(change_text);
}
// 入力された内容をローカルストレージに保存する
function saveText() {
  // 時刻をキーにして入力されたテキストを保存する
  var text = $("#formText");
  var time = new Date();
  var limit = $("#formLimit");
  localStorage.setItem(time, text.val(),limit.val());
  // テキストボックスを空にする
  text.val("");
  limit.val("");
}

// ローカルストレージに保存した値を再描画する
function showText() {
  // すでにある要素を削除する
  var list = $("#list");
  list.children().remove();
  // ローカルストレージに保存された値すべてを要素に追加する
  var key, value, html = [];
  for(var i=0, len=localStorage.length; i<len; i++) {
    key = localStorage.key(i);
    value = localStorage.getItem(key);
    html.push("<div id=\"list\" class=\"box\">"+"<h2>"+ value +"</h2>"+"</div>");
   //html.push("<div id=\"list\" class=\"box\">"+"<h2>"+ value +"</h2>"+"<p>"+"期限"+value+"</p>"+"<p>"+"作成"+time+"</p>"+"</div>");
  }
  list.append(html.join(''));
}
function change_text(){
console.log("aaaa");
 $("#ex").text("ToDoはありません。ToDoを追加してください");
localStorage.clear();
console.log("bbbb");
}
