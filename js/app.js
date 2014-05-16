var INTERVAL = 1000; 
var DEFAULT_MESSAGE = "終了";
//{}以下を定義する関数
var alarm = {
		duration: -1,
		message: ""
};
//表示する文章を作る関数
var formatCounterAsString = function(){
		return "あと" + alarm.duration + "秒";//残り時間を返す
};
//残り時間を表示させる関数
var updateCounter = function(){
		alarm.output.textContent = formatCounterAsString();
};
//終了メッセージを表示させる関数
var showAlarmMessage = function(){
		var message = DEFAULT_MESSAGE;
		if(alarm.message.length > 0){
			//0以上の場合
				message = alarm.message;
		}
		if(Notification.permission == "granted"){
			//通知機能があった場合
				var notification = new Notification(message);
		}
		alarm.output.textContent = message;
};
//カウントダウン数字を表示させる関数
var update = function(){
		alarm.duration = alarm.duration - 1;//残り時間から-１をする
		if(isReadyToCountdown()){
			showAlarmMessage();
		}
};		//カウントダウンが始まっていてかつ0以上である場合
				updateCounter();
				window.setTimeout(update, INTERVAL);//INTERVALで定められた時間が経過したときに、updateを呼び出す
		}else{
			//カウントダウンが終わった場合
		
//カウントし続ける関数
var isReadyToCountdown = function(){
		return Number.isInteger(alarm.duration) && alarm.duration > 0;//かつ0以上の場合
};
//式の下にカウントダウン数字もしくはメッセージを表示させる関数
var setupAlarm = function(durationString, message){
		alarm.duration = Number(durationString),
		alarm.message = message;
};
//○秒後を選択し、メッセージを入力した際にタイマーをスタートさせる関数
var startAlarm = function(){
		setupAlarm(alarm.durationSelect.value, alarm.messageInput.value);
		if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
				//カウントダウンの準備ができた場合
		}
};
//以下のクラスから動作を選択する
var initApp = function(){
		alarm.durationSelect = document.querySelector("#duration");//"#duration"を取得し変数化
		alarm.messageInput = document.querySelector("#message");//"message"を取得し変数化
		alarm.output = document.querySelector("#countdown");//"countdown"を取得し変数化
		Notification.requestPermission(function(status){
				if(Notification.permission != status){//Notification.permissionとstatusが違う場合
						Notification.permission = status;
				}
		});
		var startButton = document.querySelector("#start");//"#start"を取得し変数化
		startButton.addEventListener("click", startAlarm);//イベントリスナーを用いて"click"にstartAlarm変数を呼びだす
};
initApp();