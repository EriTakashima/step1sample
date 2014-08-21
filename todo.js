$(loaded);
function loaded(){
// console.log(now);
   showText();
  // ボタンをクリックしたときに実行するイベントを設定する
  $("#formButton").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
	  $("#ex").remove();
      saveText();
      showText();
    });
}
// 入力された内容をローカルストレージに保存する
function saveText() {
  // 時刻をキーにして入力されたテキストを保存する
  var text = $("#formText");
  var time = new Date();
  localStorage.setItem(time, text.val());
  // テキストボックスを空にする
  text.val("");
}

// ローカルストレージに保存した値を再描画する
function showText() {
  // すでにある要素を削除する
  var list = $("#list")
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

/*function change_text(){
  //IDがmessageの要素のテキストを書き換え
  $("#ex").remove();
  console.log(now);
}
*/
//読み込み完了時に実行する関数を指定
