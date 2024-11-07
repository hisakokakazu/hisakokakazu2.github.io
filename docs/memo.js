// メモの保存機能
document.getElementById('save-btn').addEventListener('click', function() {
    const noteContent = document.getElementById('note').value;
    
    if (noteContent.trim() === "") {
      alert("メモを入力してください！");
      return;
    }
  
    const currentDate = new Date().toISOString().split('T')[0]; // 現在の日付（YYYY-MM-DD形式）
  
    // ローカルストレージから既存のメモを取得
    let savedNotes = JSON.parse(localStorage.getItem('savedNotes')) || [];
  
    // 新しいメモを追加
    savedNotes.push({ content: noteContent, date: currentDate });
  
    // ローカルストレージに保存
    localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
  
    // 保存成功を確認
    console.log("メモが保存されました:", savedNotes);
  
    // メモリストを表示
    displayNotes(savedNotes);
  
    // メモの内容をクリア
    document.getElementById('note').value = "";
  });
  
  // メモリストの表示
  function displayNotes(notes) {
    const notesList = document.getElementById('notes-list');
    const savedNotesSection = document.getElementById('saved-notes');
  
    // メモリストをクリア
    notesList.innerHTML = '';
  
    // メモがあればリストを更新し、表示する
    if (notes.length > 0) {
      notes.forEach((note, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${note.content} (日付: ${note.date})`;
        notesList.appendChild(listItem);
      });
  
      savedNotesSection.classList.add('visible');  // メモリストを表示
    } else {
      savedNotesSection.classList.remove('visible');  // メモがない場合はリストを非表示
    }
  }
  
  // ページ読み込み時にローカルストレージからメモを読み込む
  window.addEventListener('load', function() {
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes')) || [];
    displayNotes(savedNotes);
    console.log("ページ読み込み時のメモ:", savedNotes); // ローカルストレージからの読み込み確認
  });
  
  // ワード検索機能
  document.getElementById('search-btn').addEventListener('click', function() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes')) || [];
    
    // 検索したワードでフィルタリング
    const filteredNotes = savedNotes.filter(note => note.content.toLowerCase().includes(searchQuery));
  
    // フィルタリングされたメモを表示
    displayNotes(filteredNotes);
  });
  
  // 日付検索機能
  document.getElementById('date-search-btn').addEventListener('click', function() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
  
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes')) || [];
  
    const filteredNotes = savedNotes.filter(note => {
      const noteDate = note.date;
      return (!startDate || noteDate >= startDate) && (!endDate || noteDate <= endDate);
    });
  
    // フィルタリングされたメモを表示
    displayNotes(filteredNotes);
  });
  