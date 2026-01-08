function doPost(e) {
  const request = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  if (request.type === 'login') {
    const userSheet = ss.getSheetByName('users');
    const userData = userSheet.getDataRange().getValues();
    
    // 学籍番号(row[0])とパスワード(row[1])で照合
    const user = userData.find(row => String(row[0]) === String(request.studentId) && String(row[1]) === String(request.password));
    
    if (user) {
      return ContentService.createTextOutput(JSON.stringify({ 
        result: "success", 
        userName: user[2] // スプレッドシートのC列にある「名前」を返す
      })).setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(JSON.stringify({ 
        result: "error", 
        message: "学籍番号またはパスワードが正しくありません" 
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  // 保存処理（request.type === 'save'）は前回同様
}
